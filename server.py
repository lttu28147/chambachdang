"""Local WebGIS server. Python 3.10+, standard library only."""
import argparse
from contextlib import contextmanager
import base64
import datetime as dt
import getpass
import hashlib
import hmac
import json
import math
import os
from pathlib import Path
import re
import secrets
import sqlite3
import sys
import time
from http import cookies
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse
import urllib.request
import urllib.error

ROOT = Path(__file__).resolve().parent
DATA = Path(os.environ.get('BACHDANG_DATA_DIR', str(ROOT / 'data')))
DB = DATA / 'bach-dang.sqlite3'
SESSIONS = {}
ATTEMPTS = {}

@contextmanager
def connect():
    db = sqlite3.connect(DB, timeout=15)
    db.row_factory = sqlite3.Row
    try:
        with db:
            yield db
    finally:
        db.close()

def initialize():
    DATA.mkdir(parents=True, exist_ok=True)
    with connect() as db:
        db.executescript('''CREATE TABLE IF NOT EXISTS records(id TEXT PRIMARY KEY, body TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS users(username TEXT PRIMARY KEY, salt TEXT NOT NULL, password_hash TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY, at TEXT NOT NULL, action TEXT NOT NULL, record_id TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY, value TEXT);''')
        if not db.execute("SELECT 1 FROM meta WHERE key='seeded'").fetchone():
            for row in json.loads((ROOT/'dist/data.json').read_text(encoding='utf-8')):
                db.execute('INSERT INTO records VALUES (?,?)', (row['id'], json.dumps(row, ensure_ascii=False)))
            db.execute("INSERT INTO meta VALUES ('seeded','1')")

def password_hash(password, salt):
    return hashlib.scrypt(password.encode(), salt=bytes.fromhex(salt), n=16384, r=8, p=1).hex()

def setup_user(username, password):
    if len(password) < 12:
        raise ValueError('Mật khẩu cần ít nhất 12 ký tự.')
    salt = secrets.token_hex(16)
    with connect() as db:
        db.execute('INSERT OR REPLACE INTO users VALUES (?,?,?)', (username, salt, password_hash(password, salt)))

