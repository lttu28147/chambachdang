'use strict';

function bindCleanStats() {
  const pBtn = $('#customer-print');
  if (pBtn) pBtn.onclick = () => window.print();

  const expBtn = $('#customer-export');
  if (expBtn) {
    expBtn.onclick = () => {
      const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
      const rows = [
        [isEn ? 'Crop' : 'Cây trồng', isEn ? 'Location' : 'Địa bàn', isEn ? 'Area (ha)' : 'Diện tích (ha)', isEn ? 'Harvest Area (ha)' : 'Diện tích thu hoạch (ha)', isEn ? 'Production (tons)' : 'Sản lượng (tấn)', isEn ? 'Yield (quintal/ha)' : 'Năng suất (tạ/ha)', isEn ? 'Harvest Season' : 'Mùa thu hoạch'],
        ...customerDataset.crops.map(c => [
          c.name,
          c.location,
          c.area,
          c.harvestArea ?? '',
          c.production,
          c.yieldTa,
          c.season
        ])
      ];
      download('nong-nghiep-bach-dang.csv', '\uFEFF' + rows.map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\r\n'), 'text/csv;charset=utf-8');
    };
  }
}

function seasonCalendar() {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  return `
    <div class="panel" style="margin-top: 36px; border-top: 4px solid var(--primary);">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:20px; flex-wrap:wrap; gap:14px;">
        <div>
          <div class="eyebrow gold">${isEn ? 'Seasonal Nature' : 'Mùa nào quả nấy'}</div>
          <h2 style="margin:6px 0;">${isEn ? 'Green Tea & Sweet Pineapple Seasons' : 'Mùa chè xanh, mùa dứa chín'}</h2>
        </div>
        <a class="button small secondary" href="#experiences">${isEn ? 'View farm experience schedule →' : 'Xem lịch trải nghiệm vườn →'}</a>
      </div>

      <div style="overflow-x:auto;">
        <table class="season-table">
          <thead>
            <tr>
              <th scope="col" style="text-align:left; min-width:160px;">${isEn ? 'Homeland Produce' : 'Nông sản quê hương'}</th>
              ${Array.from({ length: 12 }, (_, i) => `<th scope="col">${isEn ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i] : `T${i + 1}`}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${customerDataset.crops.map(c => `
              <tr>
                <th scope="row" style="text-align:left; font-weight:700;">
                  ${c.id === 'che' ? (isEn ? '🌱 Tai Ho Sin Green Tea' : '🌱 Chè Tài Hồ Sìn') : (isEn ? '🍍 Bach Dang Pineapple' : '🍍 Dứa Bạch Đằng')}
                </th>
                ${Array.from({ length: 12 }, (_, i) => {
                  const m = i + 1;
                  const isMain = c.months.includes(m);
                  return `
                    <td class="${isMain ? 'in-season' : ''}">
                      ${isMain ? '●' : '-'}
                    </td>
                  `;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <p style="font-size:13px; color:var(--muted); margin:14px 0 0;">
        💡 <strong>${isEn ? 'Visiting suggestion:' : 'Gợi ý đi thăm:'}</strong> ${isEn ? 'Peak pineapple ripening runs from May to July; green tea harvest starts from March to October annually.' : 'Mùa dứa chín rộ nhất vào tháng 5 đến tháng 7; mùa hái chè xanh bắt đầu từ tháng 3 đến tháng 10 hàng năm.'}
      </p>
    </div>
  `;
}

function cleanHome() {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  return `
    <!-- Hero Section -->
    <section class="hero">
      <div>
        <div class="eyebrow">${isEn ? 'Bach Dang · Cao Bang' : 'Bạch Đằng · Cao Bằng'}</div>
        <h1>${isEn ? 'To the realm of green tea,<br><em>sweet pineapple season.</em>' : 'Về miền chè xanh,<br><em>mùa dứa ngọt.</em>'}</h1>
        <p>
          ${isEn 
            ? 'Discover golden ripe pineapple hills, misty Tai Ho Sin tea bushes and prepare for a peaceful experiential day alongside local farmers.' 
            : 'Khám phá những triền đồi dứa vàng ruộm, nương chè Tài Hồ Sìn mờ sương và chuẩn bị một ngày trải nghiệm bình yên bên bà con nông dân quê hương.'}
        </p>

        <div style="display:flex; gap:12px; flex-wrap:wrap; margin: 26px 0;">
          <a href="#map" class="button primary">${isEn ? 'Explore Digital Map →' : 'Khám phá Bản đồ số →'}</a>
          <button type="button" class="button hero-ai-btn" data-open-ai="chat">${isEn ? '🤖 AI Voice Q&A · Draw Route' : '🤖 Hỏi AI Giọng nói · Vẽ lộ trình'}</button>
          <a href="#experiences" class="button secondary">${isEn ? 'Farming Experiences' : 'Trải nghiệm làm nông'}</a>
        </div>

        <!-- Thẻ số liệu tươi vui -->
        <div class="hero-badge-strip">
          <div class="hero-badge-item">
            <b>127,6 <small style="font-size:15px;">ha</small></b>
            <span>${isEn ? 'Green pineapple hills' : 'Triền đồi dứa xanh'}</span>
          </div>
          <div class="hero-badge-item">
            <b>5,0 <small style="font-size:15px;">ha</small></b>
            <span>${isEn ? 'Tai Ho Sin tea hills' : 'Đồi chè Tài Hồ Sìn'}</span>
          </div>
          <div class="hero-badge-item">
            <b>1.538+ <small style="font-size:15px;">${isEn ? 'tons' : 'tấn'}</small></b>
            <span>${isEn ? 'Annual fruit output' : 'Sản lượng quả ngọt'}</span>
          </div>
          <div class="hero-badge-item">
            <b>&gt;100</b>
            <span>${isEn ? 'Gardening households' : 'Hộ gia đình làm vườn'}</span>
          </div>
        </div>
      </div>

      <div class="hero-art">
        <img src="assets/doi-dua-bach-dang.png" alt="${isEn ? 'Bach Dang Pineapple Hills' : 'Đồi dứa xã Bạch Đằng'}">
        <div class="art-label">
          ${isEn ? 'Bach Dang, Cao Bang' : 'Bạch Đằng, Cao Bằng'}
          <small>${isEn ? 'Khuoi Kep & Ban Sang pineapple hills' : 'Triền đồi dứa Khuổi Kép & Bản Sẳng'}</small>
        </div>
      </div>
    </section>

    <!-- Khám phá các điểm nổi bật -->
    <section class="wrap" style="padding-top:10px;">
      <div style="margin-bottom: 24px;">
        <div class="eyebrow gold">${isEn ? 'Choose a starting point' : 'Chọn một điểm bắt đầu'}</div>
        <h2>${isEn ? 'Discover Bach Dang' : 'Khám phá Bạch Đằng'}</h2>
      </div>

      <div class="cards">
        <a class="card" href="#map?type=dua">
          <div class="card-visual gold">
            <span class="big-symbol">🍍</span>
          </div>
          <div class="card-body">
            <span class="tag gold">${isEn ? 'Pineapple Harvest Season' : 'Mùa dứa chín'}</span>
            <h3>${isEn ? 'Golden Pineapple Hills' : 'Những triền đồi dứa vàng'}</h3>
            <p>${isEn ? 'Hundreds of hectares of pineapples winding around hillsides, sweetly scented during summer harvest.' : 'Hàng trăm hecta dứa uốn lượn quanh sườn đồi, thơm ngát mùi dứa chín khi vào vụ thu hoạch mùa hè.'}</p>
            <span style="color:#b45309; font-weight:700; font-size:13.5px;">${isEn ? 'View pineapple zone on map →' : 'Xem vùng dứa trên bản đồ →'}</span>
          </div>
        </a>

        <a class="card" href="#map?type=che">
          <div class="card-visual tea">
            <span class="big-symbol">🌱</span>
          </div>
          <div class="card-body">
            <span class="tag">${isEn ? 'Green Tea Realm' : 'Miền chè xanh'}</span>
            <h3>${isEn ? 'Tai Ho Sin Tea Plantation' : 'Đồi chè Tài Hồ Sìn'}</h3>
            <p>${isEn ? 'Tender tea leaves bathed in morning mountain mist, bearing the authentic rustic flavor of homeland.' : 'Những búp chè mơn mởn ngậm sương mai trên sườn núi, mang đậm phong vị mộc mạc của quê hương.'}</p>
            <span style="color:var(--primary); font-weight:700; font-size:13.5px;">${isEn ? 'View tea hills on map →' : 'Xem đồi chè trên bản đồ →'}</span>
          </div>
        </a>

        <a class="card" href="#explore">
          <div class="card-visual heritage">
            <span class="big-symbol">⛩️</span>
          </div>
          <div class="card-body">
            <span class="tag heritage">${isEn ? 'Historical Heritage' : 'Di tích lịch sử'}</span>
            <h3>${isEn ? 'Na Roac Heritage Site' : 'Khu di tích Nà Roác'}</h3>
            <p>${isEn ? 'Where President Ho Chi Minh visited and advised the Army Vehicle & Machinery Corps on March 28, 1951.' : 'Nơi Bác Hồ về thăm và dặn dò cán bộ, chiến sĩ ngành Xe - Máy Quân đội ngày 28/3/1951 đầy tự hào.'}</p>
            <span style="color:#be123c; font-weight:700; font-size:13.5px;">${isEn ? 'Read historical stories →' : 'Đọc câu chuyện lịch sử →'}</span>
          </div>
        </a>
      </div>

      ${seasonCalendar()}

      <div style="display:flex; justify-content:space-between; align-items:center; background:white; padding:30px; border-radius:var(--radius-lg); border:1px solid var(--border); margin-top:36px; flex-wrap:wrap; gap:20px;">
        <div>
          <h3 style="margin:0 0 6px;">${isEn ? 'Want to learn more about the growing zones?' : 'Bạn muốn tìm hiểu thêm về các vùng trồng?'}</h3>
          <p style="margin:0; font-size:14px; color:var(--muted);">${isEn ? 'Acreage, farming households and harvest calendars gathered in one place.' : 'Thông tin diện tích, chủ vườn và mùa thu hoạch được cập nhật tại một nơi.'}</p>
        </div>
        <a href="#stats" class="button">${isEn ? 'View crop statistics →' : 'Xem bảng số liệu vùng trồng →'}</a>
      </div>
    </section>
  `;
}

function cleanStats() {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  const crops = customerDataset.crops;
  return `
    ${head(isEn ? 'Planting Zone Statistics' : 'Thống kê vùng trồng', isEn ? 'Bach Dang Agriculture' : 'Nông nghiệp xã Bạch Đằng', isEn ? 'Consolidated statistics on area, season, and yield of pineapples and tea.' : 'Thông tin tổng hợp diện tích, mùa vụ và sản lượng cây dứa, cây chè quê hương.')}
    <section class="wrap" style="padding-top:0">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:18px; margin-bottom:28px;">
        <div class="panel" style="margin:0; padding:22px;">
          <b style="font-size:32px; font-family:LocalSerif,Georgia,serif; color:var(--primary-dark);">5 <small style="font-size:16px;">ha</small></b>
          <span style="display:block; font-size:12px; color:var(--muted); margin-top:4px;">${isEn ? 'Tea at Tai Ho Sin' : 'Chè tại Tài Hồ Sìn'}</span>
        </div>
        <div class="panel" style="margin:0; padding:22px;">
          <b style="font-size:32px; font-family:LocalSerif,Georgia,serif; color:#b45309;">127,6 <small style="font-size:16px;">ha</small></b>
          <span style="display:block; font-size:12px; color:var(--muted); margin-top:4px;">${isEn ? 'Total pineapple area' : 'Tổng diện tích đồi dứa'}</span>
        </div>
        <div class="panel" style="margin:0; padding:22px;">
          <b style="font-size:32px; font-family:LocalSerif,Georgia,serif; color:#047857;">90 <small style="font-size:16px;">ha</small></b>
          <span style="display:block; font-size:12px; color:var(--muted); margin-top:4px;">${isEn ? 'Harvest-ready pineapples' : 'Dứa đang cho thu hoạch'}</span>
        </div>
        <div class="panel" style="margin:0; padding:22px;">
          <b style="font-size:32px; font-family:LocalSerif,Georgia,serif; color:var(--primary-dark);">&gt;100</b>
          <span style="display:block; font-size:12px; color:var(--muted); margin-top:4px;">${isEn ? 'Gardening households' : 'Hộ nông dân làm vườn'}</span>
        </div>
      </div>

      <div class="two">
        ${crops.map(c => `
          <article class="panel">
            <div class="eyebrow ${c.id === 'dua' ? 'gold' : ''}">${c.location}</div>
            <h2 style="margin-top:10px">${c.name}</h2>
            <p class="muted">${c.season}</p>
            <div class="detail-grid">
              <div>
                <small>${isEn ? 'Harvest Output' : 'Sản lượng thu hoạch'}</small>
                <b style="font-size:18px; color:var(--primary-dark);">${fmt(c.production)} ${isEn ? 'tons' : 'tấn'}</b>
              </div>
              <div>
                <small>${isEn ? 'Recorded Yield' : 'Năng suất ghi nhận'}</small>
                <b style="font-size:18px;">${fmt(c.yieldTa)} ${isEn ? 'quintal/ha' : 'tạ/ha'}</b>
              </div>
            </div>
            <a href="#experiences" class="link" style="margin-top:12px; display:inline-block; font-weight:700;">${isEn ? 'Learn about farm experiences →' : 'Tìm hiểu trải nghiệm làm nông →'}</a>
          </article>
        `).join('')}
      </div>

      ${seasonCalendar()}

      <div class="toolbar" style="margin-top:20px;">
        <button id="customer-export" class="primary">${isEn ? 'Download CSV Dataset ↓' : 'Tải bảng dữ liệu CSV ↓'}</button>
        <button id="customer-print" class="secondary">${isEn ? 'Print Data Table' : 'In bảng số liệu'}</button>
      </div>
    </section>
  `;
}

function cleanProducts(q = '') {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  const items = isEn ? [
    ['dua', 'Fresh Bach Dang Pineapple', 'Grown on natural rolling slopes, golden, intensely sweet and refreshing during the peak summer harvest.', 'Seasonal Specialty'],
    ['che', 'Tai Ho Sin Tea Shoots', 'Hand-picked morning dew-kissed tea buds from Tai Ho Sin hills, subtle rustic fragrance and deep lingering sweet aftertaste.', 'Traditional Tea'],
    ['dua', 'Soft-Dried Pineapple', 'Processed from naturally ripe sweet pineapples, wholesome and convenient gift to take everywhere.', 'Processed produce'],
    ['mat', 'Natural Wild Forest Honey', 'Pure amber forest honey harvested from wild blossoms in the mountainous forests of Bach Dang.', 'Natural Homeland Gift']
  ] : [
    ['dua', 'Dứa tươi Bạch Đằng', 'Dứa trồng trên đất đồi dốc tự nhiên, quả vàng ngọt đậm đà, thơm lừng khi vào chính vụ hè.', 'Đặc sản mùa vụ'],
    ['che', 'Chè búp Tài Hồ Sìn', 'Búp chè ngậm sương mai từ vùng đồi Tài Hồ Sìn, hương cốm non mộc mạc và vị ngọt hậu sâu lắng.', 'Chè truyền thống'],
    ['dua', 'Dứa sấy dẻo', 'Sản phẩm chế biến từ dứa chín ngọt tự nhiên, thơm ngon tiện lợi để mang quà quê hương đi muôn nơi.', 'Sản phẩm chế biến'],
    ['mat', 'Mật ong hoa rừng tự nhiên', 'Giọt mật vàng óng thơm ngon từ đàn ong hút mật hoa rừng tự nhiên xã Bạch Đằng.', 'Sản vật quê hương']
  ];

  return items
    .filter(p => p.join(' ').toLocaleLowerCase(isEn ? 'en' : 'vi').includes(q.toLocaleLowerCase(isEn ? 'en' : 'vi')))
    .map(([type, name, text, tag]) => `
      <article class="card">
        <div class="product-photo"><img src="assets/${type === 'dua' ? (name.includes('sấy') || name.includes('Dried') ? 'dua-say-san-vat.png' : 'dua-tuoi-san-vat.png') : type === 'che' ? 'doi-che-nhat-hanh.jpg' : 'mat-ong-bach-dang.jpg'}" alt="${name}" loading="lazy"></div>
        <div class="card-body">
          <span class="tag ${type === 'dua' ? 'gold' : ''}">${tag}</span>
          <h3 style="margin: 8px 0;">${name}</h3>
          ${!name.includes('sấy') && !name.includes('Dried') ? `<a class="producer-contact" href="tel:${({dua:'0985204171',che:'0982439155',mat:'0398709746'})[type]}">${isEn ? 'Contact producer' : 'Liên hệ nhà vườn'}<strong>${({dua:'0985 204 171',che:'0982 439 155',mat:'0398 709 746'})[type]}</strong></a>` : ''}
          <p style="font-size:13.5px; line-height:1.6;">${text}</p>
          <a href="#map?type=${type}" class="link" style="margin-top:auto; font-weight:700;">${isEn ? 'View zone on map →' : 'Xem vùng trồng trên bản đồ →'}</a>
        </div>
      </article>
    `).join('') || `<p class="empty" style="text-align:center; padding:30px;">${isEn ? 'No matching produce found.' : 'Không tìm thấy sản vật phù hợp.'}</p>`;
}

function cleanSources() {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  return `
    ${head(isEn ? 'References & Documentation' : 'Thông tin tham khảo', isEn ? 'About Our Homeland Bach Dang' : 'Về Bạch Đằng quê em', isEn ? 'Historical archives and official local agricultural resources.' : 'Tư liệu lịch sử và nguồn thông tin nông nghiệp địa phương.')}
    <section class="wrap article" style="padding-top:0">
      <h2>${isEn ? 'Heritage and Agriculture of Bach Dang' : 'Di sản và nông nghiệp Bạch Đằng'}</h2>
      <p>
        ${isEn 
          ? 'The Digital Map bridges historical accounts of President Ho Chi Minh visiting the Military Vehicle & Machinery Corps at Na Roac 1 with lush green pineapple hills at Khuoi Kep, Ban Sang, and scenic Tai Ho Sin tea hills.'
          : 'Bản đồ số kết nối câu chuyện lịch sử Di tích Bác Hồ với ngành Xe - Máy Quân đội tại xóm Nà Roác 1 với những triền đồi dứa xanh mát tại Khuổi Kép, Bản Sẳng và đồi chè thơm Tài Hồ Sìn.'}
      </p>
      <p>
        ${isEn ? 'Primary References:' : 'Tư liệu tham khảo chính:'}
        <br>• <a href="https://baocaobang.vn/Noi-ghi-dan-an-Bac-Ho-voi-nganh-xe-may-quan-doi-3531.html" target="_blank" rel="noopener" style="text-decoration:underline; color:#059669;">Báo Cao Bằng: Nơi ghi dấu ấn Bác Hồ với ngành Xe - Máy Quân đội ↗</a>
        <br>• <a href="https://baocaobang.vn/bach-dang-mua-dua-chin-va-khat-vong-vuon-xa-3188528.html" target="_blank" rel="noopener" style="text-decoration:underline; color:#059669;">Báo Cao Bằng: Bạch Đằng mùa dứa chín và khát vọng vươn xa ↗</a>
      </p>
    </section>
  `;
}
