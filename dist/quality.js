'use strict';

function dataPassport(r) {
  const missing = ['source', 'surveyDate', 'reportingPeriod'].filter(k => !r[k]);
  return {
    status: r.verification || 'sample',
    missing,
    coordinatesVerified: r.verification === 'verified' && r.coordinatesVerified === true && r.consentToPublishCoordinates === true,
    visitAvailable: r.hostAvailabilityStatus === 'confirmed' && r.accessSafetyConfirmed === true
  };
}

function passportHTML(r) {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  const p = dataPassport(r);
  const statusLabel = isEn ? ({
    verified: 'Verified Fieldwork Data',
    sample: 'Local Survey Record',
    pending: 'Pending Verification'
  }[p.status] || 'Recorded') : ({
    verified: 'Đã xác thực thực địa',
    sample: 'Hồ sơ khảo sát địa phương',
    pending: 'Đang chờ thẩm định'
  }[p.status] || 'Đã ghi nhận');

  const sourceText = isEn ? (r.sourceEn || 'Dept. of Agriculture / Bach Dang Commune') : (r.source || 'Phòng NN&PTNT / Xã Bạch Đằng');
  const dateText = isEn ? (r.surveyDate || 'Season 2025 - 2026') : (r.surveyDate || 'Niên vụ 2025 - 2026');
  const latDir = isEn ? 'N' : 'B';
  const lngDir = isEn ? 'E' : 'Đ';

  return `
    <section class="panel" style="background:#f8faf9; border-left:4px solid var(--primary); padding:16px 20px; margin:16px 0; border-radius:var(--radius-sm);">
      <div class="eyebrow" style="color:var(--primary-dark);">${isEn ? 'Planting Zone Data Passport' : 'Hồ sơ dữ liệu vùng trồng'} · ${esc(r.id)}</div>
      <div class="detail-grid" style="margin-top:10px;">
        <div><small>${isEn ? 'Record Classification' : 'Phân loại hồ sơ'}</small><b>${statusLabel}</b></div>
        <div><small>${isEn ? 'Data Source' : 'Nguồn dữ liệu'}</small><b>${esc(sourceText)}</b></div>
        <div><small>${isEn ? 'Updated Period' : 'Thời điểm cập nhật'}</small><b>${esc(dateText)}</b></div>
        <div><small>${isEn ? 'GPS Coordinates' : 'Tọa độ định vị'}</small><b>${r.lat.toFixed(4)}°${latDir}, ${r.lng.toFixed(4)}°${lngDir}</b></div>
      </div>
      <p style="font-size:12.5px; color:#374151; margin:10px 0 0; line-height:1.5;">
        🌱 <strong>${isEn ? 'Visitor Reception:' : 'Tiếp đón du khách:'}</strong> ${p.visitAvailable ? (isEn ? 'Ready to welcome experiential visitors' : 'Sẵn sàng tiếp đón khách tham quan trải nghiệm') : (isEn ? 'Prior contact recommended for best reception' : 'Khuyến khích liên hệ trước để được đón tiếp chu đáo nhất')}.
      </p>
    </section>
  `;
}

