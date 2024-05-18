import * as PIXI from 'pixijs'
import { GameConfig } from './Config/GameConfig';
import { AssetLoader } from './Lib/AssetLoader';
import { SampleLogoModel } from './Lib/Models/SampleLogoModel';
import { SampleLogoView } from './Lib/Views/SampleLogoView';
import { GameController } from './Lib/Controllers/GameController';
import { AnimationManager } from './AnimationManager';
import { SnakeHeadModel } from './Lib/Models/SnakeHeadModel';
import { SnakeHeadView } from './Lib/Views/SnakeHeadView';
import { InputHandler } from './Handlers/InputHandler';


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
        const snakeHead = await AssetLoader.getTextures([config.assets.snakeHead]);
        const snkeBodyPart = await AssetLoader.getTextures([config.assets.snakeBodyPart]);

        const sampleLogoModel = new SampleLogoModel({});
        const snakeHeadModel = new SnakeHeadModel(config.snakeConfig);
        
        const sampleLogoView =  new SampleLogoView({texture: sampleLogoTexture[0], renderer: renderer, interactive: true});
        const snakeHeadView = new SnakeHeadView({texture: snakeHead[0], renderer: renderer, interactive: false, scale: 0.05});
        const animationManager = new AnimationManager({renderer: renderer});
        InputHandler.addKeyboardInput();
        const gameController = new GameController({
            sampleLogoModel: sampleLogoModel,
            sampleLogoView: sampleLogoView,
            animationManager: animationManager,
            snakeHeadModel: snakeHeadModel,
            snakeHeadView: snakeHeadView,
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