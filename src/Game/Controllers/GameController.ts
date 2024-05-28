import { AnimationManager, AnimationManagerConfig } from "gamecraft-animation";
import { InputHandler } from "gamecraft-input";
import { SampleLogoModel} from "../Models/SampleLogoModel/SampleLogoModel";
import { SnakeBodyModel, SnakeBodyModelConfig } from "../Models/SnakeModel/SnakeBodyModel";
import { Direction, SnakeHeadModel, SnakeHeadModelConfig } from "../Models/SnakeModel/SnakeHeadModel";
import { SampleLogoView, SampleLogoViewConfig } from "../Views/SampleLogoView/SampleLogoView";
import { SnakeBodyView, SnakeBodyViewConfig } from "../Views/SnakeView/SnakeBodyView";
import { SnakeHeadView, SnakeHeadViewConfig } from "../Views/SnakeView/SnakeHeadView";
import { SampleLogoModelController, SampleLogoModelControllerConfig } from "./SampleLogoControllers/SampleLogoModellController";
import { SampleLogoViewController, SampleLogoViewControllerConfig } from "./SampleLogoControllers/SampleLogoViewController";
import { SnakeBodyModelController, SnakeBodyModelControllerConfig } from "./SnakeControllers/SnakeBodyModelController";
import { SnakeBodyViewController, SnakeBodyViewControllerConfig } from "./SnakeControllers/SnakeBodyViewController";
import { SnakeHeadModelController, SnakeHeadModelControllerConfig } from "./SnakeControllers/SnakeHeadModelController";
import { SnakeHeadViewController, SnakeHeadViewControllerConfig } from "./SnakeControllers/SnakeHeadViewController";
import { CollisionDetector } from "gamecraft-collision-detector";
import { View, ViewConfig } from "gamecraft-view";
import { SnakeBodyComponentView } from "../Views/SnakeView/SnakeBodyComponentView";
import { FoodModel } from "../Models/FoodModel/FoodModel";
import { FoodView, FoodViewConfig } from "../Views/FoodView/FoodView";
import { FoodModelController, FoodModelControllerConfig } from "./FoodControllers/FoodModelController";
import { FoodViewController, FoodViewControllerConfig } from "./FoodControllers/FoodViewController";
import { SoundManager } from "gamecraft-sound";
import { ExplosionEmitter } from "../particleSystem/ExplosionEmitter";
import { ParticleEmitterConfig } from "../particleSystem/ParticleEmitter";

export interface GameControllerConfig{
    sampleLogoModel : SampleLogoModel;
    sampleLogoView: SampleLogoView<SampleLogoViewConfig>;
    animationManager: AnimationManager<AnimationManagerConfig>;
    soundManager: SoundManager;
    snakeHeadModel: SnakeHeadModel<SnakeHeadModelConfig>;
    snakeHeadView: SnakeHeadView<SnakeHeadViewConfig>;
    snakeBodyModel: SnakeBodyModel<SnakeBodyModelConfig>;
    snakeBodyView: SnakeBodyView<SnakeBodyViewConfig>;
    foodModel: FoodModel;
    foodView: FoodView<FoodViewConfig>;
    foodExplosionEmitter: ExplosionEmitter;
}

export class GameController<Tconfig extends GameControllerConfig>{

    private _sampleLogoModelController: SampleLogoModelController<SampleLogoModelControllerConfig>;
    private _sampleLogoViewController: SampleLogoViewController<SampleLogoViewControllerConfig>;

    private _snakeHeadModelController: SnakeHeadModelController<SnakeHeadModelControllerConfig>;
    private _snakeHeadViewController: SnakeHeadViewController<SnakeHeadViewControllerConfig>;

    private _snakeBodyModelController: SnakeBodyModelController<SnakeBodyModelControllerConfig>;
    private _snakeBodyViewController: SnakeBodyViewController<SnakeBodyViewControllerConfig>;

    private _foodModelController: FoodModelController<FoodModelControllerConfig>;
    private _foodViewController: FoodViewController<FoodViewControllerConfig>;

    private _soundManager: SoundManager;

