
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
    };
  }

export const config: GameConfig = {
    display: {
      width: 1080 ,
      height: 1920,
      autoResize: true,
      resolution: window.devicePixelRatio,
      background: 0xffffff

    },
    assets: {
      background: './graphics/background.png',
      sampleLogo: './graphics/logo-template.png'
    }
  };