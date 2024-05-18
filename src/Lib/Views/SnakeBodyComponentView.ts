
import { View , ViewConfig} from './View';
import * as PIXI from 'pixijs'

export interface SnakeBodyComponentViewConfig extends ViewConfig{
    texture: PIXI.Texture;
}

export class SnakeBodyComponentView<Tconfig extends SnakeBodyComponentViewConfig> extends View<SnakeBodyComponentViewConfig>{
    private _SnakeBodyComponentSprite: PIXI.Sprite;

    constructor(config: Tconfig){
        super(config);
        this._SnakeBodyComponentSprite = new PIXI.Sprite(config.texture);
        this._SnakeBodyComponentSprite.anchor.set(0.5, 0.5);
        this.addChild(this._SnakeBodyComponentSprite);
        this._center();
    }

    

    public update(): void {
        
    }
}
