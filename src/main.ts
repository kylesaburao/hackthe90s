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
levels.push(new Level(1, 'res/bg/1.png', 'Which movie genre are you watching today?', 'Alive', '(left) Maybe something PG13, (right) HORROR!!', 11, 2, canvas));
levels.push(new Level(2, 'res/bg/2-11.png', 'You fell asleep while choosing a horror movie but suddenly, something wakes you up! What is it?', 'Alive', '(left) *ROAR* | (right) *crying*', 8, 5, canvas));
levels.push(new Level(3, 'res/bg/3.jpg', 'PENNYWISE KILLS YOU', 'DEAD', 'He says: \"If you watched the movie, you\'d know... if only.\"  Refresh to try again! ', 1, 1, canvas));
levels.push(new Level(4, 'res/bg/4.jpg', '3 days later, you find your daughter\'s corpse and SHE WEARS THE SAME JACKET AS THE CRYING CHILD DAYS! Your wife is heartbroken </3 You decide to get her something, what is it?', 'Alive', '(left) Aladdin\'s wishing lamp! (right) A cruise ship getaway to take her mind off things', 7, 6, canvas));
levels.push(new Level(5, 'res/bg/5.jpg', 'You see a child crying as her red balloon floats away from her, what do you do?', 'Alive', '(left) Go chase after her balloon! The poor child | (right) Nothing. Turn around and leave.', 4, 3, canvas));
levels.push(new Level(6, 'res/bg/6.jpg', 'You board the beautiful Titanic and your wife is overjoyed!', 'DEAD', 'Too bad it sinks. Refresh to try again.', 1, 1, canvas));

levels.push(new Level(7, 'res/bg/7.jpg', 'Your wife wishes for your daughter to live again', 'DEAD', 'BUT SHE RETURNS AS A ZOMBIE AND EATS BOTH YOUR BRAINS. Gross. Refresh to try again!', 1, 1, canvas));

levels.push(new Level(8, 'res/bg/8.jpg', 'ZOINKS! That roar belongs to a DINOSAUR!! WHAT DO YOU DO?!?', 'Alive', '(left) RUN FOR YOUR LIFE!! DUH!! | (right) Just sloooooooowly walk around. Keep quiet and the dinos won\'t know you are here, right?', 9, 10, canvas));

levels.push(new Level(9, 'res/bg/9.jpg', 'NOPE. TOO SLOW.', 'DEAD', 'You tried your best, but did you really think you could outrun a dinosaur?? Refresh to try again!', 1, 1, canvas));

levels.push(new Level(10, 'res/bg/10.jpg', 'Dang it. You fell into a lava moat.', 'DEAD', 'That is okay, you could always refresh to try again.', 1, 1, canvas));

levels.push(new Level(11, 'res/bg/2-11.png', 'You fell asleep while choosing something family friendly but suddenly, something wakes you up! What is it?', 'Alive', '(left) a low *ruuuuuumble* | (right) strange. weird. noises?', 12, 18, canvas));

levels.push(new Level(12, 'res/bg/12.jpg', 'You spot a cub in danger! What do you do?', 'Alive', '(left) Save the cub! It is the right thing to do! | (right) Nothing. There is not much you can do.', 13, 14, canvas));

levels.push(new Level(13, 'res/bg/13.jpg', 'You run over to the poor cub and– ', 'DEAD', 'You get trampled the stampede… too bad. At least you can refresh to try again!', 1, 1, canvas));

levels.push(new Level(14, 'res/bg/14.jpg', 'You pretend you do not see the cub. As you run away, you stumble across a tomb, do you enter?', 'Alive', '(left) Nope. | (right) Of course!', 15, 16, canvas));

levels.push(new Level(15, 'res/bg/15.jpg', 'You turn away from the tomb and keep roaming until you find a cave to stay for the night.', 'DEAD', 'Oh snap... wrong move. This cave belongs to HYENAS! Maybe you\'ll survive next time if you refresh the page and try again :/', 1, 1, canvas));

levels.push(new Level(16, 'res/bg/16.jpg', 'You enter the tomb and find… the love of your life! But dead… Besides her, lies a knife, what do you do?', 'DEAD', '(left) Take your life with the knife. Life is nothing without her. | (right) Just leave. You keep walking and...', 17, 5, canvas));

levels.push(new Level(17, 'res/bg/17.jpg', 'You die. But Juliet wakes up!', 'DEAD', 'So apparently Juliet did not really die… and you were not really supposed to die either but you are dead anyways… like you, Juliet decides life is nothing without love and she ACTUALLY takes her life this time. Too bad, maybe you two can live together in another life? Refresh, to try again?', 1, 1, canvas));

levels.push(new Level(18, 'res/bg/18.jpg', 'You wake up and you see some REAL strange things. Cowboys? ... And aliens? What do you do now??', 'DEAD', '(left) FIGHT ‘EM. | (right) Make friends! You cannot take down all of them...', 19, 20, canvas));

levels.push(new Level(19, 'res/bg/19.jpg', 'THE CLAW drops on you before you even make a move!', 'DEAD', 'Oh well, maybe you should not try fighting a crowd next time? But for now, you can refresh and try again.', 1, 1, canvas));

levels.push(new Level(20, 'res/bg/20.jpg', 'You make friends with them. Great!', 'DEAD', 'Except they are a little TOO friendly and decides to turn you into a toy, just like them. That is alright, you can always refresh and try again. Maybe, do not befriend a bunch of animated toys next time?', 1, 1, canvas));


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
    character = new Entity('res/sprite/walk-left.png', 'res/sprite/walk-right.png', 200, 275);
    r.font = '12px Arial black';
    loadLevel(findLevel(1));
}

function loop(): void {
    ++counter;
    r.clearRect(0, 0, canvas.width, canvas.height);
    r.fillText(counter.toString(), 10, 10);
    character.tick(canvas.width, canvas.height);
    if (keyboard.leftKeyDown) {
        character.accelerateLeft(3);
    } else if (keyboard.rightKeyDown) {
        character.accelerateRight(3);
    }
    if (keyboard.upKeyDown) {
        character.accelerateUp(20);
    }
    r.drawImage(background, 0, 0);
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