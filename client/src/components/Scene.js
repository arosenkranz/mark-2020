import * as THREE from 'three';

const createScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  {
    var size = 10;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper(size, divisions, 0xffffff, 0xfffeee);
    scene.add(gridHelper);
  }
  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xcc39d4;
    const intensity = 0.4;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xcc39d4;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-30, 200, 200);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }
  {
    const ambientlight = new THREE.AmbientLight(0x404040);
    scene.add(ambientlight);
  }

  {
    const near = 0.1;
    const far = 1500;
    const color = '#010d14';
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);
  }

  return scene;
};

export default createScene;
