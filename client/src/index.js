import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import './templates/style.css';

// SCENE COMPONENTS
import makeControls from './components/Controls';
import makeCamera from './components/Camera';
import createScene from './components/Scene';
import createLensFlare from './components/LensFlare';
import makeStarField from './components/Starfield';

// Helpers
import { GUI } from 'dat.gui';
import AxisGridHelper from './lib/axes-grid';
import MinMaxGUIHelper from './lib/minmax-helper';
import { getRandomNum, randomRange } from './lib/random-number';

const gui = new GUI();

// an array of objects whose rotation to update
const planets = [];
const moons = [];

// select where we're mounting our scene
const canvas = document.querySelector('#root');
// create a new renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  logarithmicDepthBuffer: true,
  antialias: true
});

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

function makePlanet() {
  const orbitContainer = new THREE.Object3D();
  orbitContainer.rotation.x = getRandomNum(-0.2, 0.2);
  const planetOrbit = new THREE.Object3D();
  planetOrbit.name = 'Planet';

  // planetOrbit.position.y = getRandomNum(-10, 10);
  orbitContainer.add(planetOrbit);
  solarSystem.add(orbitContainer);
  planets.push(planetOrbit);

  // MAKE EARTH
  const planetMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244
  });

  const planetMesh = new THREE.Mesh(sphereGeometry, planetMaterial);
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

  const moonCount = parseInt(getRandomNum(0, 3));

  for (let i = 0; i < moonCount; i++) {
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = getRandomNum(
      getRandomNum(-20, -7),
      getRandomNum(8, 20)
    );
    planetOrbit.add(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      emissive: 0x222222
    });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    const moonScale = getRandomNum(0.2, 1.2);
    moonMesh.scale.set(moonScale, moonScale, moonScale);
    moonOrbit.add(moonMesh);
    moons.push(moonMesh);
    // makeAxisGrid(moonMesh, 'moonMesh');
  }
}

function makeAxisGrid(node, label, units) {
  const helper = new AxisGridHelper(node, units);
  gui.add(helper, 'visible').name(label);
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
  var from = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  };

  var to = {
    x: 100,
    y: 20,
    z: -200
  };
  var tween = new TWEEN.Tween(from)
    .to(to, 5000)
    .easing(TWEEN.Easing.Quintic.InOut)
    .onUpdate(function() {
      console.log(this);
      camera.position.set(this.x, this.y, this.z);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    })
    .onComplete(function() {
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    })
    .start();
}

function panCam(xTarget, yTarget, zTarget, tweenDuration) {
  // TWEEN.removeAll();

  const camNewPosition = {
    x: [xTarget / 2, xTarget, randomRange(camera.position.x)],
    y: [yTarget / 2, yTarget, randomRange(camera.position.y)],
    z: [zTarget / 2, zTarget, randomRange(camera.position.z)]
  };

  const camTweenThere = new TWEEN.Tween(camera.position)
    .to(camNewPosition, tweenDuration)
    .interpolation(TWEEN.Interpolation.CatmullRom)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onComplete(() => panCam(xTarget, yTarget, zTarget, tweenDuration));

  camTweenThere.start();
}

function targetCam() {}

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

var r = 200;
var theta = 0;
var dTheta = (2 * Math.PI) / 1000;

function render(time) {
  let timeSec = time * 0.001; // convert time to seconds

  theta += dTheta;

  // pass in each object
  planets.forEach(obj => {
    // obj.rotation.y = time;
    // obj.position.x = r * Math.cos(theta);
    // obj.position.z = r * Math.sin(theta);
  });

  // moons.forEach(moon => {
  //   moon.rotation.y = time;
  //   moon.position.x = r * Math.cos(theta);
  //   moon.position.z = r * Math.sin(theta);
  // });

  sunMesh.rotation.x += 0.001;
  sunMesh.rotation.y += 0.001;

  // rerender camera aspect for screen resizing
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  if (materialShader) {
    materialShader.uniforms.time.value = time / 10000;
  }

  TWEEN.update();
  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

const camera = makeCamera();
const controls = makeControls(camera, canvas);
const scene = createScene();
const sphereGeometry = makeSphereGeometry();

var gridHelper = new THREE.GridHelper(1000, 100, 0x0000ff, 0x808080);
scene.add(gridHelper);

// create object to hold sun and earth
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
// planets.push(solarSystem);
// makeAxisGrid(solarSystem, 'solarSystem', 25);

// MAKE SUN
const sunMaterial = new THREE.MeshLambertMaterial({
  color: 'yellow',
  transparent: false,
  opacity: 0.5
});
let materialShader;
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
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(25, 25, 25); // make the sun large
solarSystem.add(sunMesh);
// planets.push(sunMesh);
// makeAxisGrid(sunMesh, 'sunMesh');
console.log(sunMesh);

makeStarField(scene);
createLensFlare(scene);
makeGui();

makePlanet();
// makePlanet();
// makePlanet();
// makePlanet();
// makePlanet();

panCam(400, 30, -150, 60 * 1000 * 1.2); //This pans the camera to the an x of 500, y of 200 and a z of 4000 with a duration of 1 second.

// targetCameraMain();
requestAnimationFrame(render);

console.log(moons);
console.log(planets);
