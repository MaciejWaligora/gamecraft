
import { View , ViewConfig} from './View';
import * as PIXI from 'pixijs'

export interface SnakeBodyViewConfig extends ViewConfig{
    texture: PIXI.Texture;
}

export class SnakeBodyView<Tconfig extends SnakeBodyViewConfig> extends View<SnakeBodyViewConfig>{
    private _SnakeBodySprite: PIXI.Sprite;

    constructor(config: Tconfig){
        super(config);
        this._SnakeBodySprite = new PIXI.Sprite(config.texture);
        this._SnakeBodySprite.anchor.set(0.5, 0.5);
        this.addChild(this._SnakeBodySprite);
        this._center();
    }

    

    public update(): void {
        
    }
}
