export default class Entity {

    private readonly GRAVITY: number = 9.81;
    private readonly MAX_VELOCITY: number = 7;

    private x: number;
    private y: number;

    private dx: number;
    private dy: number;

    private x_size: number;
    private y_size: number;

    private hasJumped: boolean;

    private image: HTMLImageElement;

    public constructor(imgsrc: string, x_size: number, y_size: number) {
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;

        this.image = new Image(x_size, y_size);
        this.image.src = imgsrc;
        this.x_size = x_size;
        this.y_size = y_size;
        this.hasJumped = true;
    }


    public tick(x_max: number, y_max: number): void {

        this.x += this.dx;
        this.dy += this.GRAVITY;

        if (this.x + this.image.width > x_max) {
            this.x = x_max - this.image.width;
        } else if (this.x < 0) {
            this.x = 0;
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
            --this.dx;
        }
        if (this.dx < 0) {
            ++this.dx;
        }

    }

    public getWidth(): number {
        return this.x_size;
    }

    public getHeight(): number {
        return this.y_size;
    }

    public getImageSource() {
        return this.image;
    }

    public accelerateLeft(speed: number) {
        this.dx -= speed;
        if (this.dx < -this.MAX_VELOCITY) {
            this.dx = -this.MAX_VELOCITY;
        }
    }

    public accelerateRight(speed: number): void {
        this.dx += speed;
        if (this.dx > this.MAX_VELOCITY) {
            this.dx = this.MAX_VELOCITY;
        }
    }

    public accelerateUp(speed: number): void {
        if (!this.hasJumped) {
            this.hasJumped = true;
            this.dy -= speed;
        }
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getYLower(): number {
        return this.image.height + this.y;
    }

}