    constructor(config: Tconfig){
        //create all controllers here
        this._sampleLogoModelController = new SampleLogoModelController({model: config.sampleLogoModel});
        this._sampleLogoViewController = new SampleLogoViewController({view: config.sampleLogoView, animationManager: config.animationManager});
        this._snakeHeadModelController = new SnakeHeadModelController({model: config.snakeHeadModel});
        this._snakeHeadViewController = new SnakeHeadViewController({view: config.snakeHeadView, animationManager: config.animationManager});
        this._snakeBodyModelController = new SnakeBodyModelController({model: config.snakeBodyModel});
        this._snakeBodyViewController = new SnakeBodyViewController({view: config.snakeBodyView, animationManager: config.animationManager});
        this._foodModelController = new FoodModelController({model: config.foodModel});
        this._foodViewController = new FoodViewController({view: config.foodView, animationManager: config.animationManager, foodExplosionEmitter: config.foodExplosionEmitter});

        this._soundManager =  config.soundManager;
        
        //add listeners to controllers
        this._sampleLogoModelController.logoSelectedSignal.addListener(this.onLogoSelected, this);
        this._sampleLogoModelController.logoUnselectedSignal.addListener(this.onLogoUnselected, this);

        this._sampleLogoViewController.clickedSignal.addListener(this._onLogoViewClicked, this);
        this._sampleLogoViewController.removedSignal.addListener(this._onLogoRemoved, this);

        this._snakeHeadModelController.movingStatusChangedSignal.addListener(this._onSnakeMoveStatusChanged, this);
        this._snakeHeadModelController.directionChangedSignal.addListener(this._onSnakeDirectionChanged, this);
        this._snakeHeadModelController.speedChangedSiganl.addListener(this._onSnakeSpeedChanged, this);

        this._snakeBodyModelController.growSignal.addListener(this._onBodyGrow, this);

        this._foodModelController.updateSignal.addListener(this._onFoodUpdate, this);

        this._snakeHeadViewController.movedSignal.addListener(this._onHeadMoved, this);
        this._snakeHeadViewController.addedSignal.addListener(this._onHeadAdded, this);

        InputHandler.buttonClickedSignal.addListener(this._onKeyBoardClicked, this);
        CollisionDetector.collisionDetectedSignal.addListener(this._onCollisionDetected, this);
        
    }

    public init(){
        this._sampleLogoViewController.add();
        this._foodViewController.hide();
        
    }

    private _onHeadMoved(headPos: {x:number, y: number} | undefined){
        if(headPos){
            this._snakeBodyViewController.changePosition(headPos);
        }
    }

    private _onFoodUpdate(){
        this._foodViewController.hide();
        this._foodViewController.setRandomPosition();
        this._foodViewController.show();
    }

    private _onBodyGrow(growFactor: number | undefined){
        if(growFactor !== undefined){
            this._snakeBodyViewController.grow(growFactor);
        }
    }

    private _onHeadAdded(headPos: {x:number, y: number} | undefined){
        if(headPos){
        }
    }

    private onLogoSelected(){
        this._sampleLogoViewController.select();
    }

    private onLogoUnselected(){
        this._sampleLogoViewController.unSelect();
        this._soundManager.playBackGroundSound();
       
    }

    private _onLogoViewClicked(){
        this._sampleLogoModelController.click();
    }

    private _onSnakeMoveStatusChanged(status: boolean | undefined){
        if(status){
            this._snakeHeadViewController.startMoving();
        }
    }

    private _onSnakeDirectionChanged(dir: Direction | undefined){
        if(dir !== undefined){

            this._snakeHeadViewController.setDirection(dir);

        }
    }

    private _onSnakeSpeedChanged(speed: number | undefined){
        if(speed !== undefined){
            this._snakeHeadViewController.setSpeed(speed)
        }
    }

    private _onLogoRemoved(){
        this._snakeHeadViewController.add();
        this._snakeBodyViewController.show();
        this._snakeHeadModelController.changedirection('up');
        this._snakeHeadModelController.changeSpeed(10);
        this._snakeHeadModelController.changeMovingStatus(true);
        this._foodViewController.add();
        this._foodModelController.update(1);
    }

    private _onKeyBoardClicked(key: string | undefined){
        const dir = key?.replace('Arrow', "").toLowerCase();
        function isDirection(direction: string): direction is Direction {
            return direction === 'up' || direction === 'down' || direction === 'right' || direction === 'left';
        }
        if(isDirection(dir!)){
            this._snakeHeadModelController.changedirection(dir);
        }
    }

    private _onCollisionDetected(collisonZone: View<ViewConfig> | undefined){
        if(collisonZone instanceof SnakeBodyComponentView){
            this._snakeHeadViewController.stopMoving();
            CollisionDetector.clear();
            InputHandler.removeKeyboardInput();
            this._soundManager.stopBackgroundSound();
            console.log('Game Over!')
        }else{
            this._soundManager.playsfx('bite');
            this._snakeBodyModelController.grow(1);
            this._foodModelController.update(1);
        }
    }
}