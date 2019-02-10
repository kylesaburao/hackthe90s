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
    constructor(imgdir, title, status, directions, left, right, canvas) {
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
levels.push(new Level_1.default('res/blockbuster-interior.jpg', 'You\'re at Blockbuster', 'Alive', 'Go left for x. Go right for y.', 11, 2, canvas));
function loadLevel(index) {
    character.setX(canvas.width / 2 - character.getWidth() / 2);
    currentLevel = levels[index];
    background = currentLevel.background;
    titleElement.textContent = currentLevel.title;
    statusElement.textContent = currentLevel.status;
    directionsElement.textContent = currentLevel.directions;
}
function init() {
    canvas.width = 800;
    canvas.height = 400;
    keyboard = new Input_1.default();
    character = new Entity_1.default('res/sprite/walk-left.png', 'res/sprite/walk-right.png', 150, 250);
    r.font = '12px Arial black';
    loadLevel(0);
}
function loop() {
    ++counter;
    r.clearRect(0, 0, 800, 400);
    r.fillText(counter.toString(), 10, 10);
    character.tick(canvas.width, canvas.height);
    if (keyboard.leftKeyDown) {
        character.accelerateLeft(3);
    }
    else if (keyboard.rightKeyDown) {
        character.accelerateRight(3);
    }
    if (keyboard.upKeyDown) {
        character.accelerateUp(40);
    }
    r.drawImage(background, 0, -250);
    r.drawImage(character.getImageSource(), character.getX(), character.getY(), character.getWidth(), character.getHeight());
    // Detect to switch level
    if (character.leftWallTouched()) {
        console.log("Left wall touched");
    }
    else if (character.rightWallTouched()) {
        console.log("Right wall touched");
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
        this.GRAVITY = 9.81;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwL1Rlc3RDb3VudGVyLnRzIiwic3JjL2lucHV0L0lucHV0LnRzIiwic3JjL2xldmVsL0xldmVsLnRzIiwic3JjL21haW4udHMiLCJzcmMvb2JqL0VudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsTUFBcUIsV0FBVztJQUU1QjtRQUNJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVNLFNBQVM7UUFDWixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVNLFNBQVMsQ0FBQyxDQUFTO1FBQ3RCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBYkQsOEJBYUM7Ozs7QUNiRCxNQUFxQixLQUFLO0lBTXRCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVPLGdCQUFnQjtRQUNwQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxFQUFFLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDM0I7aUJBQU0sSUFBSSxFQUFFLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDNUI7aUJBQU0sSUFBSSxFQUFFLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLEVBQUUs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Q0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzlCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVNLGVBQWUsQ0FBQyxLQUFhO1FBQ2hDLElBQUksQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzdCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFTSxZQUFZLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFTSxJQUFJLENBQUMsQ0FBUztRQUNqQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFTSxJQUFJLENBQUMsQ0FBUztRQUNqQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFTSxJQUFJO1FBQ1AsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTSxJQUFJO1FBQ1AsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FFSjtBQS9JRCx5QkErSUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0Q291bnRlciB7XHJcbiAgICBwcml2YXRlIG46IG51bWJlcjtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm4gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROdW1iZXIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXROdW1iZXIobjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5uID0gbjtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IHtcclxuXHJcbiAgICBwdWJsaWMgdXBLZXlEb3duOiBib29sZWFuO1xyXG4gICAgcHVibGljIGxlZnRLZXlEb3duOiBib29sZWFuO1xyXG4gICAgcHVibGljIHJpZ2h0S2V5RG93bjogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplSW5wdXRzKCk7XHJcbiAgICAgICAgdGhpcy51cEtleURvd24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxlZnRLZXlEb3duID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yaWdodEtleURvd24gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVJbnB1dHMoKTogdm9pZCB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXYua2V5Q29kZSA9PT0gMzcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdEtleURvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2LmtleUNvZGUgPT09IDM5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0S2V5RG93biA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXYua2V5Q29kZSA9PT0gMzgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBLZXlEb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXYua2V5Q29kZSA9PT0gMzcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdEtleURvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChldi5rZXlDb2RlID09PSAzOCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cEtleURvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChldi5rZXlDb2RlID09PSAzOSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodEtleURvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWwge1xyXG5cclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHN0YXR1czogc3RyaW5nO1xyXG4gICAgcHVibGljIGRpcmVjdGlvbnM6IHN0cmluZztcclxuXHJcbiAgICAvLyBBY2Nlc3MgYnkgbiAtIDEgZm9yIGFycmF5IGluZGV4IHVzZVxyXG4gICAgcHVibGljIGxlZnRMZXZlbE51bWJlcjogbnVtYmVyO1xyXG4gICAgcHVibGljIHJpZ2h0TGV2ZWxOdW1iZXI6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgYmFja2dyb3VuZDogSFRNTEltYWdlRWxlbWVudDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoaW1nZGlyOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIHN0YXR1czogc3RyaW5nLFxyXG4gICAgICAgIGRpcmVjdGlvbnM6IHN0cmluZywgbGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLFxyXG4gICAgICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBuZXcgSW1hZ2UoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQuc3JjID0gaW1nZGlyO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbnMgPSBkaXJlY3Rpb25zO1xyXG5cclxuICAgICAgICB0aGlzLmxlZnRMZXZlbE51bWJlciA9IGxlZnQ7XHJcbiAgICAgICAgdGhpcy5yaWdodExldmVsTnVtYmVyID0gcmlnaHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVGVzdENvdW50ZXIgZnJvbSAnLi9hcHAvVGVzdENvdW50ZXInO1xyXG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9pbnB1dC9JbnB1dCc7XHJcbmltcG9ydCBFbnRpdHkgZnJvbSAnLi9vYmovRW50aXR5JztcclxuaW1wb3J0IHsgY29sbGFwc2VUZXh0Q2hhbmdlUmFuZ2VzQWNyb3NzTXVsdGlwbGVWZXJzaW9ucyB9IGZyb20gJ3R5cGVzY3JpcHQnO1xyXG5pbXBvcnQgTGV2ZWwgZnJvbSAnLi9sZXZlbC9MZXZlbCc7XHJcblxyXG5jb25zdCBSRU5ERVJfQ0FOVkFTX0lEOiBzdHJpbmcgPSAncmVuZGVyQ2FudmFzJztcclxuXHJcbmNvbnN0IFRJVExFX0lEOiBzdHJpbmcgPSAndGl0bGUnO1xyXG5jb25zdCBTVEFUVVNfSUQ6IHN0cmluZyA9ICdzdGF0dXMnO1xyXG5jb25zdCBESVJFQ1RJT05TX0lEOiBzdHJpbmcgPSAnZGlyZWN0aW9ucyc7XHJcblxyXG5sZXQgeDogVGVzdENvdW50ZXIgPSBuZXcgVGVzdENvdW50ZXIoKTtcclxuXHJcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFJFTkRFUl9DQU5WQVNfSUQpO1xyXG5sZXQgdGl0bGVFbGVtZW50OiBIVE1MSGVhZGluZ0VsZW1lbnQgPSA8SFRNTEhlYWRpbmdFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFRJVExFX0lEKTtcclxubGV0IHN0YXR1c0VsZW1lbnQ6IEhUTUxIZWFkaW5nRWxlbWVudCA9IDxIVE1MSGVhZGluZ0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoU1RBVFVTX0lEKTtcclxubGV0IGRpcmVjdGlvbnNFbGVtZW50OiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9IDxIVE1MUGFyYWdyYXBoRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChESVJFQ1RJT05TX0lEKTtcclxubGV0IHI6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IDxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+Y2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbmxldCBjb3VudGVyOiBudW1iZXIgPSAwO1xyXG5cclxubGV0IGtleWJvYXJkOiBJbnB1dDtcclxubGV0IGNoYXJhY3RlcjogRW50aXR5O1xyXG5sZXQgYmFja2dyb3VuZDogSFRNTEltYWdlRWxlbWVudDtcclxuXHJcbmxldCB0aXRsZTogc3RyaW5nO1xyXG5sZXQgc3RhdHVzOiBzdHJpbmc7XHJcbmxldCBkaXJlY3Rpb246IHN0cmluZztcclxuXHJcbmxldCBjdXJyZW50TGV2ZWw6IExldmVsO1xyXG5sZXQgbGV2ZWxzOiBBcnJheTxMZXZlbD4gPSBuZXcgQXJyYXk8TGV2ZWw+KCk7XHJcbmxldmVscy5wdXNoKG5ldyBMZXZlbCgncmVzL2Jsb2NrYnVzdGVyLWludGVyaW9yLmpwZycsICdZb3VcXCdyZSBhdCBCbG9ja2J1c3RlcicsICdBbGl2ZScsICdHbyBsZWZ0IGZvciB4LiBHbyByaWdodCBmb3IgeS4nLCAxMSwgMiwgY2FudmFzKSk7XHJcblxyXG5mdW5jdGlvbiBsb2FkTGV2ZWwoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY2hhcmFjdGVyLnNldFgoY2FudmFzLndpZHRoIC8gMiAtIGNoYXJhY3Rlci5nZXRXaWR0aCgpIC8gMik7XHJcbiAgICBjdXJyZW50TGV2ZWwgPSBsZXZlbHNbaW5kZXhdO1xyXG4gICAgYmFja2dyb3VuZCA9IGN1cnJlbnRMZXZlbC5iYWNrZ3JvdW5kO1xyXG4gICAgdGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gY3VycmVudExldmVsLnRpdGxlO1xyXG4gICAgc3RhdHVzRWxlbWVudC50ZXh0Q29udGVudCA9IGN1cnJlbnRMZXZlbC5zdGF0dXM7XHJcbiAgICBkaXJlY3Rpb25zRWxlbWVudC50ZXh0Q29udGVudCA9IGN1cnJlbnRMZXZlbC5kaXJlY3Rpb25zO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0KCk6IHZvaWQge1xyXG4gICAgY2FudmFzLndpZHRoID0gODAwO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IDQwMDtcclxuICAgIGtleWJvYXJkID0gbmV3IElucHV0KCk7XHJcbiAgICBjaGFyYWN0ZXIgPSBuZXcgRW50aXR5KCdyZXMvc3ByaXRlL3dhbGstbGVmdC5wbmcnLCAncmVzL3Nwcml0ZS93YWxrLXJpZ2h0LnBuZycsIDE1MCwgMjUwKTtcclxuICAgIHIuZm9udCA9ICcxMnB4IEFyaWFsIGJsYWNrJztcclxuICAgIGxvYWRMZXZlbCgwKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGxvb3AoKTogdm9pZCB7XHJcbiAgICArK2NvdW50ZXI7XHJcbiAgICByLmNsZWFyUmVjdCgwLCAwLCA4MDAsIDQwMCk7XHJcbiAgICByLmZpbGxUZXh0KGNvdW50ZXIudG9TdHJpbmcoKSwgMTAsIDEwKTtcclxuICAgIGNoYXJhY3Rlci50aWNrKGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBpZiAoa2V5Ym9hcmQubGVmdEtleURvd24pIHtcclxuICAgICAgICBjaGFyYWN0ZXIuYWNjZWxlcmF0ZUxlZnQoMyk7XHJcbiAgICB9IGVsc2UgaWYgKGtleWJvYXJkLnJpZ2h0S2V5RG93bikge1xyXG4gICAgICAgIGNoYXJhY3Rlci5hY2NlbGVyYXRlUmlnaHQoMyk7XHJcbiAgICB9XHJcbiAgICBpZiAoa2V5Ym9hcmQudXBLZXlEb3duKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyLmFjY2VsZXJhdGVVcCg0MCk7XHJcbiAgICB9XHJcbiAgICByLmRyYXdJbWFnZShiYWNrZ3JvdW5kLCAwLCAtMjUwKTtcclxuICAgIHIuZHJhd0ltYWdlKGNoYXJhY3Rlci5nZXRJbWFnZVNvdXJjZSgpLCBjaGFyYWN0ZXIuZ2V0WCgpLCBjaGFyYWN0ZXIuZ2V0WSgpLCBjaGFyYWN0ZXIuZ2V0V2lkdGgoKSwgY2hhcmFjdGVyLmdldEhlaWdodCgpKTtcclxuXHJcbiAgICAvLyBEZXRlY3QgdG8gc3dpdGNoIGxldmVsXHJcbiAgICBpZiAoY2hhcmFjdGVyLmxlZnRXYWxsVG91Y2hlZCgpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMZWZ0IHdhbGwgdG91Y2hlZFwiKTtcclxuICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyLnJpZ2h0V2FsbFRvdWNoZWQoKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmlnaHQgd2FsbCB0b3VjaGVkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxufVxyXG5cclxuaW5pdCgpO1xyXG5sb29wKCk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IEdSQVZJVFk6IG51bWJlciA9IDkuODE7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IE1BWF9WRUxPQ0lUWTogbnVtYmVyID0gNztcclxuXHJcbiAgICBwcml2YXRlIHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgeTogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZHk6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIHhfc2l6ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB5X3NpemU6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGhhc0p1bXBlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgaXNMZWZ0V2FsbFRvdWNoZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIGlzUmlnaHRXYWxsVG91Y2hlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgbGVmdFdhbGtpbmdfc3JjOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJpZ2h0V2Fsa2luZ19zcmM6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihzcmNfbGVmdDogc3RyaW5nLCBzcmNfcmlnaHQ6IHN0cmluZywgeF9zaXplOiBudW1iZXIsIHlfc2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIHRoaXMuZHkgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKHhfc2l6ZSwgeV9zaXplKTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHNyY19sZWZ0O1xyXG4gICAgICAgIHRoaXMueF9zaXplID0geF9zaXplO1xyXG4gICAgICAgIHRoaXMueV9zaXplID0geV9zaXplO1xyXG4gICAgICAgIHRoaXMuaGFzSnVtcGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzTGVmdFdhbGxUb3VjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1JpZ2h0V2FsbFRvdWNoZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5sZWZ0V2Fsa2luZ19zcmMgPSBzcmNfbGVmdDtcclxuICAgICAgICB0aGlzLnJpZ2h0V2Fsa2luZ19zcmMgPSBzcmNfcmlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlZnRXYWxsVG91Y2hlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0xlZnRXYWxsVG91Y2hlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmlnaHRXYWxsVG91Y2hlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1JpZ2h0V2FsbFRvdWNoZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRpY2soeF9tYXg6IG51bWJlciwgeV9tYXg6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLnggKz0gdGhpcy5keDtcclxuICAgICAgICB0aGlzLmR5ICs9IHRoaXMuR1JBVklUWTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMueCArIHRoaXMuaW1hZ2Uud2lkdGggPiB4X21heCkge1xyXG4gICAgICAgICAgICAvLyBSaWdodCB3YWxsXHJcbiAgICAgICAgICAgIHRoaXMuaXNSaWdodFdhbGxUb3VjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy54ID0geF9tYXggLSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy54IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzTGVmdFdhbGxUb3VjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlzUmlnaHRXYWxsVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzTGVmdFdhbGxUb3VjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy5keTtcclxuXHJcbiAgICAgICAgLy8gSGl0IHRoZSBncm91bmRcclxuICAgICAgICBpZiAodGhpcy55ICsgdGhpcy55X3NpemUgPj0geV9tYXgpIHtcclxuICAgICAgICAgICAgdGhpcy55ID0geV9tYXggLSB0aGlzLnlfc2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5keSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzSnVtcGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGcmljdGlvblxyXG4gICAgICAgIGlmICh0aGlzLmR4ID4gMCkge1xyXG4gICAgICAgICAgICAvLyBHb2luZyByaWdodFxyXG4gICAgICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHRoaXMucmlnaHRXYWxraW5nX3NyYztcclxuICAgICAgICAgICAgLS10aGlzLmR4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5keCA8IDApIHtcclxuICAgICAgICAgICAgLy8gR29pbmcgbGVmdFxyXG4gICAgICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHRoaXMubGVmdFdhbGtpbmdfc3JjO1xyXG4gICAgICAgICAgICArK3RoaXMuZHg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54X3NpemU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnlfc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW1hZ2VTb3VyY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFjY2VsZXJhdGVMZWZ0KHNwZWVkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmR4IC09IHNwZWVkO1xyXG4gICAgICAgIGlmICh0aGlzLmR4IDwgLXRoaXMuTUFYX1ZFTE9DSVRZKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggPSAtdGhpcy5NQVhfVkVMT0NJVFk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY2NlbGVyYXRlUmlnaHQoc3BlZWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHggKz0gc3BlZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuZHggPiB0aGlzLk1BWF9WRUxPQ0lUWSkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ID0gdGhpcy5NQVhfVkVMT0NJVFk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY2NlbGVyYXRlVXAoc3BlZWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5oYXNKdW1wZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5oYXNKdW1wZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmR5IC09IHNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0WCh4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRZKHk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRZKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0WUxvd2VyKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2UuaGVpZ2h0ICsgdGhpcy55O1xyXG4gICAgfVxyXG5cclxufSJdfQ==
