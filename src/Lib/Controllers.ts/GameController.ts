import { SampleLogoModel, SampleLogoModelConfig } from "../Models/SampleLogoModel";
import { SampleLogoView, SampleLogoViewConfig } from "../Views/SampleLogoView";
import { SampleLogoModelController, SampleLogoModelControllerConfig } from "./SampleLogoModellController";
import { SampleLogoViewController, SampleLogoViewControllerConfig } from "./SampleLogoViewController";

export interface GameControllerConfig{
    sampleLogoModel : SampleLogoModel;
    sampleLogoView: SampleLogoView<SampleLogoViewConfig>;
}

export class GameController<Tconfig extends GameControllerConfig>{

    private _sampleLogoModelController: SampleLogoModelController<SampleLogoModelControllerConfig>;
    private _sampleLogoViewController: SampleLogoViewController<SampleLogoViewControllerConfig>;

    constructor(config: Tconfig){
        //create all controllers here
        this._sampleLogoModelController = new SampleLogoModelController({model: config.sampleLogoModel});
        this._sampleLogoViewController = new SampleLogoViewController({view: config.sampleLogoView});
        //add listeners to controllers
        this._sampleLogoModelController.logoSelectedSignal.addListener(this.onLogoSelected, this);
        this._sampleLogoModelController.logoUnselectedSignal.addListener(this.onLogoUnselected, this);
        this._sampleLogoViewController.clickedSignal.addListener(this._onLogoViewClicked, this);

        
    }
    public init(){
        this._sampleLogoViewController.show();
    }

    private onLogoSelected(){
        this._sampleLogoViewController.hide();
    }

    private onLogoUnselected(){
        this._sampleLogoViewController.show();
    }

    private _onLogoViewClicked(){
        this._sampleLogoModelController.click();
    }
}