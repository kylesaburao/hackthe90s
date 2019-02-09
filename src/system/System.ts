import CanvasRenderer from '../render/CanvasRenderer';

export default class System {

    private _renderer: CanvasRenderer;

    public constructor() {
        this._renderer = new CanvasRenderer();
    }

    

}