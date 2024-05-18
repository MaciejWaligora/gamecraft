
import { Signal } from '../Signal';
import { Model, ModelConfig } from './Model';
import { SnakeBodyComponentModel } from './SnakeBodyComponentModel';
export interface SnakeBodyModelConfig extends ModelConfig{
    initialLength: number;
}
export class SnakeBodyModel<Tconfig extends SnakeBodyModelConfig> extends Model<SnakeBodyModelConfig>{
    public updateSignal = new Signal();
    public growSignal = new Signal<number>();
    private _bodyComponents: SnakeBodyComponentModel[] = [];

    constructor(config: Tconfig){
        super(config);
        this.grow(config.initialLength);
    }   

    public grow(growFactor: number){
        for(let i = 0; i < growFactor ; i++){
            const newBodyPart = new SnakeBodyComponentModel({});
            this._bodyComponents.push(newBodyPart);
        }
        this.growSignal.emit(growFactor);
    }

    update(data: any): void {
        this.updateSignal.emit();
    }
}
