import { ParticleEmitter, ParticleEmitterConfig } from './ParticleEmitter';
import { Particle } from './Particle';

export class ExplosionEmitter extends ParticleEmitter<ParticleEmitterConfig> {

    public emitParticles(x: number, y: number, count: number) {
        for (let i = 0; i < count; i++) {
            const velocityX = (Math.random() - 0.5) * 10;
            const velocityY = (Math.random() - 0.5) * 10;
            const life = Math.random() * 20 + 4;

            const particle = new Particle({
                texture: this._texture,
                velocityX: velocityX,
                velocityY: velocityY,
                life: life,
                startSize: 0.05,
                endSize: 0
            });
            particle.x = x;
            particle.y = y;
            this._particles.push(particle);
            this.addChild(particle);
        }
    }
}