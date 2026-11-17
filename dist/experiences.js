'use strict';

const farmActivities = {
  che: {
    title: 'Một buổi làm người hái chè',
    subtitle: 'Chạm vào búp non ngậm sương, hiểu nghề chè quê hương.',
    minutes: 90,
    months: [3, 4, 5, 6, 7, 8, 9, 10],
    steps: [
      'Gặp chủ vườn, nghe giới thiệu về giống chè và cách chăm sóc tự nhiên.',
      'Quan sát cách chọn búp "1 tôm 2 lá" và thực hành hái chè trên sườn đồi.',
      'Phân loại chè vừa hái, tìm hiểu các bước sao sấy tạo hương thơm cốm.',
      'Ghi lại điều em học được và cùng bà con thưởng thức chén trà xanh ấm áp.'
    ],
    learn: 'Nhận biết búp chè thu hái đạt chuẩn, hiểu giá trị lao động và tình yêu thiên nhiên quê hương.'
  },
  dua: {
    title: 'Một ngày theo chân người trồng dứa',
    subtitle: 'Từ hàng dứa xanh uốn lượn đến trái ngọt thơm lừng trên tay.',
    minutes: 120,
    months: [5, 6, 7],
    steps: [
      'Tìm hiểu giống dứa Queen, chu kỳ sinh trưởng và quan sát các triền đồi dốc.',
      'Theo chân chủ vườn nhận biết quả đạt độ chín vàng thơm để thu hoạch.',
      'Thực hành thu hái an toàn dưới sự hướng dẫn tỉ mỉ của người dân.',
      'Phân loại quả, cân sản phẩm và ghi lại hành trình từ đồi nương đến tay người thưởng thức.'
    ],
    learn: 'Phân biệt giai đoạn sinh trưởng của cây dứa, hiểu sự vất vả và khát vọng của người nông dân.'
  }
};

let ahpWeights = { interest: 40, season: 35, time: 25 };
function setAhpWeights(interest, season, time) {
  ahpWeights = { interest, season, time };
}

function activityMatches(month, minutes, interest) {
  return Object.entries(farmActivities).map(([type, a]) => {
    const inSeason = a.months.includes(month);
    const fits = a.minutes <= minutes;
    const preferred = interest === 'all' || interest === type;
    const score = (preferred ? ahpWeights.interest : 0) + (inSeason ? ahpWeights.season : 0) + (fits ? ahpWeights.time : 0);
    return {
      type,
      a,
      inSeason,
      fits,
      preferred,
      score
    };
  }).sort((a, b) => b.score - a.score);
}

function selectedActivities(month, minutes, interest) {
  return activityMatches(month, minutes, interest).filter(x => x.preferred && x.fits);
}

