import { View, ViewConfig } from "gamecraft-view";


export class InputHandler{

    public static attachClickHandler(view: View<ViewConfig>) {
        if(view.listeners('pointerdown').length === 1){
            view.interactive = true;
        }else{
            view.interactive = true;
            view.on('pointerdown', view.click);
        }       
        
    }

    public static removeClickHandler(view: View<ViewConfig>) {
        view.interactive = false;
    }


}