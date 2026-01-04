import { TilesRenderer } from '3d-tiles-renderer';

export function createTiles(camera, renderer) {
  const tiles = new TilesRenderer(
    'https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCys-dnfgHsjSJIlqbTUvwVhF0YCX1qz-U'
  );

  tiles.setCamera(camera);
  tiles.setResolutionFromRenderer(camera, renderer);

  return tiles;
}
