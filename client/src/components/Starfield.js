import * as THREE from 'three';

const makeStarField = scene => {
  // STARS
  const vertices = [];

  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);

    vertices.push(x, y, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  const starField = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 0.8,
      color: 0xfffeee
    })
  );
  scene.add(starField);
  starField.position.z = 100;
};

export default makeStarField;
