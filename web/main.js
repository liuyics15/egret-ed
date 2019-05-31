var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = /** @class */ (function () {
    function Main() {
        /* 每个参数的id用来绑定ref */
        this.index = 0;
        /* vue对象 */
        this.vueObj = {};
        this.logger = document.getElementById('console');
        this.head = document.getElementById('head');
        this.strList = [];
        this.curPageList = [];
        this.totalPageList = [];
        this.test();
        // this.start();
    }
    Main.prototype.start = function () {
        this.head.innerText = "开始执行...";
        var startTime = Date.now();
        reqServer(function (res) {
            var timeout = (Date.now() - startTime) / 1000;
            var data = JSON.parse(res);
            // this.head.innerText = "find "+data.length+" errors in "+timeout.toFixed(1)+"s";
            // this.logger.innerText = res;
        });
    };
    Main.prototype.test = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req, txt, errors, showStr, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://localhost:3000/errors.json")];
                    case 1:
                        req = _a.sent();
                        return [4 /*yield*/, req.text()];
                    case 2:
                        txt = _a.sent();
                        errors = JSON.parse(txt);
                        showStr = "";
                        for (i = 0; i < errors.length; i++) {
                            showStr += server.getFullErrorString(errors[i]) + "-";
                        }
                        this.strList = showStr.split("-");
                        // console.log(this.strList)
                        this.init();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.init = function () {
        for (var _i = 0, _a = this.strList; _i < _a.length; _i++) {
            var item = _a[_i];
            /* 数组对象
            class:文件名加号的类,用来控制加减号 expand:相同文件名的扩展，数组存放对象fileName:
            文件名firstExpand:文件名加号第一次点击 firstClick:参数加号第一次点击mistake:错误类型
            row:行col:列parameter:参数对象
            */
            var obj = {};
            /* 参数对象，包括
            isShow:参数较少的不显示加号key:[id]refFile:文件名lessNum:参数较少时显示的参数(1111)
            totalNum:所有的参数num:参数较多时显示的参数(111,....11+)expand:参数扩展是否打开
            class:控制参数扩展的加减号autoHeight:参数高度改变后将其他表格的高度改变进行对齐
            autoSize:参数高度自动，适应各种数据大小
            */
            obj["parameter"] = {};
            obj["firstClick"] = true;
            obj["class"] = "el-icon-plus";
            var list = item.split(" ");
            if (list.length < 4)
                continue;
            for (var i = 0; i < list.length; i++) {
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
                        var parameterList = list[i].split(",");
                        if (parameterList.length > 10) {
                            obj["parameter"]["num"] = "(" + list[i].split(",")[0] + ",..." + (parameterList.length - 1);
                            obj["parameter"]["totalNum"] = list[i];
                            obj["parameter"]["isShow"] = true;
                            obj["parameter"]["expand"] = false;
                            obj["parameter"]["class"] = "el-icon-plus";
                            obj["parameter"]["index"] = this.index;
                            this.index++;
                            obj["parameter"]["autoSize"] = "60px";
                            obj["parameter"]["autoHeight"] = "60px";
                        }
                        else {
                            obj["parameter"]["lessNum"] = list[i];
                            obj["parameter"]["isShow"] = false;
                        }
                }
            }
            this.totalPageList.push(obj);
        }
        var repeatList = []; //保存不重复的文件名
        var firstFileName = {}; //每个扩展文件名的第一项
        var deleList = []; //需要删除的重复对象
        for (var _b = 0, _c = this.totalPageList; _b < _c.length; _b++) {
            var item = _c[_b];
            if (repeatList.indexOf(item["fileName"]) == -1) {
                repeatList.push(item["fileName"]);
            }
        }
        for (var _d = 0, repeatList_1 = repeatList; _d < repeatList_1.length; _d++) {
            var i = repeatList_1[_d];
            var n = 0; //相同文件名的数量
            for (var j in this.totalPageList) {
                if (i == this.totalPageList[j]["fileName"]) {
                    if (n == 0) {
                        firstFileName = this.totalPageList[j];
                        firstFileName["expand"] = [];
                        firstFileName["firstExpand"] = true;
                    }
                    n++;
                    if (n > 1) {
                        firstFileName["expand"].push({ "fileName": firstFileName["fileName"], "col": this.totalPageList[j]["col"], "row": this.totalPageList[j]["row"], "mistake": this.totalPageList[j]["mistake"], "parameter": this.totalPageList[j]["parameter"], "firstClick": true, });
                        deleList.push(this.totalPageList[j]);
                    }
                }
                else {
                    continue;
                }
            }
        }
        for (var _e = 0, deleList_1 = deleList; _e < deleList_1.length; _e++) {
            var i = deleList_1[_e];
            this.totalPageList.splice(this.totalPageList.indexOf(i), 1);
        }
        console.log(this.totalPageList);
        for (var i = 0; i < 10; i++) {
            this.curPageList.push(this.totalPageList[i]);
        }
        this.vueObj = Vue.vueObj(this.totalPageList, this.curPageList);
    };
    return Main;
}());
function reqServer(callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'text';
    xhr.open('POST', "http://10.43.1.13:1101");
    xhr.onload = function () {
        var respond = xhr.response;
        callback(xhr.response);
    };
    xhr.onerror = function (evt) {
        callback("请求出错");
        return void 0;
    };
    xhr.send(JSON.stringify({ check: 1, svn: 1 }));
}
var server;
(function (server) {
    var EResType;
    (function (EResType) {
        EResType[EResType["MODEL"] = 0] = "MODEL";
        EResType[EResType["MAP"] = 1] = "MAP";
        EResType[EResType["MINI_MAP"] = 2] = "MINI_MAP";
        EResType[EResType["TOOL_ICON"] = 3] = "TOOL_ICON";
        EResType[EResType["SKILL_ICON"] = 4] = "SKILL_ICON";
        EResType[EResType["HEAD_ICON"] = 5] = "HEAD_ICON";
        EResType[EResType["SHOW_ICON"] = 6] = "SHOW_ICON";
        EResType[EResType["AUDIO"] = 7] = "AUDIO";
        EResType[EResType["UI_MODEL"] = 8] = "UI_MODEL";
        EResType[EResType["UI_MODEL_JSON"] = 9] = "UI_MODEL_JSON";
        EResType[EResType["ACTIVE_BTN"] = 10] = "ACTIVE_BTN";
        EResType[EResType["WAY"] = 11] = "WAY";
        EResType[EResType["TITLE"] = 12] = "TITLE";
        EResType[EResType["ACTIVITY"] = 13] = "ACTIVITY";
        EResType[EResType["NPC_TITLE"] = 14] = "NPC_TITLE";
        EResType[EResType["EXHIBITION"] = 15] = "EXHIBITION";
        EResType[EResType["BTN_FONT_ICON"] = 16] = "BTN_FONT_ICON";
        EResType[EResType["BUFF"] = 17] = "BUFF";
    })(EResType = server.EResType || (server.EResType = {}));
    var EErrorCode;
    (function (EErrorCode) {
        EErrorCode[EErrorCode["CUSTOM_ERROR"] = 0] = "CUSTOM_ERROR";
        EErrorCode[EErrorCode["EMPTY_LINE"] = 1] = "EMPTY_LINE";
        EErrorCode[EErrorCode["PARSE_ERROR"] = 2] = "PARSE_ERROR";
        EErrorCode[EErrorCode["KEY_LENGTH_ERROR"] = 3] = "KEY_LENGTH_ERROR";
        EErrorCode[EErrorCode["CONF_INVALID"] = 4] = "CONF_INVALID";
        EErrorCode[EErrorCode["RES_INVALID"] = 5] = "RES_INVALID";
        EErrorCode[EErrorCode["POP_INVALID"] = 6] = "POP_INVALID";
        EErrorCode[EErrorCode["TYPE_INVALID"] = 16] = "TYPE_INVALID";
        EErrorCode[EErrorCode["TYPE_NOT_MATCH"] = 17] = "TYPE_NOT_MATCH";
        EErrorCode[EErrorCode["OUT_OF_RANGE"] = 18] = "OUT_OF_RANGE";
        EErrorCode[EErrorCode["KEY_REPEAT"] = 19] = "KEY_REPEAT";
    })(EErrorCode = server.EErrorCode || (server.EErrorCode = {}));
    var ETypeDisMatch;
    (function (ETypeDisMatch) {
        ETypeDisMatch[ETypeDisMatch["IS_NULL"] = 0] = "IS_NULL";
        ETypeDisMatch[ETypeDisMatch["NOT_A_NUMBER"] = 1] = "NOT_A_NUMBER";
        ETypeDisMatch[ETypeDisMatch["NOT_UNSIGNED"] = 2] = "NOT_UNSIGNED";
        ETypeDisMatch[ETypeDisMatch["NOT_INTEGER"] = 3] = "NOT_INTEGER";
    })(ETypeDisMatch = server.ETypeDisMatch || (server.ETypeDisMatch = {}));
    function logError(error) {
        console.log(getFullErrorString(error));
    }
    server.logError = logError;
    function getFullErrorString(error) {
        return getErrorAddress(error.point) + " " + getErrorDesc(error);
    }
    server.getFullErrorString = getFullErrorString;
    function getErrorDesc(error) {
        switch (error.type) {
            case EErrorCode.CUSTOM_ERROR:
                return error.msg;
            case EErrorCode.KEY_REPEAT:
                return getKeyRepeatErrorInfo(error);
            case EErrorCode.KEY_LENGTH_ERROR:
                return getKeyLengthError(error);
            case EErrorCode.CONF_INVALID:
                return getConfInvalidError(error);
            case EErrorCode.PARSE_ERROR:
                return getParseError(error);
            case EErrorCode.POP_INVALID:
                return getPopInvalidError(error);
            case EErrorCode.TYPE_NOT_MATCH:
                return getTypeMisMatchError(error);
            case EErrorCode.TYPE_INVALID:
                return getTypeInvalidError(error);
            case EErrorCode.OUT_OF_RANGE:
                return getOutOfRangeError(error);
            case EErrorCode.EMPTY_LINE:
                return getEmptyLineError(error);
            case EErrorCode.RES_INVALID:
                return getResInvalidError(error);
        }
    }
    function getKeyRepeatErrorInfo(error) {
        return "索引[" + error.keys + "]重复：" + " " + error.repeatValue.join();
    }
    function getKeyLengthError(error) {
        return "键数异常：" + " " + error.provided + "/" + error.expected;
    }
    function getConfInvalidError(error) {
        return "\u5F15\u7528\u9519\u8BEF：" + " " + error.refer.file + " " + "[" + error.refer.idKey + "]" + " " + error.referValue.join();
    }
    function getParseError(error) {
        return "解析错误 [" + error.parseKeys.join() + "]：" + " " + error.content;
    }
    function getPopInvalidError(error) {
        return "面板错误：" + " " + error.referValue.slice(0, error.start).join()
            + "(" + error.referValue.slice(error.start).join() + ")";
        // + ConfMaster.Instance.popAssert.getPopName(error.referValue[0])+"]";
    }
    function getTypeMisMatchError(error) {
        switch (error.reason) {
            case ETypeDisMatch.IS_NULL:
                return "条目为空";
            case ETypeDisMatch.NOT_A_NUMBER:
                return "条目不是数字：" + error.value;
            case ETypeDisMatch.NOT_INTEGER:
                return "条目不是整数：" + error.value;
            case ETypeDisMatch.NOT_UNSIGNED:
                return "条目不是非负数：" + error.value;
        }
    }
    function getTypeInvalidError(error) {
        return "类型无效：" + " " + error.value;
    }
    function getOutOfRangeError(error) {
        return "\u503C " + error.value + " \u8D85\u51FA\u9650\u5236：" + " " + error.range.map(function (value) {
            if (value == void 0) {
                return '无';
            }
            else {
                return value;
            }
        }).join('-') + " ";
    }
    function getEmptyLineError(error) {
        return "出现空行";
    }
    function getResInvalidError(error) {
        return "\u8D44\u6E90\u4E0D\u5B58\u5728 [" + EResType[error.resType] + "]：" + " " + error.value;
    }
    function getErrorAddress(point) {
        var back = point.file;
        if (point.line != void 0) {
            back += " " + point.line;
            if (point.attr != void 0) {
                back += " " + point.attr;
            }
            else {
                back += " " + "未定义";
            }
        }
        else {
            back += " " + "未定义";
        }
        return back;
    }
    server.getErrorAddress = getErrorAddress;
})(server || (server = {}));
var Vue;
(function (Vue) {
    /**
    *@param total 所有页数数据的数组
    *@param cur 当前页面数据的数组
    */
    function vueObj(total, cur) {
        var curPage = cur;
        var totalPage = total;
        var vueObj = {
            el: '#app',
            data: function () {
                return {
                    dataList: curPage,
                    nameSelect: [],
                    colSelect: [],
                    rowSelect: [],
                    mistakeSelect: [],
                    pageLength: 100,
                    nameCheck: [],
                    colCheck: [],
                    rowCheck: [],
                    misCheck: [],
                    topColor: "",
                    bottomColor: "",
                    sortIndex: 0 //排序的类型，默认0升序，1降序
                };
            },
            methods: {
                /* 返回当前行的类名 */
                tableRowClassName: function (_a) {
                    var row = _a.row, rowIndex = _a.rowIndex;
                    return "row";
                },
                /* 返回当前单元个的类名 */
                cellName: function (_a) {
                    var row = _a.row, column = _a.column, rowIndex = _a.rowIndex, columnIndex = _a.columnIndex;
                    if (columnIndex == 4) {
                        return "light";
                    }
                },
                /* 排序 */
                sort: function () {
                    if (this.sortIndex == 0) {
                        this.topColor = "lightblue";
                        this.bottomColor = "";
                        this.dataList.sort(function (a, b) {
                            return b.col - a.col;
                        });
                        this.sortIndex++;
                    }
                    else if (this.sortIndex == 1) {
                        this.bottomColor = "lightblue";
                        this.topColor = "";
                        this.dataList.sort(function (a, b) {
                            return a.col - b.col;
                        });
                        this.sortIndex++;
                    }
                    else {
                        this.sortIndex = 0;
                        this.bottomColor = "";
                        this.topColor = "";
                    }
                },
                /* 文件名筛选 */
                nameFilter: function (value) {
                    if (value.length == 0) {
                        this.selectReset(1);
                        return;
                    }
                    var filterList = [];
                    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                        var i = value_1[_i];
                        for (var _a = 0, curPage_1 = curPage; _a < curPage_1.length; _a++) {
                            var j = curPage_1[_a];
                            if (i == j["fileName"]) {
                                filterList.push(j);
                            }
                        }
                    }
                    this.dataList = filterList;
                },
                /* 列筛选 */
                colFilter: function (value) {
                    if (value.length == 0) {
                        this.selectReset(2);
                        return;
                    }
                    var filterList = [];
                    for (var _i = 0, value_2 = value; _i < value_2.length; _i++) {
                        var i = value_2[_i];
                        for (var _a = 0, curPage_2 = curPage; _a < curPage_2.length; _a++) {
                            var j = curPage_2[_a];
                            if (i == j["col"]) {
                                filterList.push(j);
                            }
                        }
                    }
                    this.dataList = filterList;
                },
                /* 行筛选 */
                rowFilter: function (value) {
                    if (value.length == 0) {
                        this.selectReset(3);
                        return;
                    }
                    var filterList = [];
                    for (var _i = 0, value_3 = value; _i < value_3.length; _i++) {
                        var i = value_3[_i];
                        for (var _a = 0, curPage_3 = curPage; _a < curPage_3.length; _a++) {
                            var j = curPage_3[_a];
                            if (i == j["row"]) {
                                filterList.push(j);
                            }
                        }
                    }
                    this.dataList = filterList;
                },
                /* 错误筛选 */
                mistakeFilter: function (value) {
                    if (value.length == 0) {
                        this.selectReset(4);
                        return;
                    }
                    var filterList = [];
                    for (var _i = 0, value_4 = value; _i < value_4.length; _i++) {
                        var i = value_4[_i];
                        for (var _a = 0, curPage_4 = curPage; _a < curPage_4.length; _a++) {
                            var j = curPage_4[_a];
                            if (i == j["mistake"]) {
                                filterList.push(j);
                            }
                        }
                    }
                    this.dataList = filterList;
                },
                /* 换页 */
                handleCurrentChange: function (val) {
                    curPage = [];
                    this.sortIndex = 0;
                    this.topColor = "";
                    this.bottomColor = "";
                    for (var i = 0; i < totalPage.length; i++) {
                        if (i < 10 * val && i >= 10 * (val - 1)) {
                            curPage.push(totalPage[i]);
                        }
                        else {
                            continue;
                        }
                    }
                    this.dataList = curPage;
                    this.nameSelect = [];
                    this.colSelect = [];
                    this.rowSelect = [];
                    this.mistakeSelect = [];
                    var nameList = [];
                    var colList = [];
                    var rowList = [];
                    var misList = [];
                    this.nameCheck = [];
                    this.colCheck = [];
                    this.rowCheck = [];
                    this.misCheck = [];
                    for (var i in curPage) {
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
                            this.rowSelect.push(curPage[i]['row']);
                        }
                        if (misList.indexOf(curPage[i]['mistake']) == -1) {
                            misList.push(curPage[i]['mistake']);
                            this.mistakeSelect.push(curPage[i]['mistake']);
                        }
                    }
                },
                /* 第一项参数加号点击 */
                handleEdit: function (index, row) {
                    var _this = this;
                    var id = row.parameter.index;
                    if (row.firstClick) {
                        row.parameter.class = "el-icon-minus";
                        row.parameter.expand = true;
                        row.firstClick = false;
                        row.parameter.autoSize = "auto";
                    }
                    else {
                        row.parameter.class = "el-icon-plus";
                        row.parameter.expand = false;
                        row.firstClick = true;
                        row.parameter.autoSize = "60px";
                    }
                    var timer = setTimeout(function () {
                        row.parameter.autoHeight = window.getComputedStyle(_this.$refs["ID" + id]).height;
                        clearTimeout(timer);
                    }, 100);
                },
                /* 文件名加号点击 */
                expandFileClick: function (index, row) {
                    if (row.firstExpand) {
                        row.class = "el-icon-minus";
                        row.firstExpand = false;
                    }
                    else {
                        row.class = "el-icon-plus";
                        row.firstExpand = true;
                    }
                },
                /* 相同文件名下的参数加号点击 */
                expandEdit: function (index, row) {
                    var _this = this;
                    var id = row.parameter.index;
                    if (row.firstClick) {
                        row.parameter.class = "el-icon-minus";
                        row.parameter.expand = true;
                        row.firstClick = false;
                        row.parameter.autoSize = "auto";
                    }
                    else {
                        row.parameter.class = "el-icon-plus";
                        row.parameter.expand = false;
                        row.firstClick = true;
                        row.parameter.autoSize = "60px";
                    }
                    var timer = setTimeout(function () {
                        row.parameter.autoHeight = window.getComputedStyle(_this.$refs["ID" + id][0]).height;
                        clearTimeout(timer);
                    }, 100);
                },
                /**
                 *  筛选重置
                 *  @param index 1表示文件名 2表示列 3表述行 4表示错误类型
                 * */
                selectReset: function (index) {
                    this.dataList = curPage;
                    switch (index) {
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
            created: function () {
                /* 初始化数组，只取前10个显示，同时初始化筛选数组 */
                var nameList = [];
                var colList = [];
                var rowList = [];
                var misList = [];
                this.pageLength = totalPage.length;
                for (var i in curPage) {
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
                        this.rowSelect.push(curPage[i]['row']);
                    }
                    if (misList.indexOf(curPage[i]['mistake']) == -1) {
                        misList.push(curPage[i]['mistake']);
                        this.mistakeSelect.push(curPage[i]['mistake']);
                    }
                }
            }
        };
        return vueObj;
    }
    Vue.vueObj = vueObj;
})(Vue || (Vue = {}));
//# sourceMappingURL=main.js.map