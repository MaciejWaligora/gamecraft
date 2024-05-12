import { Assets, Container, Application, Sprite, Texture } from "pixijs";

export class AssetLoader{
    public static async loadBackground(path: string, renderer: Application){
        const backgroundContainer = new Container();
        backgroundContainer.x = 0;
        backgroundContainer.y = 0; 
        backgroundContainer.width = renderer.screen.width;
        backgroundContainer.height = renderer.screen.height;

        renderer.stage.addChild(backgroundContainer);

        const texture = await Assets.load(path);
        const bg = new Sprite(texture);

        backgroundContainer.addChild(bg);
    }

    public static async getTextures(paths: string[]){
        const textures:Texture[] = [];

        for(let path of paths){
            const texture = await Assets.load(path);
            textures.push(texture);
        }
        
        return textures;
    }

    public static async loadFont(path: string){
        Assets.addBundle('fonts', {src: path });
        const bundle = await Assets.loadBundle('fonts');
        document.fonts.add(bundle.src);
    }
}