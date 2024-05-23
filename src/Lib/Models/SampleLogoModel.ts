import { Signal } from "gamecraft-utils"
import { Model, ModelConfig } from "./Model";

export interface SampleLogoModelConfig extends ModelConfig{

}

export class SampleLogoModel extends Model<SampleLogoModelConfig>{
    
    private _isSelected: boolean = false;
    public selectedSignal = new Signal<boolean>();

    public select(){
        this._isSelected = true;
        this.selectedSignal.emit(true)
    }

    public unselect(){
        this._isSelected = false;
        this.selectedSignal.emit(false);
    }

    public isSelected(){
        return this._isSelected;
    }
    
    update(data: any): void {
        
    }
}