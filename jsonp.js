/**
 * 跨域读取
 * @param {String} 跨域方法，jsonp
 * @param {String} 跨域地址
 * @param {Function} 跨域成功回调
 * @param {Function} 跨域失败回调
 * @return {Undefined} 无返回
 */
function crossDomain(type, url, onsuccess, onerror) {
    // 设置回调为
    var callbackName = "prefix" + new Date().getTime() + "callback";
        head = document.getElementsByTagName("head")[0];
    // 创建回调函数
    if (type == "jsonp") {
        window[callbackName] = function () {
            if (onsuccess) onsuccess(arguments[0]);
           // console.log(arguments[0]);
        }  
    }
    // 创建一个 script 的 DOM 对象
    script = document.createElement("script");
    // 设置其同步属性为异步加载
    script.async = true;
    // 设置其地址
    script.src = url.replace(/#.*$/, "") + (/\?/.test(url) ? "&" : "?") + "callback" + "=" + callbackName;//这里得type需要注意，一般使用的callback
    // 监听
    script.onload = script.onreadystatechange = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            // 移除该 script 的 DOM 对象
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            // 删除函数或变量
            window[callbackName] = null;
        }
    }
    script.onerror = function () {
        if (onerror) onerror();
    }
    // 插入head
    head.appendChild(script);
}

crossDomain("jsonp","https://api.douban.com/v2/book/search?q=11111",function(data){console.log(data);});  
