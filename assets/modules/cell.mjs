import { CellType } from "./cellType.mjs";

export class Cell {
    /**
     * Creates a new Cell instance.
     * @param {number} x X coordinate of the cell
     * @param {number} y Y coordinate of the cell
     * @param {CellType} type Type of the cell
     * @param {string|null} empireId ID of the empire that owns the cell
     * @param {number} morale Morale of the units in the cell
     * @param {number} loyalty Loyalty of the population in the cell
     */
    constructor(x, y, type, empireId = null, morale = 0, loyalty = 0) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.empireId = empireId;
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



    export() {
        let typeString = Object.keys(CellType).find(key => CellType[key] === this.type);

        return `${this.x};${this.y};${typeString}`
    }
}