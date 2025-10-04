import { World } from "./world.mjs";

export class CanvasDrawer {
    /**
     * 
     * @param {Uint8ClampedArray} data Data buffer to draw on
     * @param {number} width Width of the data in pixels
     * @param {number} x X coordinate in cell grid (left-most)
     * @param {number} y Y coordinate in cell grid (top-most)
     * @param {{r: number, g: number, b: number, a: number}} color Color to draw
     * @param {number} cellSize Size of the cell in pixels
     * @returns {Uint8ClampedArray} Updated data buffer
     */
    static putPixel(data, width, x, y, color, cellSize = 10) {
        let startX = x * cellSize;
        let startY = y * cellSize;

        for (let dy = 0; dy < cellSize; dy++) {
            for (let dx = 0; dx < cellSize; dx++) {
                let px = startX + dx;
                let py = startY + dy;

                let index = (py * width + px) * 4;

                data[index] = color.r;
                data[index + 1] = color.g;
                data[index + 2] = color.b;
                data[index + 3] = color.a;
            }
        }

        return data;
    }



    /**
     * Draw a world to a canvas
     * @param {World} world World to draw
     * @param {HTMLCanvasElement} canvas Canvas to draw on
     * @param {number} cellSize Size of a cell
     */
    static draw(world, canvas, cellSize = 10) {
        let ctx = canvas.getContext("2d");
        let image = ctx.createImageData(world.width * cellSize, world.height * cellSize);
        let data = image.data;

        console.log(world)

        for (let cell of world.cells) {
            let color = cell.colorRGBA;

            this.putPixel(data, world.width * cellSize, cell.x, cell.y, color, cellSize);
        }

        ctx.putImageData(image, 0, 0);
    }
}