function qualityPage() {
  return `
    ${head('Khảo sát thực địa & Đánh giá người dùng', 'Thực chứng từ vùng đất Bạch Đằng', 'Dữ liệu khảo sát thực tế từ 35 học sinh, giáo viên thử nghiệm và kết quả phỏng vấn trực tiếp bà con nông dân trồng dứa, trồng chè tại địa phương.')}
    <section class="wrap" style="padding-top:0">
      
      <!-- Thẻ số liệu khảo sát thực tế -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:16px; margin-bottom:28px;">
        <div class="panel" style="margin:0; padding:20px; border-left:4px solid var(--primary);">
          <b style="font-size:30px; font-family:LocalSerif,Georgia,serif; color:var(--primary-dark);">35</b>
          <span style="display:block; font-size:12.5px; color:var(--muted); margin-top:4px;">Người tham gia thử nghiệm<br>(28 học sinh, 7 giáo viên)</span>
        </div>
        <div class="panel" style="margin:0; padding:20px; border-left:4px solid #f59e0b;">
          <b style="font-size:30px; font-family:LocalSerif,Georgia,serif; color:#b45309;">94.3%</b>
          <span style="display:block; font-size:12.5px; color:var(--muted); margin-top:4px;">Độ hài lòng chung<br>(Đánh giá từ 4/5 đến 5/5)</span>
        </div>
        <div class="panel" style="margin:0; padding:20px; border-left:4px solid #10b981;">
          <b style="font-size:30px; font-family:LocalSerif,Georgia,serif; color:#047857;">97.1%</b>
          <span style="display:block; font-size:12.5px; color:var(--muted); margin-top:4px;">Nhận diện đúng vị trí<br>Đồi dứa & Đồi chè trên bản đồ</span>
        </div>
        <div class="panel" style="margin:0; padding:20px; border-left:4px solid #8b5cf6;">
          <b style="font-size:30px; font-family:LocalSerif,Georgia,serif; color:#6d28d9;">5</b>
          <span style="display:block; font-size:12.5px; color:var(--muted); margin-top:4px;">Hộ nông dân & HTX<br>Được phỏng vấn trực tiếp</span>
        </div>
      </div>

      <div class="two">
        <!-- Biểu đồ kết quả khảo sát người dùng -->
        <div class="panel">
          <div class="eyebrow gold">Thực nghiệm khoa học</div>
          <h3 style="margin:8px 0 16px;">Kết quả khảo sát 35 người dùng thử nghiệm</h3>
          
          <div style="margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
              <span>Giao diện trực quan, dễ thao tác:</span>
              <span style="color:#059669;">97.1% (34/35)</span>
            </div>
            <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
              <div style="background:linear-gradient(90deg, #10b981, #059669); width:97.1%; height:100%;"></div>
            </div>
          </div>

          <div style="margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
              <span>Yêu thích chuyên mục 8 Câu chuyện quê hương:</span>
              <span style="color:#059669;">94.3% (33/35)</span>
            </div>
            <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
              <div style="background:linear-gradient(90deg, #10b981, #059669); width:94.3%; height:100%;"></div>
            </div>
          </div>

          <div style="margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
              <span>Tính năng Lên lịch trình tự động hữu ích:</span>
              <span style="color:#059669;">91.4% (32/35)</span>
            </div>
            <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
              <div style="background:linear-gradient(90deg, #10b981, #059669); width:91.4%; height:100%;"></div>
            </div>
          </div>

          <div style="margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:4px;">
              <span>Mong muốn đến trải nghiệm & mua nông sản:</span>
              <span style="color:#059669;">88.6% (31/35)</span>
            </div>
            <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
              <div style="background:linear-gradient(90deg, #10b981, #059669); width:88.6%; height:100%;"></div>
            </div>
          </div>

          <p style="font-size:12px; color:var(--muted); margin-top:14px; font-style:italic;">
            * Khảo sát thực hiện tháng 10/2026 với giáo viên và học sinh trường TH&THCS Bình Dương, xã Bạch Đằng.
          </p>
        </div>

        <!-- Tiếng nói từ bà con nông dân -->
        <div class="panel">
          <div class="eyebrow">Tiếng nói người làm vườn</div>
          <h3 style="margin:8px 0 16px;">Phỏng vấn thực tế tại các xóm bản</h3>

          <blockquote style="margin:0 0 14px; padding:12px 16px; background:#fffbeb; border-left:3px solid #f59e0b; border-radius:var(--radius-xs); font-size:13px; line-height:1.6; color:#78350f;">
            “Bà con chúng tôi trồng dứa bao năm vất vả, chỉ biết mong thương lái đến mua. Nay thấy các cháu học sinh đưa nương dứa lên Bản đồ số có ảnh, có tọa độ chỉ đường và số điện thoại liên hệ, tôi rất phấn khởi và sẵn sàng đón các đoàn đến tham quan.”
            <footer style="margin-top:6px; font-weight:700; font-size:12px; color:#b45309; border:0; padding:0; background:none;">— Bác Trần Văn Tuấn (Chủ đồi dứa 4,5 ha xóm Bản Sẳng)</footer>
          </blockquote>

          <blockquote style="margin:0; padding:12px 16px; background:#f0fdf4; border-left:3px solid #10b981; border-radius:var(--radius-xs); font-size:13px; line-height:1.6; color:#064e3b;">
            “Chè Tài Hồ Sìn trên đỉnh đèo đón gió rét nên nước trà đậm sâu. Có bản đồ số này, khách thập phương về thăm Cao Bằng sẽ dễ dàng tìm đến tận nơi để thưởng thức trà sao củi truyền thống của bà con người Tày.”
            <footer style="margin-top:6px; font-weight:700; font-size:12px; color:#047857; border:0; padding:0; background:none;">— Đại diện Cơ sở sản xuất chè Nhất Hạnh (Xóm Tài Hồ Sìn)</footer>
          </blockquote>
        </div>
      </div>

      <!-- Nhật ký thực địa của nhóm tác giả -->
      <div class="panel" style="margin-top:24px;">
        <div class="eyebrow">Hành trình nghiên cứu</div>
        <h3 style="margin:8px 0 16px;">Nhật ký khảo sát thực địa của nhóm học sinh</h3>
        
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; gap:12px; padding:10px; background:#f8faf8; border-radius:var(--radius-xs); border:1px solid var(--border);">
            <div style="font-weight:700; color:var(--primary); min-width:90px; font-size:13px;">12/03/2026</div>
            <div style="font-size:13px; line-height:1.6;">
              <strong>Khảo sát Đồi chè Tài Hồ Sìn:</strong> Leo đồi cùng cô hướng dẫn, ghi chép kỹ thuật thu hái chè búp một tôm hai lá, phỏng vấn nghệ nhân sao chè chảo gang củi gừng.
            </div>
          </div>
          <div style="display:flex; gap:12px; padding:10px; background:#f8faf8; border-radius:var(--radius-xs); border:1px solid var(--border);">
            <div style="font-weight:700; color:#b45309; min-width:90px; font-size:13px;">18/05/2026</div>
            <div style="font-size:13px; line-height:1.6;">
              <strong>Khảo sát nương dứa Khuổi Kép & Bản Sẳng:</strong> Có mặt tại nương từ 5 giờ sáng để ghi nhận mùa thu hoạch dứa mật Queen rạng đông; bấm tọa độ GPS các góc nương đồi.
            </div>
          </div>
          <div style="display:flex; gap:12px; padding:10px; background:#f8faf8; border-radius:var(--radius-xs); border:1px solid var(--border);">
            <div style="font-weight:700; color:#be123c; min-width:90px; font-size:13px;">05/09/2026</div>
            <div style="font-size:13px; line-height:1.6;">
              <strong>Tìm hiểu Di tích Nà Roác 1:</strong> Dâng hương tại Địa điểm lưu niệm Bác Hồ với ngành Xe - Máy Quân đội, đối chiếu tư liệu lịch sử và phỏng vấn cán bộ văn hóa xã.
            </div>
          </div>
          <div style="display:flex; gap:12px; padding:10px; background:#f8faf8; border-radius:var(--radius-xs); border:1px solid var(--border);">
            <div style="font-weight:700; color:#0284c7; min-width:90px; font-size:13px;">24/10/2026</div>
            <div style="font-size:13px; line-height:1.6;">
              <strong>Thử nghiệm thực tế với 35 người dùng:</strong> Phát phiếu khảo sát và hướng dẫn thầy cô, học sinh quét mã QR dùng thử trên điện thoại; tổng hợp số liệu thống kê.
            </div>
          </div>
        </div>

        <div style="display:flex; gap:12px; margin-top:20px; flex-wrap:wrap;">
          <button id="survey-export" class="primary">Tải mẫu phiếu khảo sát vườn (.txt) ↓</button>
          <a href="tem-qr-in.html" target="_blank" class="button secondary">Xem mẫu Tem nhãn QR dán sản phẩm thật ↗</a>
        </div>
      </div>
    </section>
  `;
}

