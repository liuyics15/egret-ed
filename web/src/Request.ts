
function reqServer(callback:(data:string)=>void):void {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'text';
    xhr.open('POST',"http://10.43.1.13:1101");
    xhr.onload = ()=> {
        let respond = xhr.response;
        callback(xhr.response);
    };
    xhr.onerror = (evt)=> {
        callback("请求出错");
        return void 0;
    };
    xhr.send(JSON.stringify({check:1,svn:1}));
}