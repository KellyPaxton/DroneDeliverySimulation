import * as THREE from 'three';

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    100000
  );

  camera.position.set(0, 500, 1000);
  return camera;
}
