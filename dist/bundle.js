(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestCounter {
    constructor() {
        this.n = 0;
    }
    getNumber() {
        return this.n;
    }
    setNumber(n) {
        this.n = n;
    }
}
exports.default = TestCounter;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Input {
    constructor() {
        this.initializeInputs();
        this.upKeyDown = false;
        this.leftKeyDown = false;
        this.rightKeyDown = false;
    }
    initializeInputs() {
        document.addEventListener('keydown', (ev) => {
            if (ev.keyCode === 37) {
                this.leftKeyDown = true;
            }
            else if (ev.keyCode === 39) {
                this.rightKeyDown = true;
            }
            else if (ev.keyCode === 38) {
                this.upKeyDown = true;
                ev.preventDefault();
            }
        });
        document.addEventListener('keyup', (ev) => {
            if (ev.keyCode === 37) {
                this.leftKeyDown = false;
            }
            else if (ev.keyCode === 38) {
                this.upKeyDown = false;
            }
            else if (ev.keyCode === 39) {
                this.rightKeyDown = false;
            }
        });
    }
}
exports.default = Input;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Level {
    constructor(level_number, imgdir, title, status, directions, left, right, canvas) {
        this.levelNumber = level_number;
        this.background = new Image(canvas.width, canvas.height);
        this.background.src = imgdir;
        this.title = title;
        this.status = status;
        this.directions = directions;
        this.leftLevelNumber = left;
        this.rightLevelNumber = right;
    }
}
exports.default = Level;
},{}],4:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestCounter_1 = __importDefault(require("./app/TestCounter"));
const Input_1 = __importDefault(require("./input/Input"));
const Entity_1 = __importDefault(require("./obj/Entity"));
const Level_1 = __importDefault(require("./level/Level"));
const RENDER_CANVAS_ID = 'renderCanvas';
const TITLE_ID = 'title';
const STATUS_ID = 'status';
const DIRECTIONS_ID = 'directions';
let x = new TestCounter_1.default();
let canvas = document.getElementById(RENDER_CANVAS_ID);
let titleElement = document.getElementById(TITLE_ID);
let statusElement = document.getElementById(STATUS_ID);
let directionsElement = document.getElementById(DIRECTIONS_ID);
let r = canvas.getContext('2d');
let counter = 0;
let keyboard;
let character;
let background;
let title;
let status;
let direction;
let currentLevel;
let levels = new Array();
levels.push(new Level_1.default(1, 'res/bg/1.png', 'Which movie genre are you watching today?', 'Alive', '(left) Maybe something PG13, (right) HORROR!!', 11, 2, canvas));
levels.push(new Level_1.default(2, 'res/bg/2-11.png', 'You fell asleep while choosing a horror movie but suddenly, something wakes you up! What is it?', 'Alive', '(left) *ROAR* | (right) *crying*', 8, 5, canvas));
levels.push(new Level_1.default(3, 'res/bg/3.jpg', 'PENNYWISE KILLS YOU', 'DEAD', 'He says: \"If you watched the movie, you\'d know... if only.\"  Refresh to try again! ', 1, 1, canvas));
levels.push(new Level_1.default(4, 'res/bg/4.jpg', '3 days later, you find your daughter\'s corpse and SHE WEARS THE SAME JACKET AS THE CRYING CHILD DAYS! Your wife is heartbroken </3 You decide to get her something, what is it?', 'Alive', '(left) Aladdin\'s wishing lamp! (right) A cruise ship getaway to take her mind off things', 7, 6, canvas));
levels.push(new Level_1.default(5, 'res/bg/5.jpg', 'You see a child crying as her red balloon floats away from her, what do you do?', 'Alive', '(left) Go chase after her balloon! The poor child | (right) Nothing. Turn around and leave.', 4, 3, canvas));
levels.push(new Level_1.default(6, 'res/bg/6.jpg', 'You board the beautiful Titanic and your wife is overjoyed!', 'DEAD', 'Too bad it sinks. Refresh to try again.', 1, 1, canvas));
levels.push(new Level_1.default(7, 'res/bg/7.jpg', 'Your wife wishes for your daughter to live again', 'DEAD', 'BUT SHE RETURNS AS A ZOMBIE AND EATS BOTH YOUR BRAINS. Gross. Refresh to try again!', 1, 1, canvas));
levels.push(new Level_1.default(8, 'res/bg/8.jpg', 'ZOINKS! That roar belongs to a DINOSAUR!! WHAT DO YOU DO?!?', 'Alive', '(left) RUN FOR YOUR LIFE!! DUH!! | (right) Just sloooooooowly walk around. Keep quiet and the dinos won\'t know you are here, right?', 9, 10, canvas));
levels.push(new Level_1.default(9, 'res/bg/9.jpg', 'NOPE. TOO SLOW.', 'DEAD', 'You tried your best, but did you really think you could outrun a dinosaur?? Refresh to try again!', 1, 1, canvas));
levels.push(new Level_1.default(10, 'res/bg/10.jpg', 'Dang it. You fell into a lava moat.', 'DEAD', 'That is okay, you could always refresh to try again.', 1, 1, canvas));
levels.push(new Level_1.default(11, 'res/bg/2-11.png', 'You fell asleep while choosing something family friendly but suddenly, something wakes you up! What is it?', 'Alive', '(left) a low *ruuuuuumble* | (right) strange. weird. noises?', 12, 18, canvas));
levels.push(new Level_1.default(12, 'res/bg/12.jpg', 'You spot a cub in danger! What do you do?', 'Alive', '(left) Save the cub! It is the right thing to do! | (right) Nothing. There is not much you can do.', 13, 14, canvas));
levels.push(new Level_1.default(13, 'res/bg/13.jpg', 'You run over to the poor cub and– ', 'DEAD', 'You get trampled the stampede… too bad. At least you can refresh to try again!', 1, 1, canvas));
levels.push(new Level_1.default(14, 'res/bg/14.jpg', 'You pretend you do not see the cub. As you run away, you stumble across a tomb, do you enter?', 'Alive', '(left) Nope. | (right) Of course!', 15, 16, canvas));
levels.push(new Level_1.default(15, 'res/bg/15.jpg', 'You turn away from the tomb and keep roaming until you find a cave to stay for the night.', 'DEAD', 'Oh snap... wrong move. This cave belongs to HYENAS! Maybe you\'ll survive next time if you refresh the page and try again :/', 1, 1, canvas));
levels.push(new Level_1.default(16, 'res/bg/16.jpg', 'You enter the tomb and find… the love of your life! But dead… Besides her, lies a knife, what do you do?', 'DEAD', '(left) Take your life with the knife. Life is nothing without her. | (right) Just leave. You keep walking and...', 17, 5, canvas));
levels.push(new Level_1.default(17, 'res/bg/17.jpg', 'You die. But Juliet wakes up!', 'DEAD', 'So apparently Juliet did not really die… and you were not really supposed to die either but you are dead anyways… like you, Juliet decides life is nothing without love and she ACTUALLY takes her life this time. Too bad, maybe you two can live together in another life? Refresh, to try again?', 1, 1, canvas));
levels.push(new Level_1.default(18, 'res/bg/18.jpg', 'You wake up and you see some REAL strange things. Cowboys? ... And aliens? What do you do now??', 'DEAD', '(left) FIGHT ‘EM. | (right) Make friends! You cannot take down all of them...', 19, 20, canvas));
levels.push(new Level_1.default(19, 'res/bg/19.jpg', 'THE CLAW drops on you before you even make a move!', 'DEAD', 'Oh well, maybe you should not try fighting a crowd next time? But for now, you can refresh and try again.', 1, 1, canvas));
levels.push(new Level_1.default(20, 'res/bg/20.jpg', 'You make friends with them. Great!', 'DEAD', 'Except they are a little TOO friendly and decides to turn you into a toy, just like them. That is alright, you can always refresh and try again. Maybe, do not befriend a bunch of animated toys next time?', 1, 1, canvas));
function findLevel(levelNumber) {
    for (let i = 0; i < levels.length; ++i) {
        if (levels[i].levelNumber === levelNumber) {
            return levels[i];
        }
    }
    return levels[0];
}
function loadLevel(level) {
    character.setX(canvas.width / 2 - character.getWidth() / 2);
    currentLevel = level;
    background = currentLevel.background;
    titleElement.textContent = currentLevel.title;
    statusElement.textContent = currentLevel.status;
    directionsElement.textContent = currentLevel.directions;
}
function init() {
    canvas.width = 800;
    canvas.height = 400;
    keyboard = new Input_1.default();
    character = new Entity_1.default('res/sprite/walk-left.png', 'res/sprite/walk-right.png', 200, 275);
    r.font = '12px Arial black';
    loadLevel(findLevel(1));
}
function loop() {
    ++counter;
    r.clearRect(0, 0, canvas.width, canvas.height);
    r.fillText(counter.toString(), 10, 10);
    character.tick(canvas.width, canvas.height);
    if (keyboard.leftKeyDown) {
        character.accelerateLeft(3);
    }
    else if (keyboard.rightKeyDown) {
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
    }
    else if (character.rightWallTouched()) {
        loadLevel(findLevel(currentLevel.rightLevelNumber));
    }
    requestAnimationFrame(loop);
}
init();
loop();
},{"./app/TestCounter":1,"./input/Input":2,"./level/Level":3,"./obj/Entity":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Entity {
    constructor(src_left, src_right, x_size, y_size) {
        this.GRAVITY = 9.81 / 4;
        this.MAX_VELOCITY = 7;
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.image = new Image(x_size, y_size);
        this.image.src = src_left;
        this.x_size = x_size;
        this.y_size = y_size;
        this.hasJumped = true;
        this.isLeftWallTouched = false;
        this.isRightWallTouched = false;
        this.leftWalking_src = src_left;
        this.rightWalking_src = src_right;
    }
    leftWallTouched() {
        return this.isLeftWallTouched;
    }
    rightWallTouched() {
        return this.isRightWallTouched;
    }
    tick(x_max, y_max) {
        this.x += this.dx;
        this.dy += this.GRAVITY;
        if (this.x + this.image.width > x_max) {
            // Right wall
            this.isRightWallTouched = true;
            this.x = x_max - this.image.width;
        }
        else if (this.x < 0) {
            this.isLeftWallTouched = true;
            this.x = 0;
        }
        else {
            this.isRightWallTouched = false;
            this.isLeftWallTouched = false;
        }
        this.y += this.dy;
        // Hit the ground
        if (this.y + this.y_size >= y_max) {
            this.y = y_max - this.y_size;
            this.dy = 0;
            this.hasJumped = false;
        }
        // Friction
        if (this.dx > 0) {
            // Going right
            this.image.src = this.rightWalking_src;
            --this.dx;
        }
        if (this.dx < 0) {
            // Going left
            this.image.src = this.leftWalking_src;
            ++this.dx;
        }
        else {
        }
    }
    getWidth() {
        return this.x_size;
    }
    getHeight() {
        return this.y_size;
    }
    getImageSource() {
        return this.image;
    }
    accelerateLeft(speed) {
        this.dx -= speed;
        if (this.dx < -this.MAX_VELOCITY) {
            this.dx = -this.MAX_VELOCITY;
        }
    }
    accelerateRight(speed) {
        this.dx += speed;
        if (this.dx > this.MAX_VELOCITY) {
            this.dx = this.MAX_VELOCITY;
        }
    }
    accelerateUp(speed) {
        if (!this.hasJumped) {
            this.hasJumped = true;
            this.dy -= speed;
        }
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getYLower() {
        return this.image.height + this.y;
    }
}
exports.default = Entity;
},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwL1Rlc3RDb3VudGVyLnRzIiwic3JjL2lucHV0L0lucHV0LnRzIiwic3JjL2xldmVsL0xldmVsLnRzIiwic3JjL21haW4udHMiLCJzcmMvb2JqL0VudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsTUFBcUIsV0FBVztJQUU1QjtRQUNJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVNLFNBQVM7UUFDWixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVNLFNBQVMsQ0FBQyxDQUFTO1FBQ3RCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBYkQsOEJBYUM7Ozs7QUNiRCxNQUFxQixLQUFLO0lBTXRCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVPLGdCQUFnQjtRQUNwQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxFQUFFLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDM0I7aUJBQU0sSUFBSSxFQUFFLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDNUI7aUJBQU0sSUFBSSxFQUFFLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLEVBQUUs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QyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUVKO0FBL0lELHlCQStJQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RDb3VudGVyIHtcclxuICAgIHByaXZhdGUgbjogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubiA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE51bWJlcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE51bWJlcihuOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm4gPSBuO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQge1xyXG5cclxuICAgIHB1YmxpYyB1cEtleURvd246IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgbGVmdEtleURvd246IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgcmlnaHRLZXlEb3duOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVJbnB1dHMoKTtcclxuICAgICAgICB0aGlzLnVwS2V5RG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGVmdEtleURvd24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJpZ2h0S2V5RG93biA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUlucHV0cygpOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldi5rZXlDb2RlID09PSAzNykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0S2V5RG93biA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXYua2V5Q29kZSA9PT0gMzkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRLZXlEb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChldi5rZXlDb2RlID09PSAzOCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cEtleURvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldi5rZXlDb2RlID09PSAzNykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0S2V5RG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2LmtleUNvZGUgPT09IDM4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwS2V5RG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2LmtleUNvZGUgPT09IDM5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0S2V5RG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMZXZlbCB7XHJcblxyXG4gICAgcHVibGljIGxldmVsTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzdGF0dXM6IHN0cmluZztcclxuICAgIHB1YmxpYyBkaXJlY3Rpb25zOiBzdHJpbmc7XHJcblxyXG4gICAgLy8gQWNjZXNzIGJ5IG4gLSAxIGZvciBhcnJheSBpbmRleCB1c2VcclxuICAgIHB1YmxpYyBsZWZ0TGV2ZWxOdW1iZXI6IG51bWJlcjtcclxuICAgIHB1YmxpYyByaWdodExldmVsTnVtYmVyOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGJhY2tncm91bmQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGxldmVsX251bWJlcjogbnVtYmVyLCBpbWdkaXI6IHN0cmluZywgdGl0bGU6IHN0cmluZywgc3RhdHVzOiBzdHJpbmcsXHJcbiAgICAgICAgZGlyZWN0aW9uczogc3RyaW5nLCBsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMubGV2ZWxOdW1iZXIgPSBsZXZlbF9udW1iZXI7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEltYWdlKGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNyYyA9IGltZ2RpcjtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25zID0gZGlyZWN0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5sZWZ0TGV2ZWxOdW1iZXIgPSBsZWZ0O1xyXG4gICAgICAgIHRoaXMucmlnaHRMZXZlbE51bWJlciA9IHJpZ2h0O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFRlc3RDb3VudGVyIGZyb20gJy4vYXBwL1Rlc3RDb3VudGVyJztcclxuaW1wb3J0IElucHV0IGZyb20gJy4vaW5wdXQvSW5wdXQnO1xyXG5pbXBvcnQgRW50aXR5IGZyb20gJy4vb2JqL0VudGl0eSc7XHJcbmltcG9ydCB7IGNvbGxhcHNlVGV4dENoYW5nZVJhbmdlc0Fjcm9zc011bHRpcGxlVmVyc2lvbnMgfSBmcm9tICd0eXBlc2NyaXB0JztcclxuaW1wb3J0IExldmVsIGZyb20gJy4vbGV2ZWwvTGV2ZWwnO1xyXG5cclxuY29uc3QgUkVOREVSX0NBTlZBU19JRDogc3RyaW5nID0gJ3JlbmRlckNhbnZhcyc7XHJcblxyXG5jb25zdCBUSVRMRV9JRDogc3RyaW5nID0gJ3RpdGxlJztcclxuY29uc3QgU1RBVFVTX0lEOiBzdHJpbmcgPSAnc3RhdHVzJztcclxuY29uc3QgRElSRUNUSU9OU19JRDogc3RyaW5nID0gJ2RpcmVjdGlvbnMnO1xyXG5cclxubGV0IHg6IFRlc3RDb3VudGVyID0gbmV3IFRlc3RDb3VudGVyKCk7XHJcblxyXG5sZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChSRU5ERVJfQ0FOVkFTX0lEKTtcclxubGV0IHRpdGxlRWxlbWVudDogSFRNTEhlYWRpbmdFbGVtZW50ID0gPEhUTUxIZWFkaW5nRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChUSVRMRV9JRCk7XHJcbmxldCBzdGF0dXNFbGVtZW50OiBIVE1MSGVhZGluZ0VsZW1lbnQgPSA8SFRNTEhlYWRpbmdFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFNUQVRVU19JRCk7XHJcbmxldCBkaXJlY3Rpb25zRWxlbWVudDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPSA8SFRNTFBhcmFncmFwaEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoRElSRUNUSU9OU19JRCk7XHJcbmxldCByOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSA8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5sZXQgY291bnRlcjogbnVtYmVyID0gMDtcclxuXHJcbmxldCBrZXlib2FyZDogSW5wdXQ7XHJcbmxldCBjaGFyYWN0ZXI6IEVudGl0eTtcclxubGV0IGJhY2tncm91bmQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcblxyXG5cclxuXHJcblxyXG5cclxubGV0IHRpdGxlOiBzdHJpbmc7XHJcbmxldCBzdGF0dXM6IHN0cmluZztcclxubGV0IGRpcmVjdGlvbjogc3RyaW5nO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5sZXQgY3VycmVudExldmVsOiBMZXZlbDtcclxubGV0IGxldmVsczogQXJyYXk8TGV2ZWw+ID0gbmV3IEFycmF5PExldmVsPigpO1xyXG5sZXZlbHMucHVzaChuZXcgTGV2ZWwoMSwgJ3Jlcy9iZy8xLnBuZycsICdXaGljaCBtb3ZpZSBnZW5yZSBhcmUgeW91IHdhdGNoaW5nIHRvZGF5PycsICdBbGl2ZScsICcobGVmdCkgTWF5YmUgc29tZXRoaW5nIFBHMTMsIChyaWdodCkgSE9SUk9SISEnLCAxMSwgMiwgY2FudmFzKSk7XHJcbmxldmVscy5wdXNoKG5ldyBMZXZlbCgyLCAncmVzL2JnLzItMTEucG5nJywgJ1lvdSBmZWxsIGFzbGVlcCB3aGlsZSBjaG9vc2luZyBhIGhvcnJvciBtb3ZpZSBidXQgc3VkZGVubHksIHNvbWV0aGluZyB3YWtlcyB5b3UgdXAhIFdoYXQgaXMgaXQ/JywgJ0FsaXZlJywgJyhsZWZ0KSAqUk9BUiogfCAocmlnaHQpICpjcnlpbmcqJywgOCwgNSwgY2FudmFzKSk7XHJcbmxldmVscy5wdXNoKG5ldyBMZXZlbCgzLCAncmVzL2JnLzMuanBnJywgJ1BFTk5ZV0lTRSBLSUxMUyBZT1UnLCAnREVBRCcsICdIZSBzYXlzOiBcXFwiSWYgeW91IHdhdGNoZWQgdGhlIG1vdmllLCB5b3VcXCdkIGtub3cuLi4gaWYgb25seS5cXFwiICBSZWZyZXNoIHRvIHRyeSBhZ2FpbiEgJywgMSwgMSwgY2FudmFzKSk7XHJcbmxldmVscy5wdXNoKG5ldyBMZXZlbCg0LCAncmVzL2JnLzQuanBnJywgJzMgZGF5cyBsYXRlciwgeW91IGZpbmQgeW91ciBkYXVnaHRlclxcJ3MgY29ycHNlIGFuZCBTSEUgV0VBUlMgVEhFIFNBTUUgSkFDS0VUIEFTIFRIRSBDUllJTkcgQ0hJTEQgREFZUyEgWW91ciB3aWZlIGlzIGhlYXJ0YnJva2VuIDwvMyBZb3UgZGVjaWRlIHRvIGdldCBoZXIgc29tZXRoaW5nLCB3aGF0IGlzIGl0PycsICdBbGl2ZScsICcobGVmdCkgQWxhZGRpblxcJ3Mgd2lzaGluZyBsYW1wISAocmlnaHQpIEEgY3J1aXNlIHNoaXAgZ2V0YXdheSB0byB0YWtlIGhlciBtaW5kIG9mZiB0aGluZ3MnLCA3LCA2LCBjYW52YXMpKTtcclxubGV2ZWxzLnB1c2gobmV3IExldmVsKDUsICdyZXMvYmcvNS5qcGcnLCAnWW91IHNlZSBhIGNoaWxkIGNyeWluZyBhcyBoZXIgcmVkIGJhbGxvb24gZmxvYXRzIGF3YXkgZnJvbSBoZXIsIHdoYXQgZG8geW91IGRvPycsICdBbGl2ZScsICcobGVmdCkgR28gY2hhc2UgYWZ0ZXIgaGVyIGJhbGxvb24hIFRoZSBwb29yIGNoaWxkIHwgKHJpZ2h0KSBOb3RoaW5nLiBUdXJuIGFyb3VuZCBhbmQgbGVhdmUuJywgNCwgMywgY2FudmFzKSk7XHJcbmxldmVscy5wdXNoKG5ldyBMZXZlbCg2LCAncmVzL2JnLzYuanBnJywgJ1lvdSBib2FyZCB0aGUgYmVhdXRpZnVsIFRpdGFuaWMgYW5kIHlvdXIgd2lmZSBpcyBvdmVyam95ZWQhJywgJ0RFQUQnLCAnVG9vIGJhZCBpdCBzaW5rcy4gUmVmcmVzaCB0byB0cnkgYWdhaW4uJywgMSwgMSwgY2FudmFzKSk7XHJcblxyXG5sZXZlbHMucHVzaChuZXcgTGV2ZWwoNywgJ3Jlcy9iZy83LmpwZycsICdZb3VyIHdpZmUgd2lzaGVzIGZvciB5b3VyIGRhdWdodGVyIHRvIGxpdmUgYWdhaW4nLCAnREVBRCcsICdCVVQgU0hFIFJFVFVSTlMgQVMgQSBaT01CSUUgQU5EIEVBVFMgQk9USCBZT1VSIEJSQUlOUy4gR3Jvc3MuIFJlZnJlc2ggdG8gdHJ5IGFnYWluIScsIDEsIDEsIGNhbnZhcykpO1xyXG5cclxubGV2ZWxzLnB1c2gobmV3IExldmVsKDgsICdyZXMvYmcvOC5qcGcnLCAnWk9JTktTISBUaGF0IHJvYXIgYmVsb25ncyB0byBhIERJTk9TQVVSISEgV0hBVCBETyBZT1UgRE8/IT8nLCAnQWxpdmUnLCAnKGxlZnQpIFJVTiBGT1IgWU9VUiBMSUZFISEgRFVIISEgfCAocmlnaHQpIEp1c3Qgc2xvb29vb29vb3dseSB3YWxrIGFyb3VuZC4gS2VlcCBxdWlldCBhbmQgdGhlIGRpbm9zIHdvblxcJ3Qga25vdyB5b3UgYXJlIGhlcmUsIHJpZ2h0PycsIDksIDEwLCBjYW52YXMpKTtcclxuXHJcbmxldmVscy5wdXNoKG5ldyBMZXZlbCg5LCAncmVzL2JnLzkuanBnJywgJ05PUEUuIFRPTyBTTE9XLicsICdERUFEJywgJ1lvdSB0cmllZCB5b3VyIGJlc3QsIGJ1dCBkaWQgeW91IHJlYWxseSB0aGluayB5b3UgY291bGQgb3V0cnVuIGEgZGlub3NhdXI/PyBSZWZyZXNoIHRvIHRyeSBhZ2FpbiEnLCAxLCAxLCBjYW52YXMpKTtcclxuXHJcbmxldmVscy5wdXNoKG5ldyBMZXZlbCgxMCwgJ3Jlcy9iZy8xMC5qcGcnLCAnRGFuZyBpdC4gWW91IGZlbGwgaW50byBhIGxhdmEgbW9hdC4nLCAnREVBRCcsICdUaGF0IGlzIG9rYXksIHlvdSBjb3VsZCBhbHdheXMgcmVmcmVzaCB0byB0cnkgYWdhaW4uJywgMSwgMSwgY2FudmFzKSk7XHJcblxyXG5sZXZlbHMucHVzaChuZXcgTGV2ZWwoMTEsICdyZXMvYmcvMi0xMS5wbmcnLCAnWW91IGZlbGwgYXNsZWVwIHdoaWxlIGNob29zaW5nIHNvbWV0aGluZyBmYW1pbHkgZnJpZW5kbHkgYnV0IHN1ZGRlbmx5LCBzb21ldGhpbmcgd2FrZXMgeW91IHVwISBXaGF0IGlzIGl0PycsICdBbGl2ZScsICcobGVmdCkgYSBsb3cgKnJ1dXV1dXVtYmxlKiB8IChyaWdodCkgc3RyYW5nZS4gd2VpcmQuIG5vaXNlcz8nLCAxMiwgMTgsIGNhbnZhcykpO1xyXG5cclxubGV2ZWxzLnB1c2gobmV3IExldmVsKDEyLCAncmVzL2JnLzEyLmpwZycsICdZb3Ugc3BvdCBhIGN1YiBpbiBkYW5nZXIhIFdoYXQgZG8geW91IGRvPycsICdBbGl2ZScsICcobGVmdCkgU2F2ZSB0aGUgY3ViISBJdCBpcyB0aGUgcmlnaHQgdGhpbmcgdG8gZG8hIHwgKHJpZ2h0KSBOb3RoaW5nLiBUaGVyZSBpcyBub3QgbXVjaCB5b3UgY2FuIGRvLicsIDEzLCAxNCwgY2FudmFzKSk7XHJcblxyXG5sZXZlbHMucHVzaChuZXcgTGV2ZWwoMTMsICdyZXMvYmcvMTMuanBnJywgJ1lvdSBydW4gb3ZlciB0byB0aGUgcG9vciBjdWIgYW5k4oCTICcsICdERUFEJywgJ1lvdSBnZXQgdHJhbXBsZWQgdGhlIHN0YW1wZWRl4oCmIHRvbyBiYWQuIEF0IGxlYXN0IHlvdSBjYW4gcmVmcmVzaCB0byB0cnkgYWdhaW4hJywgMSwgMSwgY2FudmFzKSk7XHJcblxyXG5sZXZlbHMucHVzaChuZXcgTGV2ZWwoMTQsICdyZXMvYmcvMTQuanBnJywgJ1lvdSBwcmV0ZW5kIHlvdSBkbyBub3Qgc2VlIHRoZSBjdWIuIEFzIHlvdSBydW4gYXdheSwgeW91IHN0dW1ibGUgYWNyb3NzIGEgdG9tYiwgZG8geW91IGVudGVyPycsICdBbGl2ZScsICcobGVmdCkgTm9wZS4gfCAocmlnaHQpIE9mIGNvdXJzZSEnLCAxNSwgMTYsIGNhbnZhcykpO1xyXG5cclxubGV2ZWxzLnB1c2gobmV3IExldmVsKDE1LCAncmVzL2JnLzE1LmpwZycsICdZb3UgdHVybiBhd2F5IGZyb20gdGhlIHRvbWIgYW5kIGtlZXAgcm9hbWluZyB1bnRpbCB5b3UgZmluZCBhIGNhdmUgdG8gc3RheSBmb3IgdGhlIG5pZ2h0LicsICdERUFEJywgJ09oIHNuYXAuLi4gd3JvbmcgbW92ZS4gVGhpcyBjYXZlIGJlbG9uZ3MgdG8gSFlFTkFTISBNYXliZSB5b3VcXCdsbCBzdXJ2aXZlIG5leHQgdGltZSBpZiB5b3UgcmVmcmVzaCB0aGUgcGFnZSBhbmQgdHJ5IGFnYWluIDovJywgMSwgMSwgY2FudmFzKSk7XHJcblxyXG5sZXZlbHMucHVzaChuZXcgTGV2ZWwoMTYsICdyZXMvYmcvMTYuanBnJywgJ1lvdSBlbnRlciB0aGUgdG9tYiBhbmQgZmluZOKApiB0aGUgbG92ZSBvZiB5b3VyIGxpZmUhIEJ1dCBkZWFk4oCmIEJlc2lkZXMgaGVyLCBsaWVzIGEga25pZmUsIHdoYXQgZG8geW91IGRvPycsICdERUFEJywgJyhsZWZ0KSBUYWtlIHlvdXIgbGlmZSB3aXRoIHRoZSBrbmlmZS4gTGlmZSBpcyBub3RoaW5nIHdpdGhvdXQgaGVyLiB8IChyaWdodCkgSnVzdCBsZWF2ZS4gWW91IGtlZXAgd2Fsa2luZyBhbmQuLi4nLCAxNywgNSwgY2FudmFzKSk7XHJcblxyXG5sZXZlbHMucHVzaChuZXcgTGV2ZWwoMTcsICdyZXMvYmcvMTcuanBnJywgJ1lvdSBkaWUuIEJ1dCBKdWxpZXQgd2FrZXMgdXAhJywgJ0RFQUQnLCAnU28gYXBwYXJlbnRseSBKdWxpZXQgZGlkIG5vdCByZWFsbHkgZGll4oCmIGFuZCB5b3Ugd2VyZSBub3QgcmVhbGx5IHN1cHBvc2VkIHRvIGRpZSBlaXRoZXIgYnV0IHlvdSBhcmUgZGVhZCBhbnl3YXlz4oCmIGxpa2UgeW91LCBKdWxpZXQgZGVjaWRlcyBsaWZlIGlzIG5vdGhpbmcgd2l0aG91dCBsb3ZlIGFuZCBzaGUgQUNUVUFMTFkgdGFrZXMgaGVyIGxpZmUgdGhpcyB0aW1lLiBUb28gYmFkLCBtYXliZSB5b3UgdHdvIGNhbiBsaXZlIHRvZ2V0aGVyIGluIGFub3RoZXIgbGlmZT8gUmVmcmVzaCwgdG8gdHJ5IGFnYWluPycsIDEsIDEsIGNhbnZhcykpO1xyXG5cclxubGV2ZWxzLnB1c2gobmV3IExldmVsKDE4LCAncmVzL2JnLzE4LmpwZycsICdZb3Ugd2FrZSB1cCBhbmQgeW91IHNlZSBzb21lIFJFQUwgc3RyYW5nZSB0aGluZ3MuIENvd2JveXM/IC4uLiBBbmQgYWxpZW5zPyBXaGF0IGRvIHlvdSBkbyBub3c/PycsICdERUFEJywgJyhsZWZ0KSBGSUdIVCDigJhFTS4gfCAocmlnaHQpIE1ha2UgZnJpZW5kcyEgWW91IGNhbm5vdCB0YWtlIGRvd24gYWxsIG9mIHRoZW0uLi4nLCAxOSwgMjAsIGNhbnZhcykpO1xyXG5cclxubGV2ZWxzLnB1c2gobmV3IExldmVsKDE5LCAncmVzL2JnLzE5LmpwZycsICdUSEUgQ0xBVyBkcm9wcyBvbiB5b3UgYmVmb3JlIHlvdSBldmVuIG1ha2UgYSBtb3ZlIScsICdERUFEJywgJ09oIHdlbGwsIG1heWJlIHlvdSBzaG91bGQgbm90IHRyeSBmaWdodGluZyBhIGNyb3dkIG5leHQgdGltZT8gQnV0IGZvciBub3csIHlvdSBjYW4gcmVmcmVzaCBhbmQgdHJ5IGFnYWluLicsIDEsIDEsIGNhbnZhcykpO1xyXG5cclxubGV2ZWxzLnB1c2gobmV3IExldmVsKDIwLCAncmVzL2JnLzIwLmpwZycsICdZb3UgbWFrZSBmcmllbmRzIHdpdGggdGhlbS4gR3JlYXQhJywgJ0RFQUQnLCAnRXhjZXB0IHRoZXkgYXJlIGEgbGl0dGxlIFRPTyBmcmllbmRseSBhbmQgZGVjaWRlcyB0byB0dXJuIHlvdSBpbnRvIGEgdG95LCBqdXN0IGxpa2UgdGhlbS4gVGhhdCBpcyBhbHJpZ2h0LCB5b3UgY2FuIGFsd2F5cyByZWZyZXNoIGFuZCB0cnkgYWdhaW4uIE1heWJlLCBkbyBub3QgYmVmcmllbmQgYSBidW5jaCBvZiBhbmltYXRlZCB0b3lzIG5leHQgdGltZT8nLCAxLCAxLCBjYW52YXMpKTtcclxuXHJcblxyXG5mdW5jdGlvbiBmaW5kTGV2ZWwobGV2ZWxOdW1iZXI6IG51bWJlcik6IExldmVsIHtcclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBsZXZlbHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBpZiAobGV2ZWxzW2ldLmxldmVsTnVtYmVyID09PSBsZXZlbE51bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gbGV2ZWxzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsZXZlbHNbMF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRMZXZlbChsZXZlbDogTGV2ZWwpOiB2b2lkIHtcclxuICAgIGNoYXJhY3Rlci5zZXRYKGNhbnZhcy53aWR0aCAvIDIgLSBjaGFyYWN0ZXIuZ2V0V2lkdGgoKSAvIDIpO1xyXG4gICAgY3VycmVudExldmVsID0gbGV2ZWw7XHJcbiAgICBiYWNrZ3JvdW5kID0gY3VycmVudExldmVsLmJhY2tncm91bmQ7XHJcbiAgICB0aXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXJyZW50TGV2ZWwudGl0bGU7XHJcbiAgICBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50ID0gY3VycmVudExldmVsLnN0YXR1cztcclxuICAgIGRpcmVjdGlvbnNFbGVtZW50LnRleHRDb250ZW50ID0gY3VycmVudExldmVsLmRpcmVjdGlvbnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XHJcbiAgICBjYW52YXMud2lkdGggPSA4MDA7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gNDAwO1xyXG4gICAga2V5Ym9hcmQgPSBuZXcgSW5wdXQoKTtcclxuICAgIGNoYXJhY3RlciA9IG5ldyBFbnRpdHkoJ3Jlcy9zcHJpdGUvd2Fsay1sZWZ0LnBuZycsICdyZXMvc3ByaXRlL3dhbGstcmlnaHQucG5nJywgMjAwLCAyNzUpO1xyXG4gICAgci5mb250ID0gJzEycHggQXJpYWwgYmxhY2snO1xyXG4gICAgbG9hZExldmVsKGZpbmRMZXZlbCgxKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvb3AoKTogdm9pZCB7XHJcbiAgICArK2NvdW50ZXI7XHJcbiAgICByLmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgci5maWxsVGV4dChjb3VudGVyLnRvU3RyaW5nKCksIDEwLCAxMCk7XHJcbiAgICBjaGFyYWN0ZXIudGljayhjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgaWYgKGtleWJvYXJkLmxlZnRLZXlEb3duKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyLmFjY2VsZXJhdGVMZWZ0KDMpO1xyXG4gICAgfSBlbHNlIGlmIChrZXlib2FyZC5yaWdodEtleURvd24pIHtcclxuICAgICAgICBjaGFyYWN0ZXIuYWNjZWxlcmF0ZVJpZ2h0KDMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGtleWJvYXJkLnVwS2V5RG93bikge1xyXG4gICAgICAgIGNoYXJhY3Rlci5hY2NlbGVyYXRlVXAoMjApO1xyXG4gICAgfVxyXG4gICAgci5kcmF3SW1hZ2UoYmFja2dyb3VuZCwgMCwgMCk7XHJcbiAgICByLmRyYXdJbWFnZShjaGFyYWN0ZXIuZ2V0SW1hZ2VTb3VyY2UoKSwgY2hhcmFjdGVyLmdldFgoKSwgY2hhcmFjdGVyLmdldFkoKSwgY2hhcmFjdGVyLmdldFdpZHRoKCksIGNoYXJhY3Rlci5nZXRIZWlnaHQoKSk7XHJcblxyXG4gICAgLy8gRGV0ZWN0IHRvIHN3aXRjaCBsZXZlbFxyXG4gICAgaWYgKGNoYXJhY3Rlci5sZWZ0V2FsbFRvdWNoZWQoKSkge1xyXG4gICAgICAgIGxvYWRMZXZlbChmaW5kTGV2ZWwoY3VycmVudExldmVsLmxlZnRMZXZlbE51bWJlcikpO1xyXG4gICAgfSBlbHNlIGlmIChjaGFyYWN0ZXIucmlnaHRXYWxsVG91Y2hlZCgpKSB7XHJcbiAgICAgICAgbG9hZExldmVsKGZpbmRMZXZlbChjdXJyZW50TGV2ZWwucmlnaHRMZXZlbE51bWJlcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxufVxyXG5cclxuaW5pdCgpO1xyXG5sb29wKCk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IEdSQVZJVFk6IG51bWJlciA9IDkuODEgLyA0O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBNQVhfVkVMT0NJVFk6IG51bWJlciA9IDc7XHJcblxyXG4gICAgcHJpdmF0ZSB4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHk6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGR5OiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSB4X3NpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgeV9zaXplOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBoYXNKdW1wZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIGlzTGVmdFdhbGxUb3VjaGVkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBpc1JpZ2h0V2FsbFRvdWNoZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIGxlZnRXYWxraW5nX3NyYzogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByaWdodFdhbGtpbmdfc3JjOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioc3JjX2xlZnQ6IHN0cmluZywgc3JjX3JpZ2h0OiBzdHJpbmcsIHhfc2l6ZTogbnVtYmVyLCB5X3NpemU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICB0aGlzLmR4ID0gMDtcclxuICAgICAgICB0aGlzLmR5ID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSh4X3NpemUsIHlfc2l6ZSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBzcmNfbGVmdDtcclxuICAgICAgICB0aGlzLnhfc2l6ZSA9IHhfc2l6ZTtcclxuICAgICAgICB0aGlzLnlfc2l6ZSA9IHlfc2l6ZTtcclxuICAgICAgICB0aGlzLmhhc0p1bXBlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc0xlZnRXYWxsVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNSaWdodFdhbGxUb3VjaGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMubGVmdFdhbGtpbmdfc3JjID0gc3JjX2xlZnQ7XHJcbiAgICAgICAgdGhpcy5yaWdodFdhbGtpbmdfc3JjID0gc3JjX3JpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWZ0V2FsbFRvdWNoZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNMZWZ0V2FsbFRvdWNoZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJpZ2h0V2FsbFRvdWNoZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNSaWdodFdhbGxUb3VjaGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0aWNrKHhfbWF4OiBudW1iZXIsIHlfbWF4OiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuZHg7XHJcbiAgICAgICAgdGhpcy5keSArPSB0aGlzLkdSQVZJVFk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnggKyB0aGlzLmltYWdlLndpZHRoID4geF9tYXgpIHtcclxuICAgICAgICAgICAgLy8gUmlnaHQgd2FsbFxyXG4gICAgICAgICAgICB0aGlzLmlzUmlnaHRXYWxsVG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHhfbWF4IC0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pc0xlZnRXYWxsVG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc1JpZ2h0V2FsbFRvdWNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pc0xlZnRXYWxsVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XHJcblxyXG4gICAgICAgIC8vIEhpdCB0aGUgZ3JvdW5kXHJcbiAgICAgICAgaWYgKHRoaXMueSArIHRoaXMueV9zaXplID49IHlfbWF4KSB7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IHlfbWF4IC0gdGhpcy55X3NpemU7XHJcbiAgICAgICAgICAgIHRoaXMuZHkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmhhc0p1bXBlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRnJpY3Rpb25cclxuICAgICAgICBpZiAodGhpcy5keCA+IDApIHtcclxuICAgICAgICAgICAgLy8gR29pbmcgcmlnaHRcclxuICAgICAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLnJpZ2h0V2Fsa2luZ19zcmM7XHJcbiAgICAgICAgICAgIC0tdGhpcy5keDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZHggPCAwKSB7XHJcbiAgICAgICAgICAgIC8vIEdvaW5nIGxlZnRcclxuICAgICAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLmxlZnRXYWxraW5nX3NyYztcclxuICAgICAgICAgICAgKyt0aGlzLmR4O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueF9zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55X3NpemU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEltYWdlU291cmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY2NlbGVyYXRlTGVmdChzcGVlZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5keCAtPSBzcGVlZDtcclxuICAgICAgICBpZiAodGhpcy5keCA8IC10aGlzLk1BWF9WRUxPQ0lUWSkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ID0gLXRoaXMuTUFYX1ZFTE9DSVRZO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWNjZWxlcmF0ZVJpZ2h0KHNwZWVkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR4ICs9IHNwZWVkO1xyXG4gICAgICAgIGlmICh0aGlzLmR4ID4gdGhpcy5NQVhfVkVMT0NJVFkpIHtcclxuICAgICAgICAgICAgdGhpcy5keCA9IHRoaXMuTUFYX1ZFTE9DSVRZO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWNjZWxlcmF0ZVVwKHNwZWVkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaGFzSnVtcGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzSnVtcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5keSAtPSBzcGVlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFgoeDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0WSh5OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRYKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0WSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFlMb3dlcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlLmhlaWdodCArIHRoaXMueTtcclxuICAgIH1cclxuXHJcbn0iXX0=
