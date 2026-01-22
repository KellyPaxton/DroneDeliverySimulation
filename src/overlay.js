import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

export function createWebGLOverlay(position) {
  const webGLOverlayView = new google.maps.WebGLOverlayView();

  webGLOverlayView.onAdd = function () {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.01, 10000);
    this.loader = new GLTFLoader();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(100, 100, 100);
    this.scene.add(directionalLight);

    this.loader.load(import.meta.env.BASE_URL + '006.glb', (gltf) => {
      
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());;
        
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.emissive.set(0x000000);
            child.material.emissiveIntensity = 1.0;
          }
        });
        
        gltf.scene.position.copy(center).multiplyScalar(-1);
        gltf.scene.scale.set(10, 10, 10);
        gltf.scene.rotation.x = Math.PI / 2;
        gltf.scene.rotation.y = Math.PI;
        this.scene.add(gltf.scene);
      },
    );
  };

  webGLOverlayView.onContextRestored = function ({gl}) {
   
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: gl.canvas,
      context: gl,
      alpha: true,
      antialias: true,
    });
    
    this.renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    this.renderer.autoClear = false;
    this.renderer.setClearColor(0x000000, 0);
  };

  webGLOverlayView.onDraw = function ({gl, transformer}) {

    const latLngAltitudeLiteral = {
      lat: position.lat,
      lng: position.lng,
      altitude: position.altitude, 
    };

    const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);
    this.camera.projectionMatrix.fromArray(matrix);

    this.renderer.render(this.scene, this.camera);
    this.renderer.resetState();
    gl.endFrameEXP && gl.endFrameEXP();
  };

  return webGLOverlayView;
}