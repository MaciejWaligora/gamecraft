import { Component, ReactNode, createRef } from "react";
import * as PIXI from "pixijs"


export interface GameCanvasConfig{
    pixiApp: PIXI.Application;
}

export class GameCanvas extends Component <GameCanvasConfig> {

    private _parentRef = createRef<HTMLDivElement>();


    public componentDidMount(): void {
        this._loadView();
    }

    public componentWillUnmount(): void {
        this.props.pixiApp.destroy();
    }

    private _loadView(){
        if (this._parentRef.current) {
            this._parentRef.current.appendChild(this.props.pixiApp.view as HTMLCanvasElement);
        }
    }

    public render(): ReactNode{
        return <div ref={this._parentRef}></div>
    }
}