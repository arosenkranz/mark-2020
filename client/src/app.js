import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import socket from './api/sockets';

import './templates/style.css';

// SCENE COMPONENTS
import makeControls from './components/Controls';
import makeCamera from './components/Camera';
import createScene from './components/Scene';
// import createLensFlare from './components/LensFlare';
import makeStarField from './components/Starfield';

// Helpers
import { GUI } from 'dat.gui';
import MinMaxGUIHelper from './lib/minmax-helper';
import { getRandomNum, randomRange } from './lib/random-number';

import { getTweets } from './api/twitter-routes';

const gui = new GUI();

// an array of objects whose rotation to update
const planets = [];
const moons = [];
const wireframes = [];
const rings = [];

let posts = JSON.parse(localStorage.getItem('messages')) || [];

let activePlanet;
let materialShader;

// 400, 30, -150, 60 * 1000 * 1.2
const cameraPanArr = [
  {
    x: 400,
    y: 30,
    z: -150,
    duration: 60 * 1000 * 7
  },
  {
    x: -200,
    y: -10,
    z: 200,
    duration: 60 * 1000 * 7
  },
  {
    x: 200,
    y: 100,
    z: -30,
    duration: 60 * 1000 * 7
  },
  {
    x: -500,
    y: 10,
    z: -240,
    duration: 60 * 1000 * 7
  }
];

function makeSphereGeometry() {
  // use just one sphere for everything
  const radius = 1;
  const widthSegments = 30;
  const heightSegments = 30;
  const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );

  return sphereGeometry;
}

function makeDocahedron() {}

function makePlanet(planetInfo) {
  const orbitContainer = new THREE.Object3D();
  orbitContainer.rotation.x = getRandomNum(-0.2, 0.2);
  const planetOrbit = new THREE.Object3D();
  planetOrbit.name = 'Planet';

  // planetOrbit.position.y = getRandomNum(-10, 10);
  orbitContainer.add(planetOrbit);
  solarSystem.add(orbitContainer);
  // planets.push(planetOrbit);

  // MAKE EARTH
  const planetMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244
  });

  const planetMesh = new THREE.Mesh(sphereGeometry, planetMaterial);
  const planetScale = getRandomNum(1.5, 8);
  planetMesh.scale.set(planetScale, planetScale, planetScale);
  const randomX = getRandomNum(-500, -750);
  const x = Math.round(Math.random()) ? randomX : -randomX;
  console.log(x);
  planetMesh.position.x = x;
  planetOrbit.add(planetMesh);
  planets.push(planetMesh);

  const tween = new TWEEN.Tween(planetOrbit.rotation).to(
    { y: '+' + Math.PI * 2 },
    getRandomNum(60000 * 4, 60000 * 6)
  );
  tween
    .onComplete(function() {
      planetOrbit.rotation.y = 0;
    })
    .repeat(Infinity);
  tween.start();
}

function makeWireFramePlanet(planetInfo) {
  const orbitContainer = new THREE.Object3D();
  orbitContainer.rotation.x = getRandomNum(-0.2, 0.2);
  const planetOrbit = new THREE.Object3D();
  planetOrbit.name = 'Planet';

  orbitContainer.add(planetOrbit);
  solarSystem.add(orbitContainer);
  // planets.push(planetOrbit);

  const planetMesh = wireframePlanet.clone();
  const planetScale = getRandomNum(1.5, 8);
  planetMesh.scale.set(planetScale, planetScale, planetScale);
  const randomX = getRandomNum(-500, -750);
  const x = Math.round(Math.random()) ? randomX : -randomX;
  console.log(x);
  planetMesh.position.x = x;
  planetOrbit.add(planetMesh);
  planets.push(planetMesh);

  const tween = new TWEEN.Tween(planetOrbit.rotation).to(
    { y: '+' + Math.PI * 2 },
    getRandomNum(60000 * 4, 60000 * 6)
  );
  tween
    .onComplete(function() {
      planetOrbit.rotation.y = 0;
    })
    .repeat(Infinity);
  tween.start();
}

