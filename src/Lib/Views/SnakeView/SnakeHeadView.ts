import { Signal } from "gamecraft-utils";
import { View , ViewConfig} from "gamecraft-view";
import * as PIXI from 'pixijs'

export interface SnakeHeadViewConfig extends ViewConfig{
    texture: PIXI.Texture;
}

export class SnakeHeadView<Tconfig extends SnakeHeadViewConfig> extends View<SnakeHeadViewConfig>{
    private _SnakeHeadSprite: PIXI.Sprite;
    public addedSignal = new Signal<{x:number, y:number}>();
    constructor(config: Tconfig){
        super(config);
        this._SnakeHeadSprite = new PIXI.Sprite(config.texture);
    }

    
    public add(): void {
        super.add();
        this._SnakeHeadSprite.anchor.set(0.5, 0.5);
        this.addChild(this._SnakeHeadSprite);
        this._center();
        this.addedSignal.emit({x: this.x, y: this.y});
    }
    public update(): void {
        
    }
}
