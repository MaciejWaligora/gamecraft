

import { CollisionDetector } from 'gamecraft-collision-detector';
import { Signal } from 'gamecraft-utils';
import { FoodView, FoodViewConfig } from '../../Views/FoodView/FoodView';
import { ViewController, ViewControllerConfig } from 'gamecraft-controllers';
import { BezierEmitter, ExplosionEmitter } from 'gamecraft-particle-system';

export interface FoodViewControllerConfig extends ViewControllerConfig{
    view: FoodView<FoodViewConfig>;
    foodExplosionEmitter: ExplosionEmitter;

    bezierEmitter: BezierEmitter;
}

export class FoodViewController<Tconfig extends FoodViewControllerConfig> extends ViewController<FoodViewControllerConfig>{

    public clickedSignal = new Signal();
    private _foodExplosionEmitter: ExplosionEmitter;

    private _bezierEmitter: BezierEmitter;

    constructor(config: Tconfig){
        super(config);
        this._config.view.clickedSignal.addListener(this.onClicked, this);
        this._foodExplosionEmitter = config.foodExplosionEmitter;
        this._bezierEmitter = config.bezierEmitter;
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
        // this._foodExplosionEmitter.emitParticles(currentX, currentY, 1000);
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
}

