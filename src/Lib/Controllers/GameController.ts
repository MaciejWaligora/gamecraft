import { AnimationManager, AnimationManagerConfig } from "../../AnimationManager";
import { InputHandler } from "../../Handlers/InputHandler";
import { SampleLogoModel, SampleLogoModelConfig } from "../Models/SampleLogoModel";
import { Direction, SnakeHeadModel, SnakeHeadModelConfig } from "../Models/SnakeHeadModel";
import { SampleLogoView, SampleLogoViewConfig } from "../Views/SampleLogoView";
import { SnakeHeadView, SnakeHeadViewConfig } from "../Views/SnakeHeadView";
import { SampleLogoModelController, SampleLogoModelControllerConfig } from "./SampleLogoModellController";
import { SampleLogoViewController, SampleLogoViewControllerConfig } from "./SampleLogoViewController";
import { SnakeHeadModelController, SnakeHeadModelControllerConfig } from "./SnakeHeadModelController";
import { SnakeHeadViewController, SnakeHeadViewControllerConfig } from "./SnakeHeadViewController";

export interface GameControllerConfig{
    sampleLogoModel : SampleLogoModel;
    sampleLogoView: SampleLogoView<SampleLogoViewConfig>;
    animationManager: AnimationManager<AnimationManagerConfig>;
    snakeHeadModel: SnakeHeadModel<SnakeHeadModelConfig>;
    snakeHeadView: SnakeHeadView<SnakeHeadViewConfig>;
}

export class GameController<Tconfig extends GameControllerConfig>{

    private _sampleLogoModelController: SampleLogoModelController<SampleLogoModelControllerConfig>;
    private _sampleLogoViewController: SampleLogoViewController<SampleLogoViewControllerConfig>;
    private _snakeHeadModelController: SnakeHeadModelController<SnakeHeadModelControllerConfig>;
    private _snakeHeadViewController: SnakeHeadViewController<SnakeHeadViewControllerConfig>

    constructor(config: Tconfig){
        //create all controllers here
        this._sampleLogoModelController = new SampleLogoModelController({model: config.sampleLogoModel});
        this._sampleLogoViewController = new SampleLogoViewController({view: config.sampleLogoView, animationManager: config.animationManager});
        this._snakeHeadModelController = new SnakeHeadModelController({model: config.snakeHeadModel});
        this._snakeHeadViewController = new SnakeHeadViewController({view: config.snakeHeadView, animationManager: config.animationManager});
        //add listeners to controllers
        this._sampleLogoModelController.logoSelectedSignal.addListener(this.onLogoSelected, this);
        this._sampleLogoModelController.logoUnselectedSignal.addListener(this.onLogoUnselected, this);
        this._sampleLogoViewController.clickedSignal.addListener(this._onLogoViewClicked, this);
        this._sampleLogoViewController.removedSignal.addListener(this._onLogoRemoved, this);

        this._snakeHeadModelController.movingStatusChangedSignal.addListener(this._onSnakeMoveStatusChanged, this);
        this._snakeHeadModelController.directionChangedSignal.addListener(this._onSnakeDirectionChanged, this);
        this._snakeHeadModelController.speedChangedSiganl.addListener(this._onSnakeSpeedChanged, this);

        InputHandler.buttonClickedSignal.addListener(this._onKeyBoardClicked, this);

        
    }
    public init(){
        this._sampleLogoViewController.add();
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
        if(dir != undefined){

            this._snakeHeadViewController.setDirection(dir);

        }
    }

    private _onSnakeSpeedChanged(speed: number | undefined){
        if(speed != undefined){
            this._snakeHeadViewController.setSpeed(speed)
        }
    }

    private _onLogoRemoved(){
        this._snakeHeadViewController.add();
        this._snakeHeadModelController.changedirection('up');
        this._snakeHeadModelController.changeSpeed(10);
        this._snakeHeadModelController.changeMovingStatus(true);
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
}