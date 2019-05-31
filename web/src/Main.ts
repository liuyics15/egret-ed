class Main {
    
    static instance:Main;

    logger:HTMLLabelElement;
    head:HTMLLabelElement;
    strList:Array<String>;
      /* 当前页面的数组 */
      curPageList: Array<object>;
      /* 所有页面的数组 */
      totalPageList: Array<object>;
      /* 每个参数的id用来绑定ref */
      index: number = 0;
      /* vue对象 */
      vueObj:object={};
    
    constructor() {
        this.logger = <HTMLLabelElement>document.getElementById('console');
        this.head =<HTMLLabelElement> document.getElementById('head');
        this.strList=[];
        this.curPageList=[];
        this.totalPageList=[];
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
        // const MAX_SHOW_ITEMS = 50;
        // let showErrors = errors.length >= MAX_SHOW_ITEMS ? MAX_SHOW_ITEMS : errors.length;
        let showStr = "";
        for(let i = 0;i < errors.length; i++) {
            showStr += server.getFullErrorString(errors[i])+"-";
        }
        this.strList=showStr.split("-");
        // console.log(this.strList)
        this.init();
        // this.logger.innerText = showStr;
    }
    private init() {
        for (let item of this.strList) {
            /* 数组对象 
            class:文件名加号的类,用来控制加减号 expand:相同文件名的扩展，数组存放对象fileName:
            文件名firstExpand:文件名加号第一次点击 firstClick:参数加号第一次点击mistake:错误类型
            row:行col:列parameter:参数对象
            */
            let obj = {};
            /* 参数对象，包括
            isShow:参数较少的不显示加号key:[id]refFile:文件名lessNum:参数较少时显示的参数(1111)
            totalNum:所有的参数num:参数较多时显示的参数(111,....11+)expand:参数扩展是否打开
            class:控制参数扩展的加减号autoHeight:参数高度改变后将其他表格的高度改变进行对齐
            autoSize:参数高度自动，适应各种数据大小
            */
            obj["parameter"] = {};
            obj["firstClick"] = true;
            obj["class"] = "el-icon-plus";
            let list: Array<string> = item.split(" ");
            if (list.length < 4) continue;
            for (let i = 0; i < list.length; i++) {
                switch (i) {
                    case 0:
                        obj["fileName"] = list[i];
                        break;
                    case 1:
                        obj["col"] = list[i];
                        break;
                    case 2:
                        obj["row"] = list[i];
                        break;
                    case 3:
                        obj["mistake"] = list[i];
                        break;
                    case 4:
                        obj["parameter"]["refFile"] = list[i];
                        break;
                    case 5:
                        obj["parameter"]["key"] = list[i];
                        break;
                    default:
                        let parameterList: Array<string> = list[i].split(",");
                        if (parameterList.length > 10) {
                            obj["parameter"]["num"] = "(" + list[i].split(",")[0] + ",..." + (parameterList.length - 1);
                            obj["parameter"]["totalNum"] = list[i];
                            obj["parameter"]["isShow"] = true;
                            obj["parameter"]["expand"] = false;
                            obj["parameter"]["class"] = "el-icon-plus";
                            obj["parameter"]["index"] = this.index;
                            this.index++;
                            obj["parameter"]["autoSize"] = "60px";
                            obj["parameter"]["autoHeight"] = "60px"
                        } else {
                            obj["parameter"]["lessNum"] = list[i];
                            obj["parameter"]["isShow"] = false;
                        }

                }

            }
            this.totalPageList.push(obj);
        }
        let repeatList: Array<string> = [];//保存不重复的文件名
        let firstFileName: object = {};//每个扩展文件名的第一项
        let deleList: Array<object> = [];//需要删除的重复对象
        for (let item of this.totalPageList) {
            if (repeatList.indexOf(item["fileName"]) == -1) {
                repeatList.push(item["fileName"]);
            }
        }
        for (let i of repeatList) {
            let n = 0;//相同文件名的数量
            for (let j in this.totalPageList) {
                if (i == this.totalPageList[j]["fileName"]) {
                    if (n == 0) {
                        firstFileName = this.totalPageList[j];
                        firstFileName["expand"] = [];
                        firstFileName["firstExpand"] = true;
                    }
                    n++;
                    if (n > 1) {
                        firstFileName["expand"].push({ "fileName": firstFileName["fileName"], "col": this.totalPageList[j]["col"], "row": this.totalPageList[j]["row"], "mistake": this.totalPageList[j]["mistake"], "parameter": this.totalPageList[j]["parameter"], "firstClick": true, })
                        deleList.push(this.totalPageList[j]);
                    }
                } else {
                    continue;
                }
            }
        }
        for (let i of deleList) {
            this.totalPageList.splice(this.totalPageList.indexOf(i), 1);
        }
        console.log(this.totalPageList)

        for (let i=0;i<10;i++) {
                this.curPageList.push(this.totalPageList[i]);
        }

        this.vueObj=Vue.vueObj(this.totalPageList,this.curPageList);

    }
    
}
