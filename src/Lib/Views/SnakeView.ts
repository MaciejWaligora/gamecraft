
import { View , ViewConfig} from './View';
import * as PIXI from 'pixijs'

export interface SnakeViewConfig extends ViewConfig{
    texture: PIXI.Texture;
}

export class SnakeView<Tconfig extends SnakeViewConfig> extends View<SnakeViewConfig>{
    private _SnakeSprite: PIXI.Sprite;

    constructor(config: Tconfig){
        super(config);
        this._SnakeSprite = new PIXI.Sprite(config.texture);
        this._SnakeSprite.anchor.set(0.5, 0.5);
        this.addChild(this._SnakeSprite);
        this._center();
    }

    

    public update(): void {
        
    }
}
