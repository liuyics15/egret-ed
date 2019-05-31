namespace server {
    
    export enum EResType {
        MODEL,
        MAP,
        MINI_MAP,
        TOOL_ICON,
        SKILL_ICON,
        HEAD_ICON,
        SHOW_ICON,
        AUDIO,
        UI_MODEL,
        UI_MODEL_JSON,
        ACTIVE_BTN,
        WAY,
        TITLE,
        ACTIVITY,
        NPC_TITLE,
        EXHIBITION,
        BTN_FONT_ICON,
        BUFF
    }
    
    export enum EErrorCode {

        CUSTOM_ERROR = 0x00,

        EMPTY_LINE = 0x01,

        PARSE_ERROR = 0x02,
        KEY_LENGTH_ERROR = 0x03,

        CONF_INVALID = 0x04,
        RES_INVALID = 0x05,
        POP_INVALID = 0x06,

        TYPE_INVALID = 0x10,
        TYPE_NOT_MATCH = 0x11,
        OUT_OF_RANGE = 0x12,

        KEY_REPEAT = 0x13,
    }

    export enum ETypeDisMatch {
        IS_NULL,
        NOT_A_NUMBER,
        NOT_UNSIGNED,
        NOT_INTEGER
    }

    export interface IErrorPoint {
        file:string;
        line?:number;
        attr?:string;
    }

    export type ErrorInfo =
        IErrorBase |
        IKeyLengthError |
        IParseError |
        IConfReferError |
        IPopReferError |
        IResReferError |
        ITypeInvalidError |
        ITypeNotMatchError |
        IOutRangeError |
        IKeyRepeatError;

    export interface IErrorBase {
        type:EErrorCode;
        point:IErrorPoint;
    }

    export interface ICustomError extends IErrorBase {
        type:EErrorCode.CUSTOM_ERROR;
        msg:string;
    }

    export interface IKeyLengthError extends IErrorBase {
        type:EErrorCode.KEY_LENGTH_ERROR;
        expected:number;
        provided:number;
    }

    export interface IParseError extends IErrorBase {
        type:EErrorCode.PARSE_ERROR;
        parseKeys:string[];
        content:string;
    }

    export interface IConfRefer {
        file:string;
        idKey?:string;
    }

    export interface IConfReferError extends IErrorBase {
        type:EErrorCode.CONF_INVALID;
        refer:IConfRefer;
        referValue:(number|string)[];
    }

    export interface IPopReferError extends IErrorBase {
        type:EErrorCode.POP_INVALID;
        start:number;
        referValue:number[];
    }

    export interface IResReferError extends IErrorBase {
        type:EErrorCode.RES_INVALID;
        resType:EResType;
        value:number|string;
    }

    export interface ITypeInvalidError extends IErrorBase {
        type:EErrorCode.TYPE_INVALID;
        value:string;
    }

    export interface ITypeNotMatchError extends IErrorBase {
        type:EErrorCode.TYPE_NOT_MATCH;
        reason:ETypeDisMatch;
        value:string;
    }

    export interface IOutRangeError extends IErrorBase {
        type:EErrorCode.OUT_OF_RANGE;
        range:[number,number];
        value:number|string;
    }

    export interface IKeyRepeatError extends IErrorBase {
        type:EErrorCode.KEY_REPEAT;
        keys:string;
        repeatValue:number[];
    }

    export function logError(error:ErrorInfo):void {
        console.log(getFullErrorString(error));
    }

    export function getFullErrorString(error:ErrorInfo):string {
        return getErrorAddress(error.point)+" "+getErrorDesc(error);
    }

    function getErrorDesc(error:ErrorInfo):string {
        switch (error.type) {
            case EErrorCode.CUSTOM_ERROR:
                return (<ICustomError>error).msg;
            case EErrorCode.KEY_REPEAT:
                return getKeyRepeatErrorInfo(<IKeyRepeatError>error);
            case EErrorCode.KEY_LENGTH_ERROR:
                return getKeyLengthError(<IKeyLengthError>error);
            case EErrorCode.CONF_INVALID:
                return getConfInvalidError(<IConfReferError>error);
            case EErrorCode.PARSE_ERROR:
                return getParseError(<IParseError>error);
            case EErrorCode.POP_INVALID:
                return getPopInvalidError(<IPopReferError>error);
            case EErrorCode.TYPE_NOT_MATCH:
                return getTypeMisMatchError(<ITypeNotMatchError>error);
            case EErrorCode.TYPE_INVALID:
                return getTypeInvalidError(<ITypeInvalidError>error);
            case EErrorCode.OUT_OF_RANGE:
                return getOutOfRangeError(<IOutRangeError>error);
            case EErrorCode.EMPTY_LINE:
                return getEmptyLineError(error);
            case EErrorCode.RES_INVALID:
                return getResInvalidError(<IResReferError>error);
        }
    }

    function getKeyRepeatErrorInfo(error:IKeyRepeatError):string {
        return "索引[" + error.keys + "]重复：" +" "+error.repeatValue.join();
    }

    function getKeyLengthError(error:IKeyLengthError):string {
        return "键数异常："+" " + error.provided + "/" + error.expected;
    }

    function getConfInvalidError(error:IConfReferError):string {
        return "\u5F15\u7528\u9519\u8BEF："+" "+ error.refer.file +" "+"[" + error.refer.idKey + "]"+" "+ error.referValue.join() ;
    }

    function getParseError(error: IParseError):string {
        return "解析错误 [" + error.parseKeys.join() + "]："+" " + error.content;
    }

    function getPopInvalidError(error:IPopReferError):string {
        return "面板错误："+" " + error.referValue.slice(0, error.start).join()
        + "(" + error.referValue.slice(error.start).join() + ")";
            // + ConfMaster.Instance.popAssert.getPopName(error.referValue[0])+"]";
    }

    function getTypeMisMatchError(error:ITypeNotMatchError):string {
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

    function getTypeInvalidError(error:ITypeInvalidError):string {
        return "类型无效："+" " + error.value;
    }

    function getOutOfRangeError(error: IOutRangeError):string {
        return "\u503C " + error.value + " \u8D85\u51FA\u9650\u5236："+" " + error.range.map(function (value) {
            if (value == void 0) {
                return '无';
            }
            else {
                return value;
            }
        }).join('-') + " ";
    }

    function getEmptyLineError(error:IErrorBase):string {
        return "出现空行";
    }

    function getResInvalidError(error:IResReferError):string {
        return "\u8D44\u6E90\u4E0D\u5B58\u5728 [" + EResType[error.resType] + "]："+" " + error.value;
    }

    export function getErrorAddress(point:IErrorPoint):string {
        let back = point.file;
        if (point.line != void 0) {
            back +=" "+point.line;
            if (point.attr != void 0) {
                back += " "+point.attr;
            }else{
                back += " "+"未定义";
            }
        }else{
            back += " "+"未定义";
        }
        return back;
    }
}