var cityIdUrl = 'https://weixin.jirengu.com/weather/cityid';
var cityweatherurl = 'https://weixin.jirengu.com/weather/now';
var cityId = '';
var datedict = {
    周日: 'Sat',
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
function weatherbyIP(){
    $.get('https://weixin.jirengu.com/weather/ip').done(function(e){
        if(e.status === 'ok'){
            getcityid(e.data);
        }else{
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
        }else{
            alert('系统错误，获取天气数据失败');
        }
    }).fail(function(){
        alert('网络出错了')
    })
}
function  pushhtml(obj){
    var now = obj.now
    var other = obj.future;
    $('.wrapper .location>h3').html(obj.city_name + `|<span>${other[0].date}</span>`);
    $('.today>.describe>h1').html(now.feels_like +'<sup>&#176;</sup>');
    $('.wrapper>.weatherDay>.today img').attr('src',`//weixin.jirengu.com/images/weather/code/${now.code}.png`);
    $('.wrapper>.weatherDay>.today div.weatherPhoto>p').html(now.wind_speed + 'mph / ' + now.temperature + '<sup>&#176;</sup>');
    $('.wrapper>.weatherDay>.today div.describe>.date').html(datedict['今日'+other[0].day]+ ' ' + other[0].day);
    $('.wrapper>.weatherDay>.ohterday').each(function(index,value){
        var $this =$(this);
        $this.find('.date').html(datedict[other[index+1].day]);
        $this.find('img').attr('src',`//weixin.jirengu.com/images/weather/code/${other[index+1].code1}.png`);
        $this.find('p').html(other[index+1].low + '<sup>&#176;</sup> ~ ' + other[index+1].high +'<sup>&#176;</sup>' );
    })
}
var timeid = setInterval(function(){
    var totalseconds = (Date.parse(new Date())%86400000)/1000;
    var seconds = totalseconds%60;
    var totalminutes = Math.floor(totalseconds/60);
    var minutes = totalminutes%60;
    var hours = Math.floor(totalminutes/60)+8;
    if(hours >= 12){
    hours -= 12;
    $('.wrapper .location>div .time').html(hours+':'+minutes+' pm');
    }else{
    $('.wrapper .location>div .time').html(hours+':'+minutes+' am');
    }
},1000)
$('.wrapper>.content>.nav>li').on('click',function(){
    var $this = $(this);
    $this.siblings('li').removeClass('action');
    $this.addClass('action');
})
$('.wrapper .location>div>a.icon-064dangqianweizhi').on('click',function(){
    weatherbyIP()
})
var timeid = setInterval(function(){
    weatherbyIP()
},1800000);





