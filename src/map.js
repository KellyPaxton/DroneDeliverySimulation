import { createWebGLOverlay } from './overlay.js';
import { delivery } from './delivery.js';
import { startCameraOrbit } from './orbit.js';  

export function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.7700, lng: -91.6400 },
    zoom: 18,
    tilt: 67,
    heading: -90,
    mapId: "53d9fee8bffb7a2a89109697",
  });

  const position = { lat: 35.7700, lng: -91.6400, altitude: 30 };

  const webGLOverlayView = createWebGLOverlay(position);
  webGLOverlayView.setMap(map);

  // Start drone movement
  delivery(position, map, webGLOverlayView);

  // Start camera orbit
  startCameraOrbit(map, position);
}