import { ParticleEmitter, ParticleEmitterConfig } from './ParticleEmitter';
import * as PIXI from 'pixijs';

export interface ParticleSystemConfig{
    renderer: PIXI.Application;
}



export class ParticleSystem<Tconfig extends ParticleSystemConfig> {
    private emitters: ParticleEmitter<ParticleEmitterConfig>[] = [];
    private _renderer: PIXI.Application;

    constructor(config: Tconfig){
        this._renderer = config.renderer;
        this._renderer.ticker.add((delta: number)=>{
            this._update(delta);
        });
    }

    public addEmitter<T extends ParticleEmitter<ParticleEmitterConfig>>(emitter:  T) {
        this._renderer.stage.addChild(emitter);
        this.emitters.push(emitter);
    }


    private _update(delta: number) {
        this.emitters.forEach(emitter => emitter.update(delta));
    }
}