import { GUI } from 'dat.gui';
import AxisGridHelper from './axes-grid';
import MinMaxGUIHelper from './minmax-helper';

function makeAxisGrid(node, label, units) {
  const helper = new AxisGridHelper(node, units);
  gui.add(helper, 'visible').name(label);
}

// makeAxisGrid(solarSystem, 'solarSystem', 25);
// makeAxisGrid(sunMesh, 'sunMesh');
// makeAxisGrid(earthOrbit, 'earthOrbit');
// makeAxisGrid(earthMesh, 'earthMesh');
// makeAxisGrid(moonMesh, 'moonMesh');

const setupGui = camera => {
  const gui = new GUI();

  const updateCamera = () => {
    camera.updateProjectionMatrix();
  };

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
};

export default setupGui;