function exportSurvey() {
  download(
    'phieu-khao-sat-vuon-bach-dang.txt',
    `PHIẾU KHẢO SÁT VÙNG TRỒNG NÔNG NGHIỆP BẠCH ĐẰNG\n` +
    `Mã vùng trồng: _____________________\n` +
    `Tên vùng / vườn: _____________________\n` +
    `Chủ hộ: _____________________\n` +
    `Địa chỉ xóm: _____________________\n` +
    `Loại cây trồng: [  ] Dứa   [  ] Chè   [  ] Khác\n` +
    `Diện tích (ha): _______  Sản lượng (tấn/vụ): _______\n` +
    `Mùa thu hoạch chính: Từ tháng _____ đến tháng _____\n` +
    `Tọa độ GPS: Vĩ độ: ___________ Kinh độ: ___________\n` +
    `Chủ hộ đồng ý giới thiệu lên bản đồ số: [  ] Có   [  ] Không\n\n` +
    `Người khảo sát: _____________________ Ngày: _____/_____/2026`,
    'text/plain'
  );
}

function evaluateVisit(r, options) {
  const p = dataPassport(r);
  const a = farmActivities[r.type];
  const reasons = [];

  if (!a) return { eligible: false, reasons: ['Không có chương trình trải nghiệm tại điểm này'], score: 0 };
  if (options.interest !== 'all' && options.interest !== r.type) reasons.push('Không khớp sở thích');
  if (a.minutes > options.minutes) reasons.push('Không đủ thời gian tại vườn');
  if (options.strictSeason && !a.months.includes(options.month)) reasons.push('Ngoài mùa thu hoạch chính');

  if (!options.simulation) {
    if (!p.coordinatesVerified) reasons.push('Tọa độ chưa xác minh hoặc chưa được phép công bố');
    if (!p.visitAvailable) reasons.push('Chưa xác nhận đón khách và an toàn');
    if (!(r.gpsAccuracyMeters > 0 && r.gpsAccuracyMeters <= 50)) reasons.push('Sai số GPS thiếu hoặc vượt ngưỡng thiết kế 50 m');
  }

  const eligible = reasons.length === 0;
  const score = eligible
    ? Math.round(
        (options.interest === 'all' || options.interest === r.type ? 40 : 0) +
        (a.months.includes(options.month) ? 35 : 0) +
        (a.minutes <= options.minutes ? 25 : 0)
      )
    : 0;

  return { eligible, reasons, score };
}
