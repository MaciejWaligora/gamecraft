
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
    };
    snakeConfig: {
      speed: number;
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
      snakeHead: './graphics/snake_head.png'
    },
    snakeConfig: {
      speed: 10
    }
  };