import { createWebGLOverlay } from './overlay.js';
import { startCameraOrbit } from './orbit.js';
import { accend } from './accend.js';  

export function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.7700, lng: -91.6400 },
    zoom: 18,
    tilt: 67,
    heading: -90,
    mapId: "53d9fee8bffb7a2a89109697",
  });

  const position = { lat: 35.7690, lng: -91.6405, altitude: 5 };

  const webGLOverlayView = createWebGLOverlay(position);
  webGLOverlayView.setMap(map);

  setTimeout(() => {
    accend(position, map, webGLOverlayView);
  }, 2000);

  startCameraOrbit(map, position);
}
