import * as PIXI from 'pixijs';


export interface ParticleConfig{
    texture: PIXI.Texture;
    velocityX: number;
    velocityY: number;
    life: number;
    startSize: number;
    endSize: number;
}
export class Particle<Tconfig extends ParticleConfig> extends PIXI.Sprite{

    protected _velocityX: number;
    protected _velocityY: number;
    protected _life: number;
    protected _age: number = 0;
    protected _startSize: number;
    protected _endSize: number;

    constructor(config: Tconfig){
        super(config.texture);
        this._velocityX = config.velocityX;
        this._velocityY = config.velocityY;
        this._life = config.life;
        this._startSize = config.startSize;
        this._endSize = config.endSize;
        this.scale.set(this._startSize);
    }

    public update(delta: number) {
        this._age += delta;
        const t = this._age / this._life;
        this.position.set(this.x + this._velocityX * delta, this.y + this._velocityY * delta);
        this.alpha = 1 - t;
    }

    public isAlive(): boolean {
        return this._age < this._life;
    }
}