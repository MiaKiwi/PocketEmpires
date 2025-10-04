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
     * Create a new empire in the world
     * @param {string} id ID of the new empire
     * @param {string} color HEX color of the new empire
     * @param {Cell[]} startingCells Starting cells of the new empire
     * @param {number} maxSize Max size of the new empire
     */
    newEmpire(id, color, startingCells, maxSize = 100) {
        let empire = new Empire(id, this, color, maxSize);

        this.addEmpire(empire);

        for (let cell of startingCells) {
            empire.colonize(cell);
        }
    }



    /**
     * Add an empire to the world
     * @param {Empire} empire 
     */
    addEmpire(empire) {
        if (!this.getEmpire(empire.id)) {
            this.empires.push(empire)
        }
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



    /**
     * Add a cell to the world
     * @param {Cell} cell 
     */
    addCell(cell) {
        if (!this.getCell(cell.x, cell.y)) {
            this.cells.push(cell)
        }
    }



    step() {
        // Step all empires
        for (let empire of this.empires) {
            empire.step();
        }
    }
}