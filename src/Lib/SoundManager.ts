import {Howler, Howl} from "howler";

export interface Sound{
    isPlaying: boolean;
    sound: Howl;
}

export class SoundManager{

    private static currentBackgroundSound: Sound;
    public static playBackgroundSound(track: string){
        const sound = new Howl({
            src:[track],
            loop: true,
        });

        SoundManager.currentBackgroundSound = {
            isPlaying: true,
            sound: sound
        }

        sound.play();
    }

    public static stopBackgroundSound(){
        SoundManager.currentBackgroundSound.isPlaying = false
        SoundManager.currentBackgroundSound.sound.stop();
    }

}