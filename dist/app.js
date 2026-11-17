const RECORD_EN = {
  "dua-01": {
    "name": "Ban Sang Pineapple Hill · Garden 01",
    "owner": "Mr. Tran Van Tuan's Household",
    "season": "May - July",
    "status": "Active cultivation & care",
    "address": "Ban Sang Hamlet, Bach Dang Commune, Hoa An District, Cao Bang",
    "description": "Endless rolling Queen pineapple slopes on sunny red gravelly soils. Fruit is plump, honeyed, crisp, richly sweet, and refreshingly fragrant when ripe in early summer."
  },
  "dua-02": {
    "name": "Khuoi Kep Pineapple Hill · Garden 02",
    "owner": "Mrs. Hoang Thi Men's Household",
    "season": "May - July",
    "status": "Preparing for harvest",
    "address": "Khuoi Kep Hamlet, Bach Dang Commune, Hoa An District, Cao Bang",
    "description": "Centuries-old farming slopes revitalized into lush green Queen pineapple hills certified OCOP 3-star. Rich golden honey-like core, sweet and thirst-quenching."
  },
  "dua-03": {
    "name": "Na Roac Pineapple Hill · Garden 03",
    "owner": "Mr. Nong Van Binh's Household",
    "season": "June - August",
    "status": "Vigorous green growth",
    "address": "Na Roac 2 Hamlet, Bach Dang Commune, Hoa An District, Cao Bang",
    "description": "Terraced pineapple plots curving naturally around hillside slopes, grown with organic standards and natural irrigation."
  },
  "che-01": {
    "name": "Tai Ho Sin Tea Hill · Garden 01",
    "owner": "Nhat Hanh Traditional Tea Workshop",
    "season": "March - October",
    "status": "Currently harvesting",
    "address": "Tai Ho Sin 1 Hamlet, Bach Dang Commune, Hoa An District, Cao Bang",
    "description": "Ancient midland tea hill on the pass summit embraced year-round by mountain fog. Tender buds are hand-picked 'one bud two leaves' and firewood-roasted for a roasted young-rice aroma."
  },
  "che-02": {
    "name": "Tai Ho Sin Tea Hill · Garden 02",
    "owner": "Tai Ho Sin Clean Agriculture Cooperative",
    "season": "March - October",
    "status": "Flourishing green growth",
    "address": "Tai Ho Sin 2 Hamlet, Bach Dang Commune, Hoa An District, Cao Bang",
    "description": "Ecological tea gardens irrigated with pristine mountain springs and fertilized organically, yielding pure, elegant green tea with a deep lingering sweet finish."
  },
  "mat-01": {
    "name": "Natural Forest Wildflower Beekeeping Site",
    "owner": "Bach Dang Beekeeping Cooperative",
    "season": "Forest Blossom Season (Mar - Jun)",
    "status": "Fresh raw honey available",
    "address": "Na Roac Forest Fringe, Bach Dang Commune, Hoa An District, Cao Bang",
    "description": "Wild bee colonies foraging on blossoms of tea, wild mint, and pineapples in the primary forests of Bach Dang, producing pure, golden aromatic mountain honey."
  },
  "ditich-01": {
    "name": "President Ho Chi Minh & Military Vehicle Corps National Historic Site",
    "owner": "Na Roac Historical Relic Management Board",
    "season": "Open year-round",
    "status": "National Historic Monument",
    "address": "Na Roac 1 Hamlet, Bach Dang Commune, Hoa An District, Cao Bang",
    "description": "The sacred historical site where President Ho Chi Minh visited and advised the first military motor transport soldiers on March 28, 1951, bequeathing the immortal motto: 'Love vehicles like children, treasure gasoline like blood'."
  }
};

'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[–—‑]/g, '-').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const names = { dua: 'Đồi dứa', che: 'Đồi chè', mat: 'Điểm mật ong', ditich: 'Di tích lịch sử' };
const namesEn = { dua: 'Pineapple Hill', che: 'Tea Hill', mat: 'Honey Farm', ditich: 'Historical Site' };
const colors = { dua: '#f59e0b', che: '#10b981', mat: '#d97706', ditich: '#e11d48' };
const symbols = { dua: '🍍', che: '🌱', mat: '🍯', ditich: '⛩️' };
const locationVideos = { ditich: 'https://www.facebook.com/share/v/189vg9HWfN/?mibextid=wwXIfr', che: 'https://www.facebook.com/share/167A4DymY4/?mibextid=wwXIfr', mat: 'https://www.facebook.com/share/188ZmcZdn3/?mibextid=wwXIfr' };

let currentLang = localStorage.getItem('bd_lang') || 'vi';
let currentTheme = localStorage.getItem('bd_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const I18N = {
  vi: {
    brand_sub: 'BẢN ĐỒ SỐ · CAO BẰNG',
    nav_home: 'Trang chủ',
    nav_map: 'Bản đồ số',
    nav_exp: 'Trải nghiệm',
    nav_products: 'Sản vật',
    nav_stats: 'Vùng trồng',
    nav_stories: 'Câu chuyện',
    btn_planner_long: 'Lên lịch trình ↗',
    btn_planner_short: 'Lịch trình ↗',
    theme_title: 'Chuyển giao diện Sáng / Tối',
    lang_btn: 'EN',
    lang_title: 'Chuyển sang English',
    planner_eyebrow: 'Một ngày ở miền xanh',
    planner_title: 'Lên lịch trình khám phá Bạch Đằng',
    planner_desc: 'Gợi ý lịch trình tham quan di tích lịch sử, ngắm đồi chè và đồi dứa theo thời gian bạn có.',
    planner_your_journey: 'Hành trình của riêng bạn',
    planner_how_much_time: 'Bạn có bao nhiêu thời gian?',
    planner_time_budget: 'Quỹ thời gian:',
    planner_time_2h: 'Ghé nhanh · 2 giờ',
    planner_time_4h: 'Nửa ngày · 4 giờ',
    planner_time_8h: 'Trọn vẹn 1 ngày · 8 giờ',
    planner_start_label: 'Giờ bắt đầu xuất phát:',
    planner_btn_make: 'Tạo lịch trình tham khảo ↗',
    planner_result_eyebrow: 'Lịch trình chuyến đi',
    planner_result_sub: 'phút (đã tính thời gian tham quan và di chuyển giữa các điểm).',
    planner_btn_save: 'Tải lịch trình về máy (.txt) ↓',
    planner_btn_map: 'Xem trên bản đồ →',
    planner_default_h2: 'Về nguồn buổi sáng.<br>Chạm xanh buổi chiều.',
    planner_default_p: 'Hãy chọn quỹ thời gian để hệ thống gợi ý thứ tự các điểm đến thuận đường nhất nhé.',
    toast_no_interest: 'Hãy chọn ít nhất một địa điểm bạn thích',
    footer_quality: 'Thông tin dữ liệu',
    footer_sources: 'Tư liệu tham khảo',
    footer_admin: 'Quản trị',
    footer_tagline: '· Xã Bạch Đằng, tỉnh Cao Bằng'
  },
  en: {
    brand_sub: 'DIGITAL MAP · CAO BANG',
    nav_home: 'Home',
    nav_map: 'Digital Map',
    nav_exp: 'Experiences',
    nav_products: 'Products',
    nav_stats: 'Stats',
    nav_stories: 'Stories',
    btn_planner_long: 'Plan Trip ↗',
    btn_planner_short: 'Plan ↗',
    theme_title: 'Toggle Light / Dark mode',
    lang_btn: 'VI',
    lang_title: 'Chuyển sang Tiếng Việt',
    planner_eyebrow: 'A Day in the Green Realm',
    planner_title: 'Plan Your Bach Dang Exploration',
    planner_desc: 'Suggested itinerary visiting historic sites, pineapple hills and misty tea hills based on your schedule.',
    planner_your_journey: 'Your Custom Journey',
    planner_how_much_time: 'How much time do you have?',
    planner_time_budget: 'Time budget:',
    planner_time_2h: 'Quick visit · 2 hours',
    planner_time_4h: 'Half day · 4 hours',
    planner_time_8h: 'Full day · 8 hours',
    planner_start_label: 'Departure time:',
    planner_btn_make: 'Generate Itinerary ↗',
    planner_result_eyebrow: 'Trip Itinerary',
    planner_result_sub: 'minutes (including sightseeing and travel time between stops).',
    planner_btn_save: 'Download itinerary (.txt) ↓',
    planner_btn_map: 'View on map →',
    planner_default_h2: 'Trace heritage in the morning.<br>Breathe fresh greenery in the afternoon.',
    planner_default_p: 'Choose your available time to receive the most convenient sequential itinerary.',
    toast_no_interest: 'Please select at least one attraction you like',
    footer_quality: 'Data Quality',
    footer_sources: 'References',
    footer_admin: 'Admin',
    footer_tagline: '· Bach Dang Commune, Cao Bang Province'
  }
};

const t = k => I18N[currentLang]?.[k] ?? I18N.vi[k] ?? k;

function applyTheme(theme) {
  currentTheme = theme;
  if (typeof document !== 'undefined') {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    const btn = $('#theme-toggle');
    if (btn) {
      btn.innerHTML = `<span class="theme-icon">${theme === 'dark' ? '☀️' : '🌙'}</span>`;
      btn.title = theme === 'dark' ? (currentLang === 'en' ? 'Switch to Light mode' : 'Chuyển sang chế độ Sáng') : (currentLang === 'en' ? 'Switch to Dark mode' : 'Chuyển sang chế độ Tối');
      btn.setAttribute('aria-label', btn.title);
    }
  }
}

function applyLang(lang) {
  currentLang = lang;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    const btn = $('#lang-toggle');
    if (btn) {
      btn.innerHTML = `<span class="lang-code">${lang === 'vi' ? 'EN' : 'VI'}</span>`;
      btn.title = lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt';
      btn.setAttribute('aria-label', btn.title);
    }
    const themeBtn = $('#theme-toggle');
    if (themeBtn) {
      themeBtn.title = currentTheme === 'dark' ? (currentLang === 'en' ? 'Switch to Light mode' : 'Chuyển sang chế độ Sáng') : (currentLang === 'en' ? 'Switch to Dark mode' : 'Chuyển sang chế độ Tối');
      themeBtn.setAttribute('aria-label', themeBtn.title);
    }
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (I18N[lang]?.[key]) {
        el.textContent = I18N[lang][key];
      }
    });
  }
}

function bindHeaderTools() {
  if (typeof document === 'undefined') return;
  const themeBtn = $('#theme-toggle');
  if (themeBtn) {
    themeBtn.onclick = (e) => {
      e.preventDefault();
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('bd_theme', nextTheme); } catch {}
      applyTheme(nextTheme);
    };
  }
  const langBtn = $('#lang-toggle');
  if (langBtn) {
    langBtn.onclick = (e) => {
      e.preventDefault();
      const nextLang = currentLang === 'vi' ? 'en' : 'vi';
      try { localStorage.setItem('bd_lang', nextLang); } catch {}
      applyLang(nextLang);
      route();
    };
  }
}

let records = [], backend = false, logged = false, csrf = '', map = null, layers = null, drawPoints = [], drawLayer = null, drawing = false, editing = null;
let measureMode = null;
let measurePoints = [];
let measureLayer = null;

const fmt = n => Number(n).toLocaleString('vi-VN', { maximumFractionDigits: 2 });
const verified = r => r.verification === 'verified';
const badge = r => {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  if (r.type === 'ditich') return `<span class="tag heritage">${isEn ? 'Historic Heritage' : 'Di tích Lịch sử'}</span>`;
  if (r.type === 'dua') return `<span class="tag gold">${isEn ? 'OCOP 3-Star Pineapple' : 'Vùng dứa OCOP'}</span>`;
  if (r.type === 'che') return `<span class="tag">${isEn ? 'Tai Ho Sin Green Tea' : 'Chè Tài Hồ Sìn'}</span>`;
  return `<span class="tag gold">${isEn ? 'Homeland Specialty' : 'Đặc sản quê hương'}</span>`;
};

function toast(s) {
  $('#toast').textContent = s;
  $('#toast').style.display = 'block';
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => $('#toast').style.display = 'none', 4000);
}

async function api(path, method = 'GET', data) {
  const r = await fetch('/api/' + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
    body: data === undefined ? undefined : JSON.stringify(data)
  });
  const body = await r.json();
  if (!r.ok) throw Error(body.error || 'Không thể xử lý yêu cầu');
  return body;
}

function download(name, text, type = 'application/json') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function head(kicker, title, desc) {
  return `
    <section style="padding: 36px 5% 16px; max-width: 1300px; margin: auto;">
      <div class="eyebrow">${kicker}</div>
      <h1 style="margin: 8px 0 10px;">${title}</h1>
      <p class="muted" style="max-width: 680px; font-size: 15px; margin: 0;">${desc}</p>
    </section>
  `;
}

function notice() {
  return `<div class="notice">Các vị trí có nhãn “Vị trí minh họa” chưa khảo sát GPS thực địa, dùng để giới thiệu mẫu và kiểm tra phần mềm.</div>`;
}

function typeOptions() {
  return Object.entries(names).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
}

function card(r) {
  return `
    <article class="card">
      <div class="card-visual ${r.type === 'dua' ? 'gold' : r.type === 'che' ? 'tea' : 'heritage'}">
        <span class="big-symbol" aria-hidden="true">${symbols[r.type]}</span>
      </div>
      <div class="card-body">
        <div style="margin-bottom:8px;">
          <span class="tag ${r.type === 'dua' ? 'gold' : ''}">${names[r.type]}</span>
          ${badge(r)}
        </div>
        <h3 style="margin: 4px 0 8px;">${esc(r.name)}</h3>
        <p>${esc(r.description.slice(0, 130))}…</p>
        <button class="link" data-detail="${esc(r.id)}" style="font-weight:700; color:var(--primary);">Xem chi tiết vườn ↗</button>
      </div>
    </article>
  `;
}

