import { CanvasDrawer } from "./canvasDrawer.mjs";
import { Empire } from "./empire.mjs";
import { FadingLayeredPerlinGenerator } from "./worldGenerators/fadingLayeredPerlinGenerator.mjs";



const CANVAS = document.getElementById("canvas");
const STEPPER = document.getElementById("step");



let world = FadingLayeredPerlinGenerator.create({
    width: 100,
    height: 100,
    zoom: 20
});



world.newEmpire("empireA", "#ff0000ff", [world.getCell(50, 50)])
world.newEmpire("empireB", "#0000ffff", [world.getCell(30, 50)])



CanvasDrawer.draw(world, CANVAS, 40);



const LOOP = setInterval(function () {
    world.step();

    CanvasDrawer.draw(world, CANVAS, 40);
});