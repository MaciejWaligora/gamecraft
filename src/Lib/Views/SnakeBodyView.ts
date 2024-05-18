
import { SnakeBodyComponentView, SnakeBodyComponentViewConfig } from './SnakeBodyComponentView';
import { View , ViewConfig} from './View';
import * as PIXI from 'pixijs'

export interface SnakeBodyViewConfig extends ViewConfig{
    texture: PIXI.Texture;
    initialLength: number;
    renderer: PIXI.Application;
}

export class SnakeBodyView<Tconfig extends SnakeBodyViewConfig>{

    private _bodyComponents: SnakeBodyComponentView<SnakeBodyComponentViewConfig>[] = [];
    private _componentTexture: PIXI.Texture;
    private _renderer: PIXI.Application;

    constructor(config: Tconfig){
        this._componentTexture = config.texture;
        this._renderer =  config.renderer;
        this.grow(config.initialLength);
        
    }

    public grow(qty: number){
        for(let i =0; i < qty; i++){
            const component = new SnakeBodyComponentView({texture: this._componentTexture, renderer: this._renderer, interactive: false, scale: 0.05, index: i});
            component.positionChangedSignal.addListener(this.onPositionChanged, this);
            this. _bodyComponents.push(component);
        }
    }

    private onPositionChanged(pos: {x: number, y: number, index: number} | undefined){
        if(pos){
            if(pos.index + 1 < this._bodyComponents.length){
                this._bodyComponents[pos.index+1].changePosition({x: pos.x, y: pos.y});
            }
        }
    }

    public add(): void {
        for(let i =0; i < this._bodyComponents.length; i++){
            this._bodyComponents[i].add()
        }
    }

    public remove(){
        for(let i =0; i < this._bodyComponents.length; i++){
            this._bodyComponents[i].remove()
        }
    }

    public show(){
        for(let i =0; i < this._bodyComponents.length; i++){
            this._bodyComponents[i].show()
        }
    }

    public hide(){
        for(let i =0; i < this._bodyComponents.length; i++){
            this._bodyComponents[i].hide()
        }
    }


    // public placeInit(headPos: {x: number, y: number}){
    //     for(let i = 0; i < this._bodyComponents.length; i++){
    //         if(!i){
    //             this._bodyComponents[i].x = headPos.x;
    //             this._bodyComponents[i].y = headPos.y + 100;
    //             console.log(this._bodyComponents[i].x, this._bodyComponents[i].y);
    //         }else{
    //             this._bodyComponents[i].x = this._bodyComponents[i-1].x 
    //             this._bodyComponents[i].y = this._bodyComponents[i-1].y + 100;
    //             console.log(this._bodyComponents[i].x, this._bodyComponents[i].y);
    //         }
    //     }
    // }

    public changePosition(headPos: {x: number, y: number}){
        this._bodyComponents[0].changePosition(headPos);
    }

    

    public update(): void {
        
    }
}
