export function loadGoogleMaps() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) return resolve(window.google);

    const callbackName = '__gmapsInit';

    if (window[callbackName]) {
      return reject(new Error('Google Maps loader callback already defined'));
    }

    window[callbackName] = () => {
      try {
        delete window[callbackName];
      } catch (e) {}
      resolve(window.google);
    };

    const script = document.createElement('script');
    const key = import.meta.env.VITE_GOOGLE_MAPS_KEY;
    if (!key) {
      reject(new Error('VITE_GOOGLE_MAPS_KEY is not set. Create a .env with VITE_GOOGLE_MAPS_KEY=YOUR_KEY'));
      return;
    }
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&v=beta&callback=${callbackName}&loading=async`;
    script.async = true;
    script.defer = true;
    script.onerror = (err) => {
      try { delete window[callbackName]; } catch (e) {}
      reject(new Error('Failed to load Google Maps API'));
    };

    document.head.appendChild(script);
  });
}
