import { SampleLogoModel } from "../Models/SampleLogoModel";
import { Signal } from "../Signal";
import { ModelController, ModelControllerConfig } from "./ModelController";

export interface SampleLogoModelControllerConfig extends ModelControllerConfig{
    model: SampleLogoModel;
}

export class SampleLogoModelController<Tconfig extends SampleLogoModelControllerConfig> extends ModelController<SampleLogoModelControllerConfig>{

    public logoSelectedSignal = new Signal();
    public logoUnselectedSignal = new Signal();

    constructor(config: Tconfig){
        super(config);
        this._config.model.selectedSignal.addListener(this.onStateChange, this);

    }
    private  _select(){
        this._config.model.select();
    }

    private _unselect(){
        this._config.model.unselect();
    }

    public isSelected(){
        return this._config.model.isSelected();
    }

    public click(){
        if(this.isSelected()){
            this._unselect();
        }else{
            this._select();
        }
    }

    private onStateChange(state: boolean | undefined){
        if(state && state !== undefined){
            this.logoSelectedSignal.emit();
        }else if(state !== undefined){
            this.logoUnselectedSignal.emit();
        }
    }


    
}