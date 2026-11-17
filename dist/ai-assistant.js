'use strict';

(function () {
  const DEFAULT_STOP_ORDER = [
    { type: 'dua', id: 'dua-01', dur2: 45, dur4: 55, dur8: 85 },
    { type: 'ditich', id: 'ditich-01', dur2: 35, dur4: 45, dur8: 60 },
    { type: 'che', id: 'che-01', dur2: 35, dur4: 45, dur8: 60 },
    { type: 'mat', id: 'mat-01', dur2: 25, dur4: 35, dur8: 45 }
  ];

  const LOCATION_ALIASES = [
    { id: 'dua-01', keys: ['dua-01', 'ban sang', 'tran van tuan', 'ong tuan', 'vuon 01', 'garden 01'] },
    { id: 'dua-02', keys: ['dua-02', 'khuoi kep', 'hoang thi men', 'ba men', 'vuon 02', 'garden 02'] },
    { id: 'dua-03', keys: ['dua-03', 'trieu van dung', 'nong van binh', 'dua na roac', 'vuon 03', 'garden 03'] },
    { id: 'che-01', keys: ['che-01', 'nhat hanh', 'tai ho sin 1', 'co so nhat hanh', 'sao cui'] },
    { id: 'che-02', keys: ['che-02', 'tai ho sin 2', 'htx nong nghiep sach', 'hop tac xa nong nghiep sach'] },
    { id: 'mat-01', keys: ['mat-01', 'mat ong', 'nuoi ong', 'ong mat', 'bee', 'honey', 'wildflower'] },
    { id: 'ditich-01', keys: ['ditich-01', 'di tich', 'bac ho', 'ho chi minh', 'uncle ho', 'xe may', '28/3/1951', '1951', 'dai doi 200', 'dai doi 203', 'na roac 1', 'historic', 'relic', 'monument'] }
  ];

  const AI_UI_TEXT = {
    vi: {
      fabLabel: 'Hỏi AI · Giọng nói',
      headerBtn: '🎙️ Hỏi AI',
      headerBtnTitle: 'Trợ lý AI & Hỏi đáp giọng nói',
      panelTitle: 'Trợ lý AI Chạm Bạch Đằng',
      panelSub: 'Hỏi đáp tức thì · Giọng nói 2 chiều · Vẽ lộ trình',
      autoSpeakOn: '🔊 Đọc tự động: Bật',
      autoSpeakOff: '🔇 Đọc tự động: Tắt',
      settingsTitle: 'Cấu hình nâng cao (Tùy chọn)',
      clearTitle: 'Làm mới cuộc trò chuyện',
      closeTitle: 'Đóng khung chat',
      inputPlaceholder: 'Nhập câu hỏi hoặc bấm 🎙️ để hỏi bằng giọng nói...',
      micTitle: 'Hỏi bằng giọng nói (Speech-to-Text)',
      sendTitle: 'Gửi câu hỏi',
      listening: 'Đang lắng nghe giọng nói của bạn... Hãy nói tự nhiên!',
      stopListening: 'Dừng nghe',
      speakBtn: '🔊 Nghe trả lời',
      stopSpeakBtn: '⏹️ Dừng đọc',
      drawRouteBtn: '🗺️ Vẽ lộ trình trên Bản đồ',
      openPlannerBtn: '📅 Mở trang Lịch trình',
      downloadRouteBtn: '📥 Tải lộ trình (.txt)',
      flyMapBtn: '📍 Định vị trên Bản đồ',
      openPassportBtn: '📋 Hồ sơ & Mã QR',
      openStatsBtn: '📊 Xem Thống kê Vùng trồng',
      openExpBtn: '🌿 Xem Trải nghiệm Làm nông',
      openStoriesBtn: '📖 Đọc Câu chuyện Quê hương',
      routeDrawnToast: 'Đã vẽ lộ trình trực quan trên Bản đồ số!',
      routeClearedToast: 'Đã xóa đường vẽ lộ trình trên bản đồ',
      clearRouteBtn: '✕ Xóa lộ trình',
      noSttToast: 'Trình duyệt này chưa hỗ trợ nhận diện giọng nói trực tiếp (hãy dùng Chrome hoặc Edge). Bạn vẫn có thể gõ câu hỏi và bấm 🔊 để nghe AI đọc câu trả lời!',
      noTtsToast: 'Trình duyệt chưa hỗ trợ phát giọng đọc tự động.',
      apiKeyLabel: 'Khóa Gemini API (Tùy chọn — Mặc định AI đã hoạt động 100% Offline với kho tri thức chuẩn hóa của xã Bạch Đằng):',
      apiKeySave: 'Lưu cài đặt',
      apiKeySaved: 'Đã lưu cấu hình Trợ lý AI!',
      welcome: `Xin chào! Mình là <strong>Trợ lý AI Chạm Bạch Đằng</strong> 🤖🎙️.<br>Bạn có thể <strong>bấm nút Micro 🎙️ để hỏi bằng giọng nói</strong> hoặc chọn nhanh bên dưới. Mình có thể giúp bạn:
        <ul class="bd-ai-list">
          <li>🗺️ <strong>Tư vấn & vẽ lộ trình trực quan</strong> (2 giờ, 4 giờ, 1 ngày) ngay trên bản đồ số.</li>
          <li>🍍 <strong>Tra cứu mùa vụ, diện tích, sản lượng, giá bán</strong> dứa mật OCOP & chè Tài Hồ Sìn.</li>
          <li>⛩️ <strong>Kể chuyện lịch sử</strong> Di tích Bác Hồ tại Nà Roác (1951), ẩm thực & văn hóa bản địa.</li>
        </ul>`,
      chips: [
        { label: '🗺️ Vẽ lộ trình 4 giờ', query: 'Hãy gợi ý và vẽ lộ trình tham quan Bạch Đằng 4 giờ trên bản đồ' },
        { label: '🍍 Dứa mùa nào chín?', query: 'Đồi dứa Bạch Đằng mùa nào chín ngọt nhất?' },
        { label: '📊 Diện tích & sản lượng', query: 'Cho biết diện tích, sản lượng và giá trị kinh tế vùng dứa và chè Bạch Đằng' },
        { label: '⛩️ Di tích Bác Hồ', query: 'Giới thiệu Di tích Quốc gia Bác Hồ tại Nà Roác năm 1951' },
        { label: '🌱 Trải nghiệm hái chè', query: 'Trải nghiệm hái chè Tài Hồ Sìn và thu hoạch dứa có gì thú vị, cần lưu ý gì?' },
        { label: '🍲 Đặc sản & Ẩm thực', query: 'Đến Bạch Đằng nên thưởng thức món ngon và đặc sản gì?' }
      ]
    },
    en: {
      fabLabel: 'Ask AI · Voice',
      headerBtn: '🎙️ Ask AI',
      headerBtnTitle: 'AI Assistant & Voice Q&A',
      panelTitle: 'Bach Dang AI Assistant',
      panelSub: 'Instant Q&A · 2-Way Voice · Visual Map Routing',
      autoSpeakOn: '🔊 Auto-Speak: ON',
      autoSpeakOff: '🔇 Auto-Speak: OFF',
      settingsTitle: 'Advanced Settings (Optional)',
      clearTitle: 'Reset conversation',
      closeTitle: 'Close assistant',
      inputPlaceholder: 'Ask anything or tap 🎙️ to speak...',
      micTitle: 'Ask by voice (Speech-to-Text)',
      sendTitle: 'Send message',
      listening: 'Listening to your voice... Speak naturally!',
      stopListening: 'Stop',
      speakBtn: '🔊 Listen',
      stopSpeakBtn: '⏹️ Stop audio',
      drawRouteBtn: '🗺️ Draw Route on Map',
      openPlannerBtn: '📅 Open Trip Planner',
      downloadRouteBtn: '📥 Download (.txt)',
      flyMapBtn: '📍 Locate on Map',
      openPassportBtn: '📋 Profile & QR Code',
      openStatsBtn: '📊 Open Crop Statistics',
      openExpBtn: '🌿 Farming Experiences',
      openStoriesBtn: '📖 Read Homeland Stories',
      routeDrawnToast: 'Visual itinerary route drawn on the Digital Map!',
      routeClearedToast: 'Cleared itinerary route from map',
      clearRouteBtn: '✕ Clear route',
      noSttToast: 'Voice recognition is best supported on Chrome/Edge. You can type your question and tap 🔊 to hear spoken AI answers!',
      noTtsToast: 'Speech synthesis is not supported on this browser.',
      apiKeyLabel: 'Optional Gemini API Key (By default, AI works 100% Offline using verified Bach Dang WebGIS knowledge):',
      apiKeySave: 'Save',
      apiKeySaved: 'AI Assistant settings saved!',
      welcome: `Hello! I am the <strong>Touch Bach Dang AI Voice Assistant</strong> 🤖🎙️.<br>Tap the <strong>Microphone 🎙️ to ask by voice</strong> or pick a topic below. I can help you:
        <ul class="bd-ai-list">
          <li>🗺️ <strong>Plan & draw visual routes</strong> (2h, 4h, or full day) directly on the interactive map.</li>
          <li>🍍 <strong>Look up harvest seasons, crop areas, yields & prices</strong> for Queen pineapples & Tai Ho Sin tea.</li>
          <li>⛩️ <strong>Explore heritage stories</strong> of President Ho Chi Minh at Na Roac (1951) and local cuisine.</li>
        </ul>`,
      chips: [
        { label: '🗺️ Draw 4h Route', query: 'Suggest and draw a 4-hour Bach Dang itinerary on the map' },
        { label: '🍍 Best Pineapple Season', query: 'When is the peak harvest season for Bach Dang pineapples and tea?' },
        { label: '📊 Crop Area & Yield', query: 'What are the total area, yield, and economic value of pineapples and tea?' },
        { label: '⛩️ Uncle Ho Historic Site', query: 'Tell me about the President Ho Chi Minh National Historic Site at Na Roac' },
        { label: '🌱 Farming Experiences', query: 'What hands-on tea picking and pineapple harvesting experiences are available?' },
        { label: '🍲 Local Specialties', query: 'What local food and specialties should I try in Bach Dang?' }
      ]
    }
  };

  function getLang(overrideLang) {
    if (overrideLang === 'en' || overrideLang === 'vi') return overrideLang;
    if (typeof currentLang !== 'undefined' && (currentLang === 'en' || currentLang === 'vi')) return currentLang;
    if (typeof document !== 'undefined' && document.documentElement.lang === 'en') return 'en';
    return 'vi';
  }

  function uiText(key, langOverride) {
    const l = getLang(langOverride);
    return (AI_UI_TEXT[l] && AI_UI_TEXT[l][key]) || AI_UI_TEXT.vi[key] || key;
  }

  function normalizeVi(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9/\s.-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeHtml(v) {
    return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function calcDistanceKm(lat1, lon1, lat2, lon2) {
    if (typeof haversineDist === 'function') {
      return haversineDist(lat1, lon1, lat2, lon2) / 1000;
    }
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function getAllRecords(customRecords) {
    if (Array.isArray(customRecords) && customRecords.length) return customRecords;
    if (typeof records !== 'undefined' && Array.isArray(records) && records.length) return records;
    if (typeof window !== 'undefined' && Array.isArray(window.DEFAULT_RECORDS)) return window.DEFAULT_RECORDS;
    return [];
  }

  function getLocalizedRecord(r, lang) {
    if (!r) return null;
    if (lang === 'en' && typeof RECORD_EN !== 'undefined' && RECORD_EN[r.id]) {
      return { ...r, ...RECORD_EN[r.id] };
    }
    return r;
  }

  function stripForSpeech(htmlOrText, langOverride) {
    const lang = getLang(langOverride);
    let txt = String(htmlOrText || '')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<\/(li|p|div|h[1-6]|tr)>/gi, '. ')
      .replace(/<br\s*\/?>/gi, ', ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Remove decorative emojis & arrows so TTS reads naturally
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}↗→↓📍🗺️📋📊🌿📖🔊⏹️🎙️🤖⚡🍍🌱🍯⛩️]/gu, ' ');

    if (lang === 'vi') {
      txt = txt
        .replace(/\b(\d+[.,]?\d*)\s*ha\b/gi, '$1 héc-ta')
        .replace(/\b(\d+[.,]?\d*)\s*km\b/gi, '$1 ki-lô-mét')
        .replace(/\bđ\/kg\b/gi, 'đồng một ki-lô-gam')
        .replace(/\btạ\/ha\b/gi, 'tạ trên héc-ta')
        .replace(/\bOCOP\b/g, 'Ô-cốp')
        .replace(/\bVietGAP\b/gi, 'Việt-gáp')
        .replace(/\bWebGIS\b/gi, 'Web G I S');
    } else {
      txt = txt
        .replace(/\b(\d+[.,]?\d*)\s*ha\b/gi, '$1 hectares');
    }

    return txt.replace(/\s+/g, ' ').replace(/\s+([.,;!?])/g, '$1').replace(/\.{2,}/g, '.').trim();
  }

  function buildAiItinerary(options = {}) {
    const lang = getLang(options.lang);
    const hours = [2, 4, 8].includes(Number(options.hours)) ? Number(options.hours) : 4;
    const startStr = /^\d{1,2}:\d{2}$/.test(String(options.start || '')) ? String(options.start) : '08:00';
    const allowedTypes = Array.isArray(options.types) && options.types.length ? options.types : ['dua', 'ditich', 'che', 'mat'];
    const recs = getAllRecords(options.records);

    const [startH, startM] = startStr.split(':').map(Number);
    let currentMin = startH * 60 + startM;
    const budget = hours * 60;
    let usedMin = 0;

    const descVi = {
      dua: 'Đón nắng sớm trên triền đồi sỏi son Bản Sẳng, check-in đồi dứa mật OCOP 3 sao và thưởng thức dứa tươi tại vườn.',
      ditich: 'Dâng hương & tìm hiểu lịch sử ngày 28/3/1951 khi Bác Hồ thăm Đại đội xe - máy đầu tiên tại rừng Nà Roác.',
      che: 'Lên đỉnh đèo mờ sương Tài Hồ Sìn, trải nghiệm hái búp "1 tôm 2 lá" và nhâm nhi chè xanh sao củi truyền thống.',
      mat: 'Tham quan mô hình nuôi ong mật hoa rừng tự nhiên dưới tán rừng Nà Roác và chọn mua quà quê truy xuất QR.'
    };
    const descEn = {
      dua: 'Greet early sunshine on Ban Sang red-gravel slopes, take photos and taste crisp OCOP 3-star Queen pineapples.',
      ditich: 'Discover the sacred March 28, 1951 heritage where President Ho Chi Minh visited the first Military Vehicle Corps.',
      che: 'Ascend misty Tai Ho Sin pass, try picking "one-bud two-leaves" shoots and sip firewood-roasted green tea.',
      mat: 'Visit natural forest wildflower bee colonies at Na Roac fringe and select QR-traceable pure mountain honey.'
    };

    const fmtClock = m => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
    const stops = [];

    for (const item of DEFAULT_STOP_ORDER) {
      if (!allowedTypes.includes(item.type)) continue;
      const dur = hours === 2 ? item.dur2 : hours === 8 ? item.dur8 : item.dur4;
      const moveMin = 15;
      if (usedMin + moveMin + dur > budget) continue;

      const rawRec = recs.find(r => r.id === item.id) || recs.find(r => r.type === item.type);
      if (!rawRec) continue;
      const rec = getLocalizedRecord(rawRec, lang);

      let legKm = 0;
      if (stops.length > 0) {
        const prev = stops[stops.length - 1];
        legKm = calcDistanceKm(prev.lat, prev.lng, rec.lat, rec.lng);
      }

      currentMin += moveMin;
      usedMin += moveMin;
      const startClock = fmtClock(currentMin);
      const endClock = fmtClock(currentMin + dur);
      currentMin += dur;
      usedMin += dur;

      stops.push({
        order: stops.length + 1,
        id: rec.id,
        type: rec.type,
        name: rec.name,
        owner: rec.owner,
        lat: rec.lat,
        lng: rec.lng,
        startClock,
        endClock,
        durationMin: dur,
        legKm: Number(legKm.toFixed(2)),
        summary: lang === 'en' ? descEn[item.type] : descVi[item.type]
      });
    }

    const totalStraightKm = stops.reduce((s, x) => s + x.legKm, 0);
    // Mountain road winding factor ~1.35x straight-line Haversine distance
    const estRoadKm = Number((totalStraightKm * 1.35).toFixed(1));

    const plainText = (lang === 'en'
      ? `BACH DANG SMART AI ITINERARY (${hours} HOURS)\nDeparture: ${startStr} | Est. road distance: ~${estRoadKm} km\n\n`
      : `LỘ TRÌNH AI GỢI Ý KHÁM PHÁ BẠCH ĐẰNG (${hours} GIỜ)\nXuất phát: ${startStr} | Quãng đường ước tính: ~${estRoadKm} km\n\n`) +
      stops.map(s => `${s.order}. [${s.startClock} - ${s.endClock}] ${s.name}\n   - ${s.summary}`).join('\n\n');

    return {
      hours,
      start: startStr,
      budgetMin: budget,
      usedMin,
      estRoadKm,
      stops,
      stopIds: stops.map(s => s.id),
      plainText
    };
  }

  // Conversational state for follow-up questions
  const chatMemory = {
    lastRecordId: null,
    lastCrop: null,
    lastHours: 4,
    lastRoutePlan: null
  };

  function detectMonth(normQuery) {
    const mVi = normQuery.match(/\bthang\s*(1[0-2]|[1-9])\b/);
    if (mVi) return Number(mVi[1]);
    const monthsEn = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    for (let i = 0; i < monthsEn.length; i++) {
      if (normQuery.includes(monthsEn[i])) return i + 1;
    }
    if (/\b(bay gio|hien tai|hom nay|thang nay|now|current|this month|today)\b/.test(normQuery)) {
      return new Date().getMonth() + 1;
    }
    return null;
  }

  function matchSpecificLocation(normQuery, recs) {
    for (const entry of LOCATION_ALIASES) {
      if (entry.keys.some(k => normQuery.includes(k))) {
        const found = recs.find(r => r.id === entry.id);
        if (found) return found;
      }
    }
    return null;
  }

  function askBachDangAI(query, options = {}) {
    const lang = getLang(options.lang);
    const isEn = lang === 'en';
    const rawQ = String(query || '').trim();
    const norm = normalizeVi(rawQ);
    const recs = getAllRecords(options.records);
    const ds = (typeof customerDataset !== 'undefined' && customerDataset) ? customerDataset : (options.customerDataset || null);

    if (!norm) {
      return {
        intent: 'greeting',
        html: uiText('welcome', lang),
        speech: stripForSpeech(uiText('welcome', lang), lang),
        actions: []
      };
    }

    // 1. Check Route / Itinerary / Map Direction intent
    const isRouteIntent = /\b(lo trinh|lich trinh|ve duong|ve lo trinh|chi duong|di dau|di tham quan|tour|kham pha trong|nua ngay|ca ngay|1 ngay|mot ngay|[248][\s-]*(gio|tieng|hours?)|itinerary|route|plan a trip|schedule|directions|half[\s-]*day|full[\s-]*day)\b/.test(norm);
    const wantsAutoDraw = /\b(ve duong|ve lo trinh|tren ban do|chi duong|draw|on map|on the map|show route)\b/.test(norm);

    if (isRouteIntent) {
      let hours = 4;
      if (/\b(2[\s-]*gio|2[\s-]*tieng|2h|2[\s-]*hours?|two[\s-]*hours?|ghe nhanh|quick)\b/.test(norm)) hours = 2;
      else if (/\b(8[\s-]*gio|8[\s-]*tieng|8h|8[\s-]*hours?|full[\s-]*day|1[\s-]*ngay|mot[\s-]*ngay|ca[\s-]*ngay|tron[\s-]*ngay)\b/.test(norm)) hours = 8;
      else if (/\b(4[\s-]*gio|4[\s-]*tieng|4h|4[\s-]*hours?|nua[\s-]*ngay|half[\s-]*day|buoi[\s-]*sang)\b/.test(norm)) hours = 4;

      const timeMatch = rawQ.match(/\b([01]?\d|2[0-3])[:h]([0-5]\d)\b/i);
      const start = timeMatch ? `${String(timeMatch[1]).padStart(2, '0')}:${timeMatch[2]}` : '08:00';

      const selectedTypes = [];
      if (/\b(dua|pineapple)\b/.test(norm)) selectedTypes.push('dua');
      if (/\b(di tich|bac ho|lich su|na roac|historic|uncle ho|relic)\b/.test(norm)) selectedTypes.push('ditich');
      if (/\b(che|tra|tea)\b/.test(norm)) selectedTypes.push('che');
      if (/\b(mat ong|ong|honey|bee)\b/.test(norm)) selectedTypes.push('mat');

      const plan = buildAiItinerary({
        lang,
        hours,
        start,
        types: selectedTypes.length >= 2 ? selectedTypes : ['dua', 'ditich', 'che', 'mat'],
        records: recs
      });
      chatMemory.lastHours = hours;
      chatMemory.lastRoutePlan = plan;

      const timelineHtml = plan.stops.map(s => `
        <div class="bd-ai-route-step">
          <span class="bd-ai-step-num">${s.order}</span>
          <div class="bd-ai-step-body">
            <div class="bd-ai-step-time">${escapeHtml(s.startClock)} - ${escapeHtml(s.endClock)} (${s.durationMin} ${isEn ? 'min' : 'phút'}${s.legKm > 0 ? ` · +${s.legKm} km` : ''})</div>
            <strong>${escapeHtml(s.name)}</strong>
            <p>${escapeHtml(s.summary)}</p>
          </div>
        </div>
      `).join('');

      const html = isEn
        ? `<p>Here is the optimal <strong>${hours}-hour Bach Dang exploration itinerary</strong> (${plan.stops.length} stops, ~<strong>${plan.estRoadKm} km</strong> mountain route, starting at ${plan.start}):</p>
           <div class="bd-ai-route-box">${timelineHtml}</div>
           <p class="bd-ai-tip">💡 Tap <strong>Draw Route on Map</strong> below to view numbered stops and route lines directly on the interactive WebGIS!</p>`
        : `<p>Mình gợi ý <strong>lộ trình khám phá Bạch Đằng ${hours} giờ</strong> thuận đường nhất (${plan.stops.length} điểm chạm, tổng quãng đường ~<strong>${plan.estRoadKm} km</strong>, xuất phát lúc ${plan.start}):</p>
           <div class="bd-ai-route-box">${timelineHtml}</div>
           <p class="bd-ai-tip">💡 Bấm nút <strong>Vẽ lộ trình trên Bản đồ</strong> bên dưới để xem đường nối trực quan giữa các điểm nhé!</p>`;

      const speechSummary = isEn
        ? `I have prepared a ${hours}-hour itinerary across ${plan.stops.length} stops in Bach Dang covering about ${plan.estRoadKm} kilometers: ` +
          plan.stops.map(s => `Stop ${s.order} from ${s.startClock}, visit ${s.name}`).join('. ') +
          `. Tap Draw Route on Map to see the visual path.`
        : `Mình đã thiết kế lộ trình ${hours} giờ qua ${plan.stops.length} điểm tại xã Bạch Đằng, quãng đường khoảng ${plan.estRoadKm} ki-lô-mét: ` +
          plan.stops.map(s => `Điểm ${s.order} lúc ${s.startClock}, thăm ${s.name}`).join('. ') +
          `. Bạn có thể bấm Vẽ lộ trình trên Bản đồ để quan sát trực quan nhé.`;

      return {
        intent: 'route',
        routePlan: plan,
        autoDraw: wantsAutoDraw,
        html,
        speech: speechSummary,
        actions: [
          { type: 'draw-route', stops: plan.stopIds.join(','), label: uiText('drawRouteBtn', lang), primary: true },
          { type: 'download-route', label: uiText('downloadRouteBtn', lang) },
          { type: 'nav', href: '#planner', label: uiText('openPlannerBtn', lang) }
        ]
      };
    }

    // 2. Check Specific Location / Heritage / Follow-up Pronoun Lookup
    let matchedLoc = matchSpecificLocation(norm, recs);
    const isFollowUpLoc = !matchedLoc && chatMemory.lastRecordId && /\b(chu vuon|ai quan ly|o dau|toa do|dien tich vuon nay|chi duong toi do|owner|where is it|coordinates|locate it)\b/.test(norm);
    if (isFollowUpLoc) {
      matchedLoc = recs.find(r => r.id === chatMemory.lastRecordId) || null;
    }

    if (matchedLoc) {
      chatMemory.lastRecordId = matchedLoc.id;
      chatMemory.lastCrop = matchedLoc.type;
      const loc = getLocalizedRecord(matchedLoc, lang);
      const isHeritage = loc.type === 'ditich';
      const metaLine = isHeritage
        ? (isEn
          ? `<li>🏛️ <strong>Classification:</strong> National Historic Monument (March 28, 1951)</li><li>⏰ <strong>Opening:</strong> ${escapeHtml(loc.season)}</li>`
          : `<li>🏛️ <strong>Xếp hạng:</strong> Di tích Lịch sử cấp Quốc gia (sự kiện 28/3/1951)</li><li>⏰ <strong>Thời gian mở cửa:</strong> ${escapeHtml(loc.season)}</li>`)
        : (isEn
          ? `<li>👩‍🌾 <strong>Owner / Manager:</strong> ${escapeHtml(loc.owner)}</li>
             <li>📐 <strong>Scale & Output:</strong> ${loc.area ? `${loc.area} ha` : 'Local cooperative'}${loc.production ? ` · ~${loc.production} tons/crop` : ''}</li>
             <li>🗓️ <strong>Harvest Season:</strong> ${escapeHtml(loc.season)}</li>`
          : `<li>👩‍🌾 <strong>Chủ hộ / Quản lý:</strong> ${escapeHtml(loc.owner)}</li>
             <li>📐 <strong>Quy mô & Sản lượng:</strong> ${loc.area ? `${String(loc.area).replace('.', ',')} ha` : 'Mô hình hợp tác xã'}${loc.production ? ` · ~${String(loc.production).replace('.', ',')} tấn/vụ` : ''}</li>
             <li>🗓️ <strong>Mùa vụ thu hoạch:</strong> ${escapeHtml(loc.season)}</li>`);

      const html = `
        <p>📍 <strong>${escapeHtml(loc.name)}</strong></p>
        <p>${escapeHtml(loc.description)}</p>
        <ul class="bd-ai-list">
          ${metaLine}
          <li>🧭 <strong>${isEn ? 'Address & GPS' : 'Địa chỉ & Tọa độ GPS'}:</strong> ${escapeHtml(loc.address)} (<code>${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}</code>)</li>
        </ul>
      `;

      return {
        intent: 'location',
        recordId: loc.id,
        html,
        speech: stripForSpeech(html, lang),
        actions: [
          { type: 'fly', id: loc.id, label: uiText('flyMapBtn', lang), primary: true },
          { type: 'detail', id: loc.id, label: uiText('openPassportBtn', lang) }
        ]
      };
    }

    // 3. Check Seasonality / Best Month to Visit
    const queriedMonth = detectMonth(norm);
    const isSeasonIntent = queriedMonth !== null || /\b(mua nao|mua vu|thang may|khi nao chin|mua dua|mua che|thoi diem dep|season|when to visit|best time|ripe|harvest time)\b/.test(norm);
    if (isSeasonIntent) {
      if (queriedMonth) {
        const duaPeak = [5, 6, 7].includes(queriedMonth);
        const cheMain = [3, 4, 5, 6, 7, 8, 9, 10].includes(queriedMonth);
        const matMain = [3, 4, 5, 6].includes(queriedMonth);
        const html = isEn
          ? `<p>🗓️ <strong>Visiting Bach Dang in Month ${queriedMonth}:</strong></p>
             <ul class="bd-ai-list">
               <li>🍍 <strong>Queen Pineapples:</strong> ${duaPeak ? '<strong>PEAK GOLDEN HARVEST!</strong> Hills across Ban Sang & Khuoi Kep are fragrant and sweetest right now.' : 'Off-peak staggered pineapples are still cultivated year-round (peak harvest is May–July).'}</li>
               <li>🌱 <strong>Tai Ho Sin Green Tea:</strong> ${cheMain ? '<strong>IN LUSH HARVEST SEASON!</strong> Ideal for picking "one-bud two-leaves" tea shoots and firewood roasting.' : 'Winter rest period for ancient tea bushes (main tea harvest runs March–October).'}</li>
               <li>🍯 <strong>Wildflower Honey:</strong> ${matMain ? '<strong>Fresh forest blossom honey season!</strong>' : 'Stored pure honey jars remain available at local cooperatives.'}</li>
               <li>⛩️ <strong>Na Roac National Historic Relic:</strong> Open year-round for sightseeing and heritage learning.</li>
             </ul>`
          : `<p>🗓️ <strong>Tư vấn mùa vụ Bạch Đằng vào Tháng ${queriedMonth}:</strong></p>
             <ul class="bd-ai-list">
               <li>🍍 <strong>Đồi dứa mật Bạch Đằng:</strong> ${duaPeak ? '<strong>ĐANG VÀO CHÍNH VỤ CHÍN RỘ!</strong> Triền đồi Bản Sẳng, Khuổi Kép vàng ươm, thơm lừng và ngọt đậm nhất trong năm.' : 'Đang ở giai đoạn chăm sóc/dứa rải vụ quanh năm (chính vụ rộ nhất từ tháng 5 đến tháng 7).'}</li>
               <li>🌱 <strong>Đồi chè Tài Hồ Sìn:</strong> ${cheMain ? '<strong>ĐANG MÙA THU HÁI BÚP NON!</strong> Rất lý tưởng để trải nghiệm hái chè "1 tôm 2 lá" và sao chè bếp củi.' : 'Cây chè đang nghỉ đông tích nhựa trên đỉnh đèo (vụ hái chính từ tháng 3 đến tháng 10).'}</li>
               <li>🍯 <strong>Mật ong hoa rừng:</strong> ${matMain ? '<strong>Đang mùa quay mật hoa rừng đầu hạ thơm ngon nhất!</strong>' : 'Hợp tác xã vẫn sẵn mật ong rừng nguyên chất đóng chai truy xuất mã QR.'}</li>
               <li>⛩️ <strong>Di tích Bác Hồ tại Nà Roác:</strong> Mở cửa đón khách tham quan quanh năm.</li>
             </ul>`;
        return {
          intent: 'season',
          html,
          speech: stripForSpeech(html, lang),
          actions: [
            { type: 'nav', href: '#experiences', label: uiText('openExpBtn', lang), primary: true },
            { type: 'draw-route', stops: 'dua-01,ditich-01,che-01,mat-01', label: uiText('drawRouteBtn', lang) }
          ]
        };
      }

      const html = isEn
        ? `<p>🌤️ <strong>Ideal Seasons to Explore Bach Dang:</strong></p>
           <ul class="bd-ai-list">
             <li>🍍 <strong>Queen Pineapples (Ban Sang, Khuoi Kep, Na Roac):</strong> Peak ripening from <strong>May to July</strong> (staggered crops available year-round). Harvested at dawn (4–6 AM) when dew keeps fruits crisp and honey-sweet!</li>
             <li>🌱 <strong>Tai Ho Sin Ancient Green Tea:</strong> Harvested from <strong>March to October</strong> (extending into November).</li>
             <li>🍯 <strong>Wildflower Beekeeping:</strong> Spring–early summer blossom season from <strong>March to June</strong>.</li>
             <li>⛩️ <strong>President Ho Chi Minh Historic Relic:</strong> Welcomes visitors <strong>all 12 months</strong>.</li>
           </ul>`
        : `<p>🌤️ <strong>Lịch mùa vụ đẹp nhất tại xã Bạch Đằng:</strong></p>
           <ul class="bd-ai-list">
             <li>🍍 <strong>Dứa mật Queen (Bản Sẳng, Khuổi Kép, Nà Roác):</strong> Chính vụ chín rộ từ <strong>tháng 5 đến tháng 7</strong> (ngoài ra có dứa rải vụ quanh năm). Bà con thường thu hái lúc rạng đông (4h–6h sáng) để quả giòn ngọt nhất!</li>
             <li>🌱 <strong>Chè xanh Tài Hồ Sìn:</strong> Hái búp non từ <strong>tháng 3 đến tháng 10</strong> (kéo dài sang tháng 11).</li>
             <li>🍯 <strong>Mật ong hoa rừng Nà Roác:</strong> Mùa hoa rừng nở rộ từ <strong>tháng 3 đến tháng 6</strong>.</li>
             <li>⛩️ <strong>Di tích Quốc gia Bác Hồ với ngành Xe - Máy:</strong> Mở cửa tham quan <strong>quanh năm</strong>.</li>
           </ul>`;
      return {
        intent: 'season',
        html,
        speech: stripForSpeech(html, lang),
        actions: [
          { type: 'nav', href: '#experiences', label: uiText('openExpBtn', lang), primary: true },
          { type: 'nav', href: '#stats', label: uiText('openStatsBtn', lang) }
        ]
      };
    }

    // 4. Check Statistics, Area, Yield, Price, OCOP, VietGAP & Discrepancy Audit
    const isStatsIntent = /\b(dien tich|san luong|nang suat|bao nhieu ha|bao nhieu tan|gia ban|gia bao nhieu|bao nhieu tien|doanh thu|kinh te|ocop|vietgap|ma so vung trong|msvt|chenh lech|sai so|thong ke|so lieu|area|production|yield|hectare|tons|price|cost|revenue|discrepancy|statistics|stats)\b/.test(norm);
    if (isStatsIntent) {
      const kpi = ds ? ds.kpiSummary : { totalPineappleArea: 127.6, harvestPineappleArea: 90, teaArea: 5, pineappleRecordedYield: 1538.5, vietgapTargetArea: 30, discrepancyTons: 90.5 };
      const asksDiscrepancy = /\b(chenh lech|sai so|90 5|90,5|1629|ly thuyet|discrepancy|difference|audit)\b/.test(norm);

      if (asksDiscrepancy) {
        const html = isEn
          ? `<p>🔍 <strong>Scientific Data Cross-Check (90.5-Ton Yield Difference):</strong></p>
             <ul class="bd-ai-list">
               <li>📐 <strong>Theoretical Yield:</strong> 90.0 ha harvested × 18.1 tons/ha = <strong>1,629.0 tons</strong>.</li>
               <li>📊 <strong>Official Recorded Output:</strong> <strong>1,538.5 tons</strong> (Difference: <strong>90.5 tons ~ 5.5%</strong>).</li>
               <li>💡 <strong>3 Empirical Causes:</strong> (1) Post-harvest sorting & grade-2/3 fruit loss (~5.5%); (2) Statistical cutoff timing between main-crop and staggered off-season harvests; (3) Gap between registered cultivation area and simultaneously fruiting area.</li>
             </ul>`
          : `<p>🔍 <strong>Đối soát dữ liệu khoa học (Độ lệch 90,5 tấn sản lượng dứa):</strong></p>
             <ul class="bd-ai-list">
               <li>📐 <strong>Sản lượng lý thuyết:</strong> 90,0 ha thu hoạch × 18,1 tấn/ha (181 tạ/ha) = <strong>1.629,0 tấn</strong>.</li>
               <li>📊 <strong>Sản lượng thống kê thực tế:</strong> <strong>1.538,5 tấn</strong> (Chênh lệch <strong>90,5 tấn ~ 5,5%</strong>).</li>
               <li>💡 <strong>3 nguyên nhân thực tiễn:</strong> (1) Hao hụt sau thu hoạch và phân loại quả loại 2, loại 3 (~5,5%); (2) Độ lệch thời điểm chốt số liệu giữa chính vụ và dứa rải vụ trái mùa; (3) Độ chênh giữa diện tích đăng ký và diện tích cho trái đồng loạt.</li>
             </ul>`;
        return {
          intent: 'stats',
          html,
          speech: stripForSpeech(html, lang),
          actions: [{ type: 'nav', href: '#stats', label: uiText('openStatsBtn', lang), primary: true }]
        };
      }

      const html = isEn
        ? `<p>📊 <strong>Official Agricultural & Economic Figures of Bach Dang Commune:</strong></p>
           <ul class="bd-ai-list">
             <li>🍍 <strong>Bach Dang Queen Pineapple (Code <code>VN-CB-BD-DUA-01</code>):</strong> Total area <strong>${kpi.totalPineappleArea} ha</strong> (<strong>${kpi.harvestPineappleArea} ha</strong> harvesting), output <strong>1,538.5 tons/year</strong> (yield 181 quintals/ha), cultivated by <strong>&gt;100 households</strong>. Planned <strong>30.0 ha VietGAP</strong> & OCOP 3-star. Farm-gate price: <strong>10,000 – 13,500 VND/kg</strong> (~15.38 billion VND/year).</li>
             <li>🌱 <strong>Tai Ho Sin Green Tea (Code <code>VN-CB-BD-CHE-01</code>):</strong> Area <strong>5.0 ha</strong>, output <strong>7.5 tons</strong> of finished dry tea buds/year (yield 15 quintals/ha), finalizing provincial 3-star OCOP. Reference price: <strong>180,000 VND/kg</strong> (~1.35 billion VND/year).</li>
           </ul>`
        : `<p>📊 <strong>Số liệu vùng trồng & giá trị kinh tế xã Bạch Đằng (chuẩn hóa):</strong></p>
           <ul class="bd-ai-list">
             <li>🍍 <strong>Dứa Bạch Đằng (MSVT <code>VN-CB-BD-DUA-01</code>):</strong> Tổng diện tích <strong>127,6 ha</strong> (diện tích đang thu hoạch <strong>90,0 ha</strong>), sản lượng thực tế <strong>1.538,5 tấn/năm</strong> (năng suất 181 tạ/ha) với <strong>hơn 100 hộ</strong> canh tác. Quy hoạch <strong>30,0 ha VietGAP</strong>, đạt chuẩn OCOP 3 sao. Giá bán khoảng <strong>10.000 – 13.500 đ/kg</strong> (ước tính ~15,38 tỷ đồng/năm).</li>
             <li>🌱 <strong>Chè Tài Hồ Sìn (MSVT <code>VN-CB-BD-CHE-01</code>):</strong> Diện tích <strong>5,0 ha</strong>, sản lượng <strong>7,5 tấn</strong> chè búp khô/năm (năng suất 15 tạ/ha), đang hoàn thiện hồ sơ OCOP 3 sao. Giá tham khảo <strong>180.000 đ/kg</strong> (~1,35 tỷ đồng/năm).</li>
           </ul>`;
      return {
        intent: 'stats',
        html,
        speech: stripForSpeech(html, lang),
        actions: [
          { type: 'nav', href: '#stats', label: uiText('openStatsBtn', lang), primary: true },
          { type: 'fly', id: 'dua-01', label: uiText('flyMapBtn', lang) }
        ]
      };
    }

    // 5. Check Hands-on Farming Experiences & Safety Tips
    const isExpIntent = /\b(trai nghiem|lam nong|hai che|be dua|thu hoach|1 tom 2 la|mot tom hai la|gai dua|trang phuc|mac gi|luu y|an toan|ahp|experience|activity|pick tea|harvest pineapple|safety|wear|clothing)\b/.test(norm);
    if (isExpIntent) {
      const html = isEn
        ? `<p>🌿 <strong>Hands-on Farming Experiences in Bach Dang:</strong></p>
           <ul class="bd-ai-list">
             <li>🌱 <strong>A Morning as a Tea Picker (90 mins · Mar–Oct):</strong> Meet Tai Ho Sin growers, practice hand-picking tender <em>"1 bud 2 leaves"</em> shoots, watch traditional cast-iron pan firewood roasting, and sip hot young-rice-scented green tea.</li>
             <li>🍍 <strong>Following Pineapple Growers (120 mins · May–Jul):</strong> Learn how Queen pineapples thrive on red gravel slopes, spot ripe golden-eyed fruits, harvest safely with farmers, and taste fresh pineapple on the hilltop.</li>
             <li>⚠️ <strong>Safety & Attire Tips:</strong> Wear closed-toe shoes, long trousers, and a sun hat; bring water; <strong>pineapple leaves have sharp thorns</strong> so always enter rows alongside the garden host!</li>
           </ul>`
        : `<p>🌿 <strong>Trải nghiệm "Một ngày làm nông dân Bạch Đằng":</strong></p>
           <ul class="bd-ai-list">
             <li>🌱 <strong>Một buổi làm người hái chè (90 phút · Tháng 3–10):</strong> Lên đèo Tài Hồ Sìn thực hành hái búp non chuẩn <em>"1 tôm 2 lá"</em>, tìm hiểu kỹ thuật sao chè chảo gang bằng củi đượm hương cốm non và thưởng trà nóng cùng bà con.</li>
             <li>🍍 <strong>Theo chân người trồng dứa (120 phút · Tháng 5–7):</strong> Khám phá cách chọn quả dứa mật mắt nở phẳng, vỏ ửng vàng 2/3 thân, thực hành thu hái an toàn và thưởng thức dứa ngọt thanh ngay tại đồi.</li>
             <li>⚠️ <strong>Lưu ý an toàn:</strong> Đi giày thể thao kín mũi, mặc quần dài gọn gàng, đội mũ rộng vành; vì <strong>lá dứa có gai nhỏ</strong> nên luôn đi theo hướng dẫn của chủ vườn nhé!</li>
           </ul>`;
      return {
        intent: 'experience',
        html,
        speech: stripForSpeech(html, lang),
        actions: [
          { type: 'nav', href: '#experiences', label: uiText('openExpBtn', lang), primary: true },
          { type: 'draw-route', stops: 'dua-01,che-01', label: uiText('drawRouteBtn', lang) }
        ]
      };
    }

    // 6. Check Cuisine, Specialties, Cultural Stories & Heritage
    const isFoodOrStoryIntent = /\b(am thuc|an gi|mon ngon|dac san|mua qua|qua que|xoi tram|banh trung kien|vit quay|dua xao|cau chuyen|ke chuyen|van hoa|tay nung|lich su|food|eat|cuisine|dish|specialty|gift|souvenir|story|culture)\b/.test(norm);
    if (isFoodOrStoryIntent) {
      const html = isEn
        ? `<p>🍲 <strong>Bach Dang Highland Cuisine & Gift Specialties:</strong></p>
           <ul class="bd-ai-list">
             <li>🍍 <strong>Fresh & Dried Honey Pineapples:</strong> Crisp fresh Queen pineapples, stir-fried pineapple with local pork/beef, and soft-dried OCOP pineapple slices.</li>
             <li>🍵 <strong>Tai Ho Sin Firewood-Roasted Green Tea:</strong> Handcrafted highland tea with a roasted young-rice aroma and deep sweet aftertaste.</li>
             <li>🍯 <strong>Na Roac Wildflower Honey:</strong> Pure golden forest honey harvested from wild tea, mint, and pineapple blossoms.</li>
             <li>🥢 <strong>Tay – Nung Traditional Dishes:</strong> Purple-black canarium sticky rice (<em>xôi trám đen</em>), fragrant ant-egg cake (<em>bánh trứng kiến</em>), and seven-flavor roasted stream duck.</li>
           </ul>`
        : `<p>🍲 <strong>Ẩm thực bản địa & Quà quê đặc sản Bạch Đằng:</strong></p>
           <ul class="bd-ai-list">
             <li>🍍 <strong>Dứa mật tươi & chế biến:</strong> Dứa mật Queen ăn tươi mát lịm, món <em>dứa xào thịt bò / thịt lợn bản</em> chua ngọt đưa cơm, và dứa sấy dẻo OCOP.</li>
             <li>🍵 <strong>Chè búp khô Tài Hồ Sìn:</strong> Chè trung du cổ thụ sao củi thủ công, nước xanh ánh vàng, tiền chát dịu – hậu ngọt sâu.</li>
             <li>🍯 <strong>Mật ong hoa rừng Nà Roác:</strong> Mật ong tự nhiên hút mật hoa chè, hoa dứa và bạc hà rừng nguyên sinh.</li>
             <li>🥢 <strong>Món ngon Tày – Nùng mùa lễ hội:</strong> Xôi trám đen dẻo bùi, bánh trứng kiến béo ngậy lá vả, vịt cỏ suối quay mắc mật.</li>
           </ul>`;
      return {
        intent: 'story',
        html,
        speech: stripForSpeech(html, lang),
        actions: [
          { type: 'nav', href: '#products', label: isEn ? '🧺 View Local Products' : '🧺 Xem Sản vật Quê hương', primary: true },
          { type: 'nav', href: '#explore', label: uiText('openStoriesBtn', lang) }
        ]
      };
    }

    // 7. General Crop Lookup (e.g. just "dứa" or "chè" without stats/season keywords)
    if (/\b(dua|pineapple)\b/.test(norm)) {
      chatMemory.lastRecordId = 'dua-01';
      const html = isEn
        ? `<p>🍍 <strong>Bach Dang Honey Queen Pineapple</strong> is the flagship OCOP 3-star crop of Bach Dang Commune, Cao Bang:</p>
           <ul class="bd-ai-list">
             <li><strong>Scale:</strong> 127.6 ha across Khuoi Kep, Ban Sang & Na Roac (1,538.5 tons/year, &gt;100 households).</li>
             <li><strong>Flavor:</strong> Grown on sunny red-gravel slopes—plump flat eyes, golden honeyed core, crisp and richly sweet.</li>
             <li><strong>Best Season:</strong> Peak harvest May–July; staggered fruits available year-round.</li>
           </ul>`
        : `<p>🍍 <strong>Dứa mật Bạch Đằng (Giống Queen & Cayen)</strong> là cây trồng chủ lực đạt chuẩn OCOP 3 sao của xã Bạch Đằng:</p>
           <ul class="bd-ai-list">
             <li><strong>Quy mô:</strong> 127,6 ha tại Khuổi Kép, Bản Sẳng, Nà Roác (sản lượng 1.538,5 tấn/năm, hơn 100 hộ trồng).</li>
             <li><strong>Hương vị:</strong> Trồng trên đồi đất sỏi son đón nắng nên mắt nở to phẳng, ruột vàng ươm như mật, giòn ngọt thanh, ít xơ.</li>
             <li><strong>Mùa đẹp nhất:</strong> Chính vụ tháng 5 – tháng 7 (có rải vụ quanh năm).</li>
           </ul>`;
      return {
        intent: 'crop-dua',
        html,
        speech: stripForSpeech(html, lang),
        actions: [
          { type: 'fly', id: 'dua-01', label: uiText('flyMapBtn', lang), primary: true },
          { type: 'detail', id: 'dua-01', label: uiText('openPassportBtn', lang) }
        ]
      };
    }

    if (/\b(che|tra|tea)\b/.test(norm)) {
      chatMemory.lastRecordId = 'che-01';
      const html = isEn
        ? `<p>🌱 <strong>Tai Ho Sin Green Tea</strong> grows on foggy mountain passes in Tai Ho Sin 1 & 2 hamlets:</p>
           <ul class="bd-ai-list">
             <li><strong>Scale:</strong> 5.0 ha yielding 7.5 tons of finished dry buds/year (Nhat Hanh Workshop & Clean Ag Cooperative).</li>
             <li><strong>Craft:</strong> Hand-picked "1 bud 2 leaves" and roasted over firewood in cast-iron pans for a young-sticky-rice fragrance.</li>
             <li><strong>Harvest Season:</strong> March through October.</li>
           </ul>`
        : `<p>🌱 <strong>Chè xanh Tài Hồ Sìn</strong> là đặc sản nức tiếng trên đỉnh đèo mờ sương xóm Tài Hồ Sìn 1 & 2:</p>
           <ul class="bd-ai-list">
             <li><strong>Quy mô:</strong> 5,0 ha cho sản lượng 7,5 tấn chè búp khô/năm (Cơ sở Nhất Hạnh & HTX Nông nghiệp sạch).</li>
             <li><strong>Chế biến:</strong> Hái tay "1 tôm 2 lá" lúc tan sương, sao chảo gang bếp củi tạo hương cốm non và vị ngọt hậu sâu lắng.</li>
             <li><strong>Mùa thu hái:</strong> Từ tháng 3 đến tháng 10 hằng năm.</li>
           </ul>`;
      return {
        intent: 'crop-che',
        html,
        speech: stripForSpeech(html, lang),
        actions: [
          { type: 'fly', id: 'che-01', label: uiText('flyMapBtn', lang), primary: true },
          { type: 'detail', id: 'che-01', label: uiText('openPassportBtn', lang) }
        ]
      };
    }

    // 8. QR Traceability / GIS Map Measurement / Help / Greeting
    const html = isEn
      ? `<p>🤖 <strong>Bach Dang WebGIS AI Assistant</strong> is ready to help right on the website without external searching! Try asking me (by text or 🎙️ voice):</p>
         <ul class="bd-ai-list">
           <li>🗺️ <em>"Draw a 4-hour itinerary on the map"</em> — builds a timed plan and draws visual route lines across stops.</li>
           <li>🍍 <em>"When are pineapples in peak season?"</em> or <em>"Tell me about Ban Sang Garden 01"</em>.</li>
           <li>📊 <em>"What are the crop area, production, and VietGAP targets?"</em>.</li>
           <li>📱 You can also click any marker on <strong>Digital Map</strong> to inspect satellite layers, measure garden polygons, or scan <strong>QR Growing-Zone Passports</strong>!</li>
         </ul>`
      : `<p>🤖 <strong>Trợ lý AI Chạm Bạch Đằng</strong> sẵn sàng giải đáp tức thì ngay trên web! Bạn có thể bấm 🎙️ nói hoặc gõ các câu hỏi như:</p>
         <ul class="bd-ai-list">
           <li>🗺️ <em>"Vẽ lộ trình tham quan 4 tiếng trên bản đồ"</em> — tự động lên giờ và nối đường đi trực quan giữa 4 điểm chạm.</li>
           <li>🍍 <em>"Dứa Bạch Đằng tháng mấy chín ngọt nhất?"</em> hoặc <em>"Giới thiệu vườn dứa Bản Sẳng"</em>.</li>
           <li>📊 <em>"Diện tích, sản lượng và giá bán dứa, chè Bạch Đằng?"</em>.</li>
           <li>📱 Ngoài ra trên mục <strong>Bản đồ số</strong>, bạn có thể bật ảnh vệ tinh Esri, đo diện tích vườn và quét <strong>Mã QR Hộ chiếu vùng trồng</strong>!</li>
         </ul>`;

    return {
      intent: 'help',
      html,
      speech: stripForSpeech(html, lang),
      actions: [
        { type: 'draw-route', stops: 'dua-01,ditich-01,che-01,mat-01', label: uiText('drawRouteBtn', lang), primary: true },
        { type: 'nav', href: '#map', label: isEn ? '🗺️ Open Digital Map' : '🗺️ Mở Bản đồ số' }
      ]
    };
  }

  async function queryWithOptionalCloudLLM(query, localReply) {
    const lang = getLang();
    // 1. Try local server /api/chat if backend is active and has cloud LLM configured
    if (typeof backend !== 'undefined' && backend) {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, lang })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.llmAnswer) {
            const safeHtml = `<p>${escapeHtml(data.llmAnswer).replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
            return {
              ...localReply,
              html: safeHtml,
              speech: stripForSpeech(safeHtml, lang)
            };
          }
        }
      } catch {}
    }

    // 2. Try optional user-supplied Gemini API key in localStorage
    let userKey = '';
    try { userKey = (localStorage.getItem('bd_ai_api_key') || '').trim(); } catch {}
    if (!userKey) return localReply;

    try {
      const recs = getAllRecords();
      const contextStr = JSON.stringify({
        commune: 'Xã Bạch Đằng, huyện Hòa An, tỉnh Cao Bằng',
        pineapple: '127.6 ha total, 90 ha harvest, 1538.5 tons/year, peak May-Jul, OCOP 3-star, 30 ha VietGAP planned, 10000-13500 VND/kg',
        tea: 'Chè Tài Hồ Sìn: 5.0 ha, 7.5 tons dry tea/year, Mar-Oct, 180000 VND/kg',
        locations: recs.map(r => ({ id: r.id, name: r.name, owner: r.owner, season: r.season, area: r.area, lat: r.lat, lng: r.lng }))
      });

      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(userKey)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{
              text: `You are the official AI Tour & Agriculture Assistant of Touch Bach Dang WebGIS (Cao Bang). Answer concisely in ${lang === 'en' ? 'English' : 'Vietnamese'} (max 110 words) grounded strictly in this verified dataset: ${contextStr}\n\nVisitor question: ${query}`
            }]
          }]
        })
      });
      if (resp.ok) {
        const json = await resp.json();
        const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const formatted = `<p>${escapeHtml(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
          // Keep visual route timeline if user asked for route!
          if (localReply.intent === 'route') return localReply;
          return {
            ...localReply,
            html: formatted,
            speech: stripForSpeech(formatted, lang)
          };
        }
      }
    } catch {}
    return localReply;
  }

  // ================= MAP VISUAL ROUTE DRAWER =================
  let aiRouteLayer = null;
  let lastDrawnStopIds = null;

  function clearAiRouteOnMap(showToastMsg = false) {
    lastDrawnStopIds = null;
    if (aiRouteLayer && typeof map !== 'undefined' && map) {
      try { aiRouteLayer.clearLayers(); map.removeLayer(aiRouteLayer); } catch {}
    }
    aiRouteLayer = null;
    const banner = typeof document !== 'undefined' && document.getElementById('ai-map-route-banner');
    if (banner) banner.remove();
    if (showToastMsg && typeof toast === 'function') {
      toast(uiText('routeClearedToast'));
    }
  }

  function renderRouteLayerNow(stopIds) {
    if (typeof window === 'undefined' || !window.L || typeof map === 'undefined' || !map) return false;
    const lang = getLang();
    const isEn = lang === 'en';
    const recs = getAllRecords();
    const stops = stopIds
      .map(id => recs.find(r => r.id === id))
      .filter(Boolean)
      .map(r => getLocalizedRecord(r, lang));

    if (stops.length < 2) return false;

    if (aiRouteLayer) {
      try { aiRouteLayer.clearLayers(); map.removeLayer(aiRouteLayer); } catch {}
    }
    aiRouteLayer = window.L.featureGroup().addTo(map);

    const latlngs = stops.map(s => [s.lat, s.lng]);

    // Soft outer glow + crisp directional dashed polyline
    window.L.polyline(latlngs, {
      color: '#10b981',
      weight: 11,
      opacity: 0.24,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(aiRouteLayer);

    window.L.polyline(latlngs, {
      color: '#047857',
      weight: 4.5,
      opacity: 0.95,
      dashArray: '10, 8',
      lineCap: 'round'
    }).addTo(aiRouteLayer);

    let totalKm = 0;
    stops.forEach((s, idx) => {
      if (idx > 0) {
        totalKm += calcDistanceKm(stops[idx - 1].lat, stops[idx - 1].lng, s.lat, s.lng);
      }
      const icon = window.L.divIcon({
        className: 'ai-route-marker-wrap',
        html: `<div class="ai-route-marker" title="${escapeHtml(s.name)}"><span>${idx + 1}</span></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });
      const m = window.L.marker([s.lat, s.lng], { icon, zIndexOffset: 900 + idx }).addTo(aiRouteLayer);

      const pop = document.createElement('div');
      pop.className = 'ai-route-popup';
      pop.innerHTML = `
        <div class="ai-route-popup-step">${isEn ? `STOP #${idx + 1}` : `ĐIỂM CHẠM SỐ ${idx + 1}`}</div>
        <strong>${escapeHtml(s.name)}</strong>
        <p>${escapeHtml(s.address)}</p>
      `;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'button small primary';
      btn.style.width = '100%';
      btn.style.marginTop = '6px';
      btn.textContent = uiText('openPassportBtn', lang);
      btn.addEventListener('click', () => {
        if (typeof detail === 'function') detail(s.id);
      });
      pop.appendChild(btn);
      m.bindPopup(pop, { maxWidth: 250 });
    });

    const estRoadKm = (totalKm * 1.35).toFixed(1);

    try {
      map.fitBounds(aiRouteLayer.getBounds(), { padding: [55, 55], maxZoom: 15 });
    } catch {}

    // Inject floating summary bar inside #map-canvas parent
    const mapCanvas = document.getElementById('map-canvas');
    if (mapCanvas && mapCanvas.parentElement) {
      mapCanvas.parentElement.style.position = 'relative';
      const old = document.getElementById('ai-map-route-banner');
      if (old) old.remove();

      const bar = document.createElement('div');
      bar.id = 'ai-map-route-banner';
      bar.className = 'ai-map-route-banner';
      const stepsLabel = stops.map((s, i) => `<span class="ai-banner-stop"><b>${i + 1}</b> ${escapeHtml(s.name.split('·')[0].trim())}</span>`).join('<span class="ai-banner-arrow">→</span>');
      bar.innerHTML = `
        <div class="ai-banner-info">
          <span class="ai-banner-tag">🗺️ ${isEn ? `AI Route (~${estRoadKm} km)` : `Lộ trình AI (~${estRoadKm} km)`}</span>
          <div class="ai-banner-chain">${stepsLabel}</div>
        </div>
      `;
      const clearBtn = document.createElement('button');
      clearBtn.type = 'button';
      clearBtn.className = 'ai-banner-clear';
      clearBtn.textContent = uiText('clearRouteBtn', lang);
      clearBtn.addEventListener('click', () => clearAiRouteOnMap(true));
      bar.appendChild(clearBtn);
      mapCanvas.parentElement.appendChild(bar);
    }

    return true;
  }

  function drawAiRouteOnMap(stopIdsInput) {
    const stopIds = Array.isArray(stopIdsInput)
      ? stopIdsInput
      : String(stopIdsInput || 'dua-01,ditich-01,che-01,mat-01').split(',').map(s => s.trim()).filter(Boolean);

    lastDrawnStopIds = stopIds;

    // On small mobile screens, collapse chat panel so the user can see the map clearly
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setPanelOpen(false);
    }

    if (typeof location !== 'undefined' && !location.hash.startsWith('#map')) {
      location.hash = '#map';
    }

    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      if (renderRouteLayerNow(stopIds) || attempts > 25) {
        clearInterval(timer);
        if (attempts <= 25 && typeof toast === 'function') {
          toast(uiText('routeDrawnToast'));
        }
      }
    }, 120);
  }

  function flyToRecordOnMap(recordId) {
    const recs = getAllRecords();
    const target = recs.find(r => r.id === recordId);
    if (!target) return;

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setPanelOpen(false);
    }

    if (typeof location !== 'undefined' && !location.hash.startsWith('#map')) {
      location.hash = '#map';
    }

    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      if ((typeof map !== 'undefined' && map) || attempts > 25) {
        clearInterval(timer);
        if (typeof map !== 'undefined' && map) {
          map.setView([target.lat, target.lng], 16);
          const pulse = window.L.circleMarker([target.lat, target.lng], {
            radius: 18,
            color: '#059669',
            weight: 3,
            fillColor: '#34d399',
            fillOpacity: 0.35
          }).addTo(map);
          setTimeout(() => { try { map.removeLayer(pulse); } catch {} }, 4500);
        }
      }
    }, 120);
  }

  // ================= TWO-WAY VOICE ENGINE (STT + TTS) =================
  let recognition = null;
  let isListening = false;
  let autoSpeak = false;
  try {
    autoSpeak = localStorage.getItem('bd_ai_autospeak') === '1';
  } catch {}
  let activeUtteranceBtn = null;

  function stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
    if (activeUtteranceBtn) {
      activeUtteranceBtn.textContent = uiText('speakBtn');
      activeUtteranceBtn.classList.remove('speaking');
      activeUtteranceBtn = null;
    }
  }

  function pickBestVoice(langCode) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) return null;
    const prefix = langCode.toLowerCase().slice(0, 2);
    // Prefer natural Microsoft / Google voices matching exact language
    const exact = voices.filter(v => (v.lang || '').toLowerCase().startsWith(prefix));
    if (!exact.length) return null;
    return exact.find(v => /hoaimy|namminh|google|natural|online/i.test(v.name)) || exact[0];
  }

  function speakText(rawText, triggerBtn = null) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (typeof toast === 'function') toast(uiText('noTtsToast'));
      return;
    }
    // Toggle off if clicking the same active button
    if (triggerBtn && activeUtteranceBtn === triggerBtn) {
      stopSpeaking();
      return;
    }
    stopSpeaking();

    const lang = getLang();
    const clean = stripForSpeech(rawText, lang);
    if (!clean) return;

    const utter = new SpeechSynthesisUtterance(clean);
    const targetLang = lang === 'en' ? 'en-US' : 'vi-VN';
    utter.lang = targetLang;
    const bestVoice = pickBestVoice(targetLang);
    if (bestVoice) utter.voice = bestVoice;
    utter.rate = lang === 'en' ? 1.0 : 1.03;
    utter.pitch = 1.0;

    if (triggerBtn) {
      activeUtteranceBtn = triggerBtn;
      triggerBtn.textContent = uiText('stopSpeakBtn', lang);
      triggerBtn.classList.add('speaking');
    }

    const resetBtn = () => {
      if (triggerBtn && activeUtteranceBtn === triggerBtn) {
        triggerBtn.textContent = uiText('speakBtn');
        triggerBtn.classList.remove('speaking');
        activeUtteranceBtn = null;
      }
    };
    utter.onend = resetBtn;
    utter.onerror = resetBtn;

    window.speechSynthesis.speak(utter);
  }

  function setVoiceStatusUI(listening) {
    isListening = listening;
    const micBtn = document.getElementById('bd-ai-mic-btn');
    const voiceBar = document.getElementById('bd-ai-voice-bar');
    if (micBtn) micBtn.classList.toggle('listening', listening);
    if (voiceBar) voiceBar.hidden = !listening;
  }

  function stopListening() {
    if (recognition) {
      try { recognition.stop(); } catch {}
    }
    setVoiceStatusUI(false);
  }

  function startVoiceInput() {
    const SpeechRec = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRec) {
      if (typeof toast === 'function') toast(uiText('noSttToast'));
      const inp = document.getElementById('bd-ai-input');
      if (inp) inp.focus();
      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    stopSpeaking();

    recognition = new SpeechRec();
    const lang = getLang();
    recognition.lang = lang === 'en' ? 'en-US' : 'vi-VN';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    let finalTranscript = '';
    const inp = document.getElementById('bd-ai-input');

    recognition.onstart = () => {
      setVoiceStatusUI(true);
      const labelEl = document.getElementById('bd-ai-voice-text');
      if (labelEl) labelEl.textContent = uiText('listening', lang);
    };

    recognition.onresult = event => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const chunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += chunk;
        else interim += chunk;
      }
      if (inp) inp.value = (finalTranscript || interim).trim();
    };

    recognition.onerror = () => {
      setVoiceStatusUI(false);
    };

    recognition.onend = () => {
      setVoiceStatusUI(false);
      const spoken = (finalTranscript || (inp ? inp.value : '')).trim();
      if (spoken) {
        if (inp) inp.value = '';
        handleUserSubmit(spoken, true);
      }
    };

    try {
      recognition.start();
    } catch {
      setVoiceStatusUI(false);
    }
  }

  // ================= DOM WIDGET CONSTRUCTION =================
  let isOpen = false;

  function setPanelOpen(open, startMic = false) {
    isOpen = open;
    const panel = document.getElementById('bd-ai-panel');
    const fab = document.getElementById('bd-ai-fab');
    if (panel) panel.classList.toggle('open', open);
    if (fab) fab.classList.toggle('hidden-fab', open);
    if (!open) {
      stopListening();
      stopSpeaking();
    } else {
      const inp = document.getElementById('bd-ai-input');
      if (inp && !startMic) setTimeout(() => inp.focus(), 120);
      if (startMic) setTimeout(() => startVoiceInput(), 220);
    }
  }

  function appendMessage(role, payload, speakImmediately = false) {
    const box = document.getElementById('bd-ai-messages');
    if (!box) return;
    const lang = getLang();

    const row = document.createElement('div');
    row.className = `bd-ai-msg bd-ai-msg-${role}`;

    if (role === 'user') {
      row.innerHTML = `<div class="bd-ai-bubble user-bubble">${payload.byVoice ? '<span class="bd-ai-voice-tag">🎙️</span> ' : ''}${escapeHtml(payload.text)}</div>`;
      box.appendChild(row);
      box.scrollTop = box.scrollHeight;
      return;
    }

    const bubble = document.createElement('div');
    bubble.className = 'bd-ai-bubble bot-bubble';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'bd-ai-content';
    contentDiv.innerHTML = payload.html;
    bubble.appendChild(contentDiv);

    const actionsBar = document.createElement('div');
    actionsBar.className = 'bd-ai-actions';

    // Always provide a Listen / Stop Audio button on every AI response
    const speakBtn = document.createElement('button');
    speakBtn.type = 'button';
    speakBtn.className = 'bd-ai-act-btn bd-ai-speak-btn';
    speakBtn.textContent = uiText('speakBtn', lang);
    speakBtn.addEventListener('click', () => speakText(payload.speech || payload.html, speakBtn));
    actionsBar.appendChild(speakBtn);

    if (Array.isArray(payload.actions)) {
      payload.actions.forEach(act => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `bd-ai-act-btn${act.primary ? ' primary' : ''}`;
        btn.textContent = act.label;
        if (act.type === 'draw-route') {
          btn.dataset.aiDrawStops = act.stops;
        } else if (act.type === 'fly') {
          btn.dataset.aiFly = act.id;
        } else if (act.type === 'detail') {
          btn.dataset.aiDetail = act.id;
        } else if (act.type === 'nav') {
          btn.dataset.aiNav = act.href;
        } else if (act.type === 'download-route') {
          btn.dataset.aiDownloadRoute = '1';
        }
        actionsBar.appendChild(btn);
      });
    }

    bubble.appendChild(actionsBar);
    row.appendChild(bubble);
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;

    if (speakImmediately || autoSpeak) {
      speakText(payload.speech || payload.html, speakBtn);
    }
  }

  async function handleUserSubmit(text, askedByVoice = false) {
    const q = String(text || '').trim();
    if (!q) return;

    appendMessage('user', { text: q, byVoice: askedByVoice });

    const localReply = askBachDangAI(q);
    const finalReply = await queryWithOptionalCloudLLM(q, localReply);

    appendMessage('bot', finalReply, askedByVoice);

    if (finalReply.autoDraw && finalReply.routePlan) {
      drawAiRouteOnMap(finalReply.routePlan.stopIds);
    }
  }

  function renderChips() {
    const chipWrap = document.getElementById('bd-ai-chips');
    if (!chipWrap) return;
    const chips = uiText('chips');
    chipWrap.innerHTML = '';
    chips.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'bd-ai-chip';
      btn.textContent = c.label;
      btn.addEventListener('click', () => handleUserSubmit(c.query, false));
      chipWrap.appendChild(btn);
    });
  }

  function refreshWidgetLanguage() {
    const lang = getLang();
    const fabText = document.querySelector('#bd-ai-fab .bd-ai-fab-label');
    if (fabText) fabText.textContent = uiText('fabLabel', lang);

    const hBtn = document.getElementById('ai-header-btn');
    if (hBtn) {
      hBtn.textContent = uiText('headerBtn', lang);
      hBtn.title = uiText('headerBtnTitle', lang);
      hBtn.setAttribute('aria-label', uiText('headerBtnTitle', lang));
    }

    const titleEl = document.getElementById('bd-ai-title');
    if (titleEl) titleEl.textContent = uiText('panelTitle', lang);
    const subEl = document.getElementById('bd-ai-sub');
    if (subEl) subEl.textContent = uiText('panelSub', lang);

    const autoBtn = document.getElementById('bd-ai-autospeak');
    if (autoBtn) {
      autoBtn.textContent = autoSpeak ? '🔊' : '🔇';
      autoBtn.title = autoSpeak ? uiText('autoSpeakOn', lang) : uiText('autoSpeakOff', lang);
      autoBtn.classList.toggle('active', autoSpeak);
    }

    const inp = document.getElementById('bd-ai-input');
    if (inp) inp.placeholder = uiText('inputPlaceholder', lang);

    const micBtn = document.getElementById('bd-ai-mic-btn');
    if (micBtn) micBtn.title = uiText('micTitle', lang);

    const keyLabel = document.getElementById('bd-ai-key-label');
    if (keyLabel) keyLabel.textContent = uiText('apiKeyLabel', lang);
    const keySave = document.getElementById('bd-ai-key-save');
    if (keySave) keySave.textContent = uiText('apiKeySave', lang);

    renderChips();

    // Update welcome message if chat only has the initial greeting
    const msgs = document.getElementById('bd-ai-messages');
    if (msgs && msgs.children.length === 1) {
      msgs.innerHTML = '';
      appendMessage('bot', { html: uiText('welcome', lang), speech: stripForSpeech(uiText('welcome', lang), lang), actions: [] }, false);
    }
  }

  function mountAiWidget() {
    if (typeof document === 'undefined' || document.getElementById('bd-ai-panel')) return;

    // Preload voices on Chrome/Edge
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices(); } catch {}
    }

    // Floating Action Button
    const fab = document.createElement('button');
    fab.type = 'button';
    fab.id = 'bd-ai-fab';
    fab.className = 'bd-ai-fab';
    fab.setAttribute('aria-label', uiText('headerBtnTitle'));
    fab.innerHTML = `
      <span class="bd-ai-fab-icon">🤖</span>
      <span class="bd-ai-fab-label">${escapeHtml(uiText('fabLabel'))}</span>
      <span class="bd-ai-fab-mic" title="Voice Q&A">🎙️</span>
    `;
    fab.addEventListener('click', e => {
      const clickedMic = Boolean(e.target.closest('.bd-ai-fab-mic'));
      setPanelOpen(true, clickedMic);
    });

    // Chat Panel
    const panel = document.createElement('aside');
    panel.id = 'bd-ai-panel';
    panel.className = 'bd-ai-panel';
    panel.setAttribute('aria-label', uiText('panelTitle'));

    let savedKey = '';
    try { savedKey = localStorage.getItem('bd_ai_api_key') || ''; } catch {}

    panel.innerHTML = `
      <div class="bd-ai-header">
        <div class="bd-ai-brand">
          <div class="bd-ai-avatar">🤖</div>
          <div>
            <strong id="bd-ai-title">${escapeHtml(uiText('panelTitle'))}</strong>
            <small id="bd-ai-sub">${escapeHtml(uiText('panelSub'))}</small>
          </div>
        </div>
        <div class="bd-ai-head-tools">
          <button type="button" id="bd-ai-autospeak" class="bd-ai-icon-btn ${autoSpeak ? 'active' : ''}" title="${escapeHtml(autoSpeak ? uiText('autoSpeakOn') : uiText('autoSpeakOff'))}">${autoSpeak ? '🔊' : '🔇'}</button>
          <button type="button" id="bd-ai-gear" class="bd-ai-icon-btn" title="${escapeHtml(uiText('settingsTitle'))}">⚙️</button>
          <button type="button" id="bd-ai-clear" class="bd-ai-icon-btn" title="${escapeHtml(uiText('clearTitle'))}">↺</button>
          <button type="button" id="bd-ai-close" class="bd-ai-icon-btn" title="${escapeHtml(uiText('closeTitle'))}">✕</button>
        </div>
      </div>

      <div id="bd-ai-settings" class="bd-ai-settings" hidden>
        <label id="bd-ai-key-label" for="bd-ai-key-input">${escapeHtml(uiText('apiKeyLabel'))}</label>
        <div class="bd-ai-settings-row">
          <input type="password" id="bd-ai-key-input" placeholder="AIzaSy..." value="${escapeHtml(savedKey)}" autocomplete="off">
          <button type="button" id="bd-ai-key-save" class="button small primary">${escapeHtml(uiText('apiKeySave'))}</button>
        </div>
      </div>

      <div id="bd-ai-messages" class="bd-ai-messages" role="log" aria-live="polite"></div>

      <div id="bd-ai-voice-bar" class="bd-ai-voice-bar" hidden>
        <div class="bd-ai-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        <span id="bd-ai-voice-text">${escapeHtml(uiText('listening'))}</span>
        <button type="button" id="bd-ai-voice-stop" class="bd-ai-voice-stop">${escapeHtml(uiText('stopListening'))}</button>
      </div>

      <div id="bd-ai-chips" class="bd-ai-chips"></div>

      <form id="bd-ai-form" class="bd-ai-form">
        <button type="button" id="bd-ai-mic-btn" class="bd-ai-mic-btn" title="${escapeHtml(uiText('micTitle'))}" aria-label="${escapeHtml(uiText('micTitle'))}">🎙️</button>
        <input type="text" id="bd-ai-input" placeholder="${escapeHtml(uiText('inputPlaceholder'))}" autocomplete="off" maxlength="500">
        <button type="submit" id="bd-ai-send-btn" class="bd-ai-send-btn" title="${escapeHtml(uiText('sendTitle'))}" aria-label="${escapeHtml(uiText('sendTitle'))}">➤</button>
      </form>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    renderChips();
    appendMessage('bot', {
      html: uiText('welcome'),
      speech: stripForSpeech(uiText('welcome')),
      actions: []
    }, false);

    // Bind Panel Controls
    document.getElementById('bd-ai-close').addEventListener('click', () => setPanelOpen(false));

    document.getElementById('bd-ai-autospeak').addEventListener('click', () => {
      autoSpeak = !autoSpeak;
      try { localStorage.setItem('bd_ai_autospeak', autoSpeak ? '1' : '0'); } catch {}
      if (!autoSpeak) stopSpeaking();
      refreshWidgetLanguage();
      if (typeof toast === 'function') {
        toast(autoSpeak ? uiText('autoSpeakOn') : uiText('autoSpeakOff'));
      }
    });

    document.getElementById('bd-ai-gear').addEventListener('click', () => {
      const box = document.getElementById('bd-ai-settings');
      if (box) box.hidden = !box.hidden;
    });

    document.getElementById('bd-ai-key-save').addEventListener('click', () => {
      const val = (document.getElementById('bd-ai-key-input')?.value || '').trim();
      try { localStorage.setItem('bd_ai_api_key', val); } catch {}
      const box = document.getElementById('bd-ai-settings');
      if (box) box.hidden = true;
      if (typeof toast === 'function') toast(uiText('apiKeySaved'));
    });

    document.getElementById('bd-ai-clear').addEventListener('click', () => {
      stopSpeaking();
      const msgs = document.getElementById('bd-ai-messages');
      if (msgs) msgs.innerHTML = '';
      chatMemory.lastRecordId = null;
      appendMessage('bot', {
        html: uiText('welcome'),
        speech: stripForSpeech(uiText('welcome')),
        actions: []
      }, false);
    });

    document.getElementById('bd-ai-mic-btn').addEventListener('click', startVoiceInput);
    document.getElementById('bd-ai-voice-stop').addEventListener('click', stopListening);

    document.getElementById('bd-ai-form').addEventListener('submit', e => {
      e.preventDefault();
      const inp = document.getElementById('bd-ai-input');
      if (!inp || !inp.value.trim()) return;
      const text = inp.value.trim();
      inp.value = '';
      handleUserSubmit(text, false);
    });

    // Bind Header AI Button if present
    const headerBtn = document.getElementById('ai-header-btn');
    if (headerBtn) {
      headerBtn.addEventListener('click', e => {
        e.preventDefault();
        setPanelOpen(!isOpen, false);
      });
    }

    // Global delegated listeners for AI actions anywhere on the page (Hero CTA, Planner Draw button, Chat buttons)
    document.addEventListener('click', e => {
      const openAiTrigger = e.target.closest('[data-open-ai]');
      if (openAiTrigger) {
        e.preventDefault();
        const mode = openAiTrigger.dataset.openAi;
        setPanelOpen(true, mode === 'voice');
        return;
      }

      const drawTrigger = e.target.closest('[data-ai-draw-stops]');
      if (drawTrigger) {
        e.preventDefault();
        drawAiRouteOnMap(drawTrigger.dataset.aiDrawStops);
        return;
      }

      const flyTrigger = e.target.closest('[data-ai-fly]');
      if (flyTrigger) {
        e.preventDefault();
        flyToRecordOnMap(flyTrigger.dataset.aiFly);
        return;
      }

      const detTrigger = e.target.closest('[data-ai-detail]');
      if (detTrigger) {
        e.preventDefault();
        if (typeof detail === 'function') detail(detTrigger.dataset.aiDetail);
        return;
      }

      const navTrigger = e.target.closest('[data-ai-nav]');
      if (navTrigger) {
        e.preventDefault();
        if (typeof window !== 'undefined' && window.innerWidth < 768) setPanelOpen(false);
        location.hash = navTrigger.dataset.aiNav;
        return;
      }

      const dlRoute = e.target.closest('[data-ai-download-route]');
      if (dlRoute) {
        e.preventDefault();
        const plan = chatMemory.lastRoutePlan || buildAiItinerary({ hours: 4 });
        if (typeof download === 'function') {
          download(
            getLang() === 'en' ? 'bach-dang-ai-itinerary.txt' : 'lo-trinh-ai-bach-dang.txt',
            plan.plainText,
            'text/plain;charset=utf-8'
          );
        }
      }
    });

    // Re-draw active route if user navigates back to #map or switches language
    window.addEventListener('hashchange', () => {
      if (location.hash.startsWith('#map') && lastDrawnStopIds) {
        setTimeout(() => renderRouteLayerNow(lastDrawnStopIds), 200);
      }
    });

    // Observe <html lang="..."> mutations so switching VI/EN updates AI UI immediately
    const observer = new MutationObserver(() => refreshWidgetLanguage());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    refreshWidgetLanguage();
  }

  const exportedApi = {
    askBachDangAI,
    buildAiItinerary,
    stripForSpeech,
    normalizeVi,
    drawAiRouteOnMap,
    clearAiRouteOnMap,
    openAssistant: (voice = false) => setPanelOpen(true, voice)
  };

  if (typeof window !== 'undefined') {
    window.BachDangAI = exportedApi;
    if (typeof document !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountAiWidget);
      } else {
        mountAiWidget();
      }
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exportedApi;
  }
})();
