
import { View , ViewConfig} from "gamecraft-view";
import * as PIXI from 'pixijs'

export interface FoodViewConfig extends ViewConfig{
    texture: PIXI.Texture;
}

export class FoodView<Tconfig extends FoodViewConfig> extends View<FoodViewConfig>{
    private _FoodSprite: PIXI.Sprite;

    constructor(config: Tconfig){
        super(config);
        this._FoodSprite = new PIXI.Sprite(config.texture);
        this._FoodSprite.anchor.set(0.5, 0.5);
        this.addChild(this._FoodSprite);
        this.setRandomPosition();
    }

    public setRandomPosition(){

        const randomInt =  (min: number, max: number) => {
            const minCeiled = Math.ceil(min);
            const maxFloored = Math.floor(max);
            return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
        }
        const screenWidth = this._renderer.screen.width;
        const screenHeight = this._renderer.screen.height;

        const posX = randomInt(this.width/2, screenWidth - this.width/2);
        const posY = randomInt(this.width/2, screenHeight - this.width/2);

        this.x = posX;
        this.y = posY;
    }

    

    public update(): void {
        
    }
}
