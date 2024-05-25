import { AnimationManager, AnimationManagerConfig } from "../../AnimationManager";
import { Animation, AnimationConfig } from "../../Animations/Animation";
import { View, ViewConfig } from "gamecraft-view";

export interface ViewControllerConfig{
    view: View<ViewConfig>,
    animationManager: AnimationManager<AnimationManagerConfig>
}

export abstract class ViewController<Tconfig extends ViewControllerConfig>{
    protected _config: Tconfig;
    protected _currentAnimations: Animation<AnimationConfig>[] = [];
    constructor(config: Tconfig){
        this._config = config;
    }

    protected addAnimation(animation: Animation<AnimationConfig>){
        this._currentAnimations.push(animation);
    }

    protected removeAnimatio(animation: Animation<AnimationConfig>){
        this. _currentAnimations = this. _currentAnimations.filter(animation => !animation.isFinished());
    }

}