export default class Level {

    public message: string;
    public background: HTMLImageElement;
    public location: string;

    public constructor(imgdir: string, message: string, location: string, canvas: HTMLCanvasElement) {
        this.background = new Image(canvas.width, canvas.height);
        this.background.src = imgdir;
        this.message = message;
        this.location = location;
    }
}