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
    }



    /**
     * Gets the hexadecimal color representation of the cell based on its type.
     * @returns {string} Hexadecimal color string
     */
    get colorHex() {
        switch (this.type) {
            case CellType.PLAINS:
                return "#21c400ff";

            case CellType.FOREST:
                return "#137000ff";

            case CellType.MOUNTAIN:
                return "#9c9c9cff";

            case CellType.SNOWY_MOUNTAIN:
                return "#f3f3f3ff";

            case CellType.SHALLOW_WATER:
                return "#3db8ffff";

            case CellType.DEEP_WATER:
                return "#007bc2ff";

            case CellType.DESERT:
                return "#e4da59ff";

            case CellType.DBG_BLUE:
                return "#0000ffff";

            case CellType.DBG_RED:
                return "#ff0000ff";

            case CellType.DBG_GREEN:
                return "#00ff00ff";

            case CellType.DBG_MAGENTA:
                return "#a700a7ff";

            case CellType.DBG_YELLOW:
                return "#ffff00ff";

            case CellType.DBG_ORANGE:
                return "#ff9900ff";

            case CellType.DBG_PINK:
                return "#ff00ffff";

            case CellType.DBG_CYAN:
                return "#18c9ffff";

            case CellType.DBG_BROWN:
                return "#7a4900ff";



            default:
                return "#000000ff"; // Default to black if type is unknown
        }
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
}