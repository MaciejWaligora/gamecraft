import { Signal } from "../Signal";
import { SampleLogoView, SampleLogoViewConfig } from "../Views/SampleLogoView";
import { ViewController, ViewControllerConfig } from "./ViewController";

export interface SampleLogoViewControllerConfig extends ViewControllerConfig{
    view: SampleLogoView<SampleLogoViewConfig>;
}


export class SampleLogoViewController<Tconfig extends SampleLogoViewControllerConfig> extends ViewController<SampleLogoViewControllerConfig>{

    public clickedSignal  = new Signal();
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
    private onClicked(){
        this._config.animationManager.playPopAnimation(this._config.view, 10, 1.1);
        this.clickedSignal.emit();
    }


}