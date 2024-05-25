
import { Direction, SnakeHeadModel, SnakeHeadModelConfig } from '../Models/SnakeHeadModel';
import { Signal } from "gamecraft-utils";
import { ModelController, ModelControllerConfig } from "gamecraft-controllers";

export interface SnakeHeadModelControllerConfig extends ModelControllerConfig{
    model: SnakeHeadModel<SnakeHeadModelConfig>;
}

export class SnakeHeadModelController<Tconfig extends SnakeHeadModelControllerConfig> extends ModelController<SnakeHeadModelControllerConfig>{
    public updateSignal = new Signal();
    public directionChangedSignal = new Signal<Direction>();
    public speedChangedSiganl = new Signal<number>();
    public movingStatusChangedSignal = new Signal<boolean>();

    constructor(config: Tconfig){
        super(config);
        this._config.model.updateSignal.addListener(this.onUpdate, this);
        this._config.model.directionChangeSignal.addListener(this._onDirectionChange, this);
        this._config.model.speedChangedSignal.addListener(this._onSpeedChange, this);
        this._config.model.isMovingSignal.addListener(this._onMovingStatusChange, this);

    }

    private _onDirectionChange(dir: Direction | undefined){
        this.directionChangedSignal.emit(dir);
    }

    private _onSpeedChange(speed: number | undefined){
        this.speedChangedSiganl.emit(speed);
    }

    private _onMovingStatusChange(isMoving: boolean | undefined){
        this.movingStatusChangedSignal.emit(isMoving);
    }

    private _getCurrentDirection(){
        return this._config.model.getCurrentdirection();
    }

    public changedirection(dir: Direction){
        const currentDirection = this._config.model.getCurrentdirection();

        if( currentDirection === 'up' && dir !== 'down' && dir !== 'up'){
            this._config.model.changeDirection(dir);
        }

        if(currentDirection === 'down' && dir !== 'up' && dir !== 'down'){
            this._config.model.changeDirection(dir);
        }
        
        if(currentDirection === 'right' && dir !== 'left' && dir !== 'right'){
            this._config.model.changeDirection(dir);
        }

        if(currentDirection === 'left' && dir !== 'right' && dir !== 'left'){
            this._config.model.changeDirection(dir);
        }
    }

    public changeSpeed(speed: number){
        this._config.model.changeSpeed(speed);
    }

    public changeMovingStatus(isMoving: boolean){
        this._config.model.toggleMove(isMoving);
    }


    public onUpdate(){
        this.updateSignal.emit();
    }
}

