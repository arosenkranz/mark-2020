import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import asteroid1 from '../objects/Asteroid 1.FBX';
import asteroid2 from '../objects/Asteroid 2.FBX';
import planet1 from '../objects/Planet 1.FBX';
import planet2 from '../objects/Planet 2.FBX';
import planet3 from '../objects/Planet 3.FBX';
import planet4 from '../objects/Planet 4.FBX';
import planet5 from '../objects/Planet 5.FBX';
import planet6 from '../objects/Planet 6.FBX';
import planet7 from '../objects/Planet 7.FBX';
import planet8 from '../objects/Planet 8.FBX';
import planet9 from '../objects/Planet 9.FBX';
import planet10 from '../objects/Planet 10.FBX';
import planet11 from '../objects/Planet 11.FBX';
import planet12 from '../objects/Planet 12.FBX';

export const loadPlanets = planetObjs => {
  return new Promise((resolve, reject) => {
    const loader = new FBXLoader();

    loader.load(planet1, obj => {
      obj.traverse(child => {
        if (child.isMesh) {
          child.scale.set(0.04, 0.04, 0.04);

          child.castShadow = true;
          child.receiveShadow = true;
          const oldMat = child.material;
          console.log(oldMat);
          child.material = new THREE.MeshPhongMaterial({
            color: new THREE.Color('#8f7459'),
            specular: new THREE.Color('#ffffff'),
            shininess: 60,
            flatShading: true,
            transparent: 1,
            opacity: 1
          });
        }
      });

      planetObjs.push(obj);

      loader.load(planet2, obj => {
        obj.traverse(child => {
          if (child.isMesh) {
            child.scale.set(0.04, 0.04, 0.04);
            child.castShadow = true;
            child.receiveShadow = true;
            const oldMat = child.material;

            child.material = new THREE.MeshPhongMaterial({
              color: new THREE.Color('#6abaa9'),
              specular: new THREE.Color('#ffffff'),
              shininess: 30,
              flatShading: true,
              transparent: 1,
              opacity: 1
            });
          }
        });

        planetObjs.push(obj);

        loader.load(planet3, obj => {
          obj.traverse(child => {
            if (child.isMesh) {
              child.scale.set(0.04, 0.04, 0.04);
              child.castShadow = true;
              child.receiveShadow = true;
              const oldMat = child.material;

              child.material = new THREE.MeshPhongMaterial({
                color: new THREE.Color('#8f7459'),
                specular: new THREE.Color('#ffffff'),
                shininess: 20,
                flatShading: false,
                transparent: 1,
                opacity: 1
              });
            }
          });

          planetObjs.push(obj);
          loader.load(planet4, obj => {
            obj.traverse(child => {
              if (child.isMesh) {
                child.scale.set(0.04, 0.04, 0.04);
                child.castShadow = true;
                child.receiveShadow = true;
                const oldMat = child.material;

                child.material = new THREE.MeshPhongMaterial({
                  color: new THREE.Color('#6abaa9'),
                  specular: new THREE.Color('#ffffff'),
                  shininess: 14,
                  flatShading: true,
                  transparent: 1,
                  opacity: 1
                });
              }
            });

            planetObjs.push(obj);
            loader.load(planet5, obj => {
              obj.traverse(child => {
                if (child.isMesh) {
                  child.scale.set(0.04, 0.04, 0.04);
                  child.castShadow = true;
                  child.receiveShadow = true;
                  const oldMat = child.material;

                  child.material = new THREE.MeshPhongMaterial({
                    color: new THREE.Color('#dd88aa'),
                    color: new THREE.Color('#494949'),
                    specular: new THREE.Color('#ffffff'),
                    shininess: 60,
                    flatShading: true,
                    transparent: 1,
                    opacity: 1
                  });
                }
              });

              planetObjs.push(obj);
              loader.load(planet6, obj => {
                obj.traverse(child => {
                  if (child.isMesh) {
                    child.scale.set(0.04, 0.04, 0.04);
                    child.castShadow = true;
                    child.receiveShadow = true;
                    const oldMat = child.material;

                    child.material = new THREE.MeshPhongMaterial({
                      color: new THREE.Color('#fff'),
                      emissive: new THREE.Color('#f5424b'),
                      color: new THREE.Color('#494949'),
                      specular: new THREE.Color('#ffffff'),
                      shininess: 60,
                      flatShading: true,
                      transparent: 1,
                      opacity: 1
                    });
                  }
                });

                planetObjs.push(obj);
                loader.load(planet7, obj => {
                  obj.traverse(child => {
                    if (child.isMesh) {
                      child.scale.set(0.04, 0.04, 0.04);
                      child.castShadow = true;
                      child.receiveShadow = true;
                      const oldMat = child.material;

                      child.material = new THREE.MeshPhongMaterial({
                        color: new THREE.Color('#fff'),
                        specular: new THREE.Color('#ffffff'),
                        shininess: 25,
                        flatShading: true,
                        transparent: 1,
                        opacity: 1
                      });
                    }
                  });

                  planetObjs.push(obj);
                  loader.load(planet8, obj => {
                    obj.traverse(child => {
                      if (child.isMesh) {
                        child.scale.set(0.04, 0.04, 0.04);
                        child.castShadow = true;
                        child.receiveShadow = true;
                        const oldMat = child.material;

                        child.material = new THREE.MeshPhongMaterial({
                          color: new THREE.Color('#f5424b'),
                          specular: new THREE.Color('#ffffff'),
                          shininess: 30,
                          flatShading: true,
                          transparent: 1,
                          opacity: 1
                        });
                      }
                    });

                    planetObjs.push(obj);
                    loader.load(planet9, obj => {
                      obj.traverse(child => {
                        if (child.isMesh) {
                          child.scale.set(0.04, 0.04, 0.04);
                          child.castShadow = true;
                          child.receiveShadow = true;
                          const oldMat = child.material;
                          console.log(oldMat);
                          child.material = new THREE.MeshPhongMaterial({
                            color: new THREE.Color('#f5424b'),
                            specular: new THREE.Color('#ffffff'),
                            shininess: 20,
                            flatShading: true,
                            transparent: 1,
                            opacity: 1
                          });
                        }
                      });

                      planetObjs.push(obj);
                      loader.load(planet10, obj => {
                        obj.traverse(child => {
                          if (child.isMesh) {
                            child.scale.set(0.04, 0.04, 0.04);
                            child.castShadow = true;
                            child.receiveShadow = true;
                            const oldMat = child.material;

                            child.material = new THREE.MeshPhongMaterial({
                              color: new THREE.Color('#f5424b'),
                              flatShading: true,
                              transparent: 1,
                              opacity: 1
                            });
                          }
                        });

                        planetObjs.push(obj);
                        loader.load(planet11, obj => {
                          obj.traverse(child => {
                            if (child.isMesh) {
                              child.scale.set(0.04, 0.04, 0.04);
                              child.castShadow = true;
                              child.receiveShadow = true;
                              const oldMat = child.material;

                              child.material = new THREE.MeshPhongMaterial({
                                color: new THREE.Color('#24bdff'),
                                flatShading: true,
                                transparent: 1,
                                opacity: 1
                              });
                            }
                          });

                          planetObjs.push(obj);

                          loader.load(planet12, obj => {
                            obj.traverse(child => {
                              if (child.isMesh) {
                                child.scale.set(0.04, 0.04, 0.04);
                                child.castShadow = true;
                                child.receiveShadow = true;
                                const oldMat = child.material;

                                child.material = new THREE.MeshPhongMaterial({
                                  color: new THREE.Color('#f5424b'),
                                  shininess: 20,
                                  flatShading: true,
                                  transparent: 1,
                                  opacity: 1
                                });
                              }
                            });

                            planetObjs.push(obj);

                            resolve(planetObjs);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};
