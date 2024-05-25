import { Signal } from "gamecraft-utils";
import { Model, ModelConfig } from "gamecraft-model";
export interface SnakeBodyComponentModelConfig extends ModelConfig{

}
export class SnakeBodyComponentModel extends Model<SnakeBodyComponentModelConfig>{
    public updateSignal = new Signal();
    update(data: any): void {
        this.updateSignal.emit();
    }
}
