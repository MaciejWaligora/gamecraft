import { Signal } from "gamecraft-utils";
import { Model, ModelConfig } from "gamecraft-model";

export interface FoodModelConfig extends ModelConfig{

}

export class FoodModel extends Model<FoodModelConfig>{

    public updateSignal = new Signal<number>();

    private _value: number = 1;

    private _hitFromAngle: string = 'up';

    public getValue(){
        return this._value;
    }

    update(data: {
        value: number,
        hitDirection: string
    }): void {
        this._value = data.value;
        this._hitFromAngle = data.hitDirection;
        this.updateSignal.emit(this._value);
    }
}
