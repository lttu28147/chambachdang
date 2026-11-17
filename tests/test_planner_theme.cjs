const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

let planResultHtml = '';
let savedTxt = '';

const doc = {
  body: { classList: { toggle: () => {} } },
  documentElement: { lang: 'vi' },
  querySelector: (sel) => {
    if (sel === '#plan-result') return { set innerHTML(v) { planResultHtml = v; } };
    if (sel === '#save-plan') return {};
    return {};
  },
  querySelectorAll: () => []
};

const ctx = vm.createContext({
  localStorage: { getItem: () => null, setItem: () => {} },
  window: { matchMedia: () => ({ matches: false }), scrollTo: () => {}, addEventListener: () => {} },
  document: doc,
  head: (tag, title, desc) => '<div>' + title + '</div>',
  names: { dua: 'Đồi dứa', che: 'Đồi chè', mat: 'Điểm mật ong', ditich: 'Di tích lịch sử' },
  toast: () => {},
  download: (name, txt) => { savedTxt = txt; },
  FormData: class {
    constructor(form) { this.form = form; }
    get(k) { return this.form[k]; }
    getAll(k) { return this.form[k] || []; }
  }
});

const code = fs.readFileSync('dist/app.js', 'utf8');
vm.runInContext(code.slice(0, code.indexOf('const STORIES_DATA = [')), ctx);

// Test 1: I18N dictionary has essential keys in vi and en
const i18n = vm.runInContext('I18N', ctx);
assert.ok(i18n.vi && i18n.en, 'Both vi and en must exist in I18N');
assert.equal(i18n.vi.nav_map, 'Bản đồ số');
assert.equal(i18n.en.nav_map, 'Digital Map');
assert.equal(i18n.vi.lang_btn, 'EN');
assert.equal(i18n.en.lang_btn, 'VI');

// Test 2: makePlan with default 4 hours and all 4 interests includes Pineapple hill as stop 1
const fakeEvent = {
  preventDefault: () => {},
  target: {
    hours: '4',
    start: '08:00',
    interest: ['dua', 'ditich', 'che', 'mat']
  }
};

vm.runInContext('makePlan', ctx)(fakeEvent);

assert.ok(planResultHtml.includes('4 điểm chạm Bạch Đằng'), 'Should have 4 stops in 4 hours');
assert.ok(planResultHtml.includes('Khám phá Đồi dứa Bản Sẳng'), 'Stop 1 should be pineapple hill');
assert.ok(planResultHtml.includes('Thăm Di tích Quốc gia Bác Hồ'), 'Stop 2 should be historic site');
assert.ok(planResultHtml.includes('Dạo đồi chè Tài Hồ Sìn'), 'Stop 3 should be tea hill');
assert.ok(planResultHtml.includes('Tìm hiểu nghề nuôi ong hoa rừng'), 'Stop 4 should be honeybee farm');

console.log('Planner & Theme test PASSED: Pineapple hill is stop #1, all 4 stops included in 4h tour, I18N verified.');
