import { MoveAnimation, MoveAnimationConfig } from "./MoveAnimation";

export interface SlideInAnimationConfig extends MoveAnimationConfig{
}

export class SlideInAnimation<Tconfig extends SlideInAnimationConfig> extends MoveAnimation<SlideInAnimationConfig>{
    
    
    constructor(config: Tconfig){
        config.endPosition = {y:config.target.y, x: config.target.x};
        config.target.y = 0 - config.target.height;
        
        super(config);
        this._easingFunction = (progress: number): number => {
            return 1 - Math.pow(1 - progress, 2);
        }
    }

}