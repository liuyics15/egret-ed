
interface IDomDelegate {
    domElement:HTMLElement;
}

class List<T,S=any> {
    
    domElement:HTMLDivElement;
    readonly style:S;
    
    private _render:(data:T)=>IRender<T>;
    private _items:IRender<T>[] = [];
    private _data:T[];
    
    constructor(style?:S) {
        this.style = style || <any>{};
        this.domElement = document.createElement('div');
    }
    
    setData(data:T[]):void {
        this._data = data;
        if (this._render) {
            this.renderItems();
        }
    }
    
    getItemAt(index:number):IRender<T> {
        return this._items[index];
    }
    
    setRender(render:(data:T)=>IRender<T>):void {
        this._render = render;
        if (this._data) {
            this.renderItems();
        }
    }
    
    styleChanged():void {
        this._items.forEach(item => {
            item.styleChanged();
        });
    }
    
    private renderItems():void {
        this._items.forEach(item => {
            this.domElement.removeChild(item.domElement);
        });
        this._items.length = 0;
        this._data.forEach(data => {
            let item = this._render(data);
            this.domElement.appendChild(item.domElement);
            this._items.push(item);
            item.style = this.style;
            item.styleChanged();
            item.setData(data);
        });
    }
}

interface IRender<T,S=any> extends IDomDelegate {
    data:T;
    style:S;
    setData(data:T):void;
    styleChanged():void;
}