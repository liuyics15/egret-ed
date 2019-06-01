///<reference path="ItemRender.ts"/>

class CustomRender extends ItemRender<server.ErrorInfo>{

    domElement:HTMLLabelElement;
    data:server.ErrorInfo;

    constructor() {
        super();
        this.domElement = document.createElement('label');
    }

    dataChanged():void {
        this.domElement.innerText = server.getFullErrorString(this.data);
    }
}