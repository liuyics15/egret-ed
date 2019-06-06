
class ItemRender<T,S=any> implements IRender<T,S> {
    
    domElement:HTMLElement;
    
    data:T;
    style:S;
    
    setData(data:T):void {
        this.data = data;
        this.dataChanged();
    }
    
    protected dataChanged():void {
        
    }

    styleChanged():void {
        
    }
}