import { Cell } from "./cell.mjs";
import { Empire } from "./empire.mjs";

export class World {
    /**
     * 
     * @param {Cell[]} cells Cells in the world
     * @param {Empire[]} empires Empires in the world
     */
    constructor(cells, empires = []) {
        this.cells = cells;
        this.empires = empires;
    }



    get width() {
        return this.cells.reduce((max, cell) => Math.max(max, cell.x), 0) + 1;
    }


    get height() {
        return this.cells.reduce((max, cell) => Math.max(max, cell.y), 0) + 1;
    }



    /**
     * Get an empire by its ID
     * @param {string} id ID of the empire
     * @returns {Empire|null} The empire or null if not found
     */
    getEmpire(id) {
        return this.empires.find(e => e.id === id) || null;
    }



    /**
     * Get a cell by its coordinates
     * @param {number} x X coordinate of the cell
     * @param {number} y Y coordinate of the cell
     * @returns {Cell|null} The cell or null if not found
     */
    getCell(x, y) {
        return this.cells.find(c => c.x === x && c.y === y) || null;
    }
}