import { MoveAnimation, MoveAnimationConfig } from "./MoveAnimation";
export interface SlideOutToRightanimtaionConfig extends MoveAnimationConfig{
    screenWidth: number
}
export class SlideOutToRightAnimtaion<Tconfig extends SlideOutToRightanimtaionConfig> extends MoveAnimation<SlideOutToRightanimtaionConfig>{
    constructor(config: Tconfig){
        config.endPosition = {y:config.target.y, x: config.screenWidth};
        super(config);
        this._easingFunction = (progress: number): number => {
            return 1 - Math.pow(1 - progress, 2);
        }
    }

    protected _callback(delta: number): void {
        super._callback(delta);
        this._target.alpha = 1-delta;
    }
}