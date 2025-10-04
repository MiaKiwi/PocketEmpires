import { CellType } from "./cellType.mjs";

export class Empire {
    /**
     * Creates a new empire instance
     * @param {string} id ID of the empire
     * @param {World} world World the empire is in
     * @param {string} color HEX color code for the empire
     * @param {number} maxSize Maximum number of cells controlled by the empire
     */
    constructor(id, world, color, maxSize = 100) {
        this.id = id;
        this.world = world;
        this.color = color;
        this.maxSize = maxSize;

        // Add the empire to the world if it isn't already in it
        if (!this.world.getEmpire(this.id)) {
            this.world.addEmpire(this)
        }
    }



    get colorRGBA() {
        let col = this.color.replace("#", "");

        return {
            r: parseInt(col.substring(0, 2), 16),
            g: parseInt(col.substring(2, 4), 16),
            b: parseInt(col.substring(4, 6), 16),
            a: 255
        }
    }



    get size() {
        return this.getTerritory().length;
    }



    isOversized() {
        return this.size > this.maxSize
    }



    /**
     * Get the cells controlled by the empire
     * @returns {Cell[]}
     */
    getTerritory() {
        return this.world.cells.filter(c => c?.empire === this) || []
    }



    getEdgeCells() {
        let edgeCells = [];

        for (let cell of this.getTerritory()) {
            for (let neighbor of cell.getNonNullNeighbors()) {
                if (neighbor.empire !== this) {
                    edgeCells.push(neighbor);
                }
            }
        }

        return edgeCells;
    }



    step() {
        //console.log("Stepping", this)
        /**
         * At each step, the empire can only perform ONE action
         * 
         * It can:
         * - COLONIZE an empty cell
         * - INVADE an occupied cell
         * 
         * COLONIZING gives the cell to the empire and sets the morale and loyalty to 100
         * 
         * INVADING gives the cell to the empire if some conditions are met and inverts the morale and loyalty
         */

        // Get edge cells (cells at the borders of the empire)
        let edges = this.getEdgeCells();

        // Get the edge cell with the lowest traversal cost
        let sorted = edges.sort((a, b) => a.getTraversalCost() - b.getTraversalCost());
        let cheapest = sorted[0].getTraversalCost();
        let cheapestLot = sorted.filter(c => c.getTraversalCost() === cheapest);

        // If there are multiple cheap cells, pick one of them to colonize randomly
        let cellToColonize = cheapestLot[Math.floor(Math.random() * cheapestLot.length)];

        this.colonize(cellToColonize);
    }



    colonize(cell) {
        if (cell.empire !== this) {
            cell.empire = this;
            cell.loyalty = 100;
            cell.morale = 100;
        }
    }
}