function makeRing(planetInfo) {
  const orbitContainer = new THREE.Object3D();
  orbitContainer.rotation.x = getRandomNum(-0.2, 0.2);
  const planetOrbit = new THREE.Object3D();
  planetOrbit.name = 'Planet';

  // planetOrbit.position.y = getRandomNum(-10, 10);
  orbitContainer.add(planetOrbit);
  solarSystem.add(orbitContainer);
  // planets.push(planetOrbit);

  const planetMesh = wireframePlanet.clone();
  const planetScale = getRandomNum(1, 7);
  planetMesh.scale.set(planetScale, planetScale, planetScale);
  const randomX = getRandomNum(-700, -100);
  const x = Math.round(Math.random()) ? randomX : -randomX;
  console.log(x);
  planetMesh.position.x = x;
  planetOrbit.add(planetMesh);
  planets.push(planetMesh);

  const tween = new TWEEN.Tween(planetOrbit.rotation).to(
    { y: '+' + Math.PI * 2 },
    getRandomNum(60000, 60000 * 4)
  );
  tween
    .onComplete(function() {
      planetOrbit.rotation.y = 0;
    })
    .repeat(Infinity);
  tween.start();
}

function makeGui() {
  gui.add(camera, 'fov', 1, 180).onChange(updateCamera);

  const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
  gui
    .add(minMaxGUIHelper, 'min', 0.1, 50, 0.1)
    .name('near')
    .onChange(updateCamera);
  gui
    .add(minMaxGUIHelper, 'max', 0.1, 50, 0.1)
    .name('far')
    .onChange(updateCamera);
}

