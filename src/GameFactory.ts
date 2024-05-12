import * as PIXI from 'pixijs'
import { GameConfig } from './Config/GameConfig';
import { AssetLoader } from './Lib/AssetLoader';
import { SampleLogoModel } from './Lib/Models/SampleLogoModel';
import { SampleLogoView } from './Lib/Views/SampleLogoView';
import { GameController } from './Lib/Controllers.ts/GameController';
import { AnimationManager } from './AnimationManager';


export interface Game{
    renderer: PIXI.Application,
    models:{
    },
    views:{
    },
    controllers:{
    }
}

export class GameFactory {

    public static async InitializeGame(config: GameConfig): Promise<Game>{

        const renderer = new PIXI.Application(config.display);
        await AssetLoader.loadBackground(config.assets.background, renderer, config.display.background);
        const sampleLogoTexture = await AssetLoader.getTextures([config.assets.sampleLogo]);
        const sampleLogoModel = new SampleLogoModel({});
        const sampleLogoView =  new SampleLogoView({texture: sampleLogoTexture[0], renderer: renderer, interactive: true});
        const animationManager = new AnimationManager({renderer: renderer});

        const gameController = new GameController({
            sampleLogoModel: sampleLogoModel,
            sampleLogoView: sampleLogoView,
            animationManager: animationManager
        });

        gameController.init();
        return {
            renderer: renderer,
            models: {
            },
            views: {
            },
            controllers: {
            }
        }
    }

}