function expPage() {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  return `
    ${head(isEn ? 'Learn from Homeland Practice' : 'Học từ thực tế quê hương', isEn ? 'A Day as a Bach Dang Farmer' : 'Một ngày làm nông dân Bạch Đằng', isEn ? 'Experience picking green tea, harvesting ripe pineapples, and listening to stories from gardeners.' : 'Trải nghiệm hái chè xanh, thu hoạch dứa chín và lắng nghe câu chuyện của chính người làm vườn.')}
    <section class="wrap" style="padding-top:0">
      <div class="two">
        <form id="experience-filter" class="panel">
          <div class="eyebrow gold">${isEn ? 'Choose Your Timeframe' : 'Chọn thời gian của bạn'}</div>
          <h3 style="margin-top:8px;">${isEn ? 'Find Matching Experiences' : 'Tìm trải nghiệm phù hợp'}</h3>
          
          <div class="form-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin: 16px 0;">
            <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">${isEn ? 'Planned travel month:' : 'Tháng dự kiến đi:'}
              <select name="month">
                ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${i + 1 === new Date().getMonth() + 1 ? 'selected' : ''}>${isEn ? ['January','February','March','April','May','June','July','August','September','October','November','December'][i] : `Tháng ${i + 1}`}</option>`).join('')}
              </select>
            </label>
            <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">${isEn ? 'Available time at garden:' : 'Thời gian rảnh tại vườn:'}
              <select name="minutes">
                <option value="90">${isEn ? '90 min (Visit tea hill)' : '90 phút (Thăm đồi chè)'}</option>
                <option value="120" selected>${isEn ? '2 hours (Pineapple harvest)' : '2 giờ (Thu hoạch dứa)'}</option>
                <option value="240">${isEn ? '4 hours (Full day experience)' : '4 giờ (Trải nghiệm trọn vẹn)'}</option>
              </select>
            </label>
            <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">${isEn ? 'Who are you traveling with:' : 'Bạn đi cùng ai:'}
              <select name="group">
                <option value="student">${isEn ? 'Students / Friends' : 'Nhóm học sinh / bạn bè'}</option>
                <option value="family">${isEn ? 'Family with children' : 'Gia đình có trẻ nhỏ'}</option>
                <option value="adult">${isEn ? 'Experiential travelers' : 'Khách du lịch trải nghiệm'}</option>
              </select>
            </label>
            <label style="display:flex; flex-direction:column; gap:6px; font-size:13px;">${isEn ? 'Favorite homeland produce:' : 'Nông sản bạn yêu thích:'}
              <select name="interest">
                <option value="all">${isEn ? 'Both tea and pineapples' : 'Cả chè và dứa'}</option>
                <option value="che">${isEn ? 'Green tea hills' : 'Đồi chè xanh'}</option>
                <option value="dua">${isEn ? 'Golden pineapple hills' : 'Đồi dứa vàng'}</option>
              </select>
            </label>
          </div>

          <label style="display:flex; align-items:center; gap:8px; font-size:13px; margin: 10px 0;">
            <input name="realVisit" type="checkbox"> ${isEn ? 'Only show farms ready for reception' : 'Chỉ xem điểm có vườn sẵn sàng đón tiếp'}
          </label>
          <label style="display:flex; align-items:center; gap:8px; font-size:13px; margin-bottom: 18px;">
            <input name="strictSeason" type="checkbox" checked> ${isEn ? 'Filter when harvest is in peak season' : 'Chọn lúc vườn đang vào vụ thu hoạch chính'}
          </label>

          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="primary" type="submit">${isEn ? 'Suggest Experiences ↗' : 'Gợi ý trải nghiệm ↗'}</button>
            <a href="#notebook" class="button secondary">${isEn ? 'Open My Field Notebook →' : 'Mở sổ tay của em →'}</a>
          </div>
        </form>

        <div class="panel" style="background:#f0fdf4; border-color:#d1fae5;">
          <div class="eyebrow">${isEn ? 'Walk with farmers, cherish our hillsides' : 'Đi cùng bà con, yêu quý nương đồi'}</div>
          <h3 style="margin-top:8px;">${isEn ? 'Reminders for farm visits' : 'Lời nhắn nhỏ khi đi thăm vườn'}</h3>
          <p style="font-size:13.5px; line-height:1.7; color:#374151;">
            🌿 <strong>${isEn ? 'Proper attire:' : 'Trang phục gọn gàng:'}</strong> ${isEn ? 'Wear hats, bring water and wear sturdy closed shoes to walk comfortably on rolling slopes.' : 'Đội mũ, mang nước uống và đi giày kín chân để tiện leo các sườn đồi thoai thoải.'}
          </p>
          <p style="font-size:13.5px; line-height:1.7; color:#374151;">
            🍍 <strong>${isEn ? 'Pineapple leaves have thorns:' : 'Lá dứa có gai:'}</strong> ${isEn ? 'Always follow growers guidance; do not enter pineapple rows without supervision.' : 'Luôn lắng nghe hướng dẫn của chủ vườn, không tự ý bước vào luống dứa khi chưa có người lớn đi cùng.'}
          </p>
          <p style="font-size:13.5px; line-height:1.7; color:#374151;">
            🍵 <strong>${isEn ? 'Environmental protection:' : 'Giữ gìn môi trường:'}</strong> ${isEn ? 'Do not pick tender tea shoots without permission and take your trash to designated bins!' : 'Không ngắt búp chè non khi chưa được phép và luôn mang rác về nơi quy định nhé!'}
          </p>
        </div>
      </div>

      <div id="experience-results" tabindex="-1" aria-live="polite"></div>
    </section>
  `;
}

function renderExperiences(reveal = false) {
  const f = new FormData($('#experience-filter'));
  const month = +f.get('month') || 6;
  const minutes = +f.get('minutes') || 120;
  const interest = f.get('interest');

  const matches = selectedActivities(month, minutes, interest);
  const checks = records.filter(r => farmActivities[r.type]).map(r => ({
    r,
    result: evaluateVisit(r, {
      month,
      minutes,
      interest,
      strictSeason: f.get('strictSeason') === 'on',
      simulation: f.get('realVisit') !== 'on'
    })
  }));

  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  $('#experience-results').innerHTML = `
    <div style="margin: 28px 0 16px;">
      <h2>${isEn ? `Suggested Experiences for Month ${month}` : `Gợi ý trải nghiệm cho Tháng ${month}`}</h2>
      <p class="muted">${isEn ? `Optimal activities matching your ${minutes}-minute schedule.` : `Dưới đây là hoạt động phù hợp nhất với quỹ thời gian ${minutes} phút của bạn.`}</p>
    </div>

    <div class="cards">
      ${matches.filter(x => checks.some(c => c.r.type === x.type && c.result.eligible)).map(({ type, a, inSeason, fits, preferred }) => `
        <article class="card">
          <div class="card-visual ${type === 'dua' ? 'gold' : 'tea'}">
            <span class="big-symbol">${symbols[type] || '🌱'}</span>
          </div>
          <div class="card-body">
            <div style="margin-bottom:10px;">
              <span class="tag ${type === 'dua' ? 'gold' : ''}">${type === 'che' ? 'Đồi chè Tài Hồ Sìn' : 'Đồi dứa Bạch Đằng'}</span>
              <span class="tag">${a.minutes} phút</span>
              <span class="tag ${inSeason ? '' : 'gold'}">${inSeason ? 'Đúng vụ thu hoạch' : 'Ngoài vụ chính'}</span>
            </div>

            <h3 style="margin: 6px 0 10px;">${a.title}</h3>
            <p style="font-size:14px; line-height:1.6;">${a.subtitle}</p>

            <details style="margin: 14px 0; border-top:1px solid var(--border); padding-top:10px;">
              <summary style="cursor:pointer; font-weight:700; color:var(--primary-dark); font-size:13.5px;">Các bước trải nghiệm cùng người dân</summary>
              <ol style="padding-left:18px; font-size:13px; color:#4b5563; margin:10px 0;">
                ${a.steps.map(s => `<li style="margin-bottom:6px;">${s}</li>`).join('')}
              </ol>
              <div style="background:#f0fdf4; padding:10px 14px; border-radius:8px; font-size:12.5px; color:#065f46;">
                <strong>Điều em học được:</strong> ${a.learn}
              </div>
            </details>

            <div style="display:flex; gap:10px; margin-top:auto; padding-top:14px; flex-wrap:wrap;">
              <a href="#map?type=${type}" class="button small">Xem vị trí vườn ↗</a>
              <button class="small secondary" data-activity-save="${type}">Lưu vào sổ tay</button>
              <button class="small secondary" data-activity-brief="${type}">Tải phiếu liên hệ</button>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `;

  $$('[data-activity-save]').forEach(b => b.onclick = () => saveActivity(b.dataset.activitySave, month));
  $$('[data-activity-brief]').forEach(b => b.onclick = () => {
    const a = farmActivities[b.dataset.activityBrief];
    download('phieu-lien-he-chu-vuon.txt', `PHIẾU LIÊN HỆ CHỦ VƯỜN - XÃ BẠCH ĐẰNG\nHoạt động: ${a.title}\nTháng dự kiến: ${month} - Thời gian tại vườn: ${a.minutes} phút\n\nNội dung cần xác nhận:\n- Vườn có thể đón khách vào ngày đã chọn không?\n- Đang đúng vụ thu hoạch để thực hành hái quả/chè không?\n- Số lượng người trong đoàn và trang phục cần chuẩn bị.\n\nNgười liên hệ: _________________________\nSố điện thoại: _________________________`, 'text/plain');
  });

  if (reveal) {
    $('#experience-results').focus({ preventScroll: true });
    $('#experience-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function readNotebook() {
  try {
    return JSON.parse(localStorage.getItem('bach-dang-notebook-v1') || '[]');
  } catch {
    return [];
  }
}

function writeNotebook(items) {
  try {
    localStorage.setItem('bach-dang-notebook-v1', JSON.stringify(items));
    return true;
  } catch {
    toast('Không thể lưu sổ tay.');
    return false;
  }
}

function saveActivity(type, month) {
  const items = readNotebook();
  if (items.some(x => x.type === type && x.month === month)) {
    toast('Trải nghiệm này đã có trong sổ tay rồi');
    return;
  }
  items.push({ id: Date.now() + '-' + type, type, month, note: '', completed: false });
  if (writeNotebook(items)) {
    toast('Đã lưu vào Sổ tay trải nghiệm của bạn');
  }
}

function notebookPage() {
  const items = readNotebook();
  return `
    ${head('Góc nhỏ lưu giữ kỷ niệm', 'Sổ tay trải nghiệm của em', 'Lưu lại những kế hoạch đi thăm vườn, những bài học và điều thú vị em quan sát được.')}
    <section class="wrap" style="padding-top:0">
      <div class="toolbar">
        <a href="#experiences" class="button primary">+ Chọn thêm trải nghiệm</a>
        <button id="export-notebook" class="secondary">Tải sổ tay về máy (.txt) ↓</button>
      </div>

      ${items.length ? items.map(x => `
        <article class="panel">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <div>
              <span class="tag ${x.completed ? '' : 'gold'}">Tháng ${x.month} · ${x.completed ? 'Em đã đi thực tế' : 'Kế hoạch dự kiến'}</span>
              <h3 style="margin:4px 0 0;">${farmActivities[x.type]?.title || 'Trải nghiệm quê hương'}</h3>
            </div>
            <button class="small" style="color:#dc2626;" data-remove-note="${esc(x.id)}">Xóa</button>
          </div>
          <label style="display:block; font-size:13.5px; font-weight:600; margin-bottom:6px;">
            Điều em học được & cảm nhận của em:
            <textarea data-note="${esc(x.id)}" maxlength="5000" style="width:100%; min-height:90px; margin-top:6px;" placeholder="Em đã biết cách chọn quả dứa chín ra sao? Chè được hái thế nào? Người nông dân đã kể câu chuyện gì?">${esc(x.note)}</textarea>
          </label>
          <label style="display:flex; align-items:center; gap:8px; font-size:13px; margin-top:10px;">
            <input data-done="${esc(x.id)}" type="checkbox" ${x.completed ? 'checked' : ''}> Em đã hoàn thành chuyến đi trải nghiệm này
          </label>
        </article>
      `).join('') : '<div class="panel" style="text-align:center; padding:40px; color:var(--muted);">Sổ tay còn trống. Hãy ghé trang Trải nghiệm để chọn một hoạt động bạn thích nhé!</div>'}
    </section>
  `;
}

function bindNotebook() {
  $$('[data-note]').forEach(e => e.onchange = () => {
    const items = readNotebook(), x = items.find(x => x.id === e.dataset.note);
    if (x) {
      x.note = e.value;
      writeNotebook(items);
      toast('Đã lưu ghi chép vào sổ tay');
    }
  });
  $$('[data-done]').forEach(e => e.onchange = () => {
    const items = readNotebook(), x = items.find(x => x.id === e.dataset.done);
    if (x) {
      x.completed = e.checked;
      writeNotebook(items);
      toast('Đã cập nhật trạng thái');
    }
  });
  $$('[data-remove-note]').forEach(e => e.onclick = () => {
    if (confirm('Xóa mục này khỏi sổ tay?')) {
      writeNotebook(readNotebook().filter(x => x.id !== e.dataset.removeNote));
      route();
    }
  });
  $('#export-notebook').onclick = () => download(
    'so-tay-trai-nghiem-bach-dang.txt',
    'SỔ TAY TRẢI NGHIỆM VÀ KHÁM PHÁ BẠCH ĐẰNG QUÊ EM\n\n' +
    readNotebook().map(x => `${farmActivities[x.type]?.title}\nThời gian: Tháng ${x.month} - ${x.completed ? 'Đã hoàn thành' : 'Kế hoạch'}\nGhi chép của em:\n${x.note || '(Chưa có ghi chép)'}\n--------------------------`).join('\n\n'),
    'text/plain'
  );
}
