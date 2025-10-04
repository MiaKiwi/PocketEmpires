import { Cell } from "../cell.mjs";
import { CellType } from "../cellType.mjs";
import { World } from "../world.mjs";
import { Generator } from "./generator.mjs";

export class FALayeredPerlinGenerator extends Generator {
    /**
     * Create a new world using layered Perlin noise
     * @param {number} width Width of the world in cells
     * @param {number} height Height of the world in cells
     * @param {number} zoom Resolution of the noise
     * @param {number} seed Seed used to generate the noise
     * @param {number} octaves Number of octaves used. More octaves gives more detailed terrain
     * @param {number} lacunarity
     * @param {number} persistence 
     * @returns {World} A whole new random world
     */
    static create({
        width,
        height,
        zoom = 100,
        seed = Math.random(),
        octaves = 2,
        lacunarity = 2,
        persistence = 0.5
    }) {
        noise.seed(seed);

        let world = new World([]);
        let cells = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let total = 0;
                let totalAmplitude = 0;

                for (let octave = 0; octave < octaves; octave++) {
                    let frequency = lacunarity ^ octave;
                    let amplitude = persistence ^ octave;

                    total += noise.perlin2(x * frequency / zoom, y * frequency / zoom);
                    totalAmplitude += amplitude;
                }

                let result = total;

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

                cells.push(new Cell(x, y, type, world));
            }
        }

        world.cells = cells;

        return world;
    }
}