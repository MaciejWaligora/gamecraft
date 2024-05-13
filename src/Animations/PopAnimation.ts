import { Animation, AnimationConfig } from "./Animation";

export interface PopAnimationConfig extends AnimationConfig{
    targetScale: number
}

export class PopAnimation<Tconfig extends PopAnimationConfig> extends Animation<PopAnimationConfig>{
    private _targetScale: number;
    private _speed: number;

    constructor(config: Tconfig){
        super(config);
        this._targetScale = config.targetScale;
        this._speed = (this._targetScale - this._target.scale.x) / config.duration * 7; 
    }

    protected _callback(delta: number): void {
        const scaleFactor = delta * this._speed;
        const scaleDiff = this._target.scale.x - 1;

        const positionChange = scaleDiff * (this._target.width / 2);

        if (this._target.scale.x < this._targetScale) {
            this._target.scale.set(this._target.scale.x + scaleFactor, this._target.scale.y + scaleFactor);
        } else {
            this._target.scale.set(this._target.scale.x - scaleFactor, this._target.scale.y - scaleFactor);
        }
    
    }

    protected _onAnimationFinished(): void {
        super._onAnimationFinished();
        this._target.scale.set(1,1)
    }
}