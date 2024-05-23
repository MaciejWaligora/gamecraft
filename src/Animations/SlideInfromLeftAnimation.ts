import { MoveAnimation, MoveAnimationConfig } from "./MoveAnimation";

export interface SlideInFromLeftAninmationConfig extends MoveAnimationConfig{}


export class SlideInFromLeftAninmation<Tconfig extends SlideInFromLeftAninmationConfig> extends MoveAnimation<SlideInFromLeftAninmationConfig>{
    constructor(config: Tconfig){
        config.endPosition = {y:config.target.y, x: config.target.x};
        config.target.x = 0 - config.target.width;
        config.target.alpha = 0;
        super(config);
        this._easingFunction = (progress: number): number => {
            return 1 - Math.pow(1 - progress, 2);
        }
    }

    protected _callback(delta: number): void {
        super._callback(delta);
        this._target.alpha = delta
    }
}