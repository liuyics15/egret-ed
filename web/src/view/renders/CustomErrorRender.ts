///<reference path="../ErrorRenderBase.ts"/>

class CustomErrorRender extends ErrorRenderBase {
    
    // ~ RESOURCE
    private _label:HTMLLabelElement;
    
    data:server.ICustomError;
    
    constructor() {
        super();
        this._label = document.createElement('label');
    }
    
    dataChanged():void {
        
    }
}