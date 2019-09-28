import {IDisposable} from "./Lifecycle";

export interface IReference<T> extends IDisposable {
    data:T;
    link(keeper:IReferKeeper<T>):void;
    unlink(keeper:IReferKeeper<T>):void;
}

export interface IReferKeeper<T> {
    readonly stack:string;
    data:T|undefined;
    setRefer(refer:IReference<T>|undefined):void;
}

const allReference:IReference<unknown>[] = [];

export function referKeep<T>():IReferKeeper<T> {
    return new ReferKeeper();
}

export function reference<T>(data?:T):IReference<T> {
    return new Reference(data);
}

class Reference<T> implements IReference<T> {
    
    private _keepers:{[stack:string]:IReferKeeper<T>[]} = {};

    data:T;
    
    constructor(data?:T) {
        this.data = data;
        allReference.push(this);
    }
    
    link(keeper:IReferKeeper<T>):void {
        let list = this._keepers[keeper.stack];
        if (!list) {
            list = this._keepers[keeper.stack] = [];
        }
        if (list.indexOf(keeper) != -1) {
            console.error("try to keep the same link twice",keeper);
        }
        else {
            list.push(keeper);
        }
    }
    
    unlink(keeper:IReferKeeper<T>):void {
        let list = this._keepers[keeper.stack];
        if (list) {
            let index = list.indexOf(keeper);
            if (index != -1) {
                list.splice(index,1);
                if (!list.length) {
                    delete this._keepers[keeper.stack];
                }
            }
        }
    }
    
    dispose():void {
        this._keepers = null;
        this.data = null;
        let index = allReference.indexOf(this);
        allReference.splice(index);
    }
}

class ReferKeeper<T> implements IReferKeeper<T> {
    
    readonly stack:string;
    
    private refer:IReference<T>|undefined;
    
    constructor() {
        this.stack = new Error().stack.split('\n').slice(2).join('\n');
    }
    
    setRefer(refer:IReference<T>|undefined):void {
        if (this.refer != refer) {
            if (this.refer) {
                this.refer.unlink(this);
            }
            this.refer = refer;
            if (refer) {
                refer.link(this);
            }
        }
    }
    
    get data():T|undefined {
        return this.refer ? this.refer.data : undefined;
    }
}
