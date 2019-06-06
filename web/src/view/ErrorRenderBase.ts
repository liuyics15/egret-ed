
class ErrorRenderBase extends ItemRender<server.ErrorInfo> {
    
    domElement:HTMLDivElement;
    style:IListStyle;
    
    constructor() {
        super();
        this.domElement = document.createElement('div');
        this.domElement.style.backgroundImage = "./res/bg0.png";
        this.domElement.style.backgroundRepeat = ''
    }
    
    dataChanged():void {
        
    }
    
    styleChanged():void {
        this.domElement.style.width = this.style.width+"px";
        this.domElement.style.height = this.style.height+"px";
    }
}