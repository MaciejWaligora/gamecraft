import { Signal } from "./Signal";
import { View, ViewConfig } from "./Views/View"

import * as PIXI from 'pixijs'


export class CollisionDetector{
    public static impactors: View<ViewConfig>[] = [];
    public static collisionZones: View<ViewConfig>[] = [];
    public static collisionDetectedSignal = new Signal<View<ViewConfig>>();
    public static addImpactor(view: View<ViewConfig>){
        CollisionDetector.impactors.push(view);
    }

    public static removeImpactor(view: View<ViewConfig>){
        CollisionDetector.impactors = CollisionDetector.impactors.filter(el => el !== view );
    }

    public static addCollisionZone(view: View<ViewConfig>){
        CollisionDetector.collisionZones.push(view);
    }

    public static removeCollisionZone(view: View<ViewConfig>){
        CollisionDetector.collisionZones = CollisionDetector.collisionZones.filter(el => el !== view );
    }

    public static checkForCollisions(){
        for (const impactor of CollisionDetector.impactors) {
            for (const zone of CollisionDetector.collisionZones) {
                if (CollisionDetector.isColliding(impactor, zone) && impactor !== zone) {
                    CollisionDetector.collisionDetectedSignal.emit(zone);              
                }
            }
        }
    }

    private static isColliding(impactor: View<ViewConfig>, zone: View<ViewConfig>): boolean {
        return (
            impactor.x < zone.x + zone.width &&
            impactor.x + impactor.width > zone.x &&
            impactor.y < zone.y + zone.height &&
            impactor.y + impactor.height > zone.y
        );
    }

    private static clear(){
        
    }

    public static init(renderer: PIXI.Application){
        renderer.ticker.add(()=>{
            CollisionDetector.checkForCollisions();
        });
    }
}