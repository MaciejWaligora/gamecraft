
import { SnakeBodyModel } from '../Models/SnakeBodyModel';
import { Signal } from '../Signal';
import { ModelController, ModelControllerConfig } from './ModelController';

export interface SnakeBodyModelControllerConfig extends ModelControllerConfig{
    model: SnakeBodyModel;
}

export class SnakeBodyModelController<Tconfig extends SnakeBodyModelControllerConfig> extends ModelController<SnakeBodyModelControllerConfig>{
    public updateSignal = new Signal();
    constructor(config: Tconfig){
        super(config);
        this._config.model.updateSignal.addListener(this.onUpdate, this);

    }
    public onUpdate(){
        this.updateSignal.emit();
    }
}

