import * as PIXI from 'pixijs'
import { GameConfig } from '../Config/GameConfig';
import { AssetLoader } from "gamecraft-assetloader";
import { SampleLogoModel } from './Models/SampleLogoModel/SampleLogoModel';
import { SampleLogoView, SampleLogoViewConfig } from './Views/SampleLogoView/SampleLogoView';
import { GameController, GameControllerConfig } from './Controllers/GameController';
import { AnimationManager, AnimationManagerConfig } from "gamecraft-animation";
import { SnakeHeadModel, SnakeHeadModelConfig } from './Models/SnakeModel/SnakeHeadModel';
import { SnakeHeadView, SnakeHeadViewConfig } from './Views/SnakeView/SnakeHeadView';
import { InputHandler } from "gamecraft-input";
import { SnakeBodyModel, SnakeBodyModelConfig } from './Models/SnakeModel/SnakeBodyModel';
import { SnakeBodyView, SnakeBodyViewConfig } from './Views/SnakeView/SnakeBodyView';
import { CollisionDetector } from "gamecraft-collision-detector";
import { FoodModel } from './Models/FoodModel/FoodModel';
import { FoodView, FoodViewConfig } from './Views/FoodView/FoodView';
import { SoundManager } from 'gamecraft-sound';


export interface Game{
    renderer: PIXI.Application,
            models: {
                sampleLogoModel: SampleLogoModel,
                snakeHeadModel: SnakeHeadModel<SnakeHeadModelConfig>,
                snakeBodyModel: SnakeBodyModel<SnakeBodyModelConfig>,
                foodModel: FoodModel
            },
            views: {
                sampleLogoView: SampleLogoView<SampleLogoViewConfig>,
                snakeHeadView: SnakeHeadView<SnakeHeadViewConfig>,
                snakeBodyView: SnakeBodyView<SnakeBodyViewConfig>,
                foodView: FoodView<FoodViewConfig>
            },
            controllers: {
                gameController: GameController<GameControllerConfig>
            },
            animationManager: AnimationManager<AnimationManagerConfig>
}

export class GameFactory {

    public static async InitializeGame(config: GameConfig): Promise<Game>{

        const renderer = new PIXI.Application(config.display);
        await AssetLoader.loadBackground(config.assets.background, renderer, config.display.background);
        const sampleLogoTexture = await AssetLoader.getTextures([config.assets.sampleLogo]);
        const snakeHeadTexture = await AssetLoader.getTextures([config.assets.snakeHead]);
        const snakeBodyPartTexture = await AssetLoader.getTextures([config.assets.snakeBodyPart]);
        const foodTexture = await AssetLoader.getTextures([config.assets.food]);

        const sampleLogoModel = new SampleLogoModel({});
        const snakeHeadModel = new SnakeHeadModel(config.snakeConfig);
        const snakeBodyModel = new SnakeBodyModel(config.snakeConfig);
        const foodModel = new FoodModel({});
        
        const sampleLogoView =  new SampleLogoView({texture: sampleLogoTexture[0], renderer: renderer, interactive: true});
        const snakeHeadView = new SnakeHeadView({texture: snakeHeadTexture[0], renderer: renderer, interactive: false, scale: 0.05});
        const snakeBodyView = new SnakeBodyView({texture: snakeBodyPartTexture[0], renderer: renderer, initialLength: config.snakeConfig.initialLength, interactive: false});
        const foodView = new FoodView({texture: foodTexture[0], renderer: renderer, interactive: false, scale: 0.06});
        
        const animationManager = new AnimationManager({renderer: renderer});
        const soundManager = new SoundManager();

        soundManager.loadBackgroundSound(config.audio.background);
        soundManager.loadSfxTracks(config.audio.sfxtracks);

        CollisionDetector.addImpactor(snakeHeadView);
        CollisionDetector.init(renderer);
        
        InputHandler.addKeyboardInput();

        const gameController = new GameController({
            sampleLogoModel: sampleLogoModel,
            sampleLogoView: sampleLogoView,
            animationManager: animationManager,
            snakeHeadModel: snakeHeadModel,
            snakeHeadView: snakeHeadView,
            snakeBodyModel: snakeBodyModel,
            snakeBodyView: snakeBodyView,
            foodModel: foodModel,
            foodView: foodView,
            soundManager: soundManager
        });

        gameController.init();
        
        return {
            renderer: renderer,
            models: {
                sampleLogoModel: sampleLogoModel,
                snakeHeadModel: snakeHeadModel,
                snakeBodyModel: snakeBodyModel,
                foodModel: foodModel
            },
            views: {
                sampleLogoView: sampleLogoView,
                snakeHeadView: snakeHeadView,
                snakeBodyView: snakeBodyView,
                foodView: foodView
            },
            controllers: {
                gameController: gameController
            },
            animationManager: animationManager
        }
    }

}