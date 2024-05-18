import { Animation, AnimationConfig } from "./Animation";

export interface SpinDegreesAnimationConfig extends AnimationConfig{
    direction: boolean //false clockwise, true: counter-clockwise
    targetSpin: number
}

export class SpinDegreesAnimation<Tconfig extends SpinDegreesAnimationConfig> extends Animation<SpinDegreesAnimationConfig>{
    private _speed: number;
    private _targetRotation: number
    constructor(config: Tconfig){
        super(config);
        this._targetRotation = config.direction ? this._target.rotation - config.targetSpin: this._target.rotation +config.targetSpin ;
        this._speed = config.targetSpin / config.duration;
        console.log(this._targetRotation);
    }

    protected _callback(delta: number): void {
        this._target.rotation += this._speed;
    }

}