def valid_record(data, record_id=None):
    if not isinstance(data, dict):
        raise ValueError('Hồ sơ phải là một đối tượng JSON.')
    row = {}
    limits = {'name':160,'owner':160,'season':80,'status':100,'address':300,'description':5000,'source':500,'surveyDate':10}
    for key, limit in limits.items():
        value = data.get(key, '')
        if not isinstance(value, str) or len(value) > limit:
            raise ValueError(f'Trường {key} không hợp lệ hoặc quá dài.')
        row[key] = value.strip()
    for key in ['name','owner','season','status','address','description']:
        if not row[key]:
            raise ValueError(f'Thiếu trường bắt buộc: {key}.')
    if data.get('type') not in ['dua','che','mat','ditich']:
        raise ValueError('Loại hồ sơ không hợp lệ.')
    row['type'] = data['type']
    for key, lo, hi in [('lat',-90,90),('lng',-180,180),('area',0,100000),('production',0,1000000)]:
        number = data.get(key)
        if isinstance(number, bool) or not isinstance(number,(int,float)) or not math.isfinite(number) or not lo <= number <= hi:
            raise ValueError(f'{key} nằm ngoài giới hạn hợp lệ.')
        row[key] = number
    row['verification'] = data.get('verification','sample')
    if row['verification'] not in ['sample','pending','verified','rejected']:
        raise ValueError('Trạng thái xác minh không hợp lệ.')
    row['consent'] = data.get('consent') is True
    if row['surveyDate']:
        try:
            day = dt.date.fromisoformat(row['surveyDate'])
            if day > dt.datetime.now(dt.timezone(dt.timedelta(hours=7))).date():
                raise ValueError()
        except ValueError:
            raise ValueError('Ngày khảo sát không hợp lệ hoặc ở tương lai.')
    if row['verification']=='verified' and not (row['source'] and row['surveyDate'] and row['consent']):
        raise ValueError('Hồ sơ đã xác minh cần nguồn, ngày khảo sát và đồng ý công bố.')
    image = data.get('image','')
    if not isinstance(image,str):
        raise ValueError('Ảnh không hợp lệ.')
    if image:
        if image.startswith(('assets/', 'dist/assets/')):
            if '..' in image or not re.fullmatch(r'[a-zA-Z0-9_\-\./]+', image):
                raise ValueError('Đường dẫn ảnh không hợp lệ.')
        else:
            match = re.fullmatch(r'data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)', image)
            if not match:
                raise ValueError('Chỉ nhận ảnh JPEG, PNG, WebP dạng dữ liệu tải lên hoặc đường dẫn assets.')
            try:
                raw = base64.b64decode(match[2], validate=True)
            except Exception:
                raise ValueError('Ảnh mã hóa không hợp lệ.')
            if len(raw)>2*1024*1024:
                raise ValueError('Ảnh vượt quá 2 MB.')
            magic = {'jpeg':raw.startswith(b'\xff\xd8\xff'),'png':raw.startswith(b'\x89PNG\r\n\x1a\n'),'webp':raw.startswith(b'RIFF') and raw[8:12]==b'WEBP'}
            if not magic[match[1]]:
                raise ValueError('Nội dung ảnh không khớp định dạng.')
    for key in ['reportingPeriod','sourceType','verifiedBy','verifiedAt','hostAvailabilityStatus','expiresAt']:
        value=data.get(key,'')
        if not isinstance(value,str) or len(value)>500:
            raise ValueError('Trường hộ chiếu dữ liệu không hợp lệ: '+key)
        row[key]=value
    for key in ['consentToPublishCoordinates','consentToPublishImage','coordinatesVerified','accessSafetyConfirmed']:
        row[key]=data.get(key) is True
    accuracy=data.get('gpsAccuracyMeters')
    if accuracy is not None and (isinstance(accuracy,bool) or not isinstance(accuracy,(int,float)) or not math.isfinite(accuracy) or not 0<accuracy<=10000):
        raise ValueError('Sai số GPS không hợp lệ.')
    row['gpsAccuracyMeters']=accuracy
    evidence=data.get('evidenceIds',[])
    if not isinstance(evidence,list) or len(evidence)>100 or any(not isinstance(x,str) or len(x)>160 for x in evidence):
        raise ValueError('Mã minh chứng không hợp lệ.')
    row['evidenceIds']=evidence
    row['missingFields']=[k for k in ['source','surveyDate','reportingPeriod'] if not row.get(k)]
    if row['verification']=='verified' and not (evidence and row['verifiedBy'] and row['verifiedAt'] and row['consentToPublishCoordinates'] and row['coordinatesVerified'] and accuracy is not None):
        raise ValueError('Cần minh chứng, người kiểm duyệt, ngày duyệt, sai số GPS và quyền công bố tọa độ riêng trước khi xác minh.')
    if image and not row['consentToPublishImage']:
        raise ValueError('Cần đồng ý công bố hình ảnh riêng.')
    row['image'] = image
    polygon = data.get('polygon')
    if polygon is not None:
        if not isinstance(polygon,list) or not 4<=len(polygon)<=501:
            raise ValueError('Đa giác cần từ 3 đến 500 đỉnh và phải khép kín.')
        for point in polygon:
            if not isinstance(point,list) or len(point)!=2 or any(isinstance(n,bool) or not isinstance(n,(int,float)) or not math.isfinite(n) for n in point):
                raise ValueError('Tọa độ đỉnh không hợp lệ.')
            if not (-180<=point[0]<=180 and -90<=point[1]<=90):
                raise ValueError('Tọa độ đa giác ngoài WGS84.')
        if polygon[0]!=polygon[-1] or len(set(tuple(p) for p in polygon[:-1]))<3:
            raise ValueError('Đa giác chưa khép kín hoặc có ít hơn 3 đỉnh riêng biệt.')
        # Planar orientation validates small local field boundaries; no antimeridian fields.
        pts = polygon[:-1]
        def cross(a,b,c):
            return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
        def between(a,b,p):
            return min(a[0],b[0])<=p[0]<=max(a[0],b[0]) and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
        def intersects(a,b,c,d):
            x,y,z,w = cross(a,b,c),cross(a,b,d),cross(c,d,a),cross(c,d,b)
            return (x*y<0 and z*w<0) or any(abs(v)<1e-14 and between(u,t,p) for v,u,t,p in [(x,a,b,c),(y,a,b,d),(z,c,d,a),(w,c,d,b)])
        if len(set(tuple(p) for p in pts)) != len(pts):
            raise ValueError('Đa giác có đỉnh lặp.')
        for i in range(len(pts)):
            for j in range(i+1,len(pts)):
                if j==i+1 or (i==0 and j==len(pts)-1):
                    continue
                if intersects(pts[i],pts[(i+1)%len(pts)],pts[j],pts[(j+1)%len(pts)]):
                    raise ValueError('Ranh giới tự giao nhau. Vui lòng vẽ lại.')
        area = abs(sum(polygon[i][0]*polygon[i+1][1]-polygon[i+1][0]*polygon[i][1] for i in range(len(polygon)-1)))
        if area < 1e-12:
            raise ValueError('Đa giác suy biến, diện tích bằng 0.')
    row['polygon'] = polygon
    row['id'] = record_id or data.get('id') or 'vung-'+secrets.token_hex(5)
    if not isinstance(row['id'],str) or not re.fullmatch('[a-zA-Z0-9_-]{1,80}',row['id']):
        raise ValueError('Mã hồ sơ không hợp lệ.')
    row['updatedAt'] = dt.datetime.now(dt.timezone.utc).isoformat()
    return row

