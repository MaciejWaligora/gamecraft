

import { CollisionDetector } from 'gamecraft-collision-detector';
import { Signal } from 'gamecraft-utils';
import { FoodView, FoodViewConfig } from '../../Views/FoodView/FoodView';
import { ViewController, ViewControllerConfig } from 'gamecraft-controllers';
import { BezierEmitter, DirectionalExplosionEmitter, ExplosionEmitter } from 'gamecraft-particle-system';
import { Direction } from 'gamecraft-animation/dist/AnimationManager';

export interface FoodViewControllerConfig extends ViewControllerConfig{
    view: FoodView<FoodViewConfig>;
    foodExplosionEmitter: ExplosionEmitter;

    bezierEmitter: BezierEmitter;

    directionalExplosionEmitter: DirectionalExplosionEmitter;
}

export class FoodViewController<Tconfig extends FoodViewControllerConfig> extends ViewController<FoodViewControllerConfig>{

    public clickedSignal = new Signal();
    private _foodExplosionEmitter: ExplosionEmitter;

    private _bezierEmitter: BezierEmitter;

    private _directionalExplosionEmitter: DirectionalExplosionEmitter;

    private _hitDirection: Direction = 'up';

    constructor(config: Tconfig){
        super(config);
        this._config.view.clickedSignal.addListener(this.onClicked, this);
        this._foodExplosionEmitter = config.foodExplosionEmitter;
        this._bezierEmitter = config.bezierEmitter;
        this._directionalExplosionEmitter = config.directionalExplosionEmitter;
    }
    public add(){
        this._config.view.add();
        CollisionDetector.addCollisionZone(this._config.view);
    }

    public remove(){
        
        this._config.view.remove();
        CollisionDetector.removeCollisionZone(this._config.view);
    }

    public show(){
        this._config.view.show();
        CollisionDetector.addCollisionZone(this._config.view);
    }

    public hide(){
        const currentX = this._config.view.x;
        const currentY = this._config.view.y;
        const spreadRange = this.convertDirToRadRange(this._hitDirection);
        this._directionalExplosionEmitter.setDirection(spreadRange[0], spreadRange[1]);
        this._directionalExplosionEmitter.emitParticles(currentX, currentY, 150);
        this._bezierEmitter.emitParticles(currentX, currentY, 100);
        this._config.view.hide();
        CollisionDetector.removeCollisionZone(this._config.view);
    }

    public setRandomPosition(){
        this._config.view.setRandomPosition();
    }

    private onClicked(){
       this.clickedSignal.emit();
    }

    private convertDirToRadRange(dir: Direction): number[]{
        let start = 0;
        let end = Math.PI * 2;

        switch (dir){
            case 'up':
                start =  - 0.2 - (Math.PI/2);
                end = 0.2 - (Math.PI/2);
                break;
            case 'down':
                start = Math.PI - (Math.PI/2) - 0.2;
                end = Math.PI - (Math.PI/2) + 0.2;
                break;
            case 'left':
                start = Math.PI - 0.2;
                end =  Math.PI  + 0.2;
                break;
            case 'right':
                start = Math.PI/2 - (Math.PI/2) - 0.2;
                end =  Math.PI/2 - (Math.PI/2)  + 0.2;
                break;
        }
        return [start, end]
    }

    public setExplosionDirection(dir: Direction){
        this._hitDirection = dir;
    }
}

