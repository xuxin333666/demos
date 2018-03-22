var $ct = $('.content');
var $nav =  $('.nav');
var $navli = $('.nav>li');
var $weatherDay =  $('.weatherDay');
var $weatherDayli = $('.weatherDay>li.weather');
var newsLock = false;
carousel.start({});
$nav.find('.news').on('click',function(){
    if(newsLock){
        return
    }
    newsLock = true;
    action($(this));
    $weatherDayli.css('display','none');
    newsShow.show({
        number: 5,
        strbottom: '.bottom',
        strCt: '.weatherDay',
        margin: 10
    })
})
$nav.find('.weathers').on('click',function(){
    if(newsShow.isLoadOver()){
        return 
    }
    action($(this));
    $weatherDayli.css('display','block');
    resetNews();
})
$nav.find('.music').on('click',function(){
    if(newsShow.isLoadOver()){
        return 
    }
    action($(this));
    $weatherDayli.css('display','none');
    resetNews();
})
function resetNews(){
    newsLock = false;
    $weatherDay.height('100%')
    $('.items').remove();
    newsShow.stopShow();
}
function action(e){
    e.addClass('action').siblings().removeClass('action');
}




// 天气信息获取API
var weatherData = (function(){
    var $ct = $('.content');
    var $weatherDay =  $('.weatherDay');
    var $weatherDayli = $('.weatherDay>li.weather');
    var $locationIcon = $('.icon-064dangqianweizhi');
    var cityIP = 'https://weixin.jirengu.com/weather/ip';
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
    var getweatherLock = false;
    function getWeatherByIP(){
        if(getweatherLock){
            return
        }
        getweatherLock = true;
        $.get(cityIP).done(function(e){
            if(e.status === 'ok'){
                getcityid(e.data);
            }else{
                alert('系统错误,获取IP失败');
                getweatherLock = false;
            }
        }).fail(function(){
            alert('网络出错了')
            getweatherLock = false;
        })
    };
    function getcityid(a){
        $.get(cityIdUrl,{location:a}).done(function(a){
            if(a.status ==='error'){
                alert('系统错误，获取城市ID失败');
                getweatherLock = false;
                return;
            }
            $('.countries').html(a.results[0].path.split(',').slice(1,4).join(' '));
            var cityId = a.results[0].id;
            gettodayweather(cityId);
        }).fail(function(){
            alert('网络出错了')
            getweatherLock = false;
        })
    }
    function gettodayweather(cityId){
        $.get(cityweatherurl,{cityid:cityId}).done(function(e){
            if(e.status === 'OK'){
                pushhtml(e.weather[0]);
            }else{
                alert('系统错误，获取天气数据失败');
                getweatherLock = false;
            }
        }).fail(function(){
            alert('网络出错了');
            getweatherLock = false;
        })
    }
    function  pushhtml(obj){
        var now = obj.now
        var other = obj.future;
        $('.city').html(obj.city_name + `|<span class="tips">${other[0].date}</span>`);
        $('.temperature').html(now.temperature +'<sup>&#176;</sup>');
        $('.today img').attr('src',`//weixin.jirengu.com/images/weather/code/${now.code}.png`);
        $('.windspeed').html(now.wind_speed + 'mph / ' + other[0].high + '<sup>&#176;</sup>');
        $('.describe>.date').html(datedict['今日'+other[0].day]+ ' ' + other[0].day);
        $('.weatherDay>.ohterday').each(function(index,value){
            var $this =$(this);
            $this.find('.date').html(datedict[other[index+1].day]);
            $this.find('img').attr('src',`//weixin.jirengu.com/images/weather/code/${other[index+1].code1}.png`);
            $this.find('.futuretemperature').html(other[index+1].low + '<sup>&#176;</sup> ~ ' + other[index+1].high +'<sup>&#176;</sup>' );
        })
        getweatherLock = false;
    }
    function action(e){
        e.addClass('action').siblings().removeClass('action');
    }
    function getData(){
        getWeatherByIP()
        $locationIcon.on('click',function(){
            getWeatherByIP()
        })
        var timeid2 = setInterval(function(){
            getWeatherByIP()
        },1800000);
    }
    return {
        getData: getData
    }
})();
weatherData.getData();








// 时间显示及24小时制转换
(function(){
    var $time = $('.time');
    var $tfhourCt = $('.tfhourct');
    var $tfhour = $('.tfhour');
    var $tfhourChange = $('.tfhourChange');
    var $handup = $('.handoup')
    var hourStyle = 24;
    var timeid1;
    var dict = ['00','01','02','03', '04','05','06','07','08','09'];
    function  checkMove(){
        $tfhourCt.animate({
            'right': '0'
        });
    }
    function  checkMoveOver(){
        $tfhourCt.animate({
            'right': '-165px'
        });
    }
    function hourChange(h){
        window.clearTimeout(timeid1);
        timeid1 = setInterval(function(){
            var totalseconds = (Date.parse(new Date())%86400000)/1000;
            var seconds = totalseconds%60;
            var totalminutes = Math.floor(totalseconds/60);
            var minutes = totalminutes%60;
            var hours = Math.floor(totalminutes/60)+8;
            if(minutes<10){ minutes = dict[minutes]}
            if(hours<10){ hours = dict[hours]}
            if(h===12){
                if(hours > 12 && hours<24){
                    hours -= 12;
                    if(hours<10){ hours = dict[hours]}
                    $time.html(hours+':'+minutes+' pm');
                    }else if(hours <= 12){
                        $time.html(hours+':'+minutes+' am');
                    }else{
                        hours -= 24;
                        if(hours<10){ hours = dict[hours]}
                        $time.html(hours+':'+minutes+' am');
                }
            }else {
                if(hours<24){
                    $time.html('北京时间 '+hours+':'+minutes);
                }else{
                    hours -= 24;
                    if(hours<10){ hours = dict[hours]}
                    $time.html('北京时间 '+hours+':'+minutes);
                }
            }
        },1000)
    }
    (function timeChange(){
        hourChange(12);
        $tfhourCt.on('mouseenter',function(){
            checkMove();
        })
        $tfhourCt.on('mouseleave',function(){
            checkMoveOver();
        })
        $tfhourChange.on('click',function(){
            if(hourStyle===12){
                hourStyle = 24;
                $tfhourChange.removeClass('icon-huadonganniuyes').addClass('icon-huadonganniux');
                hourChange(12);
            }else{
                hourStyle = 12;
                $tfhourChange.removeClass('icon-huadonganniux').addClass('icon-huadonganniuyes');
                hourChange(24);
            } 
        })
    })();
})();
