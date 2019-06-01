
class ItemRender<T> implements IDomDelegate {
    
    domElement:HTMLElement;
    
    data:T;
    
    setData(data:T):void {
        this.data = data;
        this.dataChanged();
    }
    
    protected dataChanged():void {
        
    }
}