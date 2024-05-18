
import { Signal } from '../Signal';
import { Model, ModelConfig } from './Model';
export interface SnakeModelConfig extends ModelConfig{

}
export class SnakeModel extends Model<SnakeModelConfig>{
    public updateSignal = new Signal();
    update(data: any): void {
        this.updateSignal.emit();
    }
}
