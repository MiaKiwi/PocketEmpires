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



    exportCells() {
        let cellsString = "";

        for (let cell of this.cells) {
            cellsString += `:${cell.export()}`
        }

        return cellsString;
    }
}