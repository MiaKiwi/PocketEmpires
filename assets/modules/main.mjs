import { CanvasDrawer } from "./canvasDrawer.mjs";
import { CellType } from "./cellType.mjs";
import { FadingLayeredPerlinGenerator } from "./worldGenerators/fadingLayeredPerlinGenerator.mjs";



const CANVAS = document.getElementById("canvas");



let world = FadingLayeredPerlinGenerator.create({
    width: 40,
    height: 40,
    zoom: 20,
    seed: 1337
});



let center = world.getCell(0, 39)

center.type = CellType.DBG_RED;

let neighbors = center.getNeighbors()

let types = [
    CellType.DBG_BLUE,
    CellType.DBG_BROWN,
    CellType.DBG_CYAN,
    CellType.DBG_GREEN,
    CellType.DBG_MAGENTA,
    CellType.DBG_ORANGE,
    CellType.DBG_PINK,
    CellType.DBG_YELLOW
]

for (let i = 0; i < neighbors.length; i++) {
    if (neighbors[i]) {
        neighbors[i].type = types[i]
    }
}



CanvasDrawer.draw(world, CANVAS, 100)