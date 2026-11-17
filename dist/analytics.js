'use strict';

// Economic & Yield Simulator
function calculateSimulator(vietgapArea) {
  const yieldPerHa = 18.1; // t/ha
  const totalHarvestArea = 90.0;
  const standardPrice = 10000; // VND/kg
  const vietgapPrice = 13500;  // VND/kg (35% premium)
  
  const area = Math.min(Math.max(vietgapArea, 0), totalHarvestArea);
  const vietgapProdTons = area * yieldPerHa;
  const regularProdTons = (totalHarvestArea - area) * yieldPerHa;
  
  const regularRevMil = (regularProdTons * 1000 * standardPrice) / 1000000;
  const vietgapRevMil = (vietgapProdTons * 1000 * vietgapPrice) / 1000000;
  const totalRevMil = regularRevMil + vietgapRevMil;
  
  // Baseline: all conventional
  const baselineRevMil = (totalHarvestArea * yieldPerHa * 1000 * standardPrice) / 1000000;
  const addedValueMil = totalRevMil - baselineRevMil;
  const chemicalReductionPct = Math.round((area / totalHarvestArea) * 45);

  return {
    area,
    vietgapProdTons,
    regularProdTons,
    totalRevMil,
    addedValueMil,
    chemicalReductionPct
  };
}

function analyticsPage() {
  const sim = calculateSimulator(30); // Default 30ha VietGAP target of Bach Dang
  return `
    ${head('Mô hình hóa & Khoa học dữ liệu', 'Phân tích & Mô phỏng Nông nghiệp 4.0', 'Công cụ mô phỏng giá trị kinh tế VietGAP, đối soát chuỗi giá trị và phân tích không gian GIS.')}
    <section class="wrap" style="padding-top:0">
      
      <div class="two">
        <!-- Simulator Panel -->
        <div class="panel">
          <div class="eyebrow eyebrow-gold">Mô phỏng chuỗi giá trị nông nghiệp</div>
          <h3 style="margin-top:10px;">Dự báo kinh tế chuyển đổi VietGAP</h3>
          <p style="font-size:13.5px; color:var(--muted); line-height:1.7;">
            Kéo thanh trượt để mô phỏng tác động kinh tế khi xã Bạch Đằng chuyển đổi dần 90 ha dứa thu hoạch sang tiêu chuẩn VietGAP:
          </p>

          <div class="slider-group" style="margin: 24px 0 16px;">
            <label style="font-size:14px;">
              <span>Diện tích dứa đạt chuẩn VietGAP:</span>
              <strong id="sim-area-val" style="color:var(--green); font-size:18px;">30,0 ha</strong>
            </label>
            <input id="sim-area-slider" type="range" min="0" max="90" step="5" value="30">
            <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--muted); margin-top:4px;">
              <span>0 ha (Truyền thống)</span>
              <span>30 ha (Mục tiêu 2026-2027)</span>
              <span>90 ha (100% Thu hoạch)</span>
            </div>
          </div>

          <div class="stats" style="grid-template-columns:1fr 1fr; gap:14px; margin: 18px 0;">
            <div class="stat" style="padding:16px;">
              <b id="sim-prod" style="font-size:26px;">${fmt(sim.vietgapProdTons)} t</b>
              <span>Sản lượng dứa VietGAP</span>
            </div>
            <div class="stat" style="padding:16px;">
              <b id="sim-add-val" style="font-size:26px; color:#166534;">+${fmt(sim.addedValueMil)} tr</b>
              <span>Giá trị gia tăng cho nông dân</span>
            </div>
            <div class="stat" style="padding:16px;">
              <b id="sim-total-rev" style="font-size:26px;">${fmt(sim.totalRevMil)} tr</b>
              <span>Tổng doanh thu toàn vùng</span>
            </div>
            <div class="stat" style="padding:16px;">
              <b id="sim-chem" style="font-size:26px; color:#0284c7;">-${sim.chemicalReductionPct}%</b>
              <span>Giảm thiểu hóa chất BVTV</span>
            </div>
          </div>

          <div class="notice notice-info" style="font-size:12.5px;">
            🌿 Cơ sở tính toán: Giá dứa thường 10.000 đ/kg; dứa VietGAP 13.500 đ/kg (tăng 35% nhờ liên kết tiêu thụ dứa sấy OCOP và cung cấp siêu thị). Năng suất bình quân: 18,1 tấn/ha.
          </div>
        </div>

        <!-- Traceability Stamp Hub -->
        <div class="panel">
          <div class="eyebrow">Truy xuất nguồn gốc số (Traceability)</div>
          <h3 style="margin-top:10px;">Tem điện tử nông sản Bạch Đằng</h3>
          <p style="font-size:13.5px; color:var(--muted); line-height:1.7;">
            Sinh tem nhãn số hóa gắn mã QR và định danh vùng trồng (MSVT) nhằm bảo vệ thương hiệu nông sản địa phương, chống gian lận xuất xứ:
          </p>

          <div class="form-grid" style="margin: 16px 0;">
            <label>Chọn nông sản phát hành tem:
              <select id="stamp-crop-select">
                <option value="dua">Dứa tươi Queen Bạch Đằng (MSVT: VN-CB-BD-DUA-01)</option>
                <option value="che">Chè Tài Hồ Sìn (MSVT: VN-CB-BD-CHE-01)</option>
                <option value="duasay">Dứa sấy dẻo OCOP Bạch Đằng (Mã hồ sơ: OCOP-CB-02)</option>
                <option value="mat">Mật ong hoa rừng tự nhiên (Lô: MO-BD-2026)</option>
              </select>
            </label>
          </div>

          <div id="stamp-preview-box">
            <!-- Rendered by renderTraceabilityStamp() -->
          </div>

          <div class="actions" style="margin-top:16px;">
            <button id="btn-download-stamp" class="primary small">Tải tem SVG độ nét cao ↓</button>
            <button id="btn-print-stamp" class="small secondary">In nhãn tem</button>
          </div>
        </div>
      </div>

    </section>
  `;
}

