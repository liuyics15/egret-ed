class Main {
    
    static instance:Main;

    logger:HTMLLabelElement;
    head:HTMLLabelElement;
    strList:Array<String>;
    
    constructor() {
        this.logger = <HTMLLabelElement>document.getElementById('console');
        this.head =<HTMLLabelElement> document.getElementById('head');
        this.strList=[];
        this.test();
        // this.start();
    }
    
    start():void {
        this.head.innerText = "开始执行...";
        let startTime = Date.now();
        reqServer(res => {
            let timeout = (Date.now() - startTime)/1000;
            let data:server.ErrorInfo[] = JSON.parse(res);
            // this.head.innerText = "find "+data.length+" errors in "+timeout.toFixed(1)+"s";
            // this.logger.innerText = res;
        });
    }
    
    private async test() {
        // this.head.innerText = "本地调试";
        let req = await fetch("http://localhost:3000/errors.json");
        let txt = await req.text();
        let errors:server.ErrorInfo[] = JSON.parse(txt);
        const MAX_SHOW_ITEMS = 50;
        let showErrors = errors.length >= MAX_SHOW_ITEMS ? MAX_SHOW_ITEMS : errors.length;
        let showStr = "";
        for(let i = 0;i < showErrors; i++) {
            showStr += server.getFullErrorString(errors[i])+"-";
        }
        this.strList=showStr.split("-");
        // this.logger.innerText = showStr;
    }
    
}
