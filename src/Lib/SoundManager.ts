import {Howler, Howl} from "howler";

export interface Sound{
    isPlaying: boolean;
    sound: Howl;
}

export class SoundManager{

    private static currentBackgroundSound: Sound;

    public static loadBackgroundSound(track: string){
        const sound = new Howl({
            src:[track],
            loop: true,
        });

        SoundManager.currentBackgroundSound = {
            isPlaying: true,
            sound: sound
        }
    }

    public static playBackGroundSound(){
        if(SoundManager.currentBackgroundSound){
            SoundManager.currentBackgroundSound.isPlaying = true;
            SoundManager.currentBackgroundSound.sound.play();
        }else{
            console.log("No track loaded")
        }
    }

    public static stopBackgroundSound(){
        if(SoundManager.currentBackgroundSound){
            SoundManager.currentBackgroundSound.isPlaying = false
            SoundManager.currentBackgroundSound.sound.stop();
        }else{
            console.log("No track loaded")
        }
    }

}