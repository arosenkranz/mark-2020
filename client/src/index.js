import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';

import './templates/style.css';
import lensflare from './textures/lensflare0.png';
import lensflareTwo from './textures/lensflare3.png';

import { getRandomNum } from './lib/random-number';

// Helpers
import { GUI } from 'dat.gui';
import AxisGridHelper from './lib/axes-grid';
import MinMaxGUIHelper from './lib/minmax-helper';

// an array of objects whose rotation to update
const objects = [];

// select where we're mounting our scene
const canvas = document.querySelector('#root');
// create a new renderer
const renderer = new THREE.WebGLRenderer({ canvas, logarithmicDepthBuffer: true });

function makeCamera() {
  // set camera positioning
  const fov = 85;
  const aspect = window.clientWidth / window.clientHeight; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 20, 50);
  camera.up.set(0, 2, 1);
  camera.lookAt(0, 0, 0);

  return camera;
}

function makeControls() {
  const controls = new OrbitControls(camera, canvas);
  controls.autoRotate = true;
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.zoomSpeed = 0.5;
  controls.enablePan = true;
  controls.autoRotateSpeed = 0.2;
  controls.update();

  return controls;
}

function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 0.04;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 0.5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 5);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  {
    const near = 0.1;
    const far = 1000;
    const color = '#010d14';
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);
  }

  return scene;
}

function makeSphereGeometry() {
  // use just one sphere for everything
  const radius = 1;
  const widthSegments = 8;
  const heightSegments = 8;
  const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

  return sphereGeometry;
}

function makePlanet() {
  const planetOrbit = new THREE.Object3D();
  planetOrbit.name = 'Planet';
  planetOrbit.position.x = getRandomNum(-200, 200);
  planetOrbit.position.y = getRandomNum(-10, 10);
  solarSystem.add(planetOrbit);
  objects.push(planetOrbit);

  // MAKE EARTH
  const planetMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });

  const planetMesh = new THREE.Mesh(sphereGeometry, planetMaterial);
  const planetScale = getRandomNum(1, 7);
  planetMesh.scale.set(planetScale, planetScale, planetScale);
  planetOrbit.add(planetMesh);
  objects.push(planetMesh);

  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = getRandomNum(-4, 4);
  moonOrbit.position.y = getRandomNum(-4, 4);
  planetOrbit.add(moonOrbit);

  const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  const moonScale = getRandomNum(0.2, 1.2);
  moonMesh.scale.set(moonScale, moonScale, moonScale);
  moonOrbit.add(moonMesh);
  objects.push(moonMesh);
}

function makeStarField() {
  // STARS
  const geometry = new THREE.Geometry();
  for (let i = 0; i < 1000; i++) {
    const vertex = new THREE.Vector3();
    vertex.x = Math.random() * 1000 - 500;
    vertex.y = Math.random() * 1000 - 500;
    vertex.z = Math.random() * 1000 - 500;
    geometry.vertices.push(vertex);
  }
  const starField = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 0.8,
      color: 0xffffff
    })
  );
  scene.add(starField);
  starField.position.z = 100;
}

function createLensFlare() {
  // lensflares
  const textureLoader = new THREE.TextureLoader();

  const textureFlare0 = textureLoader.load(lensflare);
  const textureFlare3 = textureLoader.load(lensflareTwo);

  addLight(0.55, 0.9, 0.5, 5000, 0, -1000);
  addLight(0.08, 0.8, 0.5, 0, 0, -1000);
  addLight(0.995, 0.5, 0.9, 5000, 5000, -1000);

  function addLight(h, s, l, x, y, z) {
    const light = new THREE.PointLight(0xffffff, 1.5, 2000);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    scene.add(light);

    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare0, 250, 10, light.color));
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
    light.add(lensflare);
  }
}

function makeGui() {
  const gui = new GUI();

  function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
  }

  // makeAxisGrid(solarSystem, 'solarSystem', 25);
  // makeAxisGrid(sunMesh, 'sunMesh');
  // makeAxisGrid(planetOrbit, 'earthOrbit');
  // makeAxisGrid(earthMesh, 'earthMesh');
  // makeAxisGrid(moonMesh, 'moonMesh');

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
  time *= 0.001; // convert time to seconds

  // pass in each object
  objects.forEach(obj => {
    obj.rotation.y = time;
  });

  // rerender camera aspect for screen resizing
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

const camera = makeCamera();
const controls = makeControls();
const scene = createScene();
const sphereGeometry = makeSphereGeometry();

// create object to hold sun and earth
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

// MAKE SUN
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffcc00 });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(10, 10, 10); // make the sun large
solarSystem.add(sunMesh);
objects.push(sunMesh);

makeStarField();
makeGui();
createLensFlare();

makePlanet();
makePlanet();
makePlanet();

console.log(objects);
requestAnimationFrame(render);
