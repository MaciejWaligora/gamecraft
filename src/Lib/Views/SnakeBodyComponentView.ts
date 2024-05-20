
import { Signal } from '../Signal';
import { View , ViewConfig} from './View';
import * as PIXI from 'pixijs'

export interface SnakeBodyComponentViewConfig extends ViewConfig{
    texture: PIXI.Texture;
    index:number
}

export class SnakeBodyComponentView<Tconfig extends SnakeBodyComponentViewConfig> extends View<SnakeBodyComponentViewConfig>{
    private _SnakeBodyComponentSprite: PIXI.Sprite;
    public positionChangedSignal = new Signal<{x: number, y: number, index: number}>();
    private _index: number
    constructor(config: Tconfig){
        super(config);
        this._index = config.index;
        this._SnakeBodyComponentSprite = new PIXI.Sprite(config.texture);
        this._SnakeBodyComponentSprite.anchor.set(0.5, 0.5);
        this.addChild(this._SnakeBodyComponentSprite);

    }

    public changePosition(pos: { x: number, y: number }) {
        this.positionChangedSignal.emit({ x: this.x, y: this.y, index: this._index });
        this.x = pos.x;
        this.y = pos.y;
    }

    public update(): void {
        
    }
}
