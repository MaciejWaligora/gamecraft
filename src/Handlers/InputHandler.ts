
import * as PIXI from 'pixijs'
import { View, ViewConfig } from '../Lib/Views/View';


export class InputHandler{

    public static attachClickHandler(view: View<ViewConfig>) {
        view.interactive = true;
        view.on('pointerdown', view.click);
    }

    public static removeClickHandler(view: View<ViewConfig>) {
        view.interactive = false;
    }


}