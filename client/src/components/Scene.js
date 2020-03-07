import * as THREE from 'three';

const createScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcc39d4);

  {
    const skyColor = 0xffffff; // light blue
    const groundColor = 0xffffff;
    const intensity = 0.5;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 0.2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-100, 800, 400);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }
  {
    const ambientlight = new THREE.AmbientLight(0x4c0178);
    scene.add(ambientlight);
  }

  {
    const near = 0.1;
    const far = 2000;
    const color = '#010d14';
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);
  }

  {
    const sp = [];
    const helper = [];

    const spProps = [
      [0xfc6bcf, 1, 2000, 128, 0],
      [0x6bd6ff, 1, 2000, 120, 0, 1],
      [0x6bd6ff, 1, 2000, 100, 0, 1],
      [0x6bd6ff, 0.8, 2500, 128, 0, 1]
    ];
    const spPos = [
      [0, 800, 800],
      [700, 1000, 1000],
      [700, 1000, -1000],
      [0, -1300, 1200]
    ];

    for (let x = 0; x < spPos.length; x++) {
      // === spotlight
      sp[x] = new THREE.SpotLight(...spProps[x]);
      sp[x].position.set(...spPos[x]);
      sp[x].castShadow = true;
      scene.add(sp[x]);
      sp[x].shadow.mapSize.width = 1024;
      sp[x].shadow.mapSize.height = 1024;

      // === spotlight helper
      helper[x] = new THREE.SpotLightHelper(sp[x]);
      // scene.add( helper[x] );
    }
  }

  const gridHelper = new THREE.GridHelper(1000, 100, 0x0000ff, 0x808080);
  // scene.add(gridHelper);

  return scene;
};

export default createScene;
