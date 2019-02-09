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
const RENDER_CANVAS_ID = 'renderCanvas';
let x = new TestCounter_1.default();
let canvas = document.getElementById(RENDER_CANVAS_ID);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwL1Rlc3RDb3VudGVyLnRzIiwic3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE1BQXFCLFdBQVc7SUFFNUI7UUFDSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTSxTQUFTLENBQUMsQ0FBUztRQUN0QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQWJELDhCQWFDOzs7Ozs7O0FDYkQsb0VBQTRDO0FBRTVDLE1BQU0sZ0JBQWdCLEdBQVcsY0FBYyxDQUFDO0FBRWhELElBQUksQ0FBQyxHQUFnQixJQUFJLHFCQUFXLEVBQUUsQ0FBQztBQUV2QyxJQUFJLE1BQU0sR0FBMEMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlGLElBQUksQ0FBQyxHQUF3RCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JGLElBQUksT0FBTyxHQUFXLENBQUMsQ0FBQztBQUV4QixTQUFTLElBQUk7SUFDVCxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNuQixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNwQixDQUFDLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQ2hDLENBQUM7QUFFRCxTQUFTLElBQUk7SUFDVCxFQUFFLE9BQU8sQ0FBQztJQUNWLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFFRCxJQUFJLEVBQUUsQ0FBQztBQUNQLElBQUksRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdENvdW50ZXIge1xyXG4gICAgcHJpdmF0ZSBuOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5uID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TnVtYmVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TnVtYmVyKG46IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubiA9IG47XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVGVzdENvdW50ZXIgZnJvbSAnLi9hcHAvVGVzdENvdW50ZXInO1xyXG5cclxuY29uc3QgUkVOREVSX0NBTlZBU19JRDogc3RyaW5nID0gJ3JlbmRlckNhbnZhcyc7XHJcblxyXG5sZXQgeDogVGVzdENvdW50ZXIgPSBuZXcgVGVzdENvdW50ZXIoKTtcclxuXHJcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChSRU5ERVJfQ0FOVkFTX0lEKTtcclxubGV0IHI6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IDxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5sZXQgY291bnRlcjogbnVtYmVyID0gMDtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XHJcbiAgICBjYW52YXMud2lkdGggPSAxMDA7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gMTAwO1xyXG4gICAgci5mb250ID0gJzEycHggQXJpYWwgYmxhY2snO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb29wKCk6IHZvaWQge1xyXG4gICAgKytjb3VudGVyO1xyXG4gICAgci5jbGVhclJlY3QoMCwgMCwgMTAwLCAxMDApO1xyXG4gICAgci5maWxsVGV4dChjb3VudGVyLnRvU3RyaW5nKCksIDEwLCAxMCk7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbn1cclxuXHJcbmluaXQoKTtcclxubG9vcCgpOyJdfQ==
