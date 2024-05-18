
import { Signal } from '../Signal';
import { Model, ModelConfig } from './Model';
export interface SnakeBodyModelConfig extends ModelConfig{

}
export class SnakeBodyModel extends Model<SnakeBodyModelConfig>{
    public updateSignal = new Signal();
    update(data: any): void {
        this.updateSignal.emit();
    }
}
