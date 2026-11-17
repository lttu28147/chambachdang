const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const appCode = fs.readFileSync('dist/app.js', 'utf8');

// Test that STORIES_DATA is defined and has 8 rich stories
const storiesIdx = appCode.indexOf('const STORIES_DATA = [');
assert.ok(storiesIdx !== -1, 'STORIES_DATA must be defined');

const endStoriesIdx = appCode.indexOf('function renderStoryCards(');
assert.ok(endStoriesIdx !== -1, 'renderStoryCards must be defined');

const ctx = vm.createContext({
  head: (tag, title, desc) => `<div class="head"><h1>${title}</h1></div>`,
  esc: (s) => (s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : '')
});

vm.runInContext(appCode.slice(storiesIdx, appCode.indexOf('function bindExplorePage(')), ctx);

const stories = vm.runInContext('STORIES_DATA', ctx);
assert.ok(Array.isArray(stories), 'STORIES_DATA should be an array');
assert.equal(stories.length, 8, 'There should be exactly 8 featured stories');

stories.forEach((s, i) => {
  assert.ok(s.id && s.title && s.lead, `Story #${i} must have id, title, and lead`);
  assert.ok(s.paragraphs && s.paragraphs.length >= 2, `Story #${i} must have at least 2 detailed paragraphs`);
  assert.ok(s.category, `Story #${i} must have a category`);
  assert.ok(s.badge, `Story #${i} must have a badge`);
  assert.ok(s.location, `Story #${i} must have a location`);
});

const htmlAll = vm.runInContext('explore("all")', ctx);
assert.ok(htmlAll.includes('Dấu chân Bác Hồ tại Nà Roác'));
assert.ok(htmlAll.includes('Hành trình quả dứa bén duyên đất dốc'));
assert.ok(htmlAll.includes('Tiếng cười trên nương dứa rạng đông'));
assert.ok(htmlAll.includes('Hương chè Tài Hồ Sìn'));
assert.ok(htmlAll.includes('Khói lam chiều bên nếp nhà sàn'));
assert.ok(htmlAll.includes('Món ngon từ trái dứa đồi'));
assert.ok(htmlAll.includes('Bốn mùa hương sắc'));
assert.ok(htmlAll.includes('Khát vọng tuổi trẻ'));

const htmlPineapple = vm.runInContext('explore("pineapple")', ctx);
assert.ok(htmlPineapple.includes('Đồi dứa'));
assert.ok(!htmlPineapple.includes('Dấu chân Bác Hồ tại Nà Roác'));

console.log('Story test passed: 8 stories verified, categories and render filters functioning properly.');
