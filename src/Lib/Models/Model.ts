
/**
 *  Abstract class representing a Model in Game. Model holds state of a GameObject;
 */

export interface ModelConfig{

}

export abstract class Model<Tconfig extends ModelConfig> { 
    protected _config :Tconfig;

    constructor(config: Tconfig){
        this._config = config;
    }

    abstract update(data: any): void;

}