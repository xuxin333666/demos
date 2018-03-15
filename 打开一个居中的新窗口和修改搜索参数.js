window.$ = function(){
    var arr = [];
    return arr
}
$.bom = {
    openCenter: function(width,height,url){
        function fn(){
            return `width = ${width}px,height = ${height}px,screenX = ${screen.width/2-width/2}px,screenY = ${screen.height/2-height/2}px`
        }
        window.open(url,'_blank',fn())  
    },
    foundSearch: function(name,value){
        var s = window.location.search;
        if(s[0]==='?'){
            s = s.substr(1)
        }
        var sArr = s.split(/[=&]/);
        var obj = {};
        var str = '';
        for (let i = 0; i < sArr.length; i=2+i) {
            if(i+1<= sArr.length){
                obj[decodeURIComponent(sArr[i])] = decodeURIComponent(sArr[i+1]);
            }else{
                obj[decodeURIComponent(sArr[i])] = '';
            }
        }
        if(value){
            if(typeof(obj[name]) === 'undefined'){
                window.location.search = window.location.search + `&${name}=${value}`;
            }else{
                obj[name] = value;
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        str = str + key + '=' + obj[key] + `&`;  
                    }
                }
                window.location.search = str;
            }
        }else{
            if(typeof(obj[name]) === 'undefined'){
                return '找不到这个search参数'
            }else return obj[name];
        }
    }
}
$.bom.openCenter(600,600,'https://baidu.com')
$.bom.foundSearch('a')
$.bom.foundSearch('h')
$.bom.foundSearch('a','xx')
$.bom.foundSearch('h','xxx')


var obj = {
    a: 1,
    b:22,
    c:3
};
var str = '';
for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        str =str + key + '=' + obj[key] + `&`; 
    }
}