const products = [
  { type: 'dua', name: 'Dứa tươi Queen Bạch Đằng', text: 'Quả vàng ngọt đậm đà từ các triền đồi Khuổi Kép, Bản Sẳng.', unit: 'Quả tươi' },
  { type: 'che', name: 'Chè búp Tài Hồ Sìn', text: 'Chắt lọc tinh túy đất trời vùng cao, hương cốm non mộc mạc.', unit: 'Chè búp khô' },
  { type: 'dua', name: 'Dứa sấy dẻo', text: 'Chế biến từ dứa chín tự nhiên, thơm ngon tiện lợi.', unit: 'Gói sấy' },
  { type: 'mat', name: 'Mật ong hoa rừng tự nhiên', text: 'Mật ong nguyên chất từ những cánh rừng sinh thái xã Bạch Đằng.', unit: 'Chai mật ong' }
];

function productCards(q = '') {
  return cleanProducts(q);
}

// Distance (Haversine)
function haversineDist(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Area (WGS84 Spherical Polygon) in Hectares
function areaHa(ring) {
  if (!ring || ring.length < 4) return 0;
  const rad = Math.PI / 180, R = 6371008.8;
  let sum = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const a = ring[i], b = ring[i + 1];
    sum += (b[0] - a[0]) * rad * (2 + Math.sin(a[1] * rad) + Math.sin(b[1] * rad));
  }
  return Math.abs(sum * R * R / 2) / 10000;
}

function mapPage(params) {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  return `
    ${head(isEn ? 'Agricultural Digital Map' : 'Bản đồ số nông nghiệp', isEn ? 'Digital Map of Homeland Pineapples' : 'Bản đồ số cây dứa quê em', isEn ? 'Explore golden pineapple hills, lush green tea terraces, and historic heritage sites of Bach Dang Commune.' : 'Khám phá các triền đồi dứa vàng, nương chè xanh và di tích lịch sử xã Bạch Đằng.')}
    <div style="padding:0 5% 10px; max-width: 1300px; margin: auto;">
      ${notice()}
      <div class="toolbar">
        <input id="search" type="search" placeholder="${isEn ? 'Search pineapple hills, tea farms, farmers, villages...' : 'Tìm tên đồi dứa, đồi chè, hộ nông dân, xóm...'}" aria-label="${isEn ? 'Search' : 'Tìm kiếm'}">
        <select id="type-filter" aria-label="${isEn ? 'Location type' : 'Loại địa điểm'}">
          <option value="">${isEn ? 'All locations' : 'Tất cả địa điểm'}</option>
          ${Object.entries(names).map(([k, v]) => `<option value="${k}">${isEn ? namesEn[k] : v}</option>`).join('')}
        </select>
        <select id="season-filter" aria-label="${isEn ? 'Season' : 'Mùa vụ'}">
          <option value="">${isEn ? 'All harvest seasons' : 'Tất cả mùa thu hoạch'}</option>
          ${[...new Set(records.map(r => r.season))].map(x => `<option>${esc(x)}</option>`).join('')}
        </select>
        <select id="verify-filter" aria-label="${isEn ? 'Verification' : 'Xác minh'}">
          <option value="">${isEn ? 'All statuses' : 'Tất cả trạng thái'}</option>
          <option value="verified">${isEn ? 'Verified in fieldwork' : 'Đã xác minh thực địa'}</option>
          <option value="sample">${isEn ? 'Sample location' : 'Vị trí minh họa'}</option>
        </select>
        <button id="gps" class="secondary">${isEn ? '⌖ My location' : '⌖ Vị trí của tôi'}</button>
        <button id="export-geo" class="secondary">${isEn ? 'Export GeoJSON ↓' : 'Xuất GeoJSON ↓'}</button>
      </div>

      <div class="legend">
        ${Object.entries(names).map(([k, v]) => `<span><i class="dot" style="background:${colors[k]}"></i>${isEn ? namesEn[k] : v}</span>`).join('')}
        <label style="margin-left:auto; display:flex; align-items:center; gap:6px; cursor:pointer;">
          <input id="show-polygons" type="checkbox" checked> ${isEn ? 'Farm boundaries' : 'Ranh giới đồi nương'}
        </label>
      </div>
    </div>

    <div class="map-layout">
      <!-- Thanh công cụ nổi trên bản đồ -->
      <div class="gis-bar">
        <select id="basemap-select" aria-label="${isEn ? 'Choose basemap' : 'Chọn nền bản đồ'}">
          <option value="0">${isEn ? '🗺️ Street Map' : '🗺 Bản đồ đường'}</option>
          <option value="1">${isEn ? '🛰️ Satellite Imagery' : '🛰 Ảnh Vệ tinh (Ngắm đồi dứa)'}</option>
          <option value="2">${isEn ? '⛰️ Topo Map' : '⛰ Bản đồ Địa hình'}</option>
        </select>
        <button id="btn-measure-dist" class="small secondary">${isEn ? '📏 Measure Route' : '📏 Đo đường đi'}</button>
        <button id="btn-measure-area" class="small secondary">${isEn ? '📐 Measure Area' : '📐 Đo diện tích vườn'}</button>
        <button id="btn-measure-clear" class="small" style="display:none; color:#dc2626;">✕ ${isEn ? 'Clear' : 'Xóa đo'}</button>
        <span id="gis-measure-text" style="font-size:12.5px; font-weight:700; color:#064e3b; padding-left:4px;"></span>
      </div>

      <aside class="map-list">
        <div style="margin-bottom:12px; font-size:13px; font-weight:700; color:#064e3b;" id="result-count"></div>
        <div id="map-results"></div>
      </aside>

      <div id="map-canvas" aria-label="Bản đồ tương tác"></div>
    </div>
  `;
}

function filtered() {
  const q = ($('#search')?.value || '').toLocaleLowerCase('vi');
  return records.filter(r =>
    (!$('#type-filter')?.value || r.type === $('#type-filter').value) &&
    (!$('#season-filter')?.value || esc(r.season) === $('#season-filter').value) &&
    (!$('#verify-filter')?.value || (verified(r) ? 'verified' : 'sample') === $('#verify-filter').value) &&
    [r.name, r.owner, r.address, r.description].some(v => v.toLocaleLowerCase('vi').includes(q))
  );
}

function initMap() {
  if (!window.L) {
    $('#map-canvas').innerHTML = '<p class="empty" style="padding:40px;">Đang tải bản đồ...</p>';
    return;
  }
  map = L.map('map-canvas').setView([22.602, 106.195], 13);
  attachBasemap(map);
  layers = L.featureGroup().addTo(map);
  measureLayer = L.featureGroup().addTo(map);
  L.control.scale({ imperial: false }).addTo(map);

  map.on('click', e => {
    if (!measureMode) return;
    const pt = [e.latlng.lat, e.latlng.lng];
    measurePoints.push(pt);
    updateMeasurement();
  });
}

function updateMeasurement() {
  measureLayer.clearLayers();
  if (!measurePoints.length) {
    $('#gis-measure-text').textContent = '';
    return;
  }

  measurePoints.forEach(p => {
    L.circleMarker(p, { radius: 5, color: '#f59e0b', fillColor: '#fff', fillOpacity: 1 }).addTo(measureLayer);
  });

  if (measureMode === 'distance') {
    if (measurePoints.length > 1) {
      L.polyline(measurePoints, { color: '#f59e0b', weight: 3, dashArray: '5, 5' }).addTo(measureLayer);
      let totalM = 0;
      for (let i = 0; i < measurePoints.length - 1; i++) {
        totalM += haversineDist(measurePoints[i][0], measurePoints[i][1], measurePoints[i + 1][0], measurePoints[i + 1][1]);
      }
      const label = totalM >= 1000 ? `${(totalM / 1000).toFixed(2)} km` : `${Math.round(totalM)} m`;
      $('#gis-measure-text').textContent = `Đo: ${label}`;
    } else {
      $('#gis-measure-text').textContent = 'Bấm điểm kế tiếp...';
    }
  } else if (measureMode === 'area') {
    if (measurePoints.length >= 3) {
      L.polygon(measurePoints, { color: '#10b981', weight: 2, fillColor: '#34d399', fillOpacity: 0.35 }).addTo(measureLayer);
      const ring = measurePoints.map(p => [p[1], p[0]]);
      ring.push(ring[0]);
      const ha = areaHa(ring);
      const label = ha >= 1 ? `${fmt(ha)} ha` : `${Math.round(ha * 10000)} m²`;
      $('#gis-measure-text').textContent = `Vườn: ${label}`;
    } else {
      $('#gis-measure-text').textContent = `Cần ít nhất 3 điểm (${measurePoints.length}/3)...`;
    }
  }
}

function updateMap() {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  const rows = filtered();
  $('#result-count').textContent = `${rows.length} ${isEn ? 'matching locations' : 'địa điểm phù hợp'}`;
  $('#map-results').innerHTML = rows.map(r => `
    <button class="map-item" data-map="${esc(r.id)}">
      <b><i class="dot" style="background:${colors[r.type]}"></i><span class="map-item-title">${esc(r.name)}</span></b>
      <small>${esc(r.owner)} · ${r.area ? fmt(r.area) + ' ha' : (isEn ? namesEn[r.type] : names[r.type])}</small>
      <small>${isEn ? 'Season:' : 'Mùa vụ:'} ${esc(r.season)}</small>
      <div style="margin-top:6px;">${badge(r)}</div>
    </button>
  `).join('') || `<p class="empty" style="padding:20px; text-align:center;">${isEn ? 'No matching locations found.' : 'Không có kết quả phù hợp.'}</p>`;

  if (!layers) return;
  layers.clearLayers();

  rows.forEach(r => {
    const marker = L.circleMarker([r.lat, r.lng], {
      radius: 9,
      color: '#ffffff',
      weight: 2.5,
      fillColor: colors[r.type],
      fillOpacity: 1
    }).addTo(layers);

    const node = document.createElement('div');
    node.style.width = '270px';
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    node.innerHTML = `
      ${regionPhoto(r)}
      <div style="padding:12px 14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span class="tag ${r.type === 'dua' ? 'gold' : r.type === 'che' ? '' : 'heritage'}" style="font-size:11px; padding:2px 8px;">${isEn ? namesEn[r.type] : names[r.type]}</span>
          ${badge(r)}
        </div>
        <h4 style="margin:4px 0 6px; font-size:14.5px; color:#111827; font-weight:700; line-height:1.4;">${esc((isEn && (typeof RECORD_EN !== 'undefined' && RECORD_EN[r.id]?.name)) || r.name)}</h4>
        <p style="margin:0 0 8px; font-size:12px; color:var(--muted); line-height:1.4;">📍 ${esc((isEn && (typeof RECORD_EN !== 'undefined' && RECORD_EN[r.id]?.address)) || r.address)}</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:11.5px; margin-bottom:10px; background:#f8faf8; padding:8px; border-radius:var(--radius-xs); border:1px solid var(--border);">
          <div><span style="color:var(--muted);">${isEn ? 'Area:' : 'Diện tích:'}</span> <strong>${r.area ? fmt(r.area) + ' ha' : (isEn ? 'Heritage Site' : 'Điểm di tích')}</strong></div>
          <div><span style="color:var(--muted);">${isEn ? 'Season:' : 'Mùa vụ:'}</span> <strong>${esc((isEn && (typeof RECORD_EN !== 'undefined' && RECORD_EN[r.id]?.season)) || r.season)}</strong></div>
        </div>
      </div>
    `;

    const open = document.createElement('button');
    open.className = 'button small primary';
    open.style.width = 'calc(100% - 28px)';
    open.style.margin = '0 14px 14px 14px';
    open.textContent = isEn ? 'View Garden Profile ↗' : 'Xem chi tiết hồ sơ ↗';
    open.onclick = () => detail(r.id);
    node.append(open);
    marker.bindPopup(node, { maxWidth: 280, minWidth: 260, className: 'custom-map-popup' });

    if (r.polygon && $('#show-polygons')?.checked) {
      L.polygon(r.polygon.map(p => [p[1], p[0]]), {
        color: colors[r.type],
        weight: 2,
        fillColor: colors[r.type],
        fillOpacity: 0.25
      }).addTo(layers).on('click', () => detail(r.id));
    }
  });

  if (rows.length && map) {
    try {
      map.fitBounds(layers.getBounds(), { padding: [40, 40], maxZoom: 15 });
    } catch {}
  }
}

function featureCollection(rows) {
  return {
    type: 'FeatureCollection',
    features: rows.map(r => ({
      type: 'Feature',
      id: r.id,
      geometry: r.polygon
        ? { type: 'Polygon', coordinates: [r.polygon] }
        : { type: 'Point', coordinates: [r.lng, r.lat] },
      properties: { ...r, polygon: undefined }
    }))
  };
}

