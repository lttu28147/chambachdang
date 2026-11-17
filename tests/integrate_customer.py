from pathlib import Path
import shutil
import json
import openpyxl

root=Path(__file__).resolve().parents[1]
source=Path('C:/Users/ADMIN/Downloads/Cung cấp thông tin.xlsx')
archive=root/'docs/customer-source'
archive.mkdir(exist_ok=True)
shutil.copy2(source,archive/source.name)
w=openpyxl.load_workbook(source,data_only=True)
sheet=w['Sheet1']
raw={f'D{r}':sheet.cell(r,4).value for r in range(6,21)}
(archive/'extracted.json').write_text(json.dumps(raw,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'dist/index.html';s=p.read_text(encoding='utf-8').replace('<script defer src="experiences.js">','<script defer src="customer-data.js"></script><script defer src="experiences.js">');p.write_text(s,encoding='utf-8')
p=root/'dist/app.js';s=p.read_text(encoding='utf-8')
s=s.replace('function productCards(q=\'\'){return products.', 'function productCards(q=\'\'){return suppliedProducts(q)}\nfunction legacyProductCards(q=\'\'){return products.')
s=s.replace('stats:statsPage,planner', "stats:suppliedStatsPage,'sample-stats':statsPage,planner")
s=s.replace("if(page==='stats'){renderStats();", "if(page==='stats')bindSuppliedStats();if(page==='sample-stats'){renderStats();")
s=s.replace("$('#main').innerHTML=(routes[page]||home)();window.scrollTo(0,0);", "$('#main').innerHTML=(routes[page]||home)();if(page==='home')$('.wrap', $('#main')).insertAdjacentHTML('afterbegin',suppliedIntro());if(page==='map')$('.page-head').insertAdjacentHTML('beforeend',suppliedIntro());if(page==='sources')$('.wrap', $('#main')).insertAdjacentHTML('afterbegin',suppliedSources());if(page==='explore')$('.article').insertAdjacentHTML('afterbegin',suppliedIntro());window.scrollTo(0,0);")
s=s.replace('Danh mục giới thiệu; chưa phải gian hàng bán hàng. Chỉ hiển thị nhãn OCOP khi có chứng nhận hợp lệ, còn hiệu lực và đúng chủ thể.','Thông tin OCOP chè do khách hàng cung cấp, đang chờ quyết định đối chiếu. Dứa sấy OCOP và 30 ha VietGAP đang đăng ký. Chưa có giá, đầu mối bán hoặc ảnh sản phẩm.')
s=s.replace('Bản trực tuyến tĩnh dùng để xem và trình diễn bộ dữ liệu mẫu.','Bản local có dữ liệu tổng hợp khách hàng cung cấp và bộ hồ sơ bản đồ mẫu được ghi nhãn riêng.')
p.write_text(s,encoding='utf-8')
p=root/'dist/experiences.js';s=p.read_text(encoding='utf-8').replace('months:[6,7,8]','months:[5,6,7]')
s=s.replace('Mùa hoạt động là giả định để thử thuật toán; không phải lịch mở vườn hay dịch vụ đã đặt được.','Mùa vụ theo file khách hàng: chè tháng 3–10, có thể đến tháng 11; dứa chính vụ tháng 5–7, trái vụ ít sản lượng. Thời lượng trải nghiệm vẫn là đề xuất; chưa có lịch mở vườn hoặc dịch vụ đã đặt được.')
s=s.replace("'Trong mùa giả định':'Ngoài mùa giả định'", "'Trong mùa chính theo tài liệu':'Ngoài mùa chính / cần xác nhận'")
s=s.replace('mùa giả định','mùa theo tài liệu').replace('Ngoài mùa giả định: chuyển sang quan sát, tìm hiểu chăm sóc và phỏng vấn. Không hứa có quả hoặc búp để hái.','Ngoài khoảng mùa chính: chè có thể kéo dài đến tháng 11; dứa có trái vụ ít sản lượng. Cần chủ vườn xác nhận có thể thu hoạch trước khi đi.')
s=s.replace('Giá, sức chứa, lịch mở vườn:</b> chưa được chủ vườn cung cấp.','Giá và lịch mở vườn:</b> chưa được chủ vườn cung cấp.</p><p><b>Khả năng đón khách đề xuất:</b> ${type===\'che\'?\'500\':\'1.000\'} lượt/ngày theo khách hàng; chưa vận hành, chưa kiểm chứng sức chứa thực tế.')
p.write_text(s,encoding='utf-8')
p=root/'dist/style.css';p.write_text(p.read_text(encoding='utf-8')+'\n.season-calendar{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin:20px 0}.season-calendar span{padding:8px 2px;text-align:center;background:#f0f1ec;border-radius:5px;font-size:12px}.season-calendar small{display:block;font-size:8px}.season-calendar .season-main{background:#dce9cc;color:#33522b}.season-calendar .season-possible{background:#f5e9c9;color:#775d29}\n',encoding='utf-8')
print('Integrated customer dataset; source preserved privately; map coordinates unchanged.')
