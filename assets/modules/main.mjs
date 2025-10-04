import { CanvasDrawer } from "./canvasDrawer.mjs";
import { FadingLayeredPerlinGenerator } from "./worldGenerators/fadingLayeredPerlinGenerator.mjs";
import { FALayeredPerlinGenerator } from "./worldGenerators/FALayeredPerlinGenerator.mjs";



const CANVAS = document.getElementById("canvas");



let world = FadingLayeredPerlinGenerator.create({
    width: 200,
    height: 200,
    zoom: 40,
    seed: 1337
});


CanvasDrawer.draw(world, CANVAS, 20)