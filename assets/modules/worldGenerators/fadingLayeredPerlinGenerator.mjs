import { Cell } from "../cell.mjs";
import { CellType } from "../cellType.mjs";
import { World } from "../world.mjs";
import { Generator } from "./generator.mjs";

export class FadingLayeredPerlinGenerator extends Generator {
    /**
     * Create a new world using layered Perlin noise
     * @param {number} width Width of the world in cells
     * @param {number} height Height of the world in cells
     * @param {number} zoom Resolution of the noise
     * @param {number} seed Seed used to generate the noise
     * @returns {World} A whole new random world
     */
    static create({
        width,
        height,
        zoom = 100,
        seed = Math.random()
    }) {
        noise.seed(seed);

        let cells = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let result = noise.perlin2(x / zoom, y / zoom)
                    + 0.5 * noise.perlin2(2 * x / zoom, 2 * y / zoom)
                    + 0.25 * noise.perlin2(4 * x / zoom, 4 * y / zoom)
                    + 0.125 * noise.perlin2(8 * x / zoom, 8 * y / zoom)

                // Get the cell type for this result
                let type = CellType.SNOWY_MOUNTAIN;

                if (result < -0.5) {
                    type = CellType.DEEP_WATER
                } else if (result < -0.35) {
                    type = CellType.SHALLOW_WATER
                } else if (result < 0) {
                    type = CellType.PLAINS
                } else if (result < 0.5) {
                    type = CellType.FOREST
                } else if (result < 0.95) {
                    type = CellType.MOUNTAIN
                }

                cells.push(new Cell(x, y, type));
            }
        }

        return new World(cells);
    }
}