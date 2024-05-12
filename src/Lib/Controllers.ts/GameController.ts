import { AnimationManager, AnimationManagerConfig } from "../../AnimationManager";
import { SampleLogoModel, SampleLogoModelConfig } from "../Models/SampleLogoModel";
import { SampleLogoView, SampleLogoViewConfig } from "../Views/SampleLogoView";
import { SampleLogoModelController, SampleLogoModelControllerConfig } from "./SampleLogoModellController";
import { SampleLogoViewController, SampleLogoViewControllerConfig } from "./SampleLogoViewController";

export interface GameControllerConfig{
    sampleLogoModel : SampleLogoModel;
    sampleLogoView: SampleLogoView<SampleLogoViewConfig>;
    animationManager: AnimationManager<AnimationManagerConfig>;
}

export class GameController<Tconfig extends GameControllerConfig>{

    private _sampleLogoModelController: SampleLogoModelController<SampleLogoModelControllerConfig>;
    private _sampleLogoViewController: SampleLogoViewController<SampleLogoViewControllerConfig>;
    private _animationManager: AnimationManager<AnimationManagerConfig>;

    constructor(config: Tconfig){
        //create all controllers here
        this._sampleLogoModelController = new SampleLogoModelController({model: config.sampleLogoModel});
        this._sampleLogoViewController = new SampleLogoViewController({view: config.sampleLogoView, animationManager: config.animationManager});
        this._animationManager = config.animationManager;
        //add listeners to controllers
        this._sampleLogoModelController.logoSelectedSignal.addListener(this.onLogoSelected, this);
        this._sampleLogoModelController.logoUnselectedSignal.addListener(this.onLogoUnselected, this);
        this._sampleLogoViewController.clickedSignal.addListener(this._onLogoViewClicked, this);

        
    }
    public init(){
        this._sampleLogoViewController.add();
    }

    private onLogoSelected(){
    }

    private onLogoUnselected(){
    }

    private _onLogoViewClicked(){
        this._sampleLogoModelController.click();
    }
}