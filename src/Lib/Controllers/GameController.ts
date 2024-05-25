import { AnimationManager, AnimationManagerConfig } from "gamecraft-animation";
import { InputHandler } from "gamecraft-input";
import { SampleLogoModel} from "../Models/SampleLogoModel";
import { SnakeBodyModel, SnakeBodyModelConfig } from "../Models/SnakeBodyModel";
import { Direction, SnakeHeadModel, SnakeHeadModelConfig } from "../Models/SnakeHeadModel";
import { SampleLogoView, SampleLogoViewConfig } from "../Views/SampleLogoView";
import { SnakeBodyView, SnakeBodyViewConfig } from "../Views/SnakeBodyView";
import { SnakeHeadView, SnakeHeadViewConfig } from "../Views/SnakeHeadView";
import { SampleLogoModelController, SampleLogoModelControllerConfig } from "./SampleLogoModellController";
import { SampleLogoViewController, SampleLogoViewControllerConfig } from "./SampleLogoViewController";
import { SnakeBodyModelController, SnakeBodyModelControllerConfig } from "./SnakeBodyModelController";
import { SnakeBodyViewController, SnakeBodyViewControllerConfig } from "./SnakeBodyViewController";
import { SnakeHeadModelController, SnakeHeadModelControllerConfig } from "./SnakeHeadModelController";
import { SnakeHeadViewController, SnakeHeadViewControllerConfig } from "./SnakeHeadViewController";
import { CollisionDetector } from "gamecraft-collision-detector";
import { View, ViewConfig } from "gamecraft-view";
import { SnakeBodyComponentView } from "../Views/SnakeBodyComponentView";
import { FoodModel } from "../Models/FoodModel";
import { FoodView, FoodViewConfig } from "../Views/FoodView";
import { FoodModelController, FoodModelControllerConfig } from "./FoodModelController";
import { FoodViewController, FoodViewControllerConfig } from "./FoodViewController";

export interface GameControllerConfig{
    sampleLogoModel : SampleLogoModel;
    sampleLogoView: SampleLogoView<SampleLogoViewConfig>;
    animationManager: AnimationManager<AnimationManagerConfig>;
    snakeHeadModel: SnakeHeadModel<SnakeHeadModelConfig>;
    snakeHeadView: SnakeHeadView<SnakeHeadViewConfig>;
    snakeBodyModel: SnakeBodyModel<SnakeBodyModelConfig>;
    snakeBodyView: SnakeBodyView<SnakeBodyViewConfig>;
    foodModel: FoodModel;
    foodView: FoodView<FoodViewConfig>;
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

    constructor(config: Tconfig){
        //create all controllers here
        this._sampleLogoModelController = new SampleLogoModelController({model: config.sampleLogoModel});
        this._sampleLogoViewController = new SampleLogoViewController({view: config.sampleLogoView, animationManager: config.animationManager});
        this._snakeHeadModelController = new SnakeHeadModelController({model: config.snakeHeadModel});
        this._snakeHeadViewController = new SnakeHeadViewController({view: config.snakeHeadView, animationManager: config.animationManager});
        this._snakeBodyModelController = new SnakeBodyModelController({model: config.snakeBodyModel});
        this._snakeBodyViewController = new SnakeBodyViewController({view: config.snakeBodyView, animationManager: config.animationManager});
        this._foodModelController = new FoodModelController({model: config.foodModel});
        this._foodViewController = new FoodViewController({view: config.foodView, animationManager: config.animationManager});
        
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
            console.log('Game Over!')
        }else{
            this._snakeBodyModelController.grow(1);
            this._foodModelController.update(1);
        }
    }
}