import { Model, ModelConfig } from "gamecraft-model";

export interface ModelControllerConfig{
    model: Model<ModelConfig>;
}

export abstract class ModelController<Tconfig extends ModelControllerConfig> {
    protected _config: Tconfig;

    constructor(config: Tconfig){
        this._config = config;
    }
}