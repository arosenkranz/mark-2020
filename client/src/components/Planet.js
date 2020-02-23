import * as THREE from 'three';

export const planet = (geometry, material) => {
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};
