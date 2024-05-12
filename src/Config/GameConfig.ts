
export interface GameConfig {
    display: {
      width: number;
      height: number;
      autoResize: boolean;
      resolution: number;
    };
    assets: {
      background: string;
      sampleLogo: string;
    };
  }

export const config: GameConfig = {
    display: {
      width: 1920,
      height: 1080,
      autoResize: true,
      resolution: window.devicePixelRatio
    },
    assets: {
      background: './graphics/background.png',
      sampleLogo: './graphics/logo-template.png'
    }
  };