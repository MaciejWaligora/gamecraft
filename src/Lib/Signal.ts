
export class Signal<T>{

    private _listeners: [Object, (data?:T)=>void ][] = []

    public addListener(listener: (data?:T)=>void, context: Object){
        const boundListener = listener.bind(context);
        this._listeners.push([context, boundListener]);
    }

    public removeListener(listener: ()=>void, context: Object){
        const index = this._listeners.findIndex(([ctx, fn]) => ctx === context && fn === listener);
        if (index !== -1) {
            this._listeners.splice(index, 1);
        }
    }

    public emit(data?: T){
        for(const listener of this._listeners){
            listener[1](data);
        }
    }
}