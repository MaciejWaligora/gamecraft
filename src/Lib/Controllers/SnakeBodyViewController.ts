

import { Signal } from '../Signal';
import { SnakeBodyView, SnakeBodyViewConfig } from '../Views/SnakeBodyView';
import { ViewController, ViewControllerConfig } from './ViewController';

export interface SnakeBodyViewControllerConfig{
    view: SnakeBodyView<SnakeBodyViewConfig>;
}

export class SnakeBodyViewController<Tconfig extends SnakeBodyViewControllerConfig>{

    private  _config: Tconfig;
    constructor(config: Tconfig){
        this._config = config;
    }

    public add(){
        this._config.view.add();
    }

   public changePosition(pos:{x: number, y: number}){
        this._config.view.changePosition(pos);
   }

    // public placeInit(headPos: {x: number, y: number}){
    //     this._config.view.placeInit(headPos);
    // }

    public remove(){
        this._config.view.remove();
    }

    public show(){
        this._config.view.show();
    }

    public hide(){
        this._config.view.hide();
    }
}

