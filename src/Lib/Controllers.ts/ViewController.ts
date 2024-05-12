import { View, ViewConfig } from "../Views/View";

export interface ViewControllerConfig{
    view: View<ViewConfig>
}

export abstract class ViewController<Tconfig extends ViewControllerConfig>{
    protected _config: Tconfig;
    constructor(config: Tconfig){
        this._config = config;
    }


}