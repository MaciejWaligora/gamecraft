

import { Animation, AnimationConfig } from '../../Animations/Animation';
import { ConstantMoveAnimation, ConstantMoveAnimationConfig } from '../../Animations/ConstantMoveAnimation';
import { Direction } from '../Models/SnakeHeadModel';
import { Signal } from '../Signal';
import { SnakeHeadView, SnakeHeadViewConfig } from '../Views/SnakeHeadView';
import { ViewController, ViewControllerConfig } from './ViewController';

export interface SnakeHeadViewControllerConfig extends ViewControllerConfig{
    view: SnakeHeadView<SnakeHeadViewConfig>;
}

export class SnakeHeadViewController<Tconfig extends SnakeHeadViewControllerConfig> extends ViewController<SnakeHeadViewControllerConfig>{

    public clickedSignal = new Signal();
    private _speed = 0;
    private _direction: Direction = 'up';
    private _currentAnimation: ConstantMoveAnimation<ConstantMoveAnimationConfig> | null = null

    constructor(config: Tconfig){
        super(config);
        this._config.view.clickedSignal.addListener(this.onClicked, this);
    }
    public add(){
        this._config.view.add();
    }

    public remove(){
        this._config.view.remove();
    }

    public show(){
        this._config.view.show();
    }

    public hide(){
        this._config.view.hide();
    }

    public setSpeed(speed: number){
        this._speed = speed;
        if(this._currentAnimation){
            this._currentAnimation.stop();
            this._currentAnimation = this._config.animationManager.playLinearMoveInfnitely(this._config.view, this._direction, this._speed);
        }
    }

    public setDirection(dir: Direction){
        this._direction = dir;
        const _prevDirection = this._currentAnimation?.getCurrentDirection();
        if(this._currentAnimation){
            this._currentAnimation.stop();
            this._currentAnimation = this._config.animationManager.playLinearMoveInfnitely(this._config.view, this._direction, this._speed);
        }

        //TODO get the rotation animation in line
        switch (dir){
            // case 'up':
            //     _prevDirection === 'left' ? this._config.animationManager.playSpin90Degrees(this._config.view, false, 100, Math.PI/2) :this._config.animationManager.playSpin90Degrees(this._config.view, true, 100, Math.PI/2) ;
            //     break;
            // case 'down':
            //     _prevDirection === 'left' ? this.turnLeft() : this.turnRight();
            //     break;
            // case 'left':
            //     _prevDirection === 'up' ? this.turnLeft() : this.turnRight();
            //     break;
            // case 'right':
            //     _prevDirection === 'up' ? this.turnRight(): this.turnLeft();
                // break;
        }

    }   

    public startMoving(){
        if(this._currentAnimation){
            this._currentAnimation.stop();
        }
        this._currentAnimation = this._config.animationManager.playLinearMoveInfnitely(this._config.view, this._direction, this._speed);
    }

    public stopMoving(){
        if(this._currentAnimation){
            this._currentAnimation.stop();
        }
    }

    private onClicked(){
       this.clickedSignal.emit();
    }
}