def audit(db, action, record_id):
    db.execute('INSERT INTO audit(at,action,record_id) VALUES (?,?,?)',(dt.datetime.now(dt.timezone.utc).isoformat(),action,record_id))

class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):
        super().__init__(*args,directory=str(ROOT/'dist'),**kwargs)

    def end_headers(self):
        self.send_header('X-Content-Type-Options','nosniff')
        self.send_header('Referrer-Policy','strict-origin-when-cross-origin')
        self.send_header('X-Frame-Options','DENY')
        self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://tile.openstreetmap.org https://server.arcgisonline.com https://media.baocaobang.vn https://mediabcb.mediatech.vn; connect-src 'self' https://generativelanguage.googleapis.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'")
        super().end_headers()

    def reply(self, code, obj, cookie=None):
        body = json.dumps(obj,ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type','application/json; charset=utf-8')
        self.send_header('Content-Length',str(len(body)))
        self.send_header('Cache-Control','no-store')
        if cookie:
            self.send_header('Set-Cookie',cookie)
        self.end_headers()
        self.wfile.write(body)

    def session(self):
        try:
            c=cookies.SimpleCookie(self.headers.get('Cookie',''))
            token=c['bd_session'].value if 'bd_session' in c else ''
        except cookies.CookieError:
            return None
        session=SESSIONS.get(token)
        if session and session['expires']>time.time():
            return session
        SESSIONS.pop(token,None)
        return None

    def host_ok(self):
        host=self.headers.get('Host','')
        return host in {f'127.0.0.1:{self.server.server_port}', f'localhost:{self.server.server_port}'}

    def do_GET(self):
        if not self.host_ok():
            return self.reply(403,{'error':'Host không được phép.'})
        path=urlparse(self.path).path
        if not path.startswith('/api/'):
            if path.endswith('/') and path!='/':
                return self.send_error(404)
            return super().do_GET()
        if path=='/api/session':
            s=self.session()
            return self.reply(200,{'backend':True,'authenticated':bool(s),'csrf':s['csrf'] if s else ''})
        if path=='/api/records':
            with connect() as db:
                rows=[json.loads(r['body']) for r in db.execute('SELECT body FROM records ORDER BY id')]
            return self.reply(200,rows)
        if path=='/api/audit':
            if not self.session():
                return self.reply(401,{'error':'Cần đăng nhập.'})
            with connect() as db:
                rows=[dict(r) for r in db.execute('SELECT at,action,record_id FROM audit ORDER BY id DESC LIMIT 100')]
            return self.reply(200,rows)
        return self.reply(404,{'error':'Không có API này.'})

    def mutate(self):
        if not self.host_ok():
            return self.reply(403,{'error':'Host không được phép.'})
        origin=self.headers.get('Origin')
        if origin and origin not in {f'http://127.0.0.1:{self.server.server_port}',f'http://localhost:{self.server.server_port}'}:
            return self.reply(403,{'error':'Nguồn yêu cầu không hợp lệ.'})
        path=urlparse(self.path).path
        if path not in {'/api/login', '/api/chat'}:
            s=self.session()
            if not s:
                return self.reply(401,{'error':'Cần đăng nhập quản trị.'})
            if not hmac.compare_digest(self.headers.get('X-CSRF-Token',''),s['csrf']):
                return self.reply(403,{'error':'Phiên bảo mật không hợp lệ. Tải lại trang.'})
        try:
            size=int(self.headers.get('Content-Length','0'))
            if size<0 or size>16*1024*1024:
                return self.reply(413,{'error':'Dữ liệu quá lớn.'})
            body=self.rfile.read(size)
            data=json.loads(body) if body else {}
            if path=='/api/chat' and self.command=='POST':
                if not isinstance(data,dict):
                    raise ValueError('Yêu cầu hỏi đáp không hợp lệ.')
                query=str(data.get('query','')).strip()
                if not query or len(query)>1000:
                    raise ValueError('Câu hỏi phải từ 1 đến 1000 ký tự.')
                lang='en' if data.get('lang')=='en' else 'vi'
                with connect() as db:
                    rows=[json.loads(r['body']) for r in db.execute('SELECT body FROM records ORDER BY id')]
                api_key=os.environ.get('GEMINI_API_KEY','').strip()
                llm_answer=None
                if api_key:
                    try:
                        ctx=json.dumps([{'id':r['id'],'name':r['name'],'owner':r['owner'],'area':r.get('area'),'season':r['season']} for r in rows],ensure_ascii=False)
                        prompt=f"Bạn là Trợ lý AI WebGIS Chạm Bạch Đằng (Cao Bằng). Trả lời ngắn gọn bằng {'tiếng Anh' if lang=='en' else 'tiếng Việt'} dựa trên dữ liệu: {ctx}. Câu hỏi: {query}"
                        req=urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}',data=json.dumps({'contents':[{'parts':[{'text':prompt}]}]}).encode('utf-8'),headers={'Content-Type':'application/json'},method='POST')
                        with urllib.request.urlopen(req,timeout=8) as resp:
                            res_json=json.loads(resp.read().decode('utf-8'))
                            llm_answer=res_json.get('candidates',[{}])[0].get('content',{}).get('parts',[{}])[0].get('text')
                    except (urllib.error.URLError,TimeoutError,KeyError,IndexError,ValueError):
                        llm_answer=None
                return self.reply(200,{'ok':True,'mode':'cloud_llm' if llm_answer else 'local_rag','recordCount':len(rows),'llmAnswer':llm_answer})
            if path=='/api/login' and self.command=='POST':
                if not isinstance(data,dict):
                    raise ValueError('Thông tin đăng nhập không hợp lệ.')
                ip=self.client_address[0]
                attempts=[t for t in ATTEMPTS.get(ip,[]) if time.time()-t<300]
                ATTEMPTS[ip]=attempts
                if len(attempts)>=8:
                    return self.reply(429,{'error':'Quá nhiều lần thử. Vui lòng đợi 5 phút.'})
                username,password=data.get('username',''),data.get('password','')
                if not isinstance(username,str) or not isinstance(password,str) or len(password)>1024:
                    raise ValueError('Thông tin đăng nhập không hợp lệ.')
                with connect() as db:
                    user=db.execute('SELECT * FROM users WHERE username=?',(username,)).fetchone()
                salt=user['salt'] if user else '00'*16
                digest=password_hash(password,salt)
                if not user or not hmac.compare_digest(digest,user['password_hash']):
                    attempts.append(time.time())
                    return self.reply(401,{'error':'Tên đăng nhập hoặc mật khẩu không đúng.'})
                ATTEMPTS.pop(ip,None)
                token=secrets.token_urlsafe(32)
                csrf=secrets.token_urlsafe(32)
                SESSIONS[token]={'csrf':csrf,'expires':time.time()+8*3600}
                return self.reply(200,{'csrf':csrf},f'bd_session={token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800')
            if path=='/api/logout' and self.command=='POST':
                for token,s in list(SESSIONS.items()):
                    if s==self.session():
                        SESSIONS.pop(token,None)
                return self.reply(200,{'ok':True},'bd_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0')
            if path=='/api/import' and self.command=='POST':
                if not isinstance(data,list) or not 1<=len(data)<=1000:
                    raise ValueError('Cần từ 1 đến 1000 hồ sơ.')
                rows=[valid_record(row) for row in data]
                if len(set(r['id'] for r in rows))!=len(rows):
                    raise ValueError('Tệp nhập có mã hồ sơ trùng nhau.')
                with connect() as db:
                    for row in rows:
                        db.execute('INSERT OR REPLACE INTO records VALUES (?,?)',(row['id'],json.dumps(row,ensure_ascii=False)))
                        audit(db,'import',row['id'])
                return self.reply(200,{'count':len(rows)})
            if path=='/api/records' and self.command=='POST':
                row=valid_record(data,'vung-'+secrets.token_hex(5))
                with connect() as db:
                    db.execute('INSERT INTO records VALUES (?,?)',(row['id'],json.dumps(row,ensure_ascii=False)))
                    audit(db,'create',row['id'])
                return self.reply(201,row)
            if path.startswith('/api/records/') and self.command in ['PUT','DELETE']:
                record_id=path.removeprefix('/api/records/')
                with connect() as db:
                    if not db.execute('SELECT 1 FROM records WHERE id=?',(record_id,)).fetchone():
                        return self.reply(404,{'error':'Không tìm thấy hồ sơ.'})
                    if self.command=='DELETE':
                        db.execute('DELETE FROM records WHERE id=?',(record_id,))
                        audit(db,'delete',record_id)
                        return self.reply(200,{'ok':True})
                    row=valid_record(data,record_id)
                    db.execute('UPDATE records SET body=? WHERE id=?',(json.dumps(row,ensure_ascii=False),record_id))
                    audit(db,'update',record_id)
                    return self.reply(200,row)
            return self.reply(404,{'error':'Không có thao tác này.'})
        except (ValueError,TypeError,UnicodeDecodeError) as error:
            return self.reply(400,{'error':str(error)})
        except sqlite3.Error:
            return self.reply(500,{'error':'Không thể ghi cơ sở dữ liệu. Hãy kiểm tra ổ đĩa và thử lại.'})

    do_POST=mutate
    do_PUT=mutate
    do_DELETE=mutate

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
    parser=argparse.ArgumentParser(description='Bạch Đằng WebGIS — máy chủ cục bộ')
    parser.add_argument('--port',type=int,default=8765)
    parser.add_argument('--setup-admin',action='store_true')
    parser.add_argument('--no-setup',action='store_true',help='Chạy website ngay; tạo tài khoản sau bằng --setup-admin.')
    args=parser.parse_args()
    initialize()
    with connect() as db:
        needs_setup=not db.execute('SELECT 1 FROM users LIMIT 1').fetchone()
    if args.setup_admin or (needs_setup and not args.no_setup):
        print('Thiết lập tài khoản quản trị; không có mật khẩu mặc định.')
        username=input('Tên đăng nhập [admin]: ').strip() or 'admin'
        password=getpass.getpass('Mật khẩu (ít nhất 12 ký tự): ')
        if password!=getpass.getpass('Nhập lại mật khẩu: '):
            raise SystemExit('Mật khẩu nhập lại không khớp.')
        setup_user(username,password)
        print('Đã lưu mật khẩu băm scrypt.')
    # Windows must not share this port with a stale server instance.
    class LocalHTTPServer(ThreadingHTTPServer):
        allow_reuse_address=False
    try:
        server=LocalHTTPServer(('127.0.0.1',args.port),Handler)
    except OSError:
        raise SystemExit(f'Cổng {args.port} đang được sử dụng. Hãy đóng phiên server cũ trước khi chạy lại.')
    print(f'Bạch Đằng WebGIS: http://127.0.0.1:{args.port}',flush=True)
    print('Chỉ phục vụ trên máy này. Ctrl+C để dừng. CSDL: '+str(DB),flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

if __name__=='__main__':
    main()
