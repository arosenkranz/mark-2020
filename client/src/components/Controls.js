import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const makeControls = (camera, canvas) => {
  const controls = new OrbitControls(camera, canvas);
  controls.autoRotate = false;
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.zoomSpeed = 0.2;
  controls.minPolarAngle = 0.8;
  controls.maxPolarAngle = 2.4;
  controls.maxDistance = 850;
  controls.minDistance = 40;
  controls.enablePan = true;
  controls.autoRotateSpeed = 0.1;
  controls.update();

  return controls;
};

export default makeControls;
