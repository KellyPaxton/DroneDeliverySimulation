import { loadGoogleMaps } from './api-loader.js';

try {
  await loadGoogleMaps();
  initMap();
} catch (err) {
  console.error('Google Maps failed to load', err);
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.769653, lng: -91.640976 },
    zoom: 17,
    tilt: 67,
    heading: 0,
    mapId: "53d9fee8bffb7a2a89109697",
  });

  google.maps.event.addListenerOnce(map, "idle", () => {
    map.setTilt(67);
  });

  function flyTo({ center, zoom, tilt = 67, heading = 0, duration = 4000 }) {
    const start = performance.now();
    const startZoom = map.getZoom();
    const startCenter = map.getCenter();

    function animate(t) {
      const k = Math.min((t - start) / duration, 1);

      map.moveCamera({
        center: {
          lat: startCenter.lat() + (center.lat - startCenter.lat()) * k,
          lng: startCenter.lng() + (center.lng - startCenter.lng()) * k,
        },
        zoom: startZoom + (zoom - startZoom) * k,
        tilt,
        heading,
      });

      if (k < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  setTimeout(() => {
    flyTo({ center: { lat: 35.769653, lng: -91.640976 }, zoom: 18, tilt: 67, heading: 0 });
  }, 2000);
}
