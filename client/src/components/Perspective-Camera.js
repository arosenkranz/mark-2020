import * as THREE from 'three';

export const PerspectiveCamera = () => {
  // set camera positioning
  const fov = 85;
  const aspect = window.clientWidth / window.clientHeight; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);
  camera.up.set(0, 1, 1);
  camera.lookAt(0, 0, 0);
  return camera;
};
