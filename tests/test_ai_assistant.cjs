const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

// Load records, customer-data, RECORD_EN, and ai-assistant in a clean VM context
const defaultRecsCode = fs.readFileSync('dist/default-records.js', 'utf8');
const customerCode = fs.readFileSync('dist/customer-data.js', 'utf8');
const appCode = fs.readFileSync('dist/app.js', 'utf8');
const recordEnSlice = appCode.slice(0, appCode.indexOf("'use strict';"));
const aiCode = fs.readFileSync('dist/ai-assistant.js', 'utf8');

const sandbox = {
  window: {},
  module: { exports: {} },
  exports: {},
  currentLang: 'vi',
  console
};
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(defaultRecsCode, sandbox);
vm.runInContext(customerCode + '\nwindow.customerDataset = customerDataset;', sandbox);
vm.runInContext(recordEnSlice + '\nwindow.RECORD_EN = RECORD_EN;', sandbox);
vm.runInContext(aiCode, sandbox);

const AI = sandbox.module.exports;
assert.ok(AI && typeof AI.askBachDangAI === 'function', 'BachDangAI API must be exported');

// Test 1: Route & Visual Map Itinerary (4h Vietnamese, unaccented query with autoDraw)
const routeRes = AI.askBachDangAI('ve lo trinh tham quan 4 tieng tren ban do', {
  lang: 'vi',
  records: sandbox.DEFAULT_RECORDS,
  customerDataset: sandbox.customerDataset
});
assert.equal(routeRes.intent, 'route');
assert.equal(routeRes.autoDraw, true, 'Explicit map route request must trigger autoDraw');
assert.equal(routeRes.routePlan.stops.length, 4, '4-hour tour must include all 4 stops');
assert.equal(routeRes.routePlan.stops[0].id, 'dua-01', 'Stop 1 must be Ban Sang Pineapple Hill');
assert.ok(routeRes.routePlan.estRoadKm > 0, 'Route distance in km must be calculated');

// Test 2: Specific Heritage & Garden Lookup + Conversational Follow-up Memory
const relicRes = AI.askBachDangAI('Giới thiệu Di tích Bác Hồ tại Nà Roác', {
  lang: 'vi',
  records: sandbox.DEFAULT_RECORDS
});
assert.equal(relicRes.intent, 'location');
assert.equal(relicRes.recordId, 'ditich-01');
assert.ok(relicRes.html.includes('28/3/1951'));

const gardenRes = AI.askBachDangAI('doi dua ban sang', {
  lang: 'vi',
  records: sandbox.DEFAULT_RECORDS
});
assert.equal(gardenRes.intent, 'location');
assert.equal(gardenRes.recordId, 'dua-01');

const followUp = AI.askBachDangAI('Chủ vườn ở đâu?', {
  lang: 'vi',
  records: sandbox.DEFAULT_RECORDS
});
assert.equal(followUp.recordId, 'dua-01', 'Follow-up pronoun query must resolve to remembered location');

// Test 3: Statistics & 90.5t Discrepancy Audit
const statsRes = AI.askBachDangAI('Diện tích và sản lượng dứa, chè Bạch Đằng bao nhiêu ha?', {
  lang: 'vi',
  customerDataset: sandbox.customerDataset
});
assert.equal(statsRes.intent, 'stats');
assert.ok(statsRes.html.includes('127,6 ha') && statsRes.html.includes('1.538,5'));

const auditRes = AI.askBachDangAI('Giải thích độ chênh lệch 90,5 tấn sản lượng', {
  lang: 'vi',
  customerDataset: sandbox.customerDataset
});
assert.equal(auditRes.intent, 'stats');
assert.ok(auditRes.html.includes('1.629,0') && auditRes.html.includes('90,5'));

// Test 4: Seasonality Month Check & Bilingual English Q&A
const seasonJune = AI.askBachDangAI('Đi tháng 6 có dứa chín không?', { lang: 'vi' });
assert.equal(seasonJune.intent, 'season');
assert.ok(seasonJune.html.includes('CHÍNH VỤ'));

const enRoute = AI.askBachDangAI('Suggest a 2 hour itinerary on the map', {
  lang: 'en',
  records: sandbox.DEFAULT_RECORDS
});
assert.equal(enRoute.intent, 'route');
assert.equal(enRoute.routePlan.hours, 2);
assert.ok(enRoute.html.includes('Ban Sang Pineapple Hill'));

// Test 5: TTS Speech Sanitizer (Vietnamese unit expansion & HTML stripping)
const speechVi = AI.stripForSpeech('<p>🍍 Vùng dứa <strong>127,6 ha</strong> đạt chuẩn OCOP & VietGAP, cách 3,5 km.</p>', 'vi');
assert.ok(!speechVi.includes('<p>') && !speechVi.includes('🍍'), 'HTML tags and emojis must be stripped for TTS');
assert.ok(speechVi.includes('héc-ta') && speechVi.includes('Ô-cốp') && speechVi.includes('ki-lô-mét'), 'Units & acronyms must expand naturally for Vietnamese TTS');

// Test 6: Strict CSP Compliance in dist/index.html
const html = fs.readFileSync('dist/index.html', 'utf8');
assert.ok(html.includes('src="ai-assistant.js"'), 'index.html must load external ai-assistant.js');
assert.ok(!/\son[a-z]+\s*=/i.test(html), 'index.html must have zero inline event handlers (CSP compliance)');

console.log('AI Assistant, Voice Sanitizer, Visual Map Route & CSP tests PASSED!');
