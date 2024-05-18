

import { Signal } from '../Signal';
import { SnakeBodyView, SnakeBodyViewConfig } from '../Views/SnakeBodyView';
import { ViewController, ViewControllerConfig } from './ViewController';

export interface SnakeBodyViewControllerConfig extends ViewControllerConfig{
    view: SnakeBodyView<SnakeBodyViewConfig>;
}

export class SnakeBodyViewController<Tconfig extends SnakeBodyViewControllerConfig> extends ViewController<SnakeBodyViewControllerConfig>{

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

