
import { SnakeModel } from '../Models/SnakeModel';
import { Signal } from '../Signal';
import { ModelController, ModelControllerConfig } from './ModelController';

export interface SnakeModelControllerConfig extends ModelControllerConfig{
    model: SnakeModel;
}

export class SnakeModelController<Tconfig extends SnakeModelControllerConfig> extends ModelController<SnakeModelControllerConfig>{
    public updateSignal = new Signal();
    constructor(config: Tconfig){
        super(config);
        this._config.model.updateSignal.addListener(this.onUpdate, this);

    }
    public onUpdate(){
        this.updateSignal.emit();
    }
}

