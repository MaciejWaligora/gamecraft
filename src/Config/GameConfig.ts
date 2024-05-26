
export interface GameConfig {
    display: {
      width: number;
      height: number;
      autoResize: boolean;
      resolution: number;
      background?: number
    };
    assets: Assets;
    audio: AudioTracks;
  }

  export interface Assets {
    background: string;
    sampleLogo: string;
  }

  export interface AudioTracks{
    background: string;
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
      sampleLogo: './graphics/logo-template.png'
    },
    audio:{
      background: './audio/background.mp3'
    }
  };