import { blendHexColors } from "./blendColors.mjs";
import { CellType } from "./cellType.mjs";
import { Empire } from "./empire.mjs";
import { World } from "./world.mjs";

export class Cell {
    /**
     * Creates a new Cell instance.
     * @param {number} x X coordinate of the cell
     * @param {number} y Y coordinate of the cell
     * @param {CellType} type Type of the cell
     * @param {World} world World in which the cell is
     * @param {Empire|null} empire Empire that owns the cell
     * @param {number} morale Morale of the units in the cell
     * @param {number} loyalty Loyalty of the population in the cell
     */
    constructor(x, y, type, world, empire = null, morale = 0, loyalty = 0) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.world = world;
        this.empire = empire;
        this.morale = morale;
        this.loyalty = loyalty;

        // Add the cell to the world if it isn't already in it
        if (!this.world.getCell(this.x, this.y)) {
            this.world.addCell(this)
        }
    }



    /**
     * Gets the hexadecimal color representation of the cell based on its type.
     * @returns {string} Hexadecimal color string
     */
    get colorHex() {
        let col = "#ff00ffff";

        switch (this.type) {
            case CellType.PLAINS:
                col = "#21c400ff";
                break;

            case CellType.FOREST:
                col = "#137000ff";
                break;

            case CellType.MOUNTAIN:
                col = "#9c9c9cff";
                break;

            case CellType.SNOWY_MOUNTAIN:
                col = "#f3f3f3ff";
                break;

            case CellType.SHALLOW_WATER:
                col = "#3db8ffff";
                break;

            case CellType.DEEP_WATER:
                col = "#007bc2ff";
                break;

            case CellType.DESERT:
                col = "#e4da59ff";
                break;

            case CellType.DBG_BLUE:
                col = "#0000ffff";
                break;

            case CellType.DBG_RED:
                col = "#ff0000ff";
                break;

            case CellType.DBG_GREEN:
                col = "#00ff00ff";
                break;

            case CellType.DBG_MAGENTA:
                col = "#a700a7ff";
                break;

            case CellType.DBG_YELLOW:
                col = "#ffff00ff";
                break;

            case CellType.DBG_ORANGE:
                col = "#ff9900ff";
                break;

            case CellType.DBG_PINK:
                col = "#ff00ffff";
                break;

            case CellType.DBG_CYAN:
                col = "#18c9ffff";
                break;

            case CellType.DBG_BROWN:
                col = "#7a4900ff";
                break;

            default:
                col = "#e60000ff"; // Default to dark red if type is unknown
                break;
        }

        // If the cell is occupied, blend its color and empire's
        if (this.empire !== null) {
            let empireColor = this.empire.color;

            col = blendHexColors(col, empireColor, 0.5) + "ff";
        }

        return col;
    }



    /**
     * Gets the RGBA color representation of the cell based on its type.
     * @returns {{r: number, g: number, b: number, a: number}} RGBA color object
     */
    get colorRGBA() {
        let hex = this.colorHex.replace("#", "");

        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16),
            a: parseInt(hex.substring(6, 8), 16)
        };
    }



    getTopLeftNeighbor() {
        if (this.x === 0 || this.y === 0) return null

        return this.world.getCell(this.x - 1, this.y - 1)
    }



    getTopNeighbor() {
        if (this.y === 0) return null

        return this.world.getCell(this.x, this.y - 1)
    }



    getTopRightNeighbor() {
        if (this.x === this.world.width || this.y === 0) return null

        return this.world.getCell(this.x + 1, this.y - 1)
    }



    getLeftNeighbor() {
        if (this.x === 0) return null

        return this.world.getCell(this.x - 1, this.y)
    }



    getRightNeighbor() {
        if (this.x === this.world.width) return null

        return this.world.getCell(this.x + 1, this.y)
    }



    getBottomLeftNeighbor() {
        if (this.x === 0 || this.y === this.world.height) return null

        return this.world.getCell(this.x - 1, this.y + 1)
    }



    getBottomNeighbor() {
        if (this.y === this.world.height) return null

        return this.world.getCell(this.x, this.y + 1)
    }



    getBottomRightNeighbor() {
        if (this.x === this.world.width || this.y === this.world.height) return null

        return this.world.getCell(this.x + 1, this.y + 1)
    }



    /**
     * Returns all neighboring cells (Left to right, top to bottom)
     * 0 1 2
     * 3   4
     * 5 6 7
     * @returns {Cell[]}
     */
    getNeighbors() {
        return [
            this.getTopLeftNeighbor(),
            this.getTopNeighbor(),
            this.getTopRightNeighbor(),
            this.getLeftNeighbor(),
            this.getRightNeighbor(),
            this.getBottomLeftNeighbor(),
            this.getBottomNeighbor(),
            this.getBottomRightNeighbor()
        ];
    }



    /**
     * Get all non-null neighboring cells
     * @returns {Cell[]}
     */
    getNonNullNeighbors() {
        let neighbors = this.getNeighbors();

        return neighbors.filter(n => n !== null);
    }




    /**
     * Get cost to go through the cell
     * @returns {number}
     */
    getTraversalCost() {
        let cost = 1; // Default cost is 1

        switch (this.type) {
            case CellType.PLAINS:
                cost = 1;
                break;

            case CellType.FOREST:
                cost = 1;
                break;

            case CellType.MOUNTAIN:
                cost = 3;
                break;

            case CellType.SNOWY_MOUNTAIN:
                cost = 4;
                break;

            case CellType.SHALLOW_WATER:
                cost = 3;
                break;

            case CellType.DEEP_WATER:
                cost = 4;
                break;

            case CellType.DESERT:
                cost = 6;
                break;
        }

        return cost;
    }
}