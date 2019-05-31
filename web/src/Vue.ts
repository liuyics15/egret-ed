namespace Vue{
    /**
    *@param total 所有页数数据的数组
    *@param cur 当前页面数据的数组
    */
    export function vueObj(total:Array<object>,cur:Array<object>):object{
        let curPage=cur;
        let totalPage=total;
        let vueObj={
            el: '#app',
            data: function () {
                return {
                    dataList: curPage,//当前页的渲染数组
                    nameSelect: [],//文件名的筛选数组
                    colSelect: [],//列的筛选数组
                    rowSelect: [],//行的筛选数组
                    mistakeSelect: [],//错误类型筛选数组
                    pageLength: 100,//最大页数
                    nameCheck: [],//文件名的checkbox选择数组
                    colCheck: [],//行的checkbox选择数组
                    rowCheck: [],//列的checkbox选择数组
                    misCheck: [],//错误类型的checkbox选择数组
                    topColor: "",//上排序按钮的颜色
                    bottomColor: "",//下排序按钮的颜色
                    sortIndex: 0//排序的类型，默认0升序，1降序
                }
            },
            methods: {
                /* 返回当前行的类名 */
                tableRowClassName({ row, rowIndex }) {
                    return "row";
                },
                /* 返回当前单元个的类名 */
                cellName({ row, column, rowIndex, columnIndex }) {
                    if (columnIndex == 4) {
                        return "light"
                    }
                },
                /* 排序 */
                sort() {
                    if (this.sortIndex == 0) {
                        this.topColor = "lightblue";
                        this.bottomColor = "";
                        this.dataList.sort((a, b) => {
                            return b.col - a.col;
                        });
                        this.sortIndex++;

                    } else if (this.sortIndex == 1) {
                        this.bottomColor = "lightblue";
                        this.topColor = "";
                        this.dataList.sort((a, b) => {
                            return a.col - b.col;
                        });
                        this.sortIndex++;
                    } else {
                        this.sortIndex = 0;
                        this.bottomColor = "";
                        this.topColor = "";
                    }

                },
                /* 文件名筛选 */
                nameFilter(value:Array<string>) {
                    if (value.length == 0) {
                        this.selectReset(1);
                        return;
                    }
                    let filterList = [];
                    for (let i of value) {
                        for (let j of curPage) {
                            if (i == j["fileName"]) {
                                filterList.push(j);
                            }
                        }
                    }
                    this.dataList = filterList;
                },
                /* 列筛选 */
                colFilter(value:Array<string>) {
                    if (value.length == 0) {
                        this.selectReset(2);
                        return;
                    }
                    let filterList = [];
                    for (let i of value) {
                for (let j of curPage) {
                            if (i == j["col"]) {
                                filterList.push(j);
                            }
                        }
                    }
                    this.dataList = filterList;
                },
                /* 行筛选 */
                rowFilter(value:Array<string>) {
                    if (value.length == 0) {
                        this.selectReset(3);
                        return;
                    }
                    let filterList = [];
                    for (let i of value) {
                        for (let j of curPage) {
                            if (i == j["row"]) {
                                filterList.push(j);
                            }
                        }
                    }
                    this.dataList = filterList;
                },
                /* 错误筛选 */
                mistakeFilter(value:Array<string>) {
                    if (value.length == 0) {
                        this.selectReset(4);
                        return;
                    }
                    let filterList = [];
                    for (let i of value) {
                        for (let j of curPage) {
                            if (i == j["mistake"]) {
                                filterList.push(j);
                            }
                        }
                    }
                    this.dataList = filterList;
                },
                /* 换页 */
                handleCurrentChange(val:number) {
                    curPage = [];
                    this.sortIndex=0;
                    this.topColor = "";
                    this.bottomColor = "";
                    for (let i=0; i<totalPage.length;i++) {
                        if (i < 10 * val && i >= 10 * (val - 1)) {
                            curPage.push(totalPage[i]);
                        } else {
                            continue
                        }
                    }
                    this.dataList = curPage;
                    this.nameSelect = [];
                    this.colSelect = [];
                    this.rowSelect = [];
                    this.mistakeSelect = [];
                    let nameList = [];
                    let colList = [];
                    let rowList = [];
                    let misList = [];
                    this.nameCheck=[];
                    this.colCheck=[];
                    this.rowCheck=[];
                    this.misCheck=[];
                    for (let i in curPage) {
                        if (nameList.indexOf(curPage[i]['fileName']) == -1) {
                            nameList.push(curPage[i]['fileName']);
                            this.nameSelect.push(curPage[i]['fileName']);

                        }
                        if (colList.indexOf(curPage[i]['col']) == -1) {
                            colList.push(curPage[i]['col']);
                            this.colSelect.push(curPage[i]['col']);
                        }
                        if (rowList.indexOf(curPage[i]['row']) == -1) {
                            rowList.push(curPage[i]['row']);
                            this.rowSelect.push(curPage[i]['row'])
                        }
                        if (misList.indexOf(curPage[i]['mistake']) == -1) {
                            misList.push(curPage[i]['mistake']);
                            this.mistakeSelect.push(curPage[i]['mistake'])
                        }



                    }
                },
                /* 第一项参数加号点击 */
                handleEdit(index, row) {
                    let id = row.parameter.index;
                    if (row.firstClick) {
                        row.parameter.class = "el-icon-minus";
                        row.parameter.expand = true;
                        row.firstClick = false;
                        row.parameter.autoSize = "auto";

                    } else {
                        row.parameter.class = "el-icon-plus";
                        row.parameter.expand = false;
                        row.firstClick = true;
                        row.parameter.autoSize = "60px";
                    }
                    let timer = setTimeout(() => {
                        row.parameter.autoHeight = window.getComputedStyle(this.$refs[`ID${id}`]).height;
                        clearTimeout(timer)
                    }, 100)

                },
                /* 文件名加号点击 */
                expandFileClick(index, row) {
                    if (row.firstExpand) {
                        row.class = "el-icon-minus";
                        row.firstExpand = false;

                    } else {
                        row.class = "el-icon-plus";
                        row.firstExpand = true;

                    }

                },
                /* 相同文件名下的参数加号点击 */
                expandEdit(index, row) {
                    let id = row.parameter.index;
                    if (row.firstClick) {
                        row.parameter.class = "el-icon-minus";
                        row.parameter.expand = true;
                        row.firstClick = false;
                        row.parameter.autoSize = "auto";

                    } else {
                        row.parameter.class = "el-icon-plus";
                        row.parameter.expand = false;
                        row.firstClick = true;
                        row.parameter.autoSize = "60px";
                    }
                    let timer = setTimeout(() => {
                        row.parameter.autoHeight = window.getComputedStyle(this.$refs[`ID${id}`][0]).height;
                        clearTimeout(timer);
                    }, 100);
                },
                /**
                 *  筛选重置 
                 *  @param index 1表示文件名 2表示列 3表述行 4表示错误类型
                 * */
                selectReset(index:number){
                    this.dataList = curPage;
                    switch (index){
                        case 1:
                        this.nameCheck = []; 
                        break;   
                        case 2:
                        this.colCheck = []; 
                        break; 
                        case 3:
                        this.rowCheck = []; 
                        break; 
                        case 4:
                        this.misCheck = []; 
                        break;
                        default:
                        break; 

                    }
                },
            },
            created() {
                /* 初始化数组，只取前10个显示，同时初始化筛选数组 */
                let nameList:Array<string> = [];
                let colList:Array<string> = [];
                let rowList:Array<string> = [];
                let misList:Array<string> = [];
                this.pageLength = totalPage.length;
                for (let i in curPage) {
                    if (nameList.indexOf(curPage[i]['fileName']) == -1) {
                        nameList.push(curPage[i]['fileName']);
                        this.nameSelect.push(curPage[i]['fileName']);

                    }
                    if (colList.indexOf(curPage[i]['col']) == -1) {
                        colList.push(curPage[i]['col']);
                        this.colSelect.push(curPage[i]['col']);
                    }
                    if (rowList.indexOf(curPage[i]['row']) == -1) {
                        rowList.push(curPage[i]['row']);
                        this.rowSelect.push(curPage[i]['row'])
                    }
                    if (misList.indexOf(curPage[i]['mistake']) == -1) {
                        misList.push(curPage[i]['mistake']);
                        this.mistakeSelect.push(curPage[i]['mistake'])
                    }
                }
            }
        }
        return vueObj;
    }
}