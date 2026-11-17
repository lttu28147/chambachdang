(() => {
  const dialog = document.createElement('dialog');
  dialog.className = 'reading-dialog';
  dialog.setAttribute('aria-label','Câu chuyện Bạch Đằng');
  document.body.append(dialog);
  document.addEventListener('click', event => {
    const trigger = event.target.closest('.story-open');
    if (trigger) {
      dialog.innerHTML = '<button class="reading-close" aria-label="Đóng câu chuyện">×</button>' + trigger.closest('.story-tile').querySelector('template').innerHTML;
      dialog.showModal(); dialog.scrollTop=0;
    }
    if (event.target.closest('.reading-close') || (event.target===dialog && event.clientX<dialog.getBoundingClientRect().left)) dialog.close();
    if (event.target.closest('.reading-dialog a')) dialog.close();
  });
  window.addEventListener('hashchange',()=>dialog.close());
  function enhance() {
    if (!document.querySelector('.hero') || document.querySelector('.qr-discovery')) return;
    const section = document.createElement('section');
    section.className = 'wrap qr-discovery';
    const en = document.documentElement.lang === 'en';
    section.innerHTML = `<div class="qr-heading"><div><div class="eyebrow">${en ? 'Take the story with you' : 'Mang câu chuyện theo bạn'}</div><h2>${en ? 'Explore with QR codes' : 'Khám phá qua mã QR'}</h2></div><p>${en ? 'Open a card to enlarge the QR image, or use your phone camera to scan.' : 'Bấm vào ảnh để phóng to. Dùng camera điện thoại để quét mã và xem nội dung giới thiệu.'}</p></div><div class="qr-grid">${[['qr-che.png','Đồi chè Tài Hồ Sìn'],['qr-di-tich.png','Di tích Bác Hồ với ngành Xe - Máy'],['qr-mat-ong.png','Mật ong Bạch Đằng']].map(([file,title])=>`<a class="qr-card" href="assets/${file}" target="_blank" rel="noopener"><img src="assets/${file}" alt="Mã QR giới thiệu ${title}" loading="lazy"><span>${title} ↗</span></a>`).join('')}</div>`;
    document.querySelector('#main').append(section);
  }
  new MutationObserver(enhance).observe(document.querySelector('#main'),{childList:true});
  enhance();
})();
