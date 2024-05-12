import * as PIXI from 'pixijs';
import { Animation, AnimationConfig } from './Animation';

export interface TiltAnimationConfig extends AnimationConfig {
}

export class TiltAnimation<Tconfig extends TiltAnimationConfig> extends Animation<TiltAnimationConfig> {
    private _initialRotation: number;
    private _rotationSpeed: number;
    private _targetRotation: number = 0.1;
    private _initialPos = {x: this._target.x, y: this._target.y}

    constructor(config: Tconfig) {
        super(config);
        this._easingFunction = (progress: number): number => {
            return 1 - Math.pow(1 - progress, 2);
        }

        this._initialRotation = config.target.rotation;
        this._rotationSpeed =  this._targetRotation / config.duration * 3;
        const center = new PIXI.Point(config.target.width / 2, config.target.height / 2);
        this._target.x = this._target.x + config.target.width / 2;
        this._target.y = this._target.y + config.target.height / 2

        this._target.pivot.copyFrom(center);
    }

    protected _callback(delta: number): void {
        if(this._target.rotation < this._targetRotation){
            this._targetRotation = 0.1;
            this._target.rotation += this._rotationSpeed * delta;
        }else if(this._target.rotation >= this._targetRotation){
            this._targetRotation = 0;
            this._target.rotation -= this._rotationSpeed * delta;
        }
        
    }

    protected _onAnimationFinished(): void {
        super._onAnimationFinished();
        this._target.rotation = 0;
        this._target.x = this._initialPos.x;
        this._target.y = this._initialPos.y;
        this._target.pivot.x = 0;
        this._target.pivot.y = 0;
    }
}