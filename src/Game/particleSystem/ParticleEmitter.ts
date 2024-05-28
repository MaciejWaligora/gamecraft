import * as PIXI from 'pixijs';
import { Particle, ParticleConfig } from './Particle';

export interface ParticleEmitterConfig{
    texture: PIXI.Texture;
}

export abstract class ParticleEmitter<Tconfig extends ParticleEmitterConfig> extends PIXI.ParticleContainer{
    
    protected _particles: Particle<ParticleConfig>[] = [];
    protected _texture: PIXI.Texture;

    constructor(config: Tconfig) {
        super(1000, { scale: true, position: true, rotation: true, uvs: true, alpha: true });
        this._texture = config.texture;
    }

    abstract emitParticles(x: number, y: number, count: number): void;

    public update(delta: number) {
        this._particles.forEach((particle, index) => {
            particle.update(delta);
            if (!particle.isAlive()) {
                this.removeChild(particle);
                this._particles.splice(index, 1);
            }
        });
    }
}