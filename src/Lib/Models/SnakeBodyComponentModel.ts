
import { Signal } from '../Signal';
import { Model, ModelConfig } from './Model';
export interface SnakeBodyComponentModelConfig extends ModelConfig{

}
export class SnakeBodyComponentModel extends Model<SnakeBodyComponentModelConfig>{
    public updateSignal = new Signal();
    update(data: any): void {
        this.updateSignal.emit();
    }
}
