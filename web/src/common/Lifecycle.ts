
export interface IDisposable {
    dispose():void;
}

const disposableDic:{[stack:string]:IDisposable[]} = {};
const TRACK_DISPOSABLE = !!disposableDic;
const __is_disposed__ = '__is_disposed__';
const __call_stack__ = '__call_stack__';

export const NoneDisposable = Object.freeze({
    dispose:()=> {}
});

function trackDisposable<T extends IDisposable>(x:T):T {
    if (!TRACK_DISPOSABLE) {
        return x;
    }
    const stack = new Error().stack.split('\n').slice(1).join('\n');
    let objects = disposableDic[stack];
    if (!objects) {
        objects = disposableDic[stack] = [];
    }
    objects.push(x);
    x[__is_disposed__] = false;
    x[__call_stack__] = stack;
    return x;
}

function markTracked<T extends IDisposable>(x:T) {
    if (!TRACK_DISPOSABLE) {
        return;
    }
    if (x && x !== NoneDisposable) {
        let stack = x[__call_stack__];
        let objects = disposableDic[stack];
        let index = objects.indexOf(x);
        objects.splice(index,1);
        if (!objects.length) {
            delete disposableDic[stack];
        }
        x[__is_disposed__] = true;
    }
}

export function dispose<T extends IDisposable>(disposable: T): T;
export function dispose<T extends IDisposable>(disposable: T | undefined): T | undefined;
export function dispose<T extends IDisposable>(disposables: Array<T>): Array<T>;
export function dispose<T extends IDisposable>(disposables: ReadonlyArray<T>): ReadonlyArray<T>;
export function dispose<T extends IDisposable>(disposables: T | T[] | undefined): T | T[] | undefined {
    if (Array.isArray(disposables)) {
        disposables.forEach(d => {
            if (d) {
                markTracked(d);
                d.dispose();
            }
        });
        return [];
    } else if (disposables) {
        markTracked(disposables);
        disposables.dispose();
        return disposables;
    } else {
        return undefined;
    }
}

export function toDisposable(fn:()=>void):IDisposable {
    const self = trackDisposable({
        dispose:()=> {
            markTracked(self);
            fn();
        }
    });
    return self;
}

export function combinedDisposable(...disposables: IDisposable[]): IDisposable {
    disposables.forEach(markTracked);
    return toDisposable(()=> dispose(disposables));
}

export class DisposableStore implements IDisposable {
    
    private _toDispose = new Set<IDisposable>();
    private _isDisposed = false;
    
    add<T extends IDisposable>(t:T):T {
        if (!t) {
            return t;
        }
        if (<any>t === this) {
            throw new Error();
        }
        if (this._isDisposed) {
            throw new Error();
        }
        markTracked(t);
        this._toDispose.add(t);
    }
    
    dispose():void {
        if (this._isDisposed) {
            return;
        }
        
        markTracked(this);
        this._isDisposed = true;
        this.clear();
    }
    
    private clear():void {
        this._toDispose.forEach(item => item.dispose());
        this._toDispose.clear();
    }
}

export abstract class Disposable implements IDisposable {
    
    private _store = new DisposableStore();
    
    constructor() {
        trackDisposable(this);
    }
    
    dispose():void {
        markTracked(this);
        
        this._store.dispose();
        this._store = null;
    }
    
    protected willDispose<T extends IDisposable>(t: T): T {
        if (<any>t === this) {
            throw new Error();
        }
        return this._store.add(t);
    }
}

export class MutableDisposable<T extends IDisposable> implements IDisposable {
    
    private _value:T;
    private _isDisposed = false;
    
    constructor(value?:T) {
        trackDisposable(this);
        this.value = value;
    }
    
    get value():T | undefined {
        return this._value;
    }
    
    set value(value:T|undefined) {
        if (this._isDisposed || value === this._value) {
            return;
        }
        
        if (this._value) {
            this._value.dispose();
        }
        if (value) {
            markTracked(value);
        }
        this._value = value;
    }
    
    dispose():void {
        this._isDisposed = true;
        markTracked(this);
        if (this._value) {
            this._value.dispose();
        }
        this._value = undefined;
    }
}

export interface IReference<T> extends IDisposable {
    readonly object:T;
}

export abstract class ReferenceCollection<T> {
    
    private readonly references:Map<string,{readonly object:T;count:number}>;
    
    acquire(key:string):IReference<T> {
        let ref = this.references.get(key);
        
        if (!ref) {
            ref = {object:this.createReferencedObject(key),count:0};
            this.references.set(key,ref);
        }
        
        const {object} = ref;
        const dispose = ()=> {
            if (--ref!.count === 0) {
                this.destroyReferencedObject(key,ref!.object);
                this.references.delete(key);
            }
        };
        
        ++ ref.count;
        return {object,dispose};
    }

    protected abstract createReferencedObject(key: string): T;
    protected abstract destroyReferencedObject(key: string, object: T): void;
}

export class ImmortalReference<T> implements IReference<T> {
    constructor(public object:T) {};
    dispose():void {};
}