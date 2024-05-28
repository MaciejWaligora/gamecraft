import { Particle, ParticleConfig } from "./Particle";

export interface BezierParticleConfig extends ParticleConfig{
    bezierControlPoints: { x: number, y: number }[]
}
export class BezierParticle<Tconfig extends BezierParticleConfig> extends Particle<BezierParticleConfig> {
    bezierControlPoints: { x: number, y: number }[];

    constructor(config: Tconfig) {
        super(config);
        this.bezierControlPoints = config.bezierControlPoints;
    }

    public update(delta: number) {
        this._age += delta;
        const t = this._age / this._life;

        if (this.bezierControlPoints.length > 0) {
            const { x, y } = this.getBezierPoint(t);
            this.position.set(x, y);
        } else {
            super.update(delta);
        }

        this.alpha = 1 - t;
        const size = this._startSize + (this._endSize - this._startSize) * t;
        this.scale.set(size);
    }

    private getBezierPoint(t: number) {
        const [p0, p1, p2] = [{ x: this.x, y: this.y }, ...this.bezierControlPoints];
        const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
        const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
        return { x, y };
    }
}