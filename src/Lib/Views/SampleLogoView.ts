import { View , ViewConfig} from "./View";
import * as PIXI from 'pixijs'

export interface SampleLogoViewConfig extends ViewConfig{
    texture: PIXI.Texture;
}

export class SampleLogoView<Tconfig extends SampleLogoViewConfig> extends View<SampleLogoViewConfig>{
    private _logoSprite: PIXI.Sprite;

    constructor(config: Tconfig){
        super(config);
        this._logoSprite = new PIXI.Sprite(config.texture);
        this._logoSprite.anchor.set(0.5, 0.5);
        this.addChild(this._logoSprite);
        this._center();
    }

    

    public update(): void {
        
    }
}