function detail(id) {
  const r = records.find(x => x.id === id);
  if (!r) {
    toast('Không tìm thấy thông tin vườn.');
    return;
  }
  const url = new URL(location.href);
  url.hash = 'profile/' + r.id;

  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  const en = (typeof RECORD_EN !== 'undefined' && RECORD_EN[r.id]) || {};
  const rName = isEn && en.name ? en.name : r.name;
  const rOwner = isEn && en.owner ? en.owner : r.owner;
  const rSeason = isEn && en.season ? en.season : r.season;
  const rStatus = isEn && en.status ? en.status : r.status;
  const rAddress = isEn && en.address ? en.address : r.address;
  const rDesc = isEn && en.description ? en.description : r.description;

  $('#detail-body').innerHTML = `
    <div class="eyebrow">${isEn ? (namesEn[r.type] || names[r.type]) : names[r.type]} · ${esc(r.id)}</div>
    <h2 style="margin: 10px 0 6px;">${esc(rName)}</h2>
    <div style="margin-bottom:14px;">${badge(r)}</div>

    ${regionPhoto(r)}
    ${passportHTML(r)}

    <p style="font-size:14.5px; line-height:1.75; color:#374151;">${esc(rDesc)}</p>

    <div class="detail-grid">
      <div><small>${isEn ? 'Owner / Manager' : 'Chủ hộ / Quản lý'}</small><b>${esc(rOwner)}</b></div>
      <div><small>${isEn ? 'Harvest Season' : 'Mùa thu hoạch'}</small><b>${esc(rSeason)}</b></div>
      <div><small>${isEn ? 'Planting Area' : 'Diện tích vùng trồng'}</small><b>${r.area > 0 ? fmt(r.area) + ' ha' : (isEn ? 'Heritage / Rest Stop' : 'Điểm di tích / dừng chân')}</b></div>
      <div><small>${isEn ? 'Average Yield' : 'Sản lượng bình quân'}</small><b>${r.production > 0 ? fmt(r.production) + (isEn ? ' tons / season' : ' tấn / vụ') : (isEn ? 'Natural Produce' : 'Sản vật tự nhiên')}</b></div>
      <div><small>${isEn ? 'Spatial Boundary' : 'Ranh giới không gian'}</small><b>${r.polygon ? fmt(areaHa(r.polygon)) + (isEn ? ' ha (Surveyed)' : ' ha (Đã đo ranh)') : (isEn ? 'Center Point Coordinates' : 'Tọa độ điểm trung tâm')}</b></div>
      <div><small>${isEn ? 'Care Status' : 'Tình hình chăm sóc'}</small><b>${esc(rStatus)}</b></div>
    </div>

    <div style="font-size:13px; background:#f8faf8; padding:14px; border-radius:var(--radius-sm); border:1px solid var(--border); margin:14px 0;">
      <b>📍 ${isEn ? 'Address:' : 'Địa chỉ:'}</b> ${esc(rAddress)}<br>
      <b>🌐 ${isEn ? 'GPS Coordinates:' : 'Tọa độ GPS:'}</b> ${r.lat.toFixed(6)}, ${r.lng.toFixed(6)}
    </div>

    <!-- Khung tiện ích hành động thực tế -->
    <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:var(--radius-sm); padding:16px; margin:16px 0;">
      <h4 style="margin:0 0 6px; color:#065f46; font-size:14px;">🌱 ${currentLang === 'en' ? 'Contact for Experiences & Visit the Farm:' : 'Liên hệ trải nghiệm & Ghé thăm vùng trồng:'}</h4>
      <p style="margin:0 0 12px; font-size:13px; color:#374151; line-height:1.5;">
        ${currentLang === 'en'
          ? 'Visitors and student groups wishing to visit, harvest pineapples, pick tea leaves or purchase OCOP agricultural produce directly from gardens, please use directions below or contact ahead for thoughtful reception.'
          : 'Quý khách và các đoàn học sinh có nhu cầu ghé thăm, trải nghiệm hái dứa, hái chè hoặc mua nông sản OCOP tận vườn vui lòng sử dụng chỉ đường bên dưới hoặc liên hệ trước để được tiếp đón chu đáo.'}
      </p>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <a class="button primary" href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}" target="_blank" rel="noopener">📍 ${currentLang === 'en' ? 'Open Google Maps Directions ↗' : 'Mở chỉ đường Google Maps ↗'}</a>
        <button id="copy-profile" class="secondary">🔗 ${currentLang === 'en' ? 'Copy Share Link' : 'Sao chép liên kết chia sẻ'}</button>
        ${locationVideos[r.type] ? `<a class="button secondary btn-video" href="${locationVideos[r.type]}" target="_blank" rel="noopener">🎬 ${currentLang === 'en' ? 'Watch Documentary Video ↗' : 'Xem video tư liệu thực tế ↗'}</a>` : ''}
        <a class="button secondary" href="tem-qr-in.html" target="_blank" title="${currentLang === 'en' ? 'Open printable QR labels for real pineapples and tea packages on exhibition' : 'Mở trang in tem nhãn QR Code dán lên quả dứa, gói chè thật khi mang đi thi KHKT hoặc trưng bày gian hàng'}">🏷️ ${currentLang === 'en' ? 'Print Product QR Labels ↗' : 'In tem nhãn QR dán sản vật (Trưng bày thi) ↗'}</a>
      </div>
    </div>
  `;

  $('#copy-profile').onclick = async () => {
    try {
      await navigator.clipboard.writeText(url.href);
      toast('Đã sao chép liên kết vườn');
    } catch {
      toast('Bạn có thể sao chép liên kết trên thanh địa chỉ');
    }
  };

  $('#detail').showModal();
}

function statsPage() {
  return `
    ${head('Vùng trồng quê hương', 'Thống kê vùng trồng nông nghiệp', 'Theo dõi diện tích và sản lượng cây dứa, cây chè được cập nhật từ bà con nông dân xã Bạch Đằng.')}
    <section class="wrap" style="padding-top:0">
      ${notice()}
      <div class="toolbar">
        <label style="font-size:13px; font-weight:600;">Xem theo:
          <select id="stats-scope">
            <option value="sample">Dữ liệu mẫu giới thiệu</option>
            <option value="verified">Dữ liệu đã xác minh</option>
          </select>
        </label>
        <button id="export-csv" class="primary">Tải bảng CSV ↓</button>
        <button id="print-stats" class="secondary">In bảng số liệu</button>
      </div>
      <div id="stats-content"></div>
    </section>
  `;
}

function statsRows() {
  return records.filter(r => (verified(r) ? 'verified' : 'sample') === $('#stats-scope').value);
}

