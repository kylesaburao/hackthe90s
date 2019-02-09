import TestCounter from './app/TestCounter';
import Input from './input/Input';
import Entity from './obj/Entity';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import Level from './level/Level';

const RENDER_CANVAS_ID: string = 'renderCanvas';
const MESSAGE_PARAGRAPH_ID: string = 'flavourText';
const LOCATION_ID: string = 'location';

let x: TestCounter = new TestCounter();

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(RENDER_CANVAS_ID);
let gameText: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById(MESSAGE_PARAGRAPH_ID);
let locationHeader: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById(LOCATION_ID);
let r: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');
let counter: number = 0;

let keyboard: Input;
let character: Entity;
let background: HTMLImageElement;
let message: string;

function init(): void {
    canvas.width = 800;
    canvas.height = 400;
    keyboard = new Input();
    character = new Entity('res/sprite/person.png', 100, 150);
    r.font = '12px Arial black';
    loadLevel('res/blockbuster-interior.jpg', 'You are in blockbuster');
}

function loadLevel(dir: string, message: string): void {
    character.setX(canvas.width / 2 - character.getWidth() / 2);
    let level = new Level(dir, message, 'Blockbuster', canvas);
    background = level.background;
    message = level.message;
    gameText.textContent = message;
    locationHeader.textContent = level.location;
}

function loop(): void {
    ++counter;
    r.clearRect(0, 0, 800, 400);
    r.fillText(counter.toString(), 10, 10);
    character.tick(canvas.width, canvas.height);
    if (keyboard.leftKeyDown) {
        character.accelerateLeft(3);
    } else if (keyboard.rightKeyDown) {
        character.accelerateRight(3);
    }
    if (keyboard.upKeyDown) {
        character.accelerateUp(40);
    }
    r.drawImage(background, 0, -250);
    r.drawImage(character.getImageSource(), character.getX(), character.getY(), character.getWidth(), character.getHeight());
    requestAnimationFrame(loop);
}

init();
loop();