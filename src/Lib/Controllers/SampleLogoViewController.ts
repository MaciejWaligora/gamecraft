
import { Signal } from "gamecraft-utils";
import { SampleLogoView, SampleLogoViewConfig } from "../Views/SampleLogoView";
import { ViewController, ViewControllerConfig } from "gamecraft-controllers";

export interface SampleLogoViewControllerConfig extends ViewControllerConfig{
    view: SampleLogoView<SampleLogoViewConfig>;
}


export class SampleLogoViewController<Tconfig extends SampleLogoViewControllerConfig> extends ViewController<SampleLogoViewControllerConfig>{

    public clickedSignal  = new Signal();
    public removedSignal = new Signal();

    constructor(config: Tconfig){
        super(config);
        this._config.view.clickedSignal.addListener(this.onClicked, this);
    }
    public add(){
        this._config.view.add();
        this._config.animationManager.playSlideInfromLeft(this._config.view, 100);
    }

    public remove(){
        this._config.animationManager.playSlideOutToRight(this._config.view, 100, ()=>{
            this._config.view.remove();
            this.removedSignal.emit();
        }, this)
        
    }

    public show(){
        this._config.view.show();
    }

    public hide(){
        this._config.view.hide();
    }

    public select(){
        this._config.animationManager.playSpinAnimation(this._config.view,0.25, true, 100, ()=>{}, this)
    }

    public unSelect(){
        this._config.animationManager.playSpinAnimation(this._config.view,0.25, false, 100, ()=>{ this.remove()}, this)
    }
    private onClicked(){
        
       this.clickedSignal.emit();
    }


}