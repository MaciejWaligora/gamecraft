import { Animation, AnimationConfig } from "./Animations/Animation";
import * as PIXI from 'pixijs'
import { MoveAnimation, MoveAnimationConfig } from "./Animations/MoveAnimation";
import { TiltAnimation, TiltAnimationConfig } from "./Animations/TiltAnimation";
import { View, ViewConfig } from "./Lib/Views/View";
import { SlideInAnimation, SlideInAnimationConfig } from "./Animations/SlideInAnimiation";
import { PopAnimation, PopAnimationConfig } from "./Animations/PopAnimation";
import { SpinAnimation, SpinAnimationConfig } from "./Animations/SpinAnimation";
import { SlideInFromLeftAninmation, SlideInFromLeftAninmationConfig } from "./Animations/SlideInfromLeftAnimation";
import { SlideOutToRightAnimtaion, SlideOutToRightanimtaionConfig } from "./Animations/SlideOutToRightAnimation";
import { ConstantMoveAnimation, ConstantMoveAnimationConfig } from "./Animations/ConstantMoveAnimation";
import { Direction } from "./Lib/Models/SnakeHeadModel";

export interface AnimationManagerConfig{
    renderer: PIXI.Application;
}

export class AnimationManager<Tconfig extends AnimationManagerConfig>{
    private _animations: Animation<AnimationConfig>[] = []
    private _renderer: PIXI.Application;

    constructor(config: Tconfig){
        this._renderer = config.renderer;

        this._renderer.ticker.add(delta => {
            this.update(delta);
            this.flushFinishedAnimations();
        });
    }


    private _addAnimation(animation: Animation<AnimationConfig>) {
        this._animations.push(animation);
    }

    public playLinearMoveAnimation(target: View<ViewConfig>, duration: number, endPosition: {x: number, y: number}){
        const config: MoveAnimationConfig = {
            target: target,
            duration: duration,
            endPosition: endPosition,
            easingFunction: (progress)=> progress
        }
        const animation  = new MoveAnimation(config);
        this._addAnimation(animation);
    }

    public playLinearMoveInfnitely(target: View<ViewConfig>, direction: Direction, speed: number){
        const config: ConstantMoveAnimationConfig = {
            direction:direction,
            speed: speed,
            target: target,
            duration: 1,
            isInfinite: true,
            maxX: this._renderer.screen.width,
            maxY: this._renderer.screen.height
        }
        const animation = new ConstantMoveAnimation(config);
        this._addAnimation(animation);
        return animation;
    }

    public playTiltAnimation(target: View<ViewConfig>, duration: number){
        const config: TiltAnimationConfig = {
            target: target,
            duration: duration
        }
        const animation = new TiltAnimation(config);
        this._addAnimation(animation);
    }


    public playSlideInAnimation(target: View<ViewConfig>, duration: number, onFinished?: ()=>void, scope?: Object){
        const config: SlideInAnimationConfig= {
            target: target,
            duration: duration,
            endPosition: {x:0, y:0}
        }

        const animation = new SlideInAnimation(config);
        if (scope && onFinished){
            animation.onFinishedAnimationSignal.addListener(onFinished, scope);
        }
        this._addAnimation(animation);
    }

    public playPopAnimation(target: View<ViewConfig>, duration: number, targetScale: number){
        const config: PopAnimationConfig ={
            target: target,
            duration: duration,
            targetScale: targetScale
        }

        const animation = new PopAnimation(config);
        this._addAnimation(animation);
    }

    public playSpinAnimation(target: View<ViewConfig>, numRotations: number, direction: boolean = false, duration: number, onFinished?: ()=>void, scope?: Object){

        const config: SpinAnimationConfig ={
            target: target,
            duration: duration,
            numRotations: numRotations,
            direction: direction,
            easingFunction: function (progress: number): number {
                return 2 * Math.pow(Math.sin(progress * 2*Math.PI),2); 
                // return progress
            }
        };

        const animation = new SpinAnimation(config);

        if(onFinished && scope){
            animation.onFinishedAnimationSignal.addListener(onFinished, scope);
        }
        this._addAnimation(animation);
        return animation;
    }


    public playSlideInfromLeft(target: View<ViewConfig>, duration: number, onFinished?: ()=>void, scope?: Object){
        const config: SlideInFromLeftAninmationConfig = {
            target: target,
            duration: duration,
            endPosition:{x:1, y: 1}
        }
        const animation = new SlideInFromLeftAninmation(config);
        if(onFinished && scope){
            animation.onFinishedAnimationSignal.addListener(onFinished, scope);
        }
        this._addAnimation(animation);

    }
    public playSlideOutToRight(target: View<ViewConfig>, duration: number, onFinished?: ()=>void, scope?: Object){
        const config: SlideOutToRightanimtaionConfig = {
            target: target,
            duration: duration,
            endPosition:{x:1, y: 1},
            screenWidth: this._renderer.screen.width
        }
        const animation = new SlideOutToRightAnimtaion(config);
        if(onFinished && scope){
            animation.onFinishedAnimationSignal.addListener(onFinished, scope);
        }
        this._addAnimation(animation);

    }


    public flushFinishedAnimations(){
        this._animations = this._animations.filter(animation => !animation.isFinished());
    }
    
    public stopAnimation(animation: Animation<AnimationConfig>){
        const index = this._animations.indexOf(animation);
        this._animations[index].stop();
    }


    public update(delta: number) {
        this._animations.forEach(animation => {
            animation.update(delta);
        });
    }
}
