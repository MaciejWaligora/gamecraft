
import { FoodModel } from '../Models/FoodModel';
import { Signal } from '../Signal';
import { ModelController, ModelControllerConfig } from './ModelController';

export interface FoodModelControllerConfig extends ModelControllerConfig{
    model: FoodModel;
}

export class FoodModelController<Tconfig extends FoodModelControllerConfig> extends ModelController<FoodModelControllerConfig>{

    public updateSignal = new Signal<number>();

    constructor(config: Tconfig){
        super(config);
        this._config.model.updateSignal.addListener(this.onUpdate, this);
    }

    public update(value: number){
        this._config.model.update(value);
    }

    private onUpdate(value: number | undefined){
        this.updateSignal.emit(value);
    }

    public getValue(){
        return this._config.model.getValue();
    }
}

