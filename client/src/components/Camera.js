import * as THREE from 'three';

const makeCamera = () => {
  // set camera positioning
  const fov = 65;
  const aspect = window.clientWidth / window.clientHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 20, 500);
  camera.up.set(0, 2, 1);
  camera.lookAt(0, 0, 0);

  return camera;
};

export default makeCamera;
