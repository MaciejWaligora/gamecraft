import * as PIXI from 'pixijs'

export class Scaler{
    public static addScaling(referenceWidth: number, referenceHeight: number, renderer: PIXI.Application){
        window.addEventListener('resize', ()=>{
            Scaler.handleResize(renderer, referenceWidth, referenceHeight)
        });

        Scaler.handleResize(renderer, referenceWidth, referenceHeight)
    }

    public static handleResize(renderer: PIXI.Application, referenceWidth: number, referenceHeight: number) {
        let screenWidth;
        let screenHeight;

        if(window.innerWidth >= referenceWidth && window.innerHeight >= referenceHeight){
            screenWidth = window.innerWidth;
            screenHeight = window.innerHeight;
        }else if(window.innerWidth >= referenceWidth && window.innerHeight < referenceHeight){
            screenWidth = referenceWidth * (window.innerHeight / referenceHeight);
            screenHeight = window.innerHeight;
        }else if(window.innerWidth < referenceWidth && window.innerHeight >= referenceHeight){
            screenWidth = window.innerWidth;
            screenHeight = referenceHeight * (window.innerWidth / referenceWidth);
        }else{
            screenWidth = referenceWidth * (window.innerWidth / referenceWidth) 
            screenHeight = referenceHeight * (window.innerHeight / referenceHeight);
        }

        if(screenWidth > screenHeight){
            screenHeight = screenHeight;
            screenWidth = referenceWidth * (window.innerHeight / referenceHeight);
        }

        if(renderer.renderer.view.style){
            renderer.renderer.view.style.width = screenWidth + "px";
            renderer.renderer.view.style.height = screenHeight + "px";
        }
    }

}