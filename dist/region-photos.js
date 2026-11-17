'use strict';
const regionPhotoSources = {
  dua: {
    url: 'assets/doi-dua-bach-dang.png',
    caption: 'Đồi dứa mật xóm Bản Sẳng (Bạch Đằng)',
    source: 'Báo Cao Bằng'
  },
  che: {
    url: 'assets/doi-che-bach-dang.png',
    caption: 'Đồi chè Tài Hồ Sìn mờ sương đỉnh đèo',
    source: 'Báo Cao Bằng'
  },
  mat: {
    url: 'assets/mat-ong-bach-dang.jpg',
    caption: 'Tổ hợp tác nuôi ong hoa rừng tự nhiên Bạch Đằng',
    source: 'Ảnh tư liệu thực địa'
  },
  ditich: {
    url: 'assets/di-tich-na-roac.jpg',
    caption: 'Di tích Quốc gia Bác Hồ với ngành Xe - Máy Quân đội (Nà Roác 1)',
    source: 'Ảnh tư liệu thực địa'
  }
};

function regionPhoto(r) {
  const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
  const fallback = (r && regionPhotoSources[r.type]) ? regionPhotoSources[r.type] : regionPhotoSources.dua;
  const photo = (r && r.image) ? {
    url: r.image,
    caption: r.name,
    source: isEn ? 'Fieldwork Documentary Photo' : 'Ảnh tư liệu thực địa'
  } : fallback;

  if (!photo) return '';
  return `
    <figure class="region-photo">
      <img src="${photo.url}" alt="${photo.caption}" loading="lazy" onerror="this.onerror=null; this.src='assets/doi-dua-bach-dang.png';">
      <figcaption>${photo.caption} · <span style="opacity:0.85;">${photo.source}</span></figcaption>
    </figure>
  `;
}
