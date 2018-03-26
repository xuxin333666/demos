
{function ajax(obj){
    var url = obj.url;
    var method = obj.method || 'get';
    var dataType = obj.dataType || 'json';
    var data = obj.data||{};
    var onsuccess = obj.onsuccess || function(){};
    var onerror = obj.onerror || function(){};
    var xhr = new XMLHttpRequest();
    var str = '';
    var arr = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            arr.push(key + '=' + data[key]);
        }
    }
    str = arr.join('&');
    if(method === 'get'){
        url = url + '?' + str;
        xhr.open(method,url,true);
        xhr.send();
    }else{
        xhr.open(method,url,true);
        xhr.send(str);
    }
    xhr.addEventListener('load',function(e){
        if((xhr.responseText.status >=200 && xhr.responseText.status <300) || xhr.responseText.status ===304){
            if(dataType === 'json') {
                onsuccess(JSON.parse(xhr.responseText));
            }else{
                onsuccess(xhr.responseText);
            }
        }else{
            var n = data.start + 1;
            var len = data.loadNumber;
            var content = {};
            for (let i = 0; i < len; i++) {
                content[i] = '内容'+n;
                n++;
            }
            onerror(content);
        }
    })
    xhr.onerror = onerror;
}

function $(e){
    return document.querySelector(e);
}
var lock = false;
var start = 4;
var loadNumber = 6;
$('.btn').addEventListener('click',function(e){
    if(lock){
        return;
    }else{
        lock = true;
        this.innerHTML = '<img src="./img/load.gif" alt="">'
        ajax({
            url:'http://api.jirengu.com/weather.php',
            method: 'get',
            dataType: 'json',
            data: {
                start: start,
                loadNumber: loadNumber
            },
            onsuccess: function(json){
                console.log(json)
            },
            onerror: onerror
        })
    }
})
function onerror(content){
    console.log('网络错误');
    lock = false;
    start += loadNumber;
    $('.btn').innerText = '加载更多';
    for (const key in content) {
        if (content.hasOwnProperty(key)) {
            var li = document.createElement('li');
            li.innerText = content[key];
            $('.ct').appendChild(li);
        }
    }
}
}