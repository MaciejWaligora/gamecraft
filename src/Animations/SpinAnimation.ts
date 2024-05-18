import { Animation, AnimationConfig } from "./Animation";
import * as PIXI from 'pixijs'

export interface SpinAnimationConfig extends AnimationConfig {
    numRotations: number; // Number of full rotations
    easingFunction: (progress: number) => number; // Easing function for smooth acceleration and deceleration
    direction?: boolean
}

export class SpinAnimation<Tconfig extends SpinAnimationConfig> extends Animation<SpinAnimationConfig> {
    private _numRotations: number;
    private _totalAngle: number;
    private _speed: number;
    private _initialPos = {x: this._target.x, y: this._target.y}
    private _alreadyspun = 0;
    private _direction = false //false = clockwise, true = ocunter-clockwise

    constructor(config: Tconfig) {
        super(config);
        this._numRotations = config.numRotations;
        this._totalAngle = this._numRotations * 4*Math.PI;
        this._speed = this._totalAngle / config.duration;
        if(config.direction){
            this._direction = config.direction
        }
    }

    protected _callback(delta: number): void {
        const angleChange = this._speed * delta;
       
        if(!this._direction){
            this._target.rotation += angleChange;
        }else{
            this._target.rotation -= angleChange;
        }
        
        this._alreadyspun += angleChange;
        if(this._alreadyspun >= 2*Math.PI * this._numRotations){
            this.stop();
        }

    }

    protected _onAnimationFinished(): void {
        
        super._onAnimationFinished();
    }
}