// set camera tween
function targetCameraMain() {
  // pick new planet to look at
  activePlanet = planets[Math.floor(Math.random() * planets.length)];
  console.log(activePlanet);
  console.log(camera);
  const from = {
    x: camera.rotation.x,
    y: camera.rotation.y,
    z: camera.rotation.z
  };

  const to = {
    x: activePlanet.position.x,
    y: activePlanet.position.y,
    z: activePlanet.position.z
  };
  var targetTween = new TWEEN.Tween(controls.target)
    .to(activePlanet.position, 5000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

function panCam({
  x: xTarget,
  y: yTarget,
  z: zTarget,
  duration: tweenDuration
}) {
  const camNewPosition = {
    x: [xTarget / 2, xTarget, randomRange(camera.position.x)],
    y: [yTarget / 2, yTarget, randomRange(camera.position.y)],
    z: [zTarget / 2, zTarget, randomRange(camera.position.z)]
  };

  const newTarget =
    cameraPanArr[Math.floor(Math.random() * cameraPanArr.length)];

  const camTweenThere = new TWEEN.Tween(camera.position)
    .to(camNewPosition, tweenDuration)
    .interpolation(TWEEN.Interpolation.CatmullRom)
    .easing(TWEEN.Easing.Quadratic.Out)
    // .onUpdate(() => camera.up.set(0, 1, 1))
    .onComplete(() => panCam(newTarget));

  camTweenThere.start();
}

function updateCamera() {
  camera.updateProjectionMatrix();
}

// to check if the scene needs to be resized with the screen
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render(time) {
  rings.forEach(ring => {
    ring.rotation.y += 0.02;
    ring.rotation.x += 0.01;
    ring.rotation.z -= 0.03;
  });

  sunMesh.rotation.x += 0.001;
  sunMesh.rotation.y += 0.001;

  // rerender camera aspect for screen resizing
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  // if (materialShader) {
  //   materialShader.uniforms.time.value = time / 10000;
  // }

  TWEEN.update();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

// select where we're mounting our scene
const canvas = document.querySelector('#root');
// create a new renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  logarithmicDepthBuffer: true,
  antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0xffffff, 0);
renderer.shadowMapSoft = true;
renderer.autoClear = false;

const camera = makeCamera();
const controls = makeControls(camera, canvas);
const scene = createScene();
const sphereGeometry = makeSphereGeometry();
const lowPolySphere = new THREE.DodecahedronGeometry(1, 1);

// create object to hold all planets
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
// MAKE SUN
const sunMaterial = new THREE.MeshLambertMaterial({
  color: 'yellow',
  transparent: false,
  opacity: 0.5
});

sunMaterial.onBeforeCompile = shader => {
  shader.uniforms.time = { value: 0 };
  shader.vertexShader =
    `
         uniform float time;
         ` + shader.vertexShader;
  const token = '#include <begin_vertex>';
  const customTransform = `
        vec3 transformed = vec3(position);
        transformed.x = position.x 
             + sin(position.y*5.0 + time*5.0)*0.1;
    `;
  shader.vertexShader = shader.vertexShader.replace(token, customTransform);
  materialShader = shader;
};

const sunMaterial2 = new THREE.MeshPhongMaterial({
  color: new THREE.Color('#fff'),
  emissive: new THREE.Color('#3c0752'),
  shininess: new THREE.Color('#fc6bcf'),
  shininess: 10,
  flatShading: true,
  transparent: 1,
  opacity: 1,
  side: THREE.DoubleSide
});

const sunMesh = new THREE.Mesh(lowPolySphere, sunMaterial2);
sunMesh.receiveShadow = true;
sunMesh.castShadow = true;
sunMesh.scale.set(25, 25, 25); // make the sun large
solarSystem.add(sunMesh);

const wireframePlanet = new THREE.Mesh(
  lowPolySphere,
  new THREE.MeshPhongMaterial({
    color: new THREE.Color('#fff'),
    emissive: new THREE.Color('#fc6bcf'),
    shininess: new THREE.Color('#fff'),
    shininess: 10,
    shading: THREE.FlatShading,
    transparent: 1,
    opacity: 0.7,
    wireframe: true
  })
);

wireframePlanet.scale.set(31, 31, 31);
wireframePlanet.receiveShadow = true;
wireframePlanet.castShadow = false;
wireframes.push(wireframePlanet);
// solarSystem.add(wireframePlanet);

const ringMaterial = new THREE.MeshPhongMaterial({
  color: new THREE.Color('#fff'),
  emissive: new THREE.Color('#fc6bcf'),
  shininess: new THREE.Color('#fff'),
  shininess: 10,
  flatShading: true,
  transparent: 1,
  opacity: 1,
  wireframe: true
});

const ringGeometry = new THREE.TorusBufferGeometry(35, 8, 5, 20);
const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
// ringMesh.scale.set(45, 45, 45);
rings.push(ringMesh);
solarSystem.add(ringMesh);

makeStarField(scene);
// createLensFlare(scene);
// makeGui();

const circleGeometry = new THREE.CircleGeometry(100, 100);
circleGeometry.vertices.shift();
const line = new THREE.Line(
  circleGeometry,
  new THREE.LineDashedMaterial({
    color: 0xffffff,
    linewidth: 5,
    scale: 3,
    dashSize: 3,
    gapSize: 1
  })
);
line.rotation.x = Math.PI * 0.5;
line.scale.set(10, 10, 10);
// scene.add(line);

makePlanet();
makePlanet();
makeWireFramePlanet();
makeWireFramePlanet();

const newTarget = cameraPanArr[Math.floor(Math.random() * cameraPanArr.length)];
panCam(newTarget);

requestAnimationFrame(render);

console.log(planets);
targetCameraMain();

socket.on('connect', () => {
  console.log('socket connected');
  socket.on('new-message', data => {
    console.log(data);
    posts.push(data);
    localStorage.setItem('messages', JSON.stringify(posts));
  });
});

// setInterval(async () => {
//   try {
//     const { data: tweets } = await getTweets();
//     console.log(tweets);
//     const filteredTweets = tweets.filter(tweet => {});
//   } catch (err) {
//     console.log(err);
//   }
// }, 20000);