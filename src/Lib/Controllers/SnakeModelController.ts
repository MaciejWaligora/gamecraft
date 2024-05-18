

import { Signal } from '../Signal';
import { SnakeBodyModelController,SnakeBodyModelControllerConfig } from './SnakeBodyModelController';
import { SnakeHeadModelController, SnakeHeadModelControllerConfig } from './SnakeHeadModelController';

export interface SnakeModelControllerConfig{
    headModelController: SnakeHeadModelController<SnakeHeadModelControllerConfig>;
    bodyModelController: SnakeBodyModelController<SnakeBodyModelControllerConfig>
}

export class SnakeModelController<Tconfig extends SnakeModelControllerConfig>{

    constructor(config: Tconfig){

    }

}

