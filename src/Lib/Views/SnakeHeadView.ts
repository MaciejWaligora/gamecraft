
import { View , ViewConfig} from './View';
import * as PIXI from 'pixijs'

export interface SnakeHeadViewConfig extends ViewConfig{
    texture: PIXI.Texture;
}

export class SnakeHeadView<Tconfig extends SnakeHeadViewConfig> extends View<SnakeHeadViewConfig>{
    private _SnakeHeadSprite: PIXI.Sprite;

    constructor(config: Tconfig){
        super(config);
        this._SnakeHeadSprite = new PIXI.Sprite(config.texture);
    }

    
    public add(): void {
        super.add();
        this._SnakeHeadSprite.anchor.set(0.5, 0.5);
        this.addChild(this._SnakeHeadSprite);
        this._center();
    }
    public update(): void {
        
    }
}
