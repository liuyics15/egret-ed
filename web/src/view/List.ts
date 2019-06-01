
interface IDomDelegate {
    domElement:HTMLElement;
}

class List<T> {
    
    domElement:HTMLDivElement;
    
    private _render:(data:T)=>IRender<T>;
    private _items:IRender<T>[] = [];
    private _data:T[];

    constructor() {
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
    
    private renderItems():void {
        this._items.forEach(item => {
            this.domElement.removeChild(item.domElement);
        });
        this._items.length = 0;
        this._data.forEach(data => {
            let item = this._render(data);
            this.domElement.appendChild(item.domElement);
            this._items.push(item);
            item.setData(data);
        });
    }
}

interface IRender<T> extends IDomDelegate {
    data:T;
    setData(data:T):void;
}