import { Signal } from "gamecraft-utils";
import { Model, ModelConfig } from "gamecraft-model";

export type Direction = ('up'|'down'|'left'|'right');

export interface SnakeHeadModelConfig extends ModelConfig{
    speed: number
}
export class SnakeHeadModel<Tconfig extends SnakeHeadModelConfig> extends Model<SnakeHeadModelConfig>{
    public updateSignal = new Signal();
    public directionChangeSignal = new Signal<Direction>();
    public speedChangedSignal = new Signal<number>();
    public isMovingSignal = new Signal<boolean>();

    private _currentDirection: Direction = 'up';
    private _speed: number;
    private _isMoving: boolean = false;

    constructor(config:Tconfig){
        super(config);
        this._speed = config.speed;
    }

    public changeDirection(dir: Direction){
        this._currentDirection = dir;
        this.directionChangeSignal.emit(dir);
    }

    public changeSpeed(speed: number){
        this._speed = speed;
        this.speedChangedSignal.emit(speed);
    }

    public toggleMove(move: boolean){
        this._isMoving = move;
        this.isMovingSignal.emit(move);
    }

    public getCurrentdirection(){
        return this._currentDirection;
    }

    update(data: any): void {
        this.updateSignal.emit();
    }

    
}
