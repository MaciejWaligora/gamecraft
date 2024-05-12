import { SpinAnimation } from "../../Animations/SpinAnimation";
import { Signal } from "../Signal";
import { SampleLogoView, SampleLogoViewConfig } from "../Views/SampleLogoView";
import { ViewController, ViewControllerConfig } from "./ViewController";

export interface SampleLogoViewControllerConfig extends ViewControllerConfig{
    view: SampleLogoView<SampleLogoViewConfig>;
}


export class SampleLogoViewController<Tconfig extends SampleLogoViewControllerConfig> extends ViewController<SampleLogoViewControllerConfig>{

    public clickedSignal  = new Signal();
    private _isSpinning: boolean = false;
    constructor(config: Tconfig){
        super(config);
        this._config.view.clickedSignal.addListener(this.onClicked, this);
    }
    public add(){
        this._config.view.add();
    }

    public remove(){
        this._config.view.remove();
    }

    public show(){
        this._config.view.show();
    }

    public hide(){
        this._config.view.hide();
    }

    public select(){
        if(!this._isSpinning){
            this._isSpinning = true;
            this._config.animationManager.playSpinAnimation(this._config.view,2, true, 100, ()=>{this._isSpinning = false}, this);
        }
    }

    public unSelect(){
        if(!this._isSpinning){
            this._isSpinning = true;
            this._config.animationManager.playSpinAnimation(this._config.view,2, false, 100, ()=>{this._isSpinning = false}, this);
        }
    }
    private onClicked(){
        
       this.clickedSignal.emit();
    }


}