var cityIdUrl = 'https://weixin.jirengu.com/weather/cityid';
var cityweatherurl = 'https://weixin.jirengu.com/weather/now';
var cityId = '';
var datedict = {
    周日: 'Sun',
    周一: 'Mon',
    周二: 'Tue',
    周三: 'Wed',
    周四: 'Thu',
    周五: 'Fri ',
    周六: 'Sat',
    今日周日: 'Sunday',
    今日周一: 'Monday',
    今日周二: 'Tuesday',
    今日周三: 'Wednesday',
    今日周四: 'Thursday',
    今日周五: 'Friday',
    今日周六: 'Saturday'
}
var $bgimg = $('.content>.backgroundimg');
var $ct = $('.wrapper>.content');
var $btnct = $('.btnct');
var $next = $('.next');
var $pre = $('.pre');
var btnstr = '';
var number = $bgimg.length;
var page = number - 1;
var getweatherLock = false;
var carouselLock = false;
for (let i = 0; i < number; i++) {
    btnstr += '<li class="btn"></li>';  
}
$btnct.append(btnstr);
$btn = $('.btn');
$ct.append($bgimg.first().clone());
$ct.prepend($bgimg.last().clone());
var $bgimgNew = $('.content>.backgroundimg');
var numberNew = $bgimgNew.length;
$bgimgNew.last().hide();
$btn.first().addClass('action');
function weatherbyIP(){
    $.get('https://weixin.jirengu.com/weather/ip').done(function(e){
        if(e.status === 'ok'){
            getcityid(e.data);
        }else{
            console.log(e);
            alert('系统错误,获取IP失败');
        }
    }).fail(function(){
        alert('网络出错了')
    })
}
weatherbyIP();
function getcityid(a){
    $.get(cityIdUrl,{location:a}).done(function(a){
        if(a.status ==='error'){
            alert('系统错误，获取城市ID失败');
            console.log(a);
            return;
        }
        $('.countries').html(a.results[0].path.split(',').slice(1,4).join(' '));
        var cityId = a.results[0].id;
        gettodayweather(cityId);
    }).fail(function(){
        alert('网络出错了')
    })
}
function gettodayweather(cityId){
    $.get(cityweatherurl,{cityid:cityId}).done(function(e){
        if(e.status === 'OK'){
            pushhtml(e.weather[0]);
            console.log(e.weather[0]);
        }else{
            alert('系统错误，获取天气数据失败');
            console.log(e);
        }
    }).fail(function(){
        alert('网络出错了');
    })
}
function  pushhtml(obj){
    var now = obj.now
    var other = obj.future;
    $('.wrapper .location>.city').html(obj.city_name + `|<span class="tips">${other[0].date}</span>`);
    $('.today>.describe>.temperature').html(now.temperature +'<sup>&#176;</sup>');
    $('.wrapper>.weatherDay>.today img').attr('src',`//weixin.jirengu.com/images/weather/code/${now.code}.png`);
    $('.wrapper>.weatherDay>.today .weatherPhoto>.windspeed').html(now.wind_speed + 'mph / ' + other[0].high + '<sup>&#176;</sup>');
    $('.wrapper>.weatherDay>.today .describe>.date').html(datedict['今日'+other[0].day]+ ' ' + other[0].day);
    $('.wrapper>.weatherDay>.ohterday').each(function(index,value){
        var $this =$(this);
        $this.find('.date').html(datedict[other[index+1].day]);
        $this.find('img').attr('src',`//weixin.jirengu.com/images/weather/code/${other[index+1].code1}.png`);
        $this.find('.futuretemperature').html(other[index+1].low + '<sup>&#176;</sup> ~ ' + other[index+1].high +'<sup>&#176;</sup>' );
    })
}
var timeid1 = setInterval(function(){
    var totalseconds = (Date.parse(new Date())%86400000)/1000;
    var seconds = totalseconds%60;
    var totalminutes = Math.floor(totalseconds/60);
    var minutes = totalminutes%60;
    var hours = Math.floor(totalminutes/60)+8;
    if(hours > 12 && hours<24){
    hours -= 12;
    $('.wrapper .location .time').html(hours+':'+minutes+' pm');
    }else if(hours <= 12){
    $('.wrapper .location .time').html(hours+':'+minutes+' am');
    }else{
        hours -= 24;
        $('.wrapper .location .time').html(hours+':'+minutes+' am');
    }
},1000)
$('.wrapper>.content>.nav>li').on('click',function(){
    var $this = $(this);
    $this.siblings('li').removeClass('action');
    $this.addClass('action');
})
$('.wrapper .location .icon-064dangqianweizhi').on('click',function(){
    weatherbyIP()
})
var timeid2 = setInterval(function(){
    weatherbyIP()
},1800000);
$next.on('click',function(){
    btnChangeNext()
})
$pre.on('click',function(){
    btnChangePre()
})
var timeid3 = setInterval(function(){
btnChangeNext()
},5000)
$btn.on('click',function(){
    var $this = $(this);
    var $thisIndex = $this.index();
    btnChange($this,$thisIndex);
})
function playnext(len){
    carouselLock = true;
    $bgimg.slice(1+page-len,page+1).fadeOut(500,function(){
        page--;
        carouselLock = false;
        if(page === -1){
            page = number - 1;
            $bgimg.css('display','block')
        }
    }); 
}
function playpre(len){
    carouselLock = true;
    $bgimgNew.slice(page+2,page+len+2).fadeIn(500,function(){
        page++;
        carouselLock = false;
        if(page === number){
            page = 0;
            $bgimgNew.slice(2,numberNew).css('display','none'); 
        }
    }); 
}
function btnChangeNext(){
    if(carouselLock){
        return;
    }
    if(page===0){
        action($btn.eq(0));
    }else{
        action($btn.eq(number-page));
    }
    playnext(1);    
}
function btnChangePre(){
    if(carouselLock){
        return;
    }
    if(page===number -1){
        action($btn.eq(number -1));
    }else{
        action($btn.eq(number-page-2));
    }
    playpre(1);  
}
function btnChange($this,$thisIndex){
    if(carouselLock){
        return;
    }
    action($this);
    if($thisIndex>(number-1-page)){
        playnext($thisIndex-number+1+page);
    }else if($thisIndex<(number-1-page)){
        playpre(number-1-page-$thisIndex);
    }
}
function action(e){
    e.addClass('action').siblings().removeClass('action');
}

