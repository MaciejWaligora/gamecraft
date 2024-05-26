
export interface GameConfig {
    display: {
      width: number;
      height: number;
      autoResize: boolean;
      resolution: number;
      background?: number
    };
    assets: {
      background: string;
      sampleLogo: string;
      snakeHead: string;
      snakeBodyPart: string;
      food: string;
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
      background: 0xffff5f

    },
    assets: {
      background: './graphics/background.png',
      sampleLogo: './graphics/logo-template.png',
      snakeHead: './graphics/snake_head.png',
      snakeBodyPart: './graphics/snakebodypart.png',
      food: './graphics/food.png'
    },
    snakeConfig: {
      speed: 10,
      initialLength: 6
    },
    audio:{
      background: '',
      sfxtracks:{
        bite: './audio/bite.mp3'
      }
    }
  };