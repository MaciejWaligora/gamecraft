import { Direction } from "../Lib/Models/SnakeHeadModel";
import { Animation, AnimationConfig } from "./Animation";
import * as PIXI from 'pixijs';

export interface ConstantMoveAnimationConfig extends AnimationConfig{
    direction: Direction;
    speed: number;
    maxY: number;
    maxX: number;
}

export class ConstantMoveAnimation<Tconfig extends ConstantMoveAnimationConfig> extends Animation<ConstantMoveAnimationConfig>{

    private _speed:number;
    private _direction: Direction;
    private _config: Tconfig;

    constructor(config: Tconfig){
        super(config);
        this._config = config;
        this._speed = config.speed;
        this._direction = config.direction;
    }

    public getCurrentDirection(){
        return this._direction;
    }

    protected _callback(delta: number): void {
        switch(this._direction){
            case 'up':
                if(this._target.y < 0){
                    this._target.y = this._config.maxY;
                }
                this._target.y -= this._speed;
                break;
            case 'down':
                if(this._target.y > this._config.maxY){
                    this._target.y = 0;
                }
                this._target.y += this._speed;
                break;
            case 'left':
                if(this._target.x < 0){
                    this._target.x = this._config.maxX;
                }
                this._target.x -= this._speed;
                break;
            case 'right':
                if(this._target.x > this._config.maxX){
                    this._target.x = 0;
                }
                this._target.x += this._speed;
                break;
        }
    }


}