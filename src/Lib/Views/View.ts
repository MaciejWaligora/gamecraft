import * as PIXI from "pixijs";
import { Signal } from "../Signal";
import { InputHandler } from "../../Handlers/InputHandler";

export interface ViewConfig{
    renderer: PIXI.Application;
    interactive: boolean;
    scale?: number;
}


export abstract class View<Tconfig extends ViewConfig> extends PIXI.Container{
    protected _renderer: PIXI.Application;
    public showSignal = new Signal();
    public hideSignal = new Signal();
    public clickedSignal = new Signal();

    constructor(config: Tconfig) {
        super();
        this._renderer = config.renderer;
        if(config.interactive){
            InputHandler.attachClickHandler(this);
        }
        if (config.scale !== undefined){
            this.scale.set(config.scale);
        }
        this._renderer.stage.addChild(this);
    }


    public add(){
        this._renderer.stage.addChild(this);
        this.alpha = 1;
        this.showSignal.emit();
    }

    public remove(){
        this._renderer.stage.removeChild(this);
        this.alpha = 0;
        this.hideSignal.emit();
    }

    public show(){
        this.alpha = 1;
        this.showSignal.emit();
    }

    public hide(){
        this.alpha = 0;
        this.hideSignal.emit();
    }

    public click(){
        this.clickedSignal.emit();
    }

    protected _center(){
        const screenWidth = this._renderer.screen.width;
        const screenHeight = this._renderer.screen.height;

        const containerWidth = this.width;
        const conatinerHeight = this.height;

        this.x = (screenWidth - containerWidth)/2;
        this.y = (screenHeight - conatinerHeight)/2;
    }
    public abstract update(): void;
}