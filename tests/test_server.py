import copy
import http.client
import json
from pathlib import Path
import tempfile
import threading
import unittest
import server

class WebGISTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp=tempfile.TemporaryDirectory()
        server.DATA=Path(cls.temp.name)
        server.DB=server.DATA/'test.sqlite3'
        server.initialize()
        server.setup_user('tester','test-password-only-123')
        cls.http=server.ThreadingHTTPServer(('127.0.0.1',0),server.Handler)
        cls.thread=threading.Thread(target=cls.http.serve_forever,daemon=True)
        cls.thread.start()
        cls.base=json.loads((server.ROOT/'dist/data.json').read_text(encoding='utf-8'))[0]

    @classmethod
    def tearDownClass(cls):
        cls.http.shutdown();cls.http.server_close();cls.thread.join();cls.temp.cleanup()

    def request(self,path,method='GET',body=None,headers=None):
        c=http.client.HTTPConnection('127.0.0.1',self.http.server_port)
        c.request(method,path,body=json.dumps(body) if body is not None else None,headers={'Content-Type':'application/json',**(headers or {})})
        r=c.getresponse();status=r.status;rh=dict(r.getheaders());raw=r.read();c.close()
        return status,rh,json.loads(raw) if 'application/json' in rh.get('Content-Type','') else raw

    def login(self):
        status,h,b=self.request('/api/login','POST',{'username':'tester','password':'test-password-only-123'})
        self.assertEqual(status,200)
        self.assertIn('HttpOnly',h['Set-Cookie'])
        return {'Cookie':h['Set-Cookie'].split(';')[0],'X-CSRF-Token':b['csrf']}

    def test_auth_and_csrf(self):
        self.assertEqual(self.request('/api/records','POST',self.base)[0],401)
        auth=self.login();bad={**auth,'X-CSRF-Token':'invalid'}
        self.assertEqual(self.request('/api/records','POST',self.base,bad)[0],403)
        self.assertEqual(self.request('/api/records','POST',self.base,{**auth,'Origin':'https://evil.example'})[0],403)

    def test_crud_persistence_audit(self):
        auth=self.login()
        status,_,r=self.request('/api/records','POST',self.base,auth);self.assertEqual(status,201)
        rid=r['id'];r['name']='Vùng đã cập nhật'
        self.assertEqual(self.request('/api/records/'+rid,'PUT',r,auth)[0],200)
        with server.connect() as db:
            stored=json.loads(db.execute('SELECT body FROM records WHERE id=?',(rid,)).fetchone()['body'])
        self.assertEqual(stored['name'],r['name'])
        self.assertEqual(self.request('/api/records/'+rid,'DELETE',headers=auth)[0],200)
        self.assertEqual(self.request('/api/records/'+rid,'PUT',r,auth)[0],404)
        log=self.request('/api/audit',headers=auth)[2]
        self.assertEqual([x['action'] for x in log if x['record_id']==rid],['delete','update','create'])
        self.assertEqual(self.request('/api/logout','POST',{},auth)[0],200)
        self.assertEqual(self.request('/api/audit',headers=auth)[0],401)

    def test_verified_requires_evidence(self):
        r=copy.deepcopy(self.base);r['verification']='verified'
        with self.assertRaises(ValueError):server.valid_record(r)
        r.update(source='Biên bản khảo sát kiểm thử',surveyDate='2026-01-01',consent=True)
        with self.assertRaises(ValueError):server.valid_record(r)
        r.update(evidenceIds=['test-evidence'],verifiedBy='test-reviewer',verifiedAt='2026-01-02',consentToPublishCoordinates=True,coordinatesVerified=True,gpsAccuracyMeters=10)
        self.assertEqual(server.valid_record(r)['verification'],'verified')

    def test_invalid_geometry(self):
        r=copy.deepcopy(self.base)
        for polygon in [[[0,0],[1,1],[0,1],[1,0],[0,0]],[[0,0],[1,1],[2,2],[0,0]],[[0,0],[181,1],[0,1],[0,0]]]:
            r['polygon']=polygon
            with self.assertRaises(ValueError):server.valid_record(r)
        r['polygon']=self.base['polygon'];r['lat']=float('nan')
        with self.assertRaises(ValueError):server.valid_record(r)

    def test_import_atomic_and_image_validation(self):
        auth=self.login();good=copy.deepcopy(self.base);good['id']='must-not-be-imported'
        bad=copy.deepcopy(good);bad['area']=-1
        self.assertEqual(self.request('/api/import','POST',[good,bad],auth)[0],400)
        self.assertNotIn('must-not-be-imported',[r['id'] for r in self.request('/api/records')[2]])
        bad=copy.deepcopy(good);bad['image']='data:image/svg+xml;base64,PHN2Zz4='
        with self.assertRaises(ValueError):server.valid_record(bad)

    def test_private_files_not_served(self):
        for path in ['/server.py','/data/bach-dang.sqlite3','/../server.py']:
            self.assertEqual(self.request(path)[0],404)
        self.assertEqual(self.request('/api/session',headers={'Host':'evil.example'})[0],403)

    def test_ai_chat_endpoint(self):
        status,_,body=self.request('/api/chat','POST',{'query':'Vẽ lộ trình tham quan 4 giờ','lang':'vi'})
        self.assertEqual(status,200)
        self.assertTrue(body['ok'])
        self.assertGreaterEqual(body['recordCount'],1)
        self.assertEqual(self.request('/api/chat','POST',{'query':''})[0],400)
        self.assertEqual(self.request('/api/chat','POST',{'query':'hi'},{'Origin':'https://evil.example'})[0],403)

if __name__=='__main__':unittest.main()
