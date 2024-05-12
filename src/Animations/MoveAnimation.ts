import * as PIXI from 'pixijs'
import { Animation, AnimationConfig } from './Animation';

export interface MoveAnimationConfig extends AnimationConfig{
    endPosition: {x:number, y: number}; //x,y
}

export class MoveAnimation<Tconfig extends MoveAnimationConfig> extends Animation<MoveAnimationConfig> {
    protected startPosition: PIXI.Point;
    protected endPosition: PIXI.Point;
    protected speed: number;

    constructor(config:Tconfig){
        super(config);
        
        this.startPosition = new PIXI.Point(config.target.x, config.target.y);
        this.endPosition =  new PIXI.Point(config.endPosition.x, config.endPosition.y);

        const currentX = this.startPosition.x;
        const currentY = this.startPosition.y;

        const dx = this.endPosition.x - currentX;
        const dy = this.endPosition.y - currentY;

        this.speed = Math.sqrt((dx*dx)+(dy*dy)) / this._duration;
    }

    protected _callback(delta: number): void {

        const currentX = this.startPosition.x;
        const currentY = this.startPosition.y;

        // Calculate the distance to move on each axis
        const dx = this.endPosition.x - currentX;
        const dy = this.endPosition.y - currentY;

        const angle = Math.atan2(dy, dx);

        const vx = Math.cos(angle) * this.speed;
        const vy = Math.sin(angle) * this.speed;

        const newX = this.startPosition.x + (this.endPosition.x - this.startPosition.x) * delta;
        const newY = this.startPosition.y + (this.endPosition.y - this.startPosition.y) * delta;
        this._target.position.set(newX, newY);
    }
}