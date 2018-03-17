$('.nav>li').on('mouseenter',function(){
    $(this).find('table').show();
})
$('.nav>li').on('mouseleave',function(){
    $(this).find('table').hide();
})
$('.wrrap>.tab>li').on('click',function(){
    var $this = $(this);
      $ul = $this.parents('.wrrap').find('.list').find('ul');
    $($ul.eq($this.index())).show();
    $($ul.eq($this.index())).siblings().hide();
})
$('.list>ul').on('mouseenter','li',function(){
    $(this).addClass('buy');
})
$('.list>ul').on('mouseleave','li',function(){
    $(this).removeClass('buy');
})
var loadMoreLock = false;
var start = 6;
var len = 3;
var target;
$('.wrrap>.list').on('click','button.loadMore',function(){
    var $this = $(this);
    if(loadMoreLock){
        return;
    }
    loadMoreLock = true;
    $this.html('<img src="./img/load.gif" alt="">');
    target = $this.parent('ul').index()+1;
    ajax({
        url:'http(s)://weixin.jirengu.com/weather',
        method:'get',
        dataType:'text',
        target: target,
        data:{
            start: start,
            len: len
        },
        onsuccess:onsuccess,
        onerror: function(){
            console.log('error');
            loadMoreLock = false;
        }
    })
    function onsuccess(arr){
        start = arr.length +start;
        loadMoreLock = false;
        $this.html('加载更多');
        for (let i = 0; i < arr.length; i++) {
            $this.before(`<li><img src="${arr[i].img}" alt=""><div><a href="#" class="btn">立刻抢购</a></div></li>`) ;
        }
    }
})
function ajax(obj){
    var url = obj.url;
    var target = obj.target || 1;
    var method = obj.method || 'get';
    var dataType = obj.dataType || 'json';
    var data = obj.data || {};
    var onsuccess = obj.onsuccess || function(){};
    var onerror = obj.onerror || function(){};
    var str = '';
    var arr = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            arr.push(key + '=' + data[key])
            str = arr.join('&');
        }
    }
    var xhr = new XMLHttpRequest();
    if(method === 'get'){
        url = url + '?' + str;
        xhr.open(method,url,true)
        xhr.send();
    }else{
        xhr.open(method,url,true)
        xhr.send(str);
    }
    $(xhr).on('load',function(){
        if((xhr.responseText.status >=200 && xhr.responseText.status <300) || xhr.responseText.status ===304){
            if(dataTpye ==='json'){
                return JSON.parse(xhr.responseText)
            }else{
                var imgarr = [];
                var imgobj = {};
                var imgstr = './img/风景' + target + '.jpg';
                imgobj.img = imgstr;
                for (let i = 0; i < len; i++) {
                    imgarr.push(imgobj); 
                }
                onsuccess(imgarr);
            }
        }else{
            var imgarr = [];
            var imgobj = {};
            var imgstr = './img/风景' + target + '.jpg';
            imgobj.img = imgstr;
            for (let i = 0; i < len; i++) {
                imgarr.push(imgobj); 
            }
            onsuccess(imgarr);
        }
    })
}


