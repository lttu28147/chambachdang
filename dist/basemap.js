'use strict';
let currentBasemapIndex = 0;
let basemapLayers = {};

function attachBasemap(target) {
  const sources = [
    {
      id: 'osm',
      name: 'Bản đồ đường (OSM)',
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      credit: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
    {
      id: 'satellite',
      name: 'Vệ tinh (Esri Satellite)',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      credit: 'Tiles &copy; <a href="https://server.arcgisonline.com">Esri</a>, Earthstar Geographics'
    },
    {
      id: 'topo',
      name: 'Địa hình đồi núi (Esri Topo)',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      credit: 'Tiles &copy; <a href="https://server.arcgisonline.com">Esri &amp; contributors</a>'
    }
  ];

  const panel = document.createElement('div');
  panel.className = 'basemap-status';
  panel.setAttribute('role', 'status');
  target.getContainer().append(panel);
  L.DomEvent.disableClickPropagation(panel);
  L.DomEvent.disableScrollPropagation(panel);

  let layer, timer, generation = 0, active = true;

  function message(text, failed = false) {
    panel.replaceChildren();
    const label = document.createElement('span');
    label.textContent = text;
    panel.append(label);
    panel.hidden = !failed;
    if (failed) {
      const retry = document.createElement('button');
      retry.textContent = 'Thử lại nền';
      retry.onclick = () => start(0);
      panel.append(retry);
    }
  }

  function start(n) {
    clearTimeout(timer);
    const token = ++generation;
    currentBasemapIndex = n;
    let loaded = 0, errors = 0;
    if (layer) target.removeLayer(layer);
    const source = sources[n % sources.length];
    message('Đang kết nối dữ liệu ' + source.name + '…');

    function fail() {
      if (!active || token !== generation) return;
      clearTimeout(timer);
      if (n === 0 && sources.length > 1) {
        start(1);
      } else {
        message('Chưa tải được nền bản đồ. Kiểm tra kết nối mạng (dữ liệu cục bộ vẫn sẵn sàng).', true);
      }
    }

    layer = L.tileLayer(source.url, {
      maxZoom: 19,
      attribution: source.credit,
      referrerPolicy: 'strict-origin-when-cross-origin'
    });

    layer.on('tileload', () => {
      if (!active || token !== generation) return;
      loaded++;
      clearTimeout(timer);
      panel.hidden = true;
    });

    layer.on('tileerror', () => {
      if (active && token === generation && ++errors >= 2) fail();
    });

    layer.addTo(target);
    timer = setTimeout(() => {
      if (!loaded) fail();
    }, 7500);
  }

  if (typeof window !== 'undefined') {
    window.changeBasemap = function(index) {
      if (index >= 0 && index < sources.length) {
        start(index);
      }
    };
  }

  target.on('unload', () => {
    active = false;
    generation++;
    clearTimeout(timer);
  });

  start(0);
}
