
export interface GameConfig {
    display: {
      width: number;
      height: number;
      autoResize: boolean;
      resolution: number;
      background?: number;
      debug: boolean;
    };
    assets: {
      background: string;
      sampleLogo: string;
      snakeHead: string;
      snakeBodyPart: string;
      food: string[];
    };
    snakeConfig: {
      speed: number;
      initialLength: number
    };
    audio:{
      background:string;
      sfxtracks:{
        bite:string;
      }
    }
  }

export const config: GameConfig = {
    display: {
      width: 1080 ,
      height: 1920,
      autoResize: true,
      resolution: window.devicePixelRatio,
      background: 0x404040,
      debug: false
    },
    assets: {
      background: './graphics/background.png',
      sampleLogo: './graphics/logo-template.png',
      snakeHead: './graphics/snake_head.png',
      snakeBodyPart: './graphics/snakebodypart.png',
      food: [
        './graphics/food.png',
        './graphics/red.png',
        './graphics/yellow.png',
        './graphics/green.png',
        './graphics/pink.png'
      ]
    },
    snakeConfig: {
      speed: 10,
      initialLength: 6
    },
    audio:{
      background: './audio/background.mp3',
      sfxtracks:{
        bite: './audio/bite.mp3'
      }
    }
  };