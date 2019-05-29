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
        this.logger = document.getElementById('console');
        this.head = document.getElementById('head');
        this.strlist = [];
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
            var req, txt, errors, MAX_SHOW_ITEMS, showErrors, showStr, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://localhost:3000/errors.json")];
                    case 1:
                        req = _a.sent();
                        return [4 /*yield*/, req.text()];
                    case 2:
                        txt = _a.sent();
                        errors = JSON.parse(txt);
                        MAX_SHOW_ITEMS = 50;
                        showErrors = errors.length >= MAX_SHOW_ITEMS ? MAX_SHOW_ITEMS : errors.length;
                        showStr = "";
                        for (i = 0; i < showErrors; i++) {
                            showStr += server.getFullErrorString(errors[i]) + "-";
                        }
                        this.strlist = showStr.split("-");
                        return [2 /*return*/];
                }
            });
        });
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
        }
        return back;
    }
    server.getErrorAddress = getErrorAddress;
})(server || (server = {}));
//# sourceMappingURL=main.js.map