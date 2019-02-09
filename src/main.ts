import TestCounter from './app/TestCounter';

let x: TestCounter = new TestCounter();

let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('renderCanvas');
let r: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext('2d');
let counter: number = 0;

function init(): void {
    canvas.width = 100;
    canvas.height = 100;
    r.font = '12px Arial black';
}

function loop(): void {
    ++counter;
    r.clearRect(0, 0, 100, 100);
    r.fillText(counter.toString(), 10, 10);
    requestAnimationFrame(loop);
}

init();
loop();