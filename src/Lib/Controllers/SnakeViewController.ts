

import { Signal } from '../Signal';
import { SnakeView, SnakeViewConfig } from '../Views/SnakeView';
import { ViewController, ViewControllerConfig } from './ViewController';

export interface SnakeViewControllerConfig extends ViewControllerConfig{
    view: SnakeView<SnakeViewConfig>;
}

export class SnakeViewController<Tconfig extends SnakeViewControllerConfig> extends ViewController<SnakeViewControllerConfig>{

    public clickedSignal = new Signal();

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

    private onClicked(){
       this.clickedSignal.emit();
    }
}

