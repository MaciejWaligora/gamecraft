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
        this.addChild(this._logoSprite);
        this._center();
    }

    private _center(){
        const screenWidth = this._renderer.screen.width;
        const screenHeight = this._renderer.screen.height;

        const containerWidth = this.width;
        const conatinerHeight = this.height;

        this.x = (screenWidth - containerWidth)/2;
        this.y = (screenHeight - conatinerHeight)/2;
    }

    public update(): void {
        
    }
}