import TestCounter from './app/TestCounter';
import Input from './input/Input';
import Entity from './obj/Entity';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import Level from './level/Level';

const RENDER_CANVAS_ID: string = 'renderCanvas';

const TITLE_ID: string = 'title';
const STATUS_ID: string = 'status';
const DIRECTIONS_ID: string = 'directions';

let x: TestCounter = new TestCounter();

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(RENDER_CANVAS_ID);
let titleElement: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById(TITLE_ID);
let statusElement: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById(STATUS_ID);
let directionsElement: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById(DIRECTIONS_ID);
let r: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');
let counter: number = 0;

let keyboard: Input;
let character: Entity;
let background: HTMLImageElement;

let title: string;
let status: string;
let direction: string;

let currentLevel: Level;
let levels: Array<Level> = new Array<Level>();
levels.push(new Level(1, 'res/blockbuster-interior.jpg', 'You\'re at Blockbuster', 'Alive', 'Go left for x. Go right for y.', 11, 2, canvas));

function findLevel(levelNumber: number): Level {
    for (let i: number = 0; i < levels.length; ++i) {
        if (levels[i].levelNumber === levelNumber) {
            return levels[i];
        }
    }
    return levels[0];
}

function loadLevel(level: Level): void {
    character.setX(canvas.width / 2 - character.getWidth() / 2);
    currentLevel = level;
    background = currentLevel.background;
    titleElement.textContent = currentLevel.title;
    statusElement.textContent = currentLevel.status;
    directionsElement.textContent = currentLevel.directions;
}

function init(): void {
    canvas.width = 800;
    canvas.height = 400;
    keyboard = new Input();
    character = new Entity('res/sprite/walk-left.png', 'res/sprite/walk-right.png', 150, 250);
    r.font = '12px Arial black';
    loadLevel(findLevel(1));
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

    // Detect to switch level
    if (character.leftWallTouched()) {
        loadLevel(findLevel(currentLevel.leftLevelNumber));
    } else if (character.rightWallTouched()) {
        loadLevel(findLevel(currentLevel.rightLevelNumber));
    }

    requestAnimationFrame(loop);
}

init();
loop();