function bindAnalytics() {
  const slider = $('#sim-area-slider');
  if (slider) {
    slider.oninput = () => {
      const val = +slider.value;
      const res = calculateSimulator(val);
      $('#sim-area-val').textContent = fmt(val) + ' ha';
      $('#sim-prod').textContent = fmt(res.vietgapProdTons) + ' t';
      $('#sim-add-val').textContent = '+' + fmt(res.addedValueMil) + ' tr';
      $('#sim-total-rev').textContent = fmt(res.totalRevMil) + ' tr';
      $('#sim-chem').textContent = '-' + res.chemicalReductionPct + '%';
    };
  }

  const cropSelect = $('#stamp-crop-select');
  if (cropSelect) {
    cropSelect.onchange = () => renderTraceabilityStamp(cropSelect.value);
    renderTraceabilityStamp(cropSelect.value);
  }

  const dlBtn = $('#btn-download-stamp');
  if (dlBtn) {
    dlBtn.onclick = () => {
      const svg = $('#stamp-qr-slot svg');
      if (svg) {
        download('tem-truy-xuat-' + ($('#stamp-crop-select')?.value || 'nong-san') + '.svg', $('#stamp-preview-box').innerHTML, 'image/svg+xml');
      } else {
        toast('Đang tạo tem, vui lòng thử lại.');
      }
    };
  }

  const prBtn = $('#btn-print-stamp');
  if (prBtn) {
    prBtn.onclick = () => window.print();
  }
}

function renderTraceabilityStamp(cropId) {
  const meta = {
    dua: {
      name: 'DỨA TƯƠI QUEEN BẠCH ĐẰNG',
      msvt: 'VN-CB-BD-DUA-01',
      zone: 'Khuổi Kép - Nà Roác 1, xã Bạch Đằng',
      standard: 'Quy chuẩn định hướng VietGAP',
      harvest: 'Tháng 06/2026',
      gps: '22.6000° B, 106.1910° Đ'
    },
    che: {
      name: 'CHÈ XANH BÚP TÀI HỒ SÌN',
      msvt: 'VN-CB-BD-CHE-01',
      zone: 'Xóm Tài Hồ Sìn, xã Bạch Đằng',
      standard: 'Định hướng OCOP 3 sao',
      harvest: 'Tháng 05/2026',
      gps: '22.6120° B, 106.1840° Đ'
    },
    duasay: {
      name: 'DỨA SẤY DẺO OCOP BẠCH ĐẰNG',
      msvt: 'CB-OCOP-DUASAY-02',
      zone: 'Hợp tác xã Nông nghiệp Bạch Đằng',
      standard: 'Hồ sơ OCOP sản phẩm chế biến',
      harvest: 'Lô sản xuất: 08/2026',
      gps: '22.6040° B, 106.1980° Đ'
    },
    mat: {
      name: 'MẬT ONG HOA RỪNG TỰ NHIÊN',
      msvt: 'VN-CB-BD-MAT-01',
      zone: 'Vùng đệm sinh thái xã Bạch Đằng',
      standard: 'Sản vật truyền thống',
      harvest: 'Vụ hoa rừng 2026',
      gps: '22.6010° B, 106.1790° Đ'
    }
  }[cropId] || {};

  const verifyUrl = `${location.origin}${location.pathname}#map?type=${cropId === 'duasay' ? 'dua' : cropId}`;

  $('#stamp-preview-box').innerHTML = `
    <div class="traceability-stamp">
      <div class="stamp-header">
        <div>
          <strong style="color:var(--green-dark); font-size:14px; letter-spacing:0.5px;">TEM TRUY XUẤT NGUỒN GỐC SỐ</strong>
          <small style="display:block; color:var(--muted); font-size:10.5px;">BẢN ĐỒ SỐ NÔNG NGHIỆP BẠCH ĐẰNG, CAO BẰNG</small>
        </div>
        <span class="stamp-code">${meta.msvt}</span>
      </div>
      <div class="stamp-body">
        <div id="stamp-qr-slot" style="background:white; padding:8px; border-radius:6px; border:1px solid var(--line); display:flex; justify-content:center;">
          <!-- QR SVG appended -->
        </div>
        <div style="font-size:12px; line-height:1.7;">
          <b style="font-size:13.5px; color:var(--green);">${meta.name}</b><br>
          <span>📍 <strong>Vùng trồng:</strong> ${meta.zone}</span><br>
          <span>🛡 <strong>Tiêu chuẩn:</strong> ${meta.standard}</span><br>
          <span>📅 <strong>Thời vụ / Lô:</strong> ${meta.harvest}</span><br>
          <span>🌐 <strong>Tọa độ WGS84:</strong> ${meta.gps}</span>
        </div>
      </div>
    </div>
  `;

  if (window.qrcode) {
    const qr = qrcode(0, 'M');
    qr.addData(verifyUrl);
    qr.make();
    $('#stamp-qr-slot').innerHTML = qr.createSvgTag({ cellSize: 3, margin: 2, scalable: true });
    if ($('#stamp-qr-slot svg')) {
      $('#stamp-qr-slot svg').style.width = '110px';
      $('#stamp-qr-slot svg').style.height = '110px';
    }
  }
}

