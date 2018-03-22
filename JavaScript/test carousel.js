var $pli = $('.photoct>.photoli');
var $ct = $('.photoct');
var $next = $('.next');
var $pre = $('.pre');
var number = parseInt($pli.length)/ parseInt($ct.length);
var width = $pli.width();
var $page  = $('.page'); 
var str = '';
for (let i = 0; i < number; i++) {
    str = str + '<li class="btn"></li>';
}
$page.append(str);
var $btn = $('.page>.btn')
var page = 0;
var jumplock = false;
$ct.css('left',-width)
$ct.append($pli.first().clone());
$ct.prepend($pli.last().clone());
$next.on('click',function(){
    playnext(1);
})
$pre.on('click',function(){
    playpre(1);
})
var timer = setInterval(function(){
    playnext(1);
},5000)
$btn.on('click',function(){
    var rank = $(this).index();
    jump(rank);
})
function playnext(len){
    if(jumplock){
        return;
    }
    jumplock = true;
    $ct.animate({'left':-width-(page+len)*width},function(){
        page += len;
        jumplock = false;
        if(page ===number){
            $ct.css('left',-width);
            page = 0;
        }
    })
}
function playpre(len){
    if(jumplock){
        return;
    }
    jumplock = true;
    $ct.animate({'left':-width-page*width+len*width},function(){
        page -= len;
        jumplock = false;
        if(page ===-1){
            $ct.css('left',-width-(number-1)*width);
            page = number - 1;
        }
    })
}
function jump(rank){
    if(rank>page){
        playnext(rank-page);
        return;
    }
    playpre(page-rank);
}
