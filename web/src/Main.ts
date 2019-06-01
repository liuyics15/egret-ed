class Main {
    
    static instance:Main;
    
    constructor() {
        this.test();
    }
    
    start():void {
        let startTime = Date.now();
        reqServer(res => {
            let timeout = (Date.now() - startTime)/1000;
            let data:server.ErrorInfo[] = JSON.parse(res);
            // this.head.innerText = "find "+data.length+" errors in "+timeout.toFixed(1)+"s";
            // this.logger.innerText = res;
        });
    }
    
    private async test() {
        let req = await fetch("errors.json");
        let txt = await req.text();
        let errors:server.ErrorInfo[] = JSON.parse(txt);
        
        //列表控件
        let list = new List();
        //加入dom树
        document.body.appendChild(list.domElement);
        //设置渲染
        list.setRender(data => new CustomRender());
        
        /*
            todo 这里通过data的类型生成该类型的渲染器
                每个类型的渲染器独立成类，但都继承与基类ItemRender
                由List与ItemRender进行排版和控制响应
                由类型的渲染器自定义样式
        */
        
        //设置数据
        list.setData(errors);
    }
}