// Judge Demo 90s Tour Modal
function openJudgeTour() {
  const steps = [
    {
      num: 1,
      title: 'Vấn đề thực tiễn & Mục tiêu khoa học',
      desc: 'Giải quyết bài toán phân tán dữ liệu nông nghiệp vùng đồi núi Cao Bằng; kết nối chuỗi giá trị dứa, chè và di sản lịch sử Nà Roác vào hệ sinh thái số WebGIS tập trung.'
    },
    {
      num: 2,
      title: 'Công nghệ WebGIS & Phân tích không gian đa tầng',
      desc: 'Tích hợp lớp ảnh vệ tinh Esri Satellite, bản đồ địa hình đồi núi, phân vùng quy hoạch VietGAP 30ha và công cụ đo đạc trắc địa Geodesic WGS-84 ngay trên trình duyệt.'
    },
    {
      num: 3,
      title: 'Thuật toán AHP tối ưu hóa hành trình trải nghiệm',
      desc: 'Sử dụng mô hình phân tích thứ bậc đa tiêu chí (Analytic Hierarchy Process) với 3 trọng số tùy biến (Sở thích, Mùa vụ, Thời gian), minh bạch hóa giải trình điểm số (Explainable AI).'
    },
    {
      num: 4,
      title: 'Tem truy xuất nguồn gốc số (Smart Digital Passport)',
      desc: 'Mỗi nông sản được gắn mã số vùng trồng (MSVT) và mã QR động dẫn sâu về lý lịch vùng trồng, ngày khảo sát thực địa và tọa độ GPS đã xác minh.'
    },
    {
      num: 5,
      title: 'Mô hình hóa kinh tế & Liêm chính khoa học',
      desc: 'Minh bạch hóa việc phát hiện chênh lệch sản lượng 90,5 tấn dứa; cung cấp công cụ mô phỏng dự phóng kinh tế khi áp dụng chuẩn VietGAP cho nông dân địa phương.'
    }
  ];

  $('#detail-body').innerHTML = `
    <div style="text-align:center; margin-bottom:20px;">
      <div class="eyebrow eyebrow-gold">Cuộc thi Nghiên cứu KHKT Học sinh Trung học</div>
      <h2 style="margin:8px 0;">⚡ Trình diễn Nhanh Sản phẩm (Judge Showcase)</h2>
      <p class="muted" style="max-width:560px; margin:auto; font-size:13.5px;">
        Tổng hợp 5 điểm đổi mới sáng tạo và hàm lượng khoa học cốt lõi của đề tài "Chạm Bạch Đằng"
      </p>
    </div>

    <div>
      ${steps.map(s => `
        <div class="demo-tour-step">
          <div style="display:flex; align-items:center; margin-bottom:6px;">
            <span class="demo-step-num">${s.num}</span>
            <strong style="font-size:15px; color:var(--green-dark);">${s.title}</strong>
          </div>
          <p style="font-size:13px; color:var(--ink-light); margin:0 0 0 36px; line-height:1.6;">${s.desc}</p>
        </div>
      `).join('')}
    </div>

    <div class="actions" style="margin-top:24px; justify-content:center;">
      <a href="#map" class="button primary" onclick="$('#detail').close()">Khám phá Bản đồ WebGIS ↗</a>
      <a href="#analytics" class="button btn-gold" onclick="$('#detail').close()">Xem Mô phỏng Kinh tế ↗</a>
      <button onclick="$('#detail').close()">Đóng cửa sổ</button>
    </div>
  `;
  $('#detail').showModal();
}
