
import { SnakeBodyModel, SnakeBodyModelConfig } from '../../Models/SnakeModel/SnakeBodyModel';
import { Signal } from "gamecraft-utils"
import { ModelController, ModelControllerConfig } from "gamecraft-controllers";

export interface SnakeBodyModelControllerConfig extends ModelControllerConfig{
    model: SnakeBodyModel<SnakeBodyModelConfig>;
}

export class SnakeBodyModelController<Tconfig extends SnakeBodyModelControllerConfig> extends ModelController<SnakeBodyModelControllerConfig>{
    
    public updateSignal = new Signal();
    public growSignal = new Signal<number>();

    constructor(config: Tconfig){
        super(config);
        this._config.model.updateSignal.addListener(this.onUpdate, this);
        this._config.model.growSignal.addListener(this._onGrow, this);
    }

    public grow(growFactor: number){
        this._config.model.grow(growFactor);
    }

    private _onGrow(growFactor: number | undefined){
        if(growFactor){
            this.growSignal.emit(growFactor);
        }
    }
    public onUpdate(){
        this.updateSignal.emit();
    }
}

