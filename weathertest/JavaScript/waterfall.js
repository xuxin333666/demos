
var newsShow = (function(){
    var lazyLoadLock = false;
    var isLoadOver;
    var scrollLock;
    var number = 5;
    var page = 1;
    var $ct = $('.ct');
    var $bottom = $('.bottom')
    var column;
    var arr = [];
    for(var i=0;i<column;i++){
        arr[i] = 0;
    }
    function show(){
        getData(function(data){
            $(data).each(function(index,news){
                var $node = getNode(news);
                $node.find('img').on('load',function(){
                    $ct.append($node);
                    waterfall($node);
                })
            })
        });
    }
    function getData(callback){
        if(lazyLoadLock){
            return;
        }
        lazyLoadLock = true;
        $.ajax({
            url: 'https://platform.sina.com.cn/slide/album_tech',
            dataType: 'jsonp',   
            jsonp:"jsoncallback",
            data: {
                app_key: '1271687855',
                num: number,
                page: page
            }
        }).done(function(ret){
            if(ret && ret.status && ret.status.code === "0"){
                callback(ret.data);
            page++;
            }else{
                console.log('get error data');
            }
        }).fail(function(){
            alert('网络错误');
        });
    }
    function getNode(news){
        var nodeStr = '';
        nodeStr += `<a href="${news.url}" class="items" target="_blank" title="${news.short_intro}">`;
        nodeStr += `<img src="${news.img_url}" alt="">`;
        nodeStr += `<h3 class="title">${news.name}</h3>`;
        nodeStr += `<p class="intro">${news.short_intro}</p></a>`; 
        return $(nodeStr) ;  
    }
    function waterfall($node){
        var min = Math.min.apply(null,arr);
        var index = arr.indexOf(min);
        $node.css({
            top: min + margin,
            left: index*($node.outerWidth()+margin)+margin
        })
        arr[index] += $node.outerHeight() + margin;
        $ct.height( Math.max.apply(null,arr));
        if(isLoadOver){
            window.clearTimeout(isLoadOver);
        }
        isLoadOver = window.setTimeout(function(){
            lazyLoadLock = false;
            lazyLoad();
        },1000)
    }
    function waterfallAuto(){
        column = Math.floor($(strCt).width()/$('.standardWidth').outerWidth());
        arr = [];
        for(var i=0;i<column;i++){
            arr[i] = 0;
        }
        $('.items').each(function(){
            waterfall($(this));
        })
    };
    function lazyLoad(){
        if(isShow() && !lazyLoadLock){
            show();
        }
    }
    function isShow(){
        return $bottom.offset().top<=($(window).height()+$(window).scrollTop()+200)&& $bottom.offset().top>=$(window).scrollTop()
    }
    function showAPI(obj){
        number = obj.number || 5;
        strbottom = obj.strbottom ||'.bottom';
        $bottom = $(strbottom)
        strCt = obj.strCt || '.ct';
        $ct = $(strCt);
        margin = obj.margin || 20;
        column = Math.floor($(strCt).width()/$('.standardWidth').outerWidth());
        arr = [];
        for(var i=0;i<column;i++){
            arr[i] = 0;
        }
        show()
        $(window).on('resize',function(){
            waterfallAuto();
        })
        $(window).on('scroll',function(){
            if(scrollLock){
                window.clearTimeout(scrollLock);
            }
            scrollLock = window.setTimeout(function(){
                lazyLoad();
            },500)
        })
    };
    function showNumber(){
        return number;   
    }
    function showArr(){
        return arr;
    }
    function setNumber(n){
        number = n;
    }
    function setMargin(n){
        margin = n;
        waterfallAuto();
    }
    function stopShow(){
        $(window).off('resize').off('scroll');
    }
    function isLoadOverlock(){
        return lazyLoadLock;
    }
    return {
        show: showAPI,
        setNumber: setNumber,
        showNumber: showNumber,
        showArr: showArr,
        setMargin: setMargin,
        stopShow: stopShow,
        isLoadOver: isLoadOverlock
    }
})();
/*
newsShow.show({
    number: 5,
    strbottom: '.bottom',
    strCt: '.wrapper',
    margin: 20，
})
必须在容器内设置一个隐藏的div.standardWidth,
其宽度决定了新闻的宽度；
必须在容器外设置一个隐藏的div.bottom,
控制懒加载。
*/
