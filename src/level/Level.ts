export default class Level {

    public title: string;
    public directions: string;
    public background: HTMLImageElement;

    public constructor(imgdir: string, title: string, directions: string, canvas: HTMLCanvasElement) {
        this.background = new Image(canvas.width, canvas.height);
        this.background.src = imgdir;
        this.title = title;
        this.directions = directions;
    }
}