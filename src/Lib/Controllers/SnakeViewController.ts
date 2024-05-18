

import { Signal } from '../Signal';
import { SnakeBodyViewController, SnakeBodyViewControllerConfig } from './SnakeBodyViewController';
import { SnakeHeadViewController, SnakeHeadViewControllerConfig } from './SnakeHeadViewController';


export interface SnakeViewControllerConfig{
    snakeHeadViewController: SnakeHeadViewController<SnakeHeadViewControllerConfig>;
    snakeBodyViewController: SnakeBodyViewController<SnakeBodyViewControllerConfig>;
}

export class SnakeViewController<Tconfig extends SnakeViewControllerConfig>{

    public clickedSignal = new Signal();
    private _config: Tconfig;
    private _snakeHead: SnakeHeadViewController<SnakeHeadViewControllerConfig>;
    private _snakeBody: SnakeBodyViewController<SnakeBodyViewControllerConfig>;

    constructor(config: Tconfig){
        this._config = config;
        this._snakeHead = config.snakeHeadViewController;
        this._snakeBody = config.snakeBodyViewController;

        this._snakeHead.movedSignal.addListener(this._onMoved, this);
    }

    public add(){
        this._snakeHead.add();
        this._snakeBody.add();
    }

    public remove(){

    }

    private _onMoved(dir: {x: number,  y: number} | undefined){
        if(dir){

        }
    }

    public show(){

    }

    public hide(){

    }

    private onClicked(){

    }
}

