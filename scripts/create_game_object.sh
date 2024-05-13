#!/bin/bash

# Extract the parameter
PARAMETER=$1

# Create the file path
MODEL_PATH="src\Lib\Models\/${PARAMETER}Model.ts"
VIEW_PATH="src\Lib\Views\/${PARAMETER}View.ts"
MODEL_CONTROLLER_PATH="src\Lib\Controllers\/${PARAMETER}ModelController.ts"
VIEW_CONTROLLER_PATH="src\Lib\Controllers\/${PARAMETER}ViewController.ts"
# Create the file with the class definition
echo "
import { Signal } from '../Signal';
import { Model, ModelConfig } from './Model';
export interface ${PARAMETER}ModelConfig extends ModelConfig{

}
export class ${PARAMETER}Model extends Model<${PARAMETER}ModelConfig>{
    public updateSignal = new Signal();
    update(data: any): void {
        this.updateSignal.emit();
    }
}" > "$MODEL_PATH"

echo "
import { View , ViewConfig} from './View';
import * as PIXI from 'pixijs'

export interface ${PARAMETER}ViewConfig extends ViewConfig{
    texture: PIXI.Texture;
}

export class ${PARAMETER}View<Tconfig extends ${PARAMETER}ViewConfig> extends View<${PARAMETER}ViewConfig>{
    private _${PARAMETER}Sprite: PIXI.Sprite;

    constructor(config: Tconfig){
        super(config);
        this._${PARAMETER}Sprite = new PIXI.Sprite(config.texture);
        this._${PARAMETER}Sprite.anchor.set(0.5, 0.5);
        this.addChild(this._${PARAMETER}Sprite);
        this._center();
    }

    

    public update(): void {
        
    }
}" > "$VIEW_PATH"

echo "
import { ${PARAMETER}Model } from '../Models/${PARAMETER}Model';
import { Signal } from '../Signal';
import { ModelController, ModelControllerConfig } from './ModelController';

export interface ${PARAMETER}ModelControllerConfig extends ModelControllerConfig{
    model: ${PARAMETER}Model;
}

export class ${PARAMETER}ModelController<Tconfig extends ${PARAMETER}ModelControllerConfig> extends ModelController<${PARAMETER}ModelControllerConfig>{
    public updateSignal = new Signal();
    constructor(config: Tconfig){
        super(config);
        this._config.model.updateSignal.addListener(this.onUpdate, this);

    }
    public onUpdate(){
        this.updateSignal.emit();
    }
}
" > "$MODEL_CONTROLLER_PATH"

echo "

import { Signal } from '../Signal';
import { ${PARAMETER}View, ${PARAMETER}ViewConfig } from '../Views/${PARAMETER}View';
import { ViewController, ViewControllerConfig } from './ViewController';

export interface ${PARAMETER}ViewControllerConfig extends ViewControllerConfig{
    view: ${PARAMETER}View<${PARAMETER}ViewConfig>;
}

export class ${PARAMETER}ViewController<Tconfig extends ${PARAMETER}ViewControllerConfig> extends ViewController<${PARAMETER}ViewControllerConfig>{

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
" > "$VIEW_CONTROLLER_PATH"