export default class Level {

    public message: string;
    public background: HTMLImageElement;

    public constructor(imgdir: string, message: string, canvas: HTMLCanvasElement) {
        this.background = new Image(canvas.width, canvas.height);
        this.background.src = imgdir;
        this.message = message;
    }
}