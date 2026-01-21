export function startCameraOrbit(map, position) {
  let heading = map.getHeading() || 0;

  function animateCamera() {
    heading += 0.05; // speed (0.02 = cinematic, 0.05 = normal)

    map.moveCamera({
      center: { lat: position.lat, lng: position.lng }, // track drone
      heading: heading,
      tilt: 67,
      zoom: 19.75,
    });

    requestAnimationFrame(animateCamera);
  }

  animateCamera();
}