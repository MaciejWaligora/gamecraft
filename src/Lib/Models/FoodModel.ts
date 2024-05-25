import { Signal } from "gamecraft-utils";
import { Model, ModelConfig } from "gamecraft-model";

export interface FoodModelConfig extends ModelConfig{

}

export class FoodModel extends Model<FoodModelConfig>{

    public updateSignal = new Signal<number>();

    private _value: number = 1;

    public getValue(){
        return this._value;
    }

    update(data: number): void {
        this._value = data;
        this.updateSignal.emit(this._value);
    }
}
