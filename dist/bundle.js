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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestCounter_1 = __importDefault(require("./app/TestCounter"));
let x = new TestCounter_1.default();
let canvas = document.getElementById('renderCanvas');
let r = canvas.getContext('2d');
let counter = 0;
function init() {
    canvas.width = 100;
    canvas.height = 100;
    r.font = '12px Arial black';
}
function loop() {
    ++counter;
    r.clearRect(0, 0, 100, 100);
    r.fillText(counter.toString(), 10, 10);
    requestAnimationFrame(loop);
}
init();
loop();
},{"./app/TestCounter":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwL1Rlc3RDb3VudGVyLnRzIiwic3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE1BQXFCLFdBQVc7SUFFNUI7UUFDSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTSxTQUFTLENBQUMsQ0FBUztRQUN0QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQWJELDhCQWFDOzs7Ozs7O0FDYkQsb0VBQTRDO0FBRTVDLElBQUksQ0FBQyxHQUFnQixJQUFJLHFCQUFXLEVBQUUsQ0FBQztBQUV2QyxJQUFJLE1BQU0sR0FBMEMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1RixJQUFJLENBQUMsR0FBd0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyRixJQUFJLE9BQU8sR0FBVyxDQUFDLENBQUM7QUFFeEIsU0FBUyxJQUFJO0lBQ1QsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDbkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDcEIsQ0FBQyxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUNoQyxDQUFDO0FBRUQsU0FBUyxJQUFJO0lBQ1QsRUFBRSxPQUFPLENBQUM7SUFDVixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2QyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsSUFBSSxFQUFFLENBQUM7QUFDUCxJQUFJLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RDb3VudGVyIHtcbiAgICBwcml2YXRlIG46IG51bWJlcjtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubiA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE51bWJlcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5uO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXROdW1iZXIobjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubiA9IG47XG4gICAgfVxufSIsImltcG9ydCBUZXN0Q291bnRlciBmcm9tICcuL2FwcC9UZXN0Q291bnRlcic7XG5cbmxldCB4OiBUZXN0Q291bnRlciA9IG5ldyBUZXN0Q291bnRlcigpO1xuXG5sZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbmRlckNhbnZhcycpO1xubGV0IHI6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IDxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xubGV0IGNvdW50ZXI6IG51bWJlciA9IDA7XG5cbmZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XG4gICAgY2FudmFzLndpZHRoID0gMTAwO1xuICAgIGNhbnZhcy5oZWlnaHQgPSAxMDA7XG4gICAgci5mb250ID0gJzEycHggQXJpYWwgYmxhY2snO1xufVxuXG5mdW5jdGlvbiBsb29wKCk6IHZvaWQge1xuICAgICsrY291bnRlcjtcbiAgICByLmNsZWFyUmVjdCgwLCAwLCAxMDAsIDEwMCk7XG4gICAgci5maWxsVGV4dChjb3VudGVyLnRvU3RyaW5nKCksIDEwLCAxMCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xufVxuXG5pbml0KCk7XG5sb29wKCk7Il19
