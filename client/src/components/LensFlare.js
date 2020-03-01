import * as THREE from 'three';
import {
  Lensflare,
  LensflareElement
} from 'three/examples/jsm/objects/Lensflare.js';

import lensflare from '../textures/lensflare0.png';
import lensflareTwo from '../textures/lensflare3.png';

const createLensFlare = scene => {
  // lensflares
  const textureLoader = new THREE.TextureLoader();

  const textureFlare0 = textureLoader.load(lensflare);
  const textureFlare3 = textureLoader.load(lensflareTwo);

  addLight(0.55, 0.9, 0.5, 5000, 0, -1000);
  addLight(0.08, 0.8, 0.5, 0, 0, -1000);
  addLight(0.995, 0.5, 0.9, 5000, 5000, -1000);

  function addLight(h, s, l, x, y, z) {
    const light = new THREE.PointLight(0xfffeee, 1.5, 2000);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    scene.add(light);

    const lensflare = new Lensflare();
    lensflare.addElement(
      new LensflareElement(textureFlare0, 250, 10, light.color)
    );
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
    light.add(lensflare);
  }
};

export default createLensFlare;
