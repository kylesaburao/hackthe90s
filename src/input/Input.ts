export default class Input {

    public upKeyDown: boolean;
    public leftKeyDown: boolean;
    public rightKeyDown: boolean;

    public constructor() {
        this.initializeInputs();
        this.upKeyDown = false;
        this.leftKeyDown = false;
        this.rightKeyDown = false;
    }

    private initializeInputs(): void {
        document.addEventListener('keydown', (ev) => {
            if (ev.keyCode === 37) {
                this.leftKeyDown = true;
            } else if (ev.keyCode === 39) {
                this.rightKeyDown = true;
            } else if (ev.keyCode === 38) {
                this.upKeyDown = true;
            }
        });
        document.addEventListener('keyup', (ev) => {
            if (ev.keyCode === 37) {
                this.leftKeyDown = false;
            } else if (ev.keyCode === 38) {
                this.upKeyDown = false;
            } else if (ev.keyCode === 39) {
                this.rightKeyDown = false;
            }
        });
    }
}