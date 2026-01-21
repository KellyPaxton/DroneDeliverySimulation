import { loadGoogleMaps } from './api-loader.js';
import { initMap } from './map.js';

try {
  await loadGoogleMaps();
  initMap();
} catch (err) {
  console.error('Google Maps failed to load', err);
}