function renderStats() {
  const rows = statsRows();
  const farms = rows.filter(r => r.type === 'dua' || r.type === 'che');
  const sum = (k, a = farms) => a.reduce((s, r) => s + Number(r[k]), 0);

  $('#stats-content').innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:18px; margin-bottom:24px;">
      <div class="panel" style="margin:0; padding:22px;">
        <b style="font-size:32px; font-family:LocalSerif,Georgia,serif; color:#064e3b;">${rows.length}</b>
        <span style="display:block; font-size:12px; color:var(--muted); margin-top:4px;">Địa điểm trên bản đồ</span>
      </div>
      <div class="panel" style="margin:0; padding:22px;">
        <b style="font-size:32px; font-family:LocalSerif,Georgia,serif; color:#b45309;">${fmt(sum('area'))} ha</b>
        <span style="display:block; font-size:12px; color:var(--muted); margin-top:4px;">Diện tích đồi nương</span>
      </div>
      <div class="panel" style="margin:0; padding:22px;">
        <b style="font-size:32px; font-family:LocalSerif,Georgia,serif; color:#047857;">${fmt(sum('production'))} tấn</b>
        <span style="display:block; font-size:12px; color:var(--muted); margin-top:4px;">Sản lượng quả ngọt</span>
      </div>
      <div class="panel" style="margin:0; padding:22px;">
        <b style="font-size:32px; font-family:LocalSerif,Georgia,serif; color:#064e3b;">${new Set(farms.map(r => r.owner)).size}</b>
        <span style="display:block; font-size:12px; color:var(--muted); margin-top:4px;">Hộ gia đình chăm sóc</span>
      </div>
    </div>

    <div class="panel table-scroll">
      <h3 style="margin-bottom:14px;">Danh sách vùng trồng chi tiết</h3>
      <table>
        <thead>
          <tr>
            <th>Tên vùng trồng</th>
            <th>Chủ hộ / Quản lý</th>
            <th>Diện tích (ha)</th>
            <th>Sản lượng (tấn/vụ)</th>
            <th>Mùa thu hoạch</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          ${farms.map(r => `
            <tr>
              <td><button class="link" data-detail="${esc(r.id)}" style="font-weight:700;">${esc(r.name)}</button></td>
              <td>${esc(r.owner)}</td>
              <td>${fmt(r.area)}</td>
              <td>${fmt(r.production)}</td>
              <td>${esc(r.season)}</td>
              <td>${badge(r)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function csv(rows) {
  const cols = ['id', 'name', 'type', 'owner', 'area', 'production', 'season', 'verification', 'surveyDate'];
  const cell = x => '"' + String(x ?? '').replace(/^[=+@-]/, "'$&").replace(/"/g, '""') + '"';
  return '\uFEFF' + [cols, ...rows.map(r => cols.map(k => r[k]))].map(row => row.map(cell).join(',')).join('\r\n');
}

function planner() {
  const isEn = currentLang === 'en';
  return `
    ${head(t('planner_eyebrow'), t('planner_title'), t('planner_desc'))}
    <section class="wrap" style="padding-top:0">
      <div class="two">
        <form id="plan-form" class="panel">
          <div class="eyebrow gold">${t('planner_your_journey')}</div>
          <h3 style="margin-top:8px;">${t('planner_how_much_time')}</h3>

          <label style="display:flex; flex-direction:column; gap:6px; font-size:13.5px; margin-bottom:14px;">${t('planner_time_budget')}
            <select name="hours">
              <option value="2">${t('planner_time_2h')}</option>
              <option value="4" selected>${t('planner_time_4h')}</option>
              <option value="8">${t('planner_time_8h')}</option>
            </select>
          </label>

          <label style="display:flex; flex-direction:column; gap:6px; font-size:13.5px; margin-bottom:16px;">${t('planner_start_label')}
            <input name="start" type="time" value="08:00" required>
          </label>

          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:20px;">
            ${[
              ['dua', isEn ? '🍍 Pineapple Hills' : '🍍 Đồi dứa'],
              ['ditich', isEn ? '⛩️ Historic Site' : '⛩️ Di tích lịch sử'],
              ['che', isEn ? '🌱 Tea Hills' : '🌱 Đồi chè'],
              ['mat', isEn ? '🍯 Honeybee Farm' : '🍯 Điểm mật ong']
            ].map(([k, label]) => `
              <label style="display:flex; align-items:center; gap:6px; font-size:13px; background:var(--card); padding:8px 14px; border-radius:var(--radius-sm); border:1px solid var(--border);">
                <input type="checkbox" name="interest" value="${k}" checked> ${label}
              </label>
            `).join('')}
          </div>

          <button class="primary" style="width:100%;">${t('planner_btn_make')}</button>
        </form>

        <div class="panel" id="plan-result">
          <div class="eyebrow">${isEn ? 'Personalized Suggestion' : 'Gợi ý dành cho bạn'}</div>
          <h2 style="margin-top:10px;">${t('planner_default_h2')}</h2>
          <p class="muted">${t('planner_default_p')}</p>
        </div>
      </div>
    </section>
  `;
}

function makePlan(event) {
  event.preventDefault();
  const f = new FormData(event.target);
  const interests = f.getAll('interest');
  const hour = +f.get('hours');
  const budget = hour * 60;
  let time = String(f.get('start')).split(':').reduce((h, n, i) => h + Number(n) * (i ? 1 : 60), 0);
  let used = 0;
  const isEn = currentLang === 'en';

  if (!interests.length) {
    toast(t('toast_no_interest'));
    return;
  }

  // Khẩu độ thời gian tối ưu đảm bảo Đồi dứa luôn xuất hiện đầu tiên và trọn vẹn cả 4 điểm trong tour 4 giờ
  const durations = {
    2: { dua: 45, ditich: 35, che: 35, mat: 25 },
    4: { dua: 55, ditich: 45, che: 45, mat: 35 },
    8: { dua: 85, ditich: 60, che: 60, mat: 45 }
  };
  const d = durations[hour] || durations[4];

  // Thứ tự ưu tiên: Đồi dứa mật Bạch Đằng được đặt lên đầu tiên để đón bình minh
  const options = isEn ? [
    ['dua', 'Explore Ban Sang Pineapple Hills & Taste OCOP Queen Pineapples', d.dua, 'Marvel at sprawling hills of sweet golden pineapples, take check-in photos and taste ripe pineapples directly at the garden.'],
    ['ditich', 'Visit Uncle Ho National Historic Site with Military Vehicle Corps (Na Roac 1)', d.ditich, 'Discover the heroic 1951 history when President Ho Chi Minh visited vehicle repair soldiers, cultivating patriotic heritage.'],
    ['che', 'Stroll Tai Ho Sin Tea Hills & Taste Firewood-Roasted Green Tea', d.che, 'Breathe the pure mountain pass air, admire ancient misty tea bushes and savor deep rich aromatic tea.'],
    ['mat', 'Learn Wildflower Beekeeping & Buy Local Honey Gifts', d.mat, 'Explore natural wildflower beekeeping and select authentic pure honey as gifts from the homeland.']
  ] : [
    ['dua', 'Khám phá Đồi dứa Bản Sẳng & Thưởng thức dứa mật OCOP', d.dua, 'Chiêm ngưỡng những triền đồi dứa mật Queen bạt ngàn, check-in chụp ảnh và tự tay thưởng thức dứa ngọt mát tại vườn.'],
    ['ditich', 'Thăm Di tích Quốc gia Bác Hồ với ngành Xe - Máy Quân đội (Nà Roác 1)', d.ditich, 'Tìm hiểu dấu ấn lịch sử Bác Hồ về thăm cán bộ chiến sĩ xe - máy năm 1951, bồi đắp niềm tự hào quê hương.'],
    ['che', 'Dạo đồi chè Tài Hồ Sìn & Thưởng trà búp sao củi', d.che, 'Hít thở không khí trong lành đỉnh đèo mờ sương, quan sát các luống chè cổ thụ và thưởng thức chén trà xanh đậm vị.'],
    ['mat', 'Tìm hiểu nghề nuôi ong hoa rừng & Mua quà quê', d.mat, 'Khám phá quy trình nuôi ong mật rừng tự nhiên, chọn mua mật ong rừng thơm ngon làm quà quê hương.']
  ];

  const stops = [];
  for (const o of options.filter(x => interests.includes(x[0]))) {
    const move = 15;
    if (used + move + o[2] > budget) continue;
    time += move;
    used += move;
    stops.push({ type: o[0], title: o[1], duration: o[2], text: o[3], time });
    used += o[2];
    time += o[2];
  }

  const clock = tMin => `${String(Math.floor(tMin / 60) % 24).padStart(2, '0')}:${String(tMin % 60).padStart(2, '0')}`;

  $('#plan-result').innerHTML = `
    <div class="eyebrow gold">${t('planner_result_eyebrow')}</div>
    <h2 style="margin: 8px 0 12px;">${stops.length} ${isEn ? 'stops in Bach Dang' : 'điểm chạm Bạch Đằng'}</h2>
    <p class="muted" style="font-size:13px;">${used} / ${budget} ${t('planner_result_sub')}</p>
    
    <div style="margin: 20px 0; border-left: 2px solid var(--primary-light); padding-left: 18px;">
      ${stops.map(s => `
        <div style="margin-bottom: 18px; position: relative;">
          <time style="font-size:12px; font-weight:700; color:#d97706;">${clock(s.time)} - ${clock(s.time + s.duration)}</time>
          <h4 style="margin: 4px 0 6px; font-size:16px; color:var(--primary-dark);">${s.title}</h4>
          <p style="font-size:13px; color:var(--ink); margin:0 0 6px; opacity:0.85;">${s.text}</p>
          <a class="link" href="#map?type=${s.type}" style="font-size:12.5px; font-weight:700; color:var(--primary);">${t('planner_btn_map')}</a>
        </div>
      `).join('')}
    </div>

    <div style="display:flex; gap:10px; flex-wrap:wrap;"><button type="button" class="primary" data-ai-draw-stops="${stops.map(s => ({ dua: 'dua-01', ditich: 'ditich-01', che: 'che-01', mat: 'mat-01' }[s.type])).filter(Boolean).join(',')}">${isEn ? '🗺️ Draw Route on Digital Map ↗' : '🗺️ Vẽ lộ trình trực quan trên Bản đồ ↗'}</button><button id="save-plan" class="secondary">${t('planner_btn_save')}</button></div>
  `;

  $('#save-plan').onclick = () => download(
    isEn ? 'bach-dang-exploration-itinerary.txt' : 'lich-trinh-kham-pha-bach-dang.txt',
    (isEn ? `BACH DANG HOMELAND EXPLORATION ITINERARY\n\n` : `LỊCH TRÌNH KHÁM PHÁ BẠCH ĐẰNG QUÊ EM\n\n`) +
    stops.map(s => `[${clock(s.time)} - ${clock(s.time + s.duration)}] ${s.title}\n${s.text}`).join('\n\n') +
    (isEn ? `\n\nTotal duration: ${used}/${budget} minutes. Wishing you a memorable journey!` : `\n\nTổng thời gian: ${used}/${budget} phút. Chúc bạn có một chuyến đi thật nhiều kỷ niệm đẹp!`),
    'text/plain'
  );
}

const STORIES_DATA_EN = {
  "na-roac-bac-ho": {
    "titleEn": "President Ho Chi Minh's Footsteps at Na Roac & Sacred Counsel to the Military Vehicle Corps",
    "readTimeEn": "4 min read",
    "locationEn": "Na Roac 1 Relic, Bach Dang Commune",
    "categoryNameEn": "History & Heritage",
    "badgeEn": "Historical Memory",
    "leadEn": "In spring 1951, amid the dense primeval forests of Na Roac hamlet, cadres and soldiers of our Army’s first two military transport vehicle companies had the great honor of welcoming President Ho Chi Minh and receiving his immortal counsel.",
    "paragraphsEn": [
      "Following the resounding victory of the 1950 Border Campaign, battlefronts expanded and logistics supply became the vital lifeline determining the victory of the protracted resistance against French colonialists. The first two military transport companies of the Vietnam People’s Army (Companies 200 and 203) were ordered to secretly bivouac in Na Roac forest, Bach Dang Commune, to repair vehicles and transship ammunition and provisions.",
      "On March 28, 1951, President Ho Chi Minh paid a surprise visit to the unit. Clad in the modest indigo clothing of highland ethnic compatriots, Uncle Ho warmly visited each camp shelter, inspected toolboxes, and checked transport trucks that had just navigated perilous passes. Amid the Na Roac mountains, he counseled: \"Whether battlefronts are near or far, front line or rear base, vehicles fulfill a very critical mission... Vehicles and fuel are the sweat, tears, and blood of our people. You must love vehicles like your children, treasure fuel like your blood, and overcome every hardship to fulfill your duty.\"",
      "His sacred instructions became the guiding compass throughout more than 70 years of combat, construction, and development of the Military Transport Corps and the General Department of Logistics and Engineering. Today, the President Ho Chi Minh Memorial Site at Na Roac 1 is recognized as a National Historic Relic. Its solemn white marble relief beneath lush green trees stands as a cherished red address, nurturing patriotism and pride across generations of Bach Dang students."
    ],
    "quoteEn": "President Ho Chi Minh counseled: \"Vehicles and fuel are the sweat, tears, and blood of our people. You must love vehicles like your children, treasure fuel like your blood, and overcome every hardship to fulfill your duty.\"",
    "takeawayEn": "A sacred national heritage reminding every son and daughter of Bach Dang of dedication, resilience, and profound gratitude."
  },
  "doi-dua-mat-khuoi-kep": {
    "titleEn": "The Journey of Sweet Pineapples on Hill Slopes & Golden Harvest on Khuoi Kep",
    "readTimeEn": "3 min read",
    "locationEn": "Khuoi Kep & Ban Sang Hill Slopes",
    "categoryNameEn": "Sweet Pineapple Hills",
    "badgeEn": "OCOP 3-Star Specialty",
    "leadEn": "Rolling red-gravel feralit hills, once barren and familiar only with precarious maize and cassava, have donned an exuberant golden coat - vast fragrant Queen pineapple slopes bringing prosperity to local families.",
    "paragraphsEn": [
      "Across Cao Bang province today, Bach Dang Commune is renowned as the \"Homeland of Sweet Queen Pineapples\". Yet behind these endless lush green pineapple fields stretches an inspiring journey of perseverance and innovation by local farmers.",
      "Over a decade ago, recognizing that sloped topography ensures good drainage and red gravelly soil absorbs intense summer sunshine—conditions seemingly harsh yet ideal for Queen pineapples—pioneer farming households in Khuoi Kep and Ban Sang hamlets boldly reclaimed hillsides to test-grow the first pineapple crowns.",
      "Hard work on highland soils was bountifully rewarded. Deep roots took hold into red gravel, absorbing mountain breezes and sunshine to yield plump pineapples with wide, flat eyes and golden honeyed pulp. Bach Dang pineapples are distinctively crisp, richly sweet, low in fiber, and melt refreshingly on the palate without irritation. Today, the commune boasts over 127 hectares of OCOP 3-star certified pineapple plantations, transforming into the staple crop that has helped hundreds of households escape poverty and build spacious homes."
    ],
    "quoteEn": "Mr. Tran Van Tuan (Pineapple grower in Ban Sang hamlet, 4.5 ha): \"Bach Dang slopes greet early dawn and catch mountain breezes; our pineapples absorb the purest gifts of heaven and earth, boasting golden flesh as sweet as wild forest honey.\"",
    "takeawayEn": "OCOP 3-star honey pineapples are the pride and testimony of the diligent, creative hands of highland farmers."
  },
  "chuyen-hai-dua-rang-dong": {
    "titleEn": "Laughter Across Dawn Pineapple Farms & The Art of Selecting Sweet Pineapples",
    "readTimeEn": "3 min read",
    "locationEn": "Ban Sang Pineapple Fields, Bach Dang",
    "categoryNameEn": "Farming & Harvest",
    "badgeEn": "Harvest Season",
    "leadEn": "When morning mist still blankets valleys and mountain roosters crow their first dawn calls, trails winding up Ban Sang hills are already lively with brisk steps and laughter from local gardeners.",
    "paragraphsEn": [
      "The peak pineapple harvest season runs from May through July. This is the most vibrant and festive time of the year across Bach Dang. To gather pineapples at their peak flavor, local farmers start their day early at 4 to 5 AM.",
      "Explaining the custom of dawn harvesting, growers share: \"We must harvest while morning dew still bathes the crowns and eyes. At dawn, pineapples retain their crisp, fresh juiciness, delivering a pure refreshing sweetness before harsh midday sun ferments their natural sugars.\"",
      "Bach Dang growers hold unique secrets for picking top pineapples: The finest fruits have a round, weighty silhouette, flat and well-spread eyes, a bright golden-orange hue spreading from the stem across two-thirds of the body, and fresh green crowns. Standing on breezy hilltops at sunrise and tasting a freshly sliced sweet pineapple slice melting on your tongue is an unforgettable mountain experience."
    ],
    "quoteEn": "Grower experience: \"Pineapples harvested at dawn soaked in highland dew are nature’s finest treat—deeply refreshing, dissolving all weariness instantly.\"",
    "takeawayEn": "Experiencing an early morning harvest alongside farmers and listening to rural anecdotes reveals the rustic, authentic charm of Bach Dang."
  },
  "huong-che-tai-ho-sin": {
    "titleEn": "Tai Ho Sin Tea Aroma on Misty Mountain Passes & The Essence of Dew-Kissed Tea",
    "readTimeEn": "4 min read",
    "locationEn": "Tai Ho Sin Pass Summit, Hamlets 1 & 2",
    "categoryNameEn": "Tai Ho Sin Tea Fragrance",
    "badgeEn": "Tai Ho Sin Tea Buds",
    "leadEn": "Perched on high mountain passes embraced year-round by rolling fog and crisp mountain air, ancient Tai Ho Sin tea bushes absorb night dew to crystalize a rustic, lingering sweet-aftertaste tea.",
    "paragraphsEn": [
      "Tai Ho Sin Pass sits at an ideal elevation, continuously kissed by swirling clouds and cool border breezes. It hosts dozens of hectares of lush midland tea hills, including ancient, gnarled tea trees that have accompanied Tay and Nung communities through multiple generations.",
      "Villagers diligently safeguard completely natural cultivation methods: applying composted organic manure, channeling crystal-clear spring water for irrigation, and strictly refraining from chemical pesticides. Each morning once dew clears, mothers and sisters shoulder woven baskets to gently hand-pick tender \"one-bud two-leaves\" shoots.",
      "The craft of Tai Ho Sin tea lies in traditional firewood roasting. Freshly harvested buds are stirred on thick cast-iron pans over ginger-wood fires. Tea masters adjust rhythmic turns and gentle flames so leaves curl tightly into silver-tipped ribbons emitting an intoxicating roasted-sticky-rice aroma.",
      "Brewing a pot of Tai Ho Sin tea with highland spring water yields shimmering amber liquor with fragrant wisps of steam. The first sip carries a delicate, elegant astringency, swiftly followed by a rich, deeply soothing sweet aftertaste that warms the traveler’s soul."
    ],
    "quoteEn": "Tai Ho Sin tea artisan: \"Tea bushes live on foggy passes, absorbing pristine nature. Roasting over firewood requires patient heart and craft so every teacup is steeped in genuine human warmth.\"",
    "takeawayEn": "A precious tea of Bach Dang mountains, symbolizing the graceful, hospitable, and persevering life of highland people."
  },
  "nep-song-ban-lang-tay-nung": {
    "titleEn": "Evening Smoke by Stilt Houses & Warm Solidarity in Tay and Nung Hamlets",
    "readTimeEn": "3 min read",
    "locationEn": "Rural Hamlets across Bach Dang Commune",
    "categoryNameEn": "Village Heritage",
    "badgeEn": "Ethnic Village Identity",
    "leadEn": "In peaceful valleys, traditional stilt houses rest against green mountainsides as evening kitchen smoke drifts lazily into sunset, creating an enchanting and heartfelt rural haven.",
    "paragraphsEn": [
      "Bach Dang Commune is the shared home of Tay, Nung, and Kinh ethnic communities living in harmony over generations. Cultural traditions are preserved intact through yin-yang tiled roofs, handcrafted three-string Tinh lutes made from dried gourds, and pristine Then and Luon melodies echoing across mountain forests.",
      "Community life in Bach Dang shines with deep neighborly solidarity. During harvest peaks, hamlets maintain the long-cherished tradition of labor exchange (\"doi cong\"): neighbors band together to harvest one family’s fields today, and carry baskets to another’s tomorrow. Jovial calls and reciprocal singing across hill slopes ease all steep climbs.",
      "Whether local or a first-time traveler from afar, you are always met with genuine smiles and heartfelt hospitality. A patterned sedge mat spread in the stilt house, a hot pot of aromatic tea, and a plate of sweet ripe pineapples are always prepared to treat visitors like family returning from afar."
    ],
    "quoteEn": "Village sentiment: \"Highland hearts are as honest as corn and cassava stalks. When guests visit, the teapot is always poured full and welcoming smiles are always wide.\"",
    "takeawayEn": "The most enduring beauty of Bach Dang lies in the sincere, warm, and tightly knit neighborly affection of its people."
  },
  "am-thuc-san-vat-que-nha": {
    "titleEn": "Delicacies from Hill Pineapples & Mountain Meals that Linger in Travelers’ Memories",
    "readTimeEn": "3 min read",
    "locationEn": "Culinary Spaces across Bach Dang Hamlets",
    "categoryNameEn": "Rustic Cuisine",
    "badgeEn": "Homeland Delicacies",
    "leadEn": "Far beyond a fresh refreshing fruit, Bach Dang honey pineapples are skillfully crafted into the soul of extraordinary highland recipes celebrating rustic local flavors.",
    "paragraphsEn": [
      "Visiting Bach Dang in summertime, few can forget a humble yet delightful home meal featuring sweet pineapple and native pork rib soup. The natural gentle tang and sweetness of ripe pineapples balance rich tender ribs, garnished with scallions and wild coriander gathered by stream banks.",
      "Equally renowned is charcoal-grilled stream fish braised with golden pineapple slices in Tay families. Firm savory fish simmered with caramelizing pineapple slices served with steamed mountain sticky rice is an unmatched culinary delight.",
      "Locals also craft chewy dried pineapple treats, pineapple candies rolled in rice paper, and refreshing fresh pineapple juices for travelers to bring home as thoughtful souvenirs. A highland feast with fragrant gai cakes, steaming pineapple soup, and hot Tai Ho Sin tea charms every traveler who has tasted it."
    ],
    "quoteEn": "Childhood flavors: \"Mother’s bowl of pineapple and rib soup after a hard morning in the fields is the loving flavor that nurtured the soul of every Bach Dang child.\"",
    "takeawayEn": "Exploring cuisine born of native produce is the most heartfelt path to savoring the sweetness of our land and the affection of our growers."
  },
  "bon-mua-chuyen-sac": {
    "titleEn": "Four Seasons of Color Across Bach Dang Valley & Travel Experience Guide",
    "readTimeEn": "3 min read",
    "locationEn": "Panoramic Bach Dang Valley",
    "categoryNameEn": "Four Seasons & Experiences",
    "badgeEn": "Four Seasons Experience",
    "leadEn": "In every season, Bach Dang dons a distinct colorful cloak, offering visitors genuine tranquility, scenic beauty, and heartwarming memories.",
    "paragraphsEn": [
      "Spring (January – April): Nature awakens as Tai Ho Sin tea terraces burst with fresh emerald shoots, accompanied by pure white plum and pear blossoms along hillsides. Festive Then singing rings across hamlets, welcoming spring blessings of favorable weather and bountiful harvests.",
      "Summer (May – July): The most vibrant golden season. Rolling pineapple slopes across Khuoi Kep and Ban Sang ripen into vast honeyed seas, sending sweet aromas traveling through the valley on summer breezes. An ideal window for youth and families to pick pineapples and snap scenic photos right in the gardens.",
      "Autumn (August – October): Gentle, crisp autumn breezes and golden sunshine bathe winding mountain roads. Clear blue skies create prime conditions for cycling picnics, hill camping, and watching sunset cast warm glows over the valley.",
      "Winter (November – December): Romantic sea of mist embraces ancient tea trees atop Tai Ho Sin Pass, creating scenery reminiscent of a classical ink wash painting. Gathering around hearth fires in traditional stilt houses with hot fragrant tea and heroic historical tales is deeply moving."
    ],
    "quoteEn": "Itinerary suggestion: \"Visit from May to July to harvest sweet honey pineapples; return in autumn and winter to hunt clouds on tea hills and enjoy warm Tai Ho Sin tea.\"",
    "takeawayEn": "Whatever season you visit, Bach Dang opens wide its arms to embrace you with sincere rustic hospitality."
  },
  "khat-vong-ban-do-so": {
    "titleEn": "Youthful Aspiration: Putting Homeland Farm Slopes on the Digital Map",
    "readTimeEn": "3 min read",
    "locationEn": "Cham Bach Dang Digital Map Project",
    "categoryNameEn": "Youth & Aspirations",
    "badgeEn": "Youth Aspirations",
    "leadEn": "Rooted in deep affection for our rural home, the \"Cham Bach Dang\" Digital Map was forged with the ambition of harnessing modern technology to connect local produce and people with friends near and far.",
    "paragraphsEn": [
      "Born and raised amid green pineapple hills and tea bushes perfumed with early dew, Bach Dang youngsters cherished a persistent dream: How to help parents secure stable markets and worthy value for their honey pineapples? How to spread Tai Ho Sin tea fragrance further? And how to invite travelers everywhere to visit our sacred Uncle Ho Military Vehicle Relic?",
      "With dedication and perseverance, the student research team walked through hamlets and climbed slopes to record GPS coordinates, photograph authentic landscapes, interview growers, and engineer an accessible, intuitive WebGIS digital platform.",
      "The \"Cham Bach Dang\" Digital Map is more than a geographical lookup tool; it is the heartfelt tribute of the young generation to their homeland. Every click is designed as an affectionate \"touch\" — touching heroic historical pages, touching vibrant green slopes, and touching the generous hearts of Bach Dang people."
    ],
    "quoteEn": "\"We hope that everyone touching our digital map will sense the sweat on pineapple slopes, the aroma of tender tea shoots, and the warm humanity of heroic Bach Dang.\"",
    "takeawayEn": "The journey of digitizing agricultural heritage and tourism with the passionate hearts of Bach Dang youth."
  }
};

const STORIES_DATA = [
  {
    id: 'na-roac-bac-ho',
    category: 'history',
    categoryName: 'Lịch sử & Ký ức',
    badge: 'Ký ức lịch sử',
    title: 'Dấu chân Bác Hồ tại Nà Roác & Lời dặn thiêng liêng với ngành Xe - Máy Quân đội',
    readTime: '4 phút đọc',
    location: 'Di tích Nà Roác 1, xã Bạch Đằng',
    mapLink: '#map?search=Nà Roác',
    videoLink: 'https://www.facebook.com/share/v/189vg9HWfN/?mibextid=wwXIfr',
    lead: 'Mùa xuân năm 1951, giữa những cánh rừng đại ngàn rậm rạp của xóm Nà Roác, cán bộ chiến sĩ hai đại đội ô tô vận tải đầu tiên của Quân đội ta đã vinh dự được đón Bác Hồ về thăm và nhận lời huấn thị bất hủ.',
    paragraphs: [
      'Sau thắng lợi vang dội của Chiến dịch Biên giới năm 1950, tiền tuyến mở rộng, tuyến chi viện hậu cần trở thành mạch máu quyết định sự thành bại của cuộc kháng chiến trường kỳ chống thực dân Pháp. Hai đại đội ô tô vận tải quân sự đầu tiên của Quân đội nhân dân Việt Nam (Đại đội 200 và Đại đội 203) được lệnh bí mật đóng quân dã chiến tại cánh rừng xóm Nà Roác, xã Bạch Đằng để sửa chữa xe, trung chuyển đạn dược và lương thực.',
      'Ngày 28/3/1951, Bác Hồ bất ngờ về thăm đơn vị. Trong bộ quần áo chàm giản dị của đồng bào vùng cao, Bác ân cần đi thăm từng lán trại, kiểm tra từng hòm đồ nghề, từng chiếc xe vận tải vừa vượt đèo dốc hiểm trở trở về. Giữa núi rừng Nà Roác, Người căn dặn: "Chiến trường gần hay xa, tiền tuyến hay hậu phương, ô tô đều có nhiệm vụ rất quan trọng... Xe, xăng là mồ hôi, nước mắt, xương máu của nhân dân. Các chú phải yêu xe như con, quý xăng như máu, vượt mọi khó khăn hoàn thành nhiệm vụ".',
      'Lời huấn thị thiêng liêng của Người đã trở thành kim chỉ nam xuyên suốt hơn 70 năm xây dựng, chiến đấu và trưởng thành của Bộ đội Vận tải nói riêng và ngành Xe - Máy Tổng cục Hậu cần - Kỹ thuật nói chung. Ngày nay, Địa điểm lưu niệm Chủ tịch Hồ Chí Minh tại Nà Roác 1 đã được công nhận là Di tích lịch sử cấp Quốc gia. Bức phù điêu bằng đá cẩm thạch trắng trang nghiêm giữa tán cây xanh mát là địa chỉ đỏ thiêng liêng, hun đúc lòng yêu nước và niềm tự hào cho bao thế hệ học sinh quê hương Bạch Đằng.'
    ],
    quote: 'Bác Hồ căn dặn: "Xe, xăng là mồ hôi, nước mắt, xương máu của nhân dân. Các chú phải yêu xe như con, quý xăng như máu, vượt mọi khó khăn hoàn thành nhiệm vụ."',
    takeaway: 'Địa chỉ đỏ thiêng liêng nhắc nhở mỗi người con Bạch Đằng về tinh thần tận tụy, kiên cường và lòng biết ơn sâu sắc.'
  },
  {
    id: 'doi-dua-mat-khuoi-kep',
    category: 'pineapple',
    categoryName: 'Đồi dứa ngọt thơm',
    badge: 'Đặc sản OCOP 3 sao',
    title: 'Hành trình quả dứa bén duyên đất dốc & Màu vàng no ấm trên đồi Khuổi Kép',
    readTime: '3 phút đọc',
    location: 'Triền đồi xóm Khuổi Kép & Bản Sẳng',
    mapLink: '#map?search=Khuổi Kép',
    lead: 'Những triền đồi feralit sỏi son trước đây vốn khô cằn chỉ biết đến cây ngô cây sắn bấp bênh, nay đã khoác lên mình màu áo mới – bạt ngàn sắc vàng trù phú của những nương dứa ngọt lịm mang lại cuộc sống ấm no.',
    paragraphs: [
      'Nhắc đến xã Bạch Đằng hôm nay, khắp vùng Cao Bằng ai cũng biết đến danh xưng "thủ phủ dứa mật". Nhưng để có được những triền đồi dứa xanh mướt trải dài ngút tầm mắt như hiện nay là cả một quá trình trăn trở, cần cù tìm tòi lối đi mới của bà con nông dân địa phương.',
      'Khoảng hơn mười năm trước, nhận thấy địa hình đồi dốc thoát nước tốt, đất feralit pha sỏi son đón trọn ánh nắng hè gay gắt – điều kiện tưởng chừng khắc nghiệt nhưng lại cực kỳ phù hợp với giống dứa mật Queen – những hộ nông dân tiên phong ở xóm Khuổi Kép và Bản Sẳng đã mạnh dạn cải tạo đất nương, đưa những chồi dứa giống đầu tiên về ươm thử nghiệm.',
      'Đất cằn không phụ công người chăm bón. Cây dứa cắm sâu rễ vào sỏi son, tích tụ từng giọt nắng gió miền núi để cho ra những quả dứa tròn trịa, mắt dứa nở to đều, ruột vàng óng ả như mật ong rừng. Dứa Bạch Đằng giòn ngọt đậm đà, ít xơ, ăn ngọt mát tan nơi đầu lưỡi và không bị rát rát khó chịu như nhiều loại dứa khác. Đến nay toàn xã đã có hơn 127 ha vùng trồng dứa đạt chứng nhận OCOP 3 sao, trở thành cây trồng chủ lực giúp hàng trăm gia đình thoát nghèo, xây dựng nhà cửa khang trang.'
    ],
    quote: 'Bác Trần Văn Tuấn (người trồng dứa xóm Bản Sẳng, quy mô 4,5 ha): "Đất dốc Bạch Đằng đón nắng sớm, hứng gió đèo, nên quả dứa gom trọn tinh hoa của đất trời, ruột vàng ươm và ngọt lịm như mật ong."',
    takeaway: 'Quả dứa mật OCOP 3 sao là niềm tự hào và minh chứng cho bàn tay lao động cần cù, sáng tạo của người nông dân vùng cao.'
  },
  {
    id: 'chuyen-hai-dua-rang-dong',
    category: 'pineapple',
    categoryName: 'Nghề nông & Thu hoạch',
    badge: 'Mùa thu hoạch',
    title: 'Tiếng cười trên nương dứa rạng đông & Nghệ thuật chọn dứa mật chuẩn vị',
    readTime: '3 phút đọc',
    location: 'Nương dứa xóm Bản Sẳng, xã Bạch Đằng',
    mapLink: '#map?search=Bản Sẳng',
    lead: 'Khi sương mai còn bảng lảng giăng kín thung lũng và tiếng gà rừng vừa cất tiếng gáy đầu tiên, những con đường mòn dẫn lên nương đồi Bản Sẳng đã rộn rã tiếng bước chân và tiếng cười nói của người làm vườn.',
    paragraphs: [
      'Mùa thu hoạch dứa chính vụ thường rộ từ tháng 5 đến tháng 7 dương lịch. Đây là khoảng thời gian rực rỡ và nhộn nhịp nhất trong năm tại Bạch Đằng. Để thu hoạch được những quả dứa đạt độ ngon hoàn hảo nhất, bà con nông dân thường bắt đầu ngày mới từ 4 - 5 giờ sáng.',
      'Lý giải về tập quán đi bẻ dứa từ lúc tờ mờ sáng, các bác nông dân chia sẻ: "Phải bẻ dứa khi sương mai còn ướt đẫm trên cuống lá và mắt quả. Lúc này quả dứa giữ được trọn vẹn vị mọng nước tươi nguyên, ngọt thanh mát nhất và vỏ quả không bị sức nóng của mặt trời làm lên men đường".',
      'Người nông dân Bạch Đằng có bí quyết chọn dứa rất riêng: Quả dứa mật ngon nhất là quả có dáng bầu tròn chắc tay, các mắt dứa căng phẳng đều, màu vàng cam tươi lan tỏa từ cuống lên hai phần ba thân quả, lá xanh tươi không bị héo úa. Đứng giữa triền đồi lộng gió lúc mặt trời vừa hé rạng, cầm trên tay lát dứa tươi vừa cắt ngọt lịm tan chảy nơi đầu lưỡi là trải nghiệm khó quên với bất kỳ ai.'
    ],
    quote: 'Kinh nghiệm nhà nông: "Dứa bẻ lúc rạng đông khi còn đẫm sương rừng là thứ quà quý nhất của đồi núi, ăn ngọt mát tận tâm can, bao mệt nhọc tan biến hết."',
    takeaway: 'Trải nghiệm một buổi sáng sớm cùng bà con bẻ dứa và lắng nghe những câu chuyện làm nương là nét cuốn hút mộc mạc nơi đây.'
  },
  {
    id: 'huong-che-tai-ho-sin',
    category: 'tea',
    categoryName: 'Hương chè Tài Hồ Sìn',
    badge: 'Chè búp Tài Hồ Sìn',
    title: 'Hương chè Tài Hồ Sìn trên đỉnh dốc mù sương & Tinh hoa trà ngậm sương mai',
    readTime: '4 phút đọc',
    location: 'Đỉnh dốc Tài Hồ Sìn, xóm Tài Hồ Sìn 1 & 2',
    mapLink: '#map?search=Tài Hồ Sìn',
    lead: 'Nằm trên đỉnh dốc quanh năm mây mù bảng lảng và gió núi se lạnh, những gốc chè cổ thụ Tài Hồ Sìn ngậm sương đêm đã kết tinh nên hương vị trà mộc mạc, tiền chát hậu ngọt sâu lắng khó phai.',
    paragraphs: [
      'Dốc Tài Hồ Sìn nằm trên độ cao lý tưởng, quanh năm đón những đợt mây mù bao phủ và luồng gió se lạnh vùng biên giới. Nơi đây sở hữu hàng chục hecta đồi chè trung du xanh mướt mát, trong đó có những nương chè cổ thụ gốc to xù xì đã gắn bó với bà con người Tày, người Nùng qua nhiều thế hệ.',
      'Đồng bào nơi đây gìn giữ phương thức canh tác hoàn toàn tự nhiên: bón phân chuồng ủ mục hữu cơ, dẫn nước suối nguồn trong vắt về tưới tiêu, tuyệt đối không lạm dụng thuốc bảo vệ thực vật. Mỗi sớm mai khi sương vừa ráo, các bà, các chị đeo gùi lên đồi, khéo léo dùng đầu ngón tay ngắt nhẹ từng búp chè "một tôm hai lá" mập mạp và mướt xanh.',
      'Nghệ thuật chế biến chè Tài Hồ Sìn nằm ở khâu sao củi truyền thống. Búp chè hái về được sao trên những chiếc chảo gang dày đặt trên bếp củi gừng. Bàn tay người nghệ nhân phải đảo thật nhịp nhàng, căn chỉnh ngọn lửa liu riu để cánh chè xoăn tít lại, giữ được màu xanh ánh bạc và hương cốm ngào ngạt.',
      'Pha một ấm trà Tài Hồ Sìn với nước giếng đá vùng cao, chén trà tỏa làn khói mỏng thơm ngan ngát, nước trà sánh vàng óng như mật. Nhấp ngụm đầu thấy chát nhẹ thanh tao, rồi chỉ vài giây sau, vị ngọt bùi đượm đà lan tỏa khắp khoang họng, sưởi ấm lòng người lữ khách giữa buổi chiều đông se lạnh.'
    ],
    quote: 'Nghệ nhân sao chè Tài Hồ Sìn: "Cây chè sống trên đỉnh đèo mây mù nên búp chè ngậm cả cái tinh khiết của trời đất. Sao lửa củi phải bằng cả tấm lòng kiên nhẫn thì chén trà mới ngọt đượm tình người."',
    takeaway: 'Thức trà quý của núi rừng Bạch Đằng, biểu trưng cho nếp sống thanh cao, hiếu khách và bền bỉ của đồng bào vùng cao.'
  },
  {
    id: 'nep-song-ban-lang-tay-nung',
    category: 'culture',
    categoryName: 'Bản sắc làng bản',
    badge: 'Bản sắc làng bản',
    title: 'Khói lam chiều bên nếp nhà sàn & Nét đẹp tình làng nghĩa xóm của người Tày, Nùng',
    readTime: '3 phút đọc',
    location: 'Các bản làng nông thôn xã Bạch Đằng',
    mapLink: '#map?search=Bạch Đằng',
    lead: 'Giữa thung lũng bình yên, những nếp nhà sàn truyền thống nép mình bên sườn núi, khói lam chiều bảng lảng hòa cùng hoàng hôn tạo nên bức tranh quê hương êm đềm và ấm áp.',
    paragraphs: [
      'Xã Bạch Đằng là mái nhà chung của đồng bào các dân tộc Tày, Nùng, Kinh... cùng chung sống đoàn kết, thuận hòa qua bao đời. Nét đẹp văn hóa truyền thống nơi đây vẫn được bảo tồn nguyên vẹn qua những nếp nhà sàn lợp ngói âm dương, tiếng đàn Tính ba dây mộc mạc làm từ quả bầu khô và những câu then, điệu lượn ngân vang trong trẻo giữa núi rừng.',
      'Đặc biệt, đời sống bản làng Bạch Đằng luôn sáng ngời tinh thần tương thân tương ái, tối lửa tắt đèn có nhau. Vào vụ thu hoạch dứa hay vụ hái chè rộ, bà con trong xóm thường duy trì nếp "đổi công" giúp nhau: hôm nay cả xóm tập trung thu hái cho nương nhà này, ngày mai lại cùng nhau gùi dứa sang nương nhà khác. Tiếng gọi nhau í ới, tiếng hát đối đáp giữa các triền đồi làm vơi đi mọi nhọc nhằn dốc đồi.',
      'Dù là người địa phương hay du khách phương xa lần đầu ghé thăm, bạn sẽ luôn nhận được nụ cười hồn hậu và sự đón tiếp nồng hậu. Chiếc chiếu hoa trải giữa gian nhà sàn, ấm trà nóng luôn thơm ngát và đĩa dứa chín vàng ươm luôn sẵn sàng để thết đãi khách như người thân đi xa trở về.'
    ],
    quote: 'Chuyện bản làng: "Người vùng cao chúng tôi cái bụng thật thà như vạt ngô, nương sắn. Khách đến nhà dù lạ hay quen, ấm nước chè luôn rót đầy và nụ cười luôn rộng mở."',
    takeaway: 'Vẻ đẹp lắng đọng nhất của Bạch Đằng chính là sự chân thành, ấm áp và tình làng nghĩa xóm thắm thiết của con người nơi đây.'
  },
  {
    id: 'am-thuc-san-vat-que-nha',
    category: 'culture',
    categoryName: 'Ẩm thực dân dã',
    badge: 'Ẩm thực quê nhà',
    title: 'Món ngon từ trái dứa đồi & Bữa cơm đượm vị núi rừng níu chân người lữ khách',
    readTime: '3 phút đọc',
    location: 'Không gian ẩm thực xóm làng Bạch Đằng',
    mapLink: '#products',
    lead: 'Không chỉ là thức quả tươi ngọt mát, trái dứa mật Bạch Đằng qua bàn tay khéo léo của các mẹ, các chị đã trở thành linh hồn của những món ăn độc đáo mang đậm phong vị quê nhà.',
    paragraphs: [
      'Về thăm Bạch Đằng vào những ngày hè, khó ai có thể quên được bữa cơm giản dị nhưng thơm lừng với món canh dứa sườn lợn bản. Vị chua thanh dịu ngọt tự nhiên của dứa mật hòa quyện với vị ngọt béo ngậy của thịt sườn, điểm thêm chút hành hoa và rau mùi tàu hái bên bờ suối, tạo nên một bát canh giải nhiệt tuyệt vời sau buổi trưa đi bộ thăm vườn.',
      'Bên cạnh đó, món cá suối nướng than hoa kho dứa mật cũng là đặc sản nức tiếng trong các gia đình người Tày. Cá suối thịt dai thơm, rim kỹ với từng lát dứa mật vàng ươm, nước sốt sền sệt đậm đà ăn kèm với bát cơm gạo nương dẻo thơm thì không gì sánh bằng.',
      'Người dân nơi đây còn sáng tạo làm món mứt dứa dẻo, kẹo dứa cuộn bánh tráng và nước ép dứa nguyên chất thơm ngát để du khách mua về làm quà cho người thân. Bữa cơm vùng cao với đĩa bánh gai dẻo quánh, bát canh dứa thơm lừng và chén trà Tài Hồ Sìn ấm nóng luôn làm say lòng bất kỳ người lữ khách nào từng một lần thưởng thức.'
    ],
    quote: 'Hương vị tuổi thơ: "Bát canh dứa sườn đồi của mẹ nấu sau buổi trưa làm nương về là hương vị thân thương nuôi lớn tâm hồn mỗi người con Bạch Đằng."',
    takeaway: 'Khám phá ẩm thực từ sản vật bản địa là cách trọn vẹn nhất để cảm nhận vị ngọt của đất và tình cảm của người làm vườn.'
  },
  {
    id: 'bon-mua-chuyen-sac',
    category: 'youth',
    categoryName: 'Bốn mùa & Trải nghiệm',
    badge: 'Bốn mùa trải nghiệm',
    title: 'Bốn mùa hương sắc trên thung lũng Bạch Đằng & Cẩm nang trải nghiệm',
    readTime: '3 phút đọc',
    location: 'Toàn cảnh thung lũng xã Bạch Đằng',
    mapLink: '#experiences',
    lead: 'Mỗi mùa trong năm, Bạch Đằng lại khoác lên mình một tấm áo sắc màu riêng biệt, mang lại cho du khách những xúc cảm trọn vẹn và bình yên.',
    paragraphs: [
      'Mùa xuân (Tháng 1 – Tháng 4): Thời khắc thiên nhiên cựa mình thức giấc. Những nương chè Tài Hồ Sìn đồng loạt bung nở lộc non xanh nõn, hoa mận hoa lê trắng muốt bên sườn đồi. Không khí rộn rã với các lễ hội đầu xuân, điệu Then điệu Tính ngân nga khắp các bản làng cầu chúc một năm mưa thuận gió hòa.',
      'Mùa hè (Tháng 5 – Tháng 7): Mùa vàng rực rỡ và ngọt ngào nhất trong năm. Những triền đồi dứa bạt ngàn tại Khuổi Kép, Bản Sẳng chín rộ, hương thơm ngọt lịm lan tỏa khắp thung lũng theo từng ngọn gió hè. Đây là thời điểm tuyệt vời nhất để các bạn trẻ và gia đình trải nghiệm hái dứa, check-in giữa biển dứa vàng và thưởng thức quả ngọt ngay tại vườn.',
      'Mùa thu (Tháng 8 – Tháng 10): Tiết trời sang thu dịu mát, nắng hanh vàng óng ả rải đều trên những cung đường đồi uốn lượn. Bầu trời trong veo cao vời vợi rất thích hợp cho những chuyến đạp xe dã ngoại, cắm trại và ngắm toàn cảnh thung lũng lúc hoàng hôn buông xuống.',
      'Mùa đông (Tháng 11 – Tháng 12): Sương mù bảng lảng ôm lấy những gốc chè cổ thụ trên đỉnh dốc Tài Hồ Sìn tạo nên khung cảnh huyền ảo như tranh thủy mặc. Ngồi quây quần bên bếp lửa nhà sàn, nhấp tách trà nóng thơm nồng và lắng nghe những câu chuyện lịch sử hào hùng là trải nghiệm lắng đọng khó quên.'
    ],
    quote: 'Gợi ý hành trình: "Tháng 5 đến tháng 7 về Bạch Đằng bẻ dứa mật thơm ngọt; mùa thu và mùa đông về săn mây đồi chè và thưởng thức ấm trà Tài Hồ Sìn nóng ấm."',
    takeaway: 'Dù ghé thăm vào bất kỳ mùa nào trong năm, mảnh đất Bạch Đằng luôn dang rộng vòng tay đón chào bạn bằng sự chân thành và mộc mạc nhất.'
  },
  {
    id: 'khat-vong-ban-do-so',
    category: 'youth',
    categoryName: 'Tuổi trẻ & Khát vọng',
    badge: 'Khát vọng tuổi trẻ',
    title: 'Khát vọng tuổi trẻ: Đưa nương đồi quê hương lên Bản đồ số',
    readTime: '3 phút đọc',
    location: 'Dự án Bản đồ số Chạm Bạch Đằng',
    mapLink: '#map',
    lead: 'Xuất phát từ tình yêu tha thiết với mảnh đất quê nhà, dự án Bản đồ số "Chạm Bạch Đằng" được thực hiện với mong muốn dùng công nghệ kết nối sản vật và con người quê hương với bạn bè muôn phương.',
    paragraphs: [
      'Sinh ra và lớn lên giữa những triền đồi dứa xanh ngát và những nương chè thơm mùi sương sớm, các bạn trẻ Bạch Đằng luôn ấp ủ một trăn trở: Làm sao để quả dứa mật thơm ngon của bố mẹ có đầu ra ổn định với giá trị xứng đáng? Làm sao để hương chè Tài Hồ Sìn bay xa hơn? Và làm sao để du khách bốn phương biết đến Di tích lịch sử Bác Hồ với ngành Xe - Máy thiêng liêng?',
      'Bằng niềm nhiệt huyết và sự kiên trì, nhóm tác giả học sinh đã trực tiếp đi bộ đến từng ngõ xóm, leo từng triền đồi để khảo sát tọa độ GPS, chụp ảnh thực tế, phỏng vấn bà con nông dân và xây dựng nên hệ thống bản đồ số trực quan, dễ dùng.',
      'Bản đồ số "Chạm Bạch Đằng" không chỉ là công cụ tra cứu địa lý, mà là tấm lòng của thế hệ trẻ gửi gắm vào quê hương. Chúng em mong muốn mỗi cú nhấp chuột trên bản đồ sẽ là một "cái chạm" ấm áp – chạm vào trang sử hào hùng, chạm vào màu xanh trù phú của nương đồi và chạm vào tình người nồng hậu của quê hương Bạch Đằng.'
    ],
    quote: '"Chúng em mong rằng mỗi người khi chạm vào bản đồ số sẽ cảm nhận được giọt mồ hôi trên nương dứa, hương thơm của búp chè non và hơi ấm tình người của mảnh đất Bạch Đằng anh hùng."',
    takeaway: 'Hành trình số hóa nông sản và du lịch bằng cả trái tim yêu thương quê hương của tuổi trẻ Bạch Đằng.'
  }
];

function renderStoryCards(stories) {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  if (!stories.length) {
    return `<div class="panel" style="text-align:center; padding:32px; color:var(--muted);">${isEn ? 'No stories found in this section. Please select another category!' : 'Chưa có câu chuyện nào trong mục này. Vui lòng chọn danh mục khác!'}</div>`;
  }

  return stories.map(s => {
    const en = (typeof STORIES_DATA_EN !== 'undefined' && STORIES_DATA_EN[s.id]) || {};
    const title = isEn && en.titleEn ? en.titleEn : s.title;
    const lead = isEn && en.leadEn ? en.leadEn : s.lead;
    const badge = isEn && en.badgeEn ? en.badgeEn : s.badge;
    const loc = isEn && en.locationEn ? en.locationEn : s.location;
    const readTime = isEn && en.readTimeEn ? en.readTimeEn : s.readTime;
    const paras = isEn && en.paragraphsEn ? en.paragraphsEn : s.paragraphs;
    const quote = isEn && en.quoteEn ? en.quoteEn : s.quote;
    const takeaway = isEn && en.takeawayEn ? en.takeawayEn : s.takeaway;
    const catName = isEn && en.categoryNameEn ? en.categoryNameEn : s.categoryName;

    const cover = {"na-roac-bac-ho": "story-di-tich.jpg", "doi-dua-mat-khuoi-kep": "story-trien-doi.jpg", "chuyen-hai-dua-rang-dong": "story-thu-hoach.jpg", "huong-che-tai-ho-sin": "story-hai-che.jpg", "nep-song-ban-lang-tay-nung": "story-ban-sac.jpg", "bon-mua-chuyen-sac": "story-bon-mua.jpg", "khat-vong-ban-do-so": "story-tuoi-tre.jpg", "am-thuc-san-vat-que-nha": "dua-say-san-vat.png"}[s.id];
    return `<article class="story-tile">
      <img src="assets/${cover}" alt="" loading="lazy">
      <button class="story-open" data-story="${esc(s.id)}" aria-label="${isEn ? 'Read' : 'Đọc'}: ${esc(title)}">
        <span class="story-tile-category">${esc(catName)}</span>
        <span class="story-tile-bottom"><span class="story-tile-title">${esc(title)}</span><span class="story-tile-caption">${esc(readTime)} · ${isEn ? 'Read story' : 'Đọc câu chuyện'} ↗</span></span>
      </button>
      <template class="story-content"><div class="reading-cover"><img src="assets/${cover}" alt="${esc(loc)}"></div>
        <div class="reading-text"><div class="eyebrow">${esc(badge)} · ${esc(loc)}</div><h2>${esc(title)}</h2>
        <p class="reading-lead">${esc(lead)}</p>${paras.map(p=>`<p>${esc(p)}</p>`).join('')}
        ${quote ? `<blockquote>${esc(quote)}</blockquote>` : ''}
        ${takeaway ? `<p class="reading-takeaway">${esc(takeaway)}</p>` : ''}
        <div class="story-actions"><a class="button primary" href="${esc(s.mapLink || '#map')}">${isEn ? 'View on map' : 'Xem trên bản đồ'}</a><a class="button secondary" href="#planner">${isEn ? 'Plan a visit' : 'Lên lịch ghé thăm'}</a></div></div>
      </template>
    </article>`;
  }).join('');
}

function explore(activeCat = 'all') {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  const categories = isEn ? [
    { id: 'all', label: 'All Stories', count: STORIES_DATA.length },
    { id: 'history', label: '🏛️ History & Heritage', count: STORIES_DATA.filter(s => s.category === 'history').length },
    { id: 'pineapple', label: '🍍 Sweet Pineapple Hills', count: STORIES_DATA.filter(s => s.category === 'pineapple').length },
    { id: 'tea', label: '🌱 Tai Ho Sin Tea Fragrance', count: STORIES_DATA.filter(s => s.category === 'tea').length },
    { id: 'culture', label: '🍲 Culture & Cuisine', count: STORIES_DATA.filter(s => s.category === 'culture').length },
    { id: 'youth', label: '🎒 Four Seasons & Youth', count: STORIES_DATA.filter(s => s.category === 'youth').length }
  ] : [
    { id: 'all', label: 'Tất cả câu chuyện', count: STORIES_DATA.length },
    { id: 'history', label: '🏛️ Lịch sử & Ký ức', count: STORIES_DATA.filter(s => s.category === 'history').length },
    { id: 'pineapple', label: '🍍 Đồi dứa ngọt thơm', count: STORIES_DATA.filter(s => s.category === 'pineapple').length },
    { id: 'tea', label: '🌱 Hương chè Tài Hồ Sìn', count: STORIES_DATA.filter(s => s.category === 'tea').length },
    { id: 'culture', label: '🍲 Bản sắc & Ẩm thực', count: STORIES_DATA.filter(s => s.category === 'culture').length },
    { id: 'youth', label: '🎒 Bốn mùa & Tuổi trẻ', count: STORIES_DATA.filter(s => s.category === 'youth').length }
  ];

  const filtered = activeCat === 'all' ? STORIES_DATA : STORIES_DATA.filter(s => s.category === activeCat);

  return `
    ${head(isEn ? 'Homeland Stories' : 'Câu chuyện quê hương', isEn ? 'Bach Dang - A Grateful & Verdant Realm' : 'Bạch Đằng - Vùng đất xanh nghĩa tình', isEn ? 'Listen to genuine stories of heroic history, sweat drops on pineapple and tea slopes, and the heartwarming hospitality of highland people.' : 'Lắng nghe những câu chuyện chân thực về lịch sử hào hùng, giọt mồ hôi trên triền dứa, nương chè và tình người nồng ấm nơi vùng cao.')}
    <section class="wrap article" style="padding-top:0">
      <div class="stories-filter-bar">
        ${categories.map(c => `
          <button class="story-filter-btn ${activeCat === c.id ? 'active' : ''}" data-cat="${c.id}">
            ${c.label} (${c.count})
          </button>
        `).join('')}
      </div>

      <div class="stories-grid" id="stories-container">
        ${renderStoryCards(filtered)}
      </div>

      <div class="panel" style="background: linear-gradient(135deg, #f0fdf4 0%, #fefce8 100%); border-color:#bbf7d0; margin-top:32px;">
        <h3 style="margin-top:0; color:#065f46;">${isEn ? 'Do you have a wonderful story about Bach Dang?' : 'Bạn có câu chuyện hay về quê hương Bạch Đằng?'}</h3>
        <p style="color:#374151; font-size:14px; margin-bottom:14px; line-height:1.6;">
          ${isEn 
            ? 'Our Digital Map always welcomes memories, unique recipes, or experiential travel notes from teachers, students, and local residents to enrich our homeland cultural archives.' 
            : 'Bản đồ số luôn chào đón những ký ức, công thức món ngon hoặc ghi chép trải nghiệm từ các thầy cô giáo, các bạn học sinh và bà con nhân dân để làm giàu thêm kho tàng văn hóa quê hương.'}
        </p>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <a class="button primary" href="#planner">${isEn ? 'Plan an exploration journey ↗' : 'Lên lịch trình khám phá ngay ↗'}</a>
          <a class="button secondary" href="#map">${isEn ? 'Explore locations on map 📍' : 'Khám phá vị trí trên bản đồ 📍'}</a>
        </div>
      </div>
    </section>
  `;
}

function bindExplorePage() {
  $$('.story-filter-btn').forEach(btn => {
    btn.onclick = () => {
      const cat = btn.dataset.cat;
      $$('.story-filter-btn').forEach(b => b.classList.toggle('active', b === btn));
      const filtered = cat === 'all' ? STORIES_DATA : STORIES_DATA.filter(s => s.category === cat);
      const container = $('#stories-container');
      if (container) {
        container.innerHTML = renderStoryCards(filtered);
      }
    };
  });
}

function admin() {
  return `
    ${head('Quản trị thông tin', 'Quản lý dữ liệu vùng trồng', 'Thêm, sửa, cập nhật thông tin đồi dứa, đồi chè và di tích trên bản đồ.')}
    <section class="wrap" style="padding-top:0">
      ${!backend ? `
        <div class="notice">Bạn đang xem bản trực tuyến tĩnh. Để thêm, sửa hoặc xóa dữ liệu thật vào cơ sở dữ liệu, hãy nhấp đúp file KHOI_DONG.cmd trên máy tính để chạy máy chủ cục bộ.</div>
        <a href="#map" class="button">Quay lại Bản đồ số →</a>
      ` : !logged ? `
        <form class="panel" id="login-form" style="max-width:440px; margin:auto;">
          <h3>Đăng nhập Quản trị</h3>
          <p class="muted" style="font-size:13px;">Tài khoản quản lý dữ liệu bản đồ địa phương.</p>
          <label style="display:flex; flex-direction:column; gap:6px; margin-bottom:14px; font-size:13px;">Tên đăng nhập:
            <input name="username" autocomplete="username" required>
          </label>
          <label style="display:flex; flex-direction:column; gap:6px; margin-bottom:18px; font-size:13px;">Mật khẩu:
            <input name="password" type="password" autocomplete="current-password" required>
          </label>
          <button class="primary" style="width:100%;">Đăng nhập</button>
          <p id="login-error" class="error" role="alert" style="margin-top:10px; color:#dc2626;"></p>
        </form>
      ` : `
        <div class="toolbar">
          <button id="add-record" class="primary">+ Thêm địa điểm mới</button>
          <button id="backup" class="secondary">Sao lưu dữ liệu JSON ↓</button>
          <label class="button secondary">Nhập file JSON
            <input id="import-data" type="file" accept=".json" hidden>
          </label>
          <button id="audit" class="secondary">Nhật ký thay đổi</button>
          <button id="logout" class="secondary">Đăng xuất</button>
        </div>
        <div id="admin-editor"></div>
        <div class="panel table-scroll">
          <table>
            <thead>
              <tr>
                <th>Tên địa điểm</th>
                <th>Loại hình</th>
                <th>Chủ hộ / Quản lý</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${records.map(r => `
                <tr>
                  <td>${esc(r.name)}</td>
                  <td>${names[r.type]}</td>
                  <td>${esc(r.owner)}</td>
                  <td>${badge(r)}</td>
                  <td>
                    <button class="small" data-edit="${esc(r.id)}">Sửa</button>
                    <button class="small" style="color:#dc2626;" data-delete="${esc(r.id)}">Xóa</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </section>
  `;
}

function editor(id) {
  if (map) { map.remove(); map = null; layers = null; }
  editing = id || null;
  const r = records.find(x => x.id === id) || {
    type: 'dua', lat: 22.600, lng: 106.191, area: 0, production: 0, verification: 'sample'
  };
  drawPoints = r.polygon ? r.polygon.slice(0, -1).map(p => [p[1], p[0]]) : [];

  $('#admin-editor').innerHTML = `
    <form id="record-form" class="panel">
      <h3>${id ? 'Chỉnh sửa' : 'Thêm mới'} địa điểm</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Tên vùng trồng / Địa điểm:
          <input name="name" required maxlength="160" value="${esc(r.name)}">
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Loại hình:
          <select name="type">${typeOptions()}</select>
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Chủ hộ / Quản lý:
          <input name="owner" required maxlength="160" value="${esc(r.owner)}">
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Mùa vụ thu hoạch:
          <input name="season" required maxlength="80" value="${esc(r.season)}" placeholder="Tháng 5-7">
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Diện tích (ha):
          <input name="area" type="number" min="0" max="100000" step="0.01" value="${r.area}" required>
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Sản lượng (tấn/vụ):
          <input name="production" type="number" min="0" max="1000000" step="0.01" value="${r.production}" required>
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Vĩ độ (Lat):
          <input name="lat" type="number" min="-90" max="90" step="any" value="${r.lat}" required>
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Kinh độ (Lng):
          <input name="lng" type="number" min="-180" max="180" step="any" value="${r.lng}" required>
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Tình hình sản xuất:
          <input name="status" required maxlength="100" value="${esc(r.status)}">
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Địa chỉ xóm:
          <input name="address" required maxlength="300" value="${esc(r.address)}">
        </label>
        <label style="grid-column:1/-1; display:flex; flex-direction:column; gap:6px; font-size:13px;">Mô tả:
          <textarea name="description" required maxlength="5000" style="min-height:90px;">${esc(r.description)}</textarea>
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Nguồn thông tin / Phiếu khảo sát:
          <input name="source" maxlength="500" value="${esc(r.source)}">
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Ngày khảo sát:
          <input name="surveyDate" type="date" value="${esc(r.surveyDate)}">
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Trạng thái xác minh:
          <select name="verification">
            <option value="sample">Vị trí minh họa</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="verified">Đã xác minh thực địa</option>
            <option value="rejected">Không đạt</option>
          </select>
        </label>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">Ảnh vườn:
          <input name="photo" type="file" accept="image/jpeg,image/png,image/webp">
        </label>
        <label style="display:flex; align-items:center; gap:8px; font-size:13px;"><input name="consentToPublishCoordinates" type="checkbox" ${r.consentToPublishCoordinates ? 'checked' : ''}> Đồng ý công bố tọa độ</label>
        <label style="display:flex; align-items:center; gap:8px; font-size:13px;"><input name="consentToPublishImage" type="checkbox" ${r.consentToPublishImage ? 'checked' : ''}> Đồng ý công bố ảnh</label>
        <label style="grid-column:1/-1; display:flex; align-items:center; gap:8px; font-size:13px;"><input name="consent" type="checkbox" ${r.consent ? 'checked' : ''}> Đã có sự đồng ý của chủ hộ để đăng tải thông tin.</label>
      </div>

      <div class="toolbar" style="margin-top:16px;">
        <button type="button" id="draw-start" class="small">Vẽ ranh giới đồi</button>
        <button type="button" id="draw-undo" class="small secondary">Lùi 1 điểm</button>
        <button type="button" id="draw-clear" class="small secondary">Xóa vẽ</button>
        <button type="button" id="draw-finish" class="small primary">Xong vẽ</button>
      </div>
      <p id="draw-info" style="font-weight:700; color:var(--primary); font-size:13px;"></p>
      <div id="map-canvas" style="height:350px; border-radius:12px; margin: 12px 0;"></div>

      <div style="display:flex; gap:12px; margin-top:16px;">
        <button class="primary">Lưu thông tin</button>
        <button type="button" id="cancel-edit" class="secondary">Hủy</button>
      </div>
      <p id="form-error" style="color:#dc2626; font-size:13px; margin-top:8px;" role="alert"></p>
    </form>
  `;

  const form = $('#record-form');
  form.elements.type.value = r.type;
  form.elements.verification.value = r.verification;

  initMap();
  if (map) {
    map.setView([r.lat, r.lng], 14);
    map.on('click', e => {
      if (drawing) {
        drawPoints.push([e.latlng.lat, e.latlng.lng]);
        paintDraw();
      } else {
        form.elements.lat.value = e.latlng.lat.toFixed(6);
        form.elements.lng.value = e.latlng.lng.toFixed(6);
      }
    });
  }
  paintDraw();

  $('#draw-start').onclick = () => { drawing = true; toast('Bấm các điểm trên bản đồ để vẽ ranh giới đồi'); };
  $('#draw-finish').onclick = () => { drawing = false; paintDraw(); };
  $('#draw-undo').onclick = () => { drawPoints.pop(); paintDraw(); };
  $('#draw-clear').onclick = () => { drawPoints = []; paintDraw(); };
  $('#cancel-edit').onclick = route;
  form.onsubmit = saveRecord;
  form.scrollIntoView({ behavior: 'smooth' });
}

function ring() {
  const p = drawPoints.map(x => [x[1], x[0]]);
  return p.length >= 3 ? [...p, p[0]] : null;
}

function paintDraw() {
  if (drawLayer && map) map.removeLayer(drawLayer);
  if (map && drawPoints.length) {
    drawLayer = L.polygon(drawPoints, { color: '#059669', fillColor: '#34d399', fillOpacity: 0.35 }).addTo(map);
  }
  $('#draw-info').textContent = `${drawPoints.length} điểm · Diện tích ước tính: ${fmt(areaHa(ring()))} ha`;
}

async function saveRecord(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const old = records.find(r => r.id === editing);
  const r = { ...old };

  for (const k of ['name', 'type', 'owner', 'season', 'status', 'address', 'description', 'source', 'surveyDate', 'verification']) {
    r[k] = String(f.get(k) || '').trim();
  }
  for (const k of ['lat', 'lng', 'area', 'production']) {
    r[k] = Number(f.get(k));
  }

  r.consent = f.get('consent') === 'on';
  r.consentToPublishCoordinates = f.get('consentToPublishCoordinates') === 'on';
  r.consentToPublishImage = f.get('consentToPublishImage') === 'on';
  r.polygon = ring();
  r.image = old?.image || '';

  try {
    if (drawPoints.length > 0 && drawPoints.length < 3) throw Error('Ranh giới đa giác cần ít nhất 3 điểm.');
    const file = f.get('photo');
    if (file?.size) {
      if (file.size > 2 * 1024 * 1024) throw Error('Ảnh vượt quá dung lượng 2 MB.');
      r.image = await new Promise((res, rej) => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result);
        fr.onerror = () => rej(Error('Lỗi đọc ảnh'));
        fr.readAsDataURL(file);
      });
    }
    await api('records' + (editing ? '/' + editing : ''), editing ? 'PUT' : 'POST', r);
    records = await api('records');
    toast('Đã lưu thông tin thành công');
    route();
  } catch (err) {
    $('#form-error').textContent = err.message;
  }
}

async function route() {
  if (map) { map.remove(); map = null; layers = null; measureLayer = null; }
  drawing = false;
  drawLayer = null;
  measureMode = null;
  measurePoints = [];

  const hash = location.hash.slice(1) || 'home';
  const [page, query] = hash.split('?');
  const params = new URLSearchParams(query);

  if ($('#detail').open) $('#detail').close();
  $$('#main-nav a').forEach(a => a.classList.toggle('active', a.hash === '#' + page));
  $('#main-nav')?.classList.remove('open');

  const routes = {
    quality: qualityPage,
    home: cleanHome,
    experiences: expPage,
    notebook: notebookPage,
    map: () => mapPage(params),
    explore,
    products: () => `
      ${head('Sản vật quê hương', 'Quà quê ngọt lành Bạch Đằng', 'Dứa tươi thơm ngọt, chè búp Tài Hồ Sìn mộc mạc và mật ong hoa rừng tự nhiên.')}
      <section class="wrap" style="padding-top:0">
        <div class="toolbar">
          <input type="search" id="product-search" placeholder="Tìm sản vật..." aria-label="Tìm kiếm">
        </div>
        <div class="cards" id="product-list">${productCards()}</div>
      </section>
    `,
    stats: cleanStats,
    'sample-stats': statsPage,
    planner,
    research: cleanSources,
    sources: cleanSources,
    admin
  };

  $('#main').innerHTML = (routes[page] || cleanHome)();
  window.scrollTo(0, 0);

  if (page.startsWith('profile/')) {
    detail(page.slice(8));
    return;
  }

  if (page === 'map') {
    initMap();
    $('#type-filter').value = params.get('type') || '';
    ['search', 'type-filter', 'season-filter', 'verify-filter', 'show-polygons'].forEach(id => {
      $('#' + id)?.addEventListener(id === 'search' ? 'input' : 'change', updateMap);
    });
    updateMap();

    const bmSelect = $('#basemap-select');
    if (bmSelect) {
      bmSelect.onchange = () => {
        if (window.changeBasemap) window.changeBasemap(+bmSelect.value);
      };
    }

    const btnDist = $('#btn-measure-dist');
    const btnArea = $('#btn-measure-area');
    const btnClear = $('#btn-measure-clear');

    if (btnDist && btnArea && btnClear) {
      btnDist.onclick = () => {
        measureMode = 'distance';
        measurePoints = [];
        measureLayer.clearLayers();
        btnDist.classList.add('primary');
        btnArea.classList.remove('primary');
        btnClear.style.display = 'inline-flex';
        toast('Bấm các điểm trên bản đồ để đo khoảng cách');
      };

      btnArea.onclick = () => {
        measureMode = 'area';
        measurePoints = [];
        measureLayer.clearLayers();
        btnArea.classList.add('primary');
        btnDist.classList.remove('primary');
        btnClear.style.display = 'inline-flex';
        toast('Bấm các góc quanh vườn để đo diện tích');
      };

      btnClear.onclick = () => {
        measureMode = null;
        measurePoints = [];
        measureLayer.clearLayers();
        btnDist.classList.remove('primary');
        btnArea.classList.remove('primary');
        btnClear.style.display = 'none';
        $('#gis-measure-text').textContent = '';
      };
    }

    $('#gps').onclick = () => {
      if (!map) return toast('Bản đồ chưa sẵn sàng');
      if (!navigator.geolocation) return toast('Trình duyệt chưa hỗ trợ định vị');
      navigator.geolocation.getCurrentPosition(p => {
        L.circleMarker([p.coords.latitude, p.coords.longitude], { radius: 8, color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 1 }).addTo(map).bindPopup('Vị trí của bạn').openPopup();
        map.setView([p.coords.latitude, p.coords.longitude], 15);
      }, () => toast('Không lấy được vị trí GPS. Hãy kiểm tra cài đặt định vị.'), { enableHighAccuracy: true, timeout: 10000 });
    };

    $('#export-geo').onclick = () => download('vung-trong-bach-dang.geojson', JSON.stringify(featureCollection(filtered()), null, 2));
  }

  if (page === 'quality') {
    $('#survey-export')?.addEventListener('click', exportSurvey);
  }

  if (page === 'experiences') {
    $('#experience-filter').onsubmit = e => {
      e.preventDefault();
      renderExperiences(true);
    };
    renderExperiences();
  }

  if (page === 'explore') bindExplorePage();
  if (page === 'notebook') bindNotebook();
  if (page === 'products') {
    $('#product-search').oninput = e => $('#product-list').innerHTML = productCards(e.target.value);
  }
  if (page === 'stats') bindCleanStats();
  if (page === 'sample-stats') {
    renderStats();
    $('#stats-scope').onchange = renderStats;
    $('#export-csv').onclick = () => download('thong-ke-bach-dang.csv', csv(statsRows()), 'text/csv;charset=utf-8');
    $('#print-stats').onclick = () => window.print();
  }
  if (page === 'planner') $('#plan-form').onsubmit = makePlan;

  if (page === 'admin' && backend) {
    if (!logged) {
      $('#login-form').onsubmit = async e => {
        e.preventDefault();
        try {
          const f = new FormData(e.target);
          const s = await api('login', 'POST', { username: f.get('username'), password: f.get('password') });
          logged = true;
          csrf = s.csrf;
          route();
        } catch (err) {
          $('#login-error').textContent = err.message;
        }
      };
    } else {
      $('#add-record').onclick = () => editor();
      $('#logout').onclick = async () => {
        await api('logout', 'POST', {});
        logged = false;
        csrf = '';
        route();
      };
      $('#backup').onclick = () => download('bach-dang-backup.json', JSON.stringify(records, null, 2));
      $('#import-data').onchange = async e => {
        try {
          const file = e.target.files[0];
          if (!file) return;
          if (file.size > 15 * 1024 * 1024) throw Error('Tệp vượt quá 15 MB');
          const data = JSON.parse(await file.text());
          if (!Array.isArray(data)) throw Error('Tệp phải là danh sách hồ sơ JSON');
          if (!confirm(`Nhập ${data.length} hồ sơ? Các hồ sơ trùng mã sẽ được cập nhật.`)) return;
          await api('import', 'POST', data);
          records = await api('records');
          toast('Nhập dữ liệu thành công');
          route();
        } catch (err) {
          toast(err.message);
        }
      };
      $('#audit').onclick = async () => {
        try {
          const logs = await api('audit');
          $('#detail-body').innerHTML = '<h2>Nhật ký thay đổi</h2>' + logs.map(l => `<p style="font-size:12.5px; padding:6px 0; border-bottom:1px solid var(--border);"><b>${esc(l.at)}</b> · Thao tác: <code>${esc(l.action)}</code> · Mã hồ sơ: <strong>${esc(l.record_id)}</strong></p>`).join('');
          $('#detail').showModal();
        } catch (err) {
          toast(err.message);
        }
      };
    }
  }
}

document.addEventListener('click', async e => {
  const d = e.target.closest('[data-detail]');
  const m = e.target.closest('[data-map]');
  const edit = e.target.closest('[data-edit]');
  const del = e.target.closest('[data-delete]');

  if (d) detail(d.dataset.detail);
  if (m) {
    const r = records.find(x => x.id === m.dataset.map);
    map?.setView([r.lat, r.lng], 16);
    detail(r.id);
  }
  if (edit) editor(edit.dataset.edit);
  if (del && confirm('Xóa hồ sơ này khỏi cơ sở dữ liệu?')) {
    try {
      await api('records/' + del.dataset.delete, 'DELETE');
      records = await api('records');
      toast('Đã xóa hồ sơ');
      route();
    } catch (err) {
      toast(err.message);
    }
  }
});

$('#detail .close').onclick = () => $('#detail').close();
$('#menu').onclick = () => $('#main-nav')?.classList.toggle('open');
window.addEventListener('hashchange', () => {
  route();
  updateScrollProgress();
});

function updateScrollProgress() {
  const bar = $('#scroll-progress-bar');
  if (!bar) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width = Math.min(100, Math.max(0, percent)) + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);

(async () => {
  try {
    const response = await fetch('/api/session');
    if (response.ok && (response.headers.get('content-type') || '').includes('application/json')) {
      const s = await response.json();
      backend = !!s.backend;
      logged = !!s.authenticated;
      csrf = s.csrf || '';
    }
  } catch {}

  try {
    try {
      records = backend ? await api('records') : await fetch('data.json').then(r => r.json()).catch(() => (typeof window !== 'undefined' && window.DEFAULT_RECORDS) || []);
    } catch {
      records = (typeof window !== 'undefined' && window.DEFAULT_RECORDS) || [];
    }
    if (!records || !records.length) {
      records = (typeof window !== 'undefined' && window.DEFAULT_RECORDS) || [];
    }
    bindHeaderTools();
    applyTheme(currentTheme);
    applyLang(currentLang);
    route();
  } catch {
    $('#main').innerHTML = '<section class="wrap"><h1>Chưa kết nối dữ liệu</h1><p>Hãy khởi động server.py bằng file KHOI_DONG.cmd.</p></section>';
  }
})();
