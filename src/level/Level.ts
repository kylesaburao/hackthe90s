export default class Level {

    public title: string;
    public status: string;
    public directions: string;

    // Access by n - 1 for array index use
    public leftLevelNumber: number;
    public rightLevelNumber: number;

    public background: HTMLImageElement;

    public constructor(imgdir: string, title: string, status: string,
        directions: string, left: number, right: number,
        canvas: HTMLCanvasElement) {
        this.background = new Image(canvas.width, canvas.height);
        this.background.src = imgdir;
        this.title = title;
        this.status = status;
        this.directions = directions;

        this.leftLevelNumber = left;
        this.rightLevelNumber = right;
    }
}