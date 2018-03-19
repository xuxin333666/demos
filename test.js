// 将下列数组过滤掉非正数，保留原数组，生成一个新的数组。
var arr = [3,1,0,-1,-3,2,-5]
function filter(arr){
    var newArr = [];var n = 0;
    for(var key in arr){
        if(arr[key]>0) {
            newArr[n]=arr[key];n++;
        }
        else if(typeof arr[key]!=='number'){
            break;
        }
        else{
            continue;
        }
    }
    return newArr;
}
var newArr = filter(arr)
console.log(arr)
console.log(newArr)
// 将下列数组过滤掉非正数，在原数组上生成新的结果。
var arr = [3,1,0,-1,-3,2,-5];
function filter(arr) {
	for(var i=0;i<arr.length;i++){
		if(arr[i]<=0){
  			arr.splice(i,1);
  			filter(arr);  //原数组删除掉某项后，数组的长度减1，如果不重新遍历，会漏掉删掉项的后面一项。
		}
	}
}
filter(arr);
console.log(arr);
// 用户输入一组参数，自动计算其平方和，若有非数字则提示。
function sumOfSquares(){
	var res = 0;
	for (var i in arguments){
		if (typeof arguments[i] !== 'number') {
            return 'you entered a wrong number';
		}else {res += arguments[i]*arguments[i];}
	}
	return res;
}
var result = sumOfSquares(2,3,4);
var result2 = sumOfSquares(1,3);
var result3 = sumOfSquares(1,2,'f');
console.log(result); 
console.log(result2);
console.log(result3);
// 深度拷贝范例1
var family = {father:'xuzulong',mother:'zhaolian',girlfriend:'tianhongxi'};
var myself = {name:'xuxin',age:25,family};
function deepcopy(n){
    var newObj = {};
    for (const key in n) {
        if (typeof n[key] === 'number'
        ||typeof n[key] === 'string'
        ||typeof n[key] === 'boolean'
        ||typeof n[key] === 'null'
        ||typeof n[key] === 'undefined') {
            newObj[key] = n[key];   
        }else{
            newObj[key] = deepcopy(n[key]);
        }
    }
    return newObj;
}
var myself2 = deepcopy(myself)
family.girlfriend = 'xiaoxixi';
console.log(myself);
console.log(myself2);
// 深度拷贝范例2
function deepCopy2(oldObj) {
	var newObj = {}
	newObj = JSON.parse( JSON.stringify(oldObj) )
	return newObj
}
// 浅度拷贝范例
var myself = {name:'xuxin',age:25,city:'chendu'};
function copy(n){
    var newObj = {};
    for (const key in n) {
        if (n.hasOwnProperty(key) ){
            newObj[key] = n[key];    
        }
    }
    return  newObj;
}
var myself2 = copy(myself)
myself.city = 'yibin';
console.log(myself);
console.log(myself2);
// 使用数组拼接出如下字符串 ，其中styles数组里的个数不定
// var prod = {
//     name: '女装',
//     styles: ['短款', '冬季', '春装']
// };
// function getTpl(data){
// //todo...
// };
// var result = getTplStr(prod);  //result为下面的字符串
// <dl class="product"><dt>女装</dt><dd>短款</dd<dd>冬季</dd><dd>春装</dd></dl>
var prod = {
    name: '女装',
    styles: ['短款', '冬季', '春装']
};
function getTpl(data){
    var dl = '<dl class="product">';
    var dt = '<dt>';
    var dd = '<dd>';
    var enddl = '</dl>';
    var enddt = '</dt>';
    var enddd = '</dd>';
    var str = '';
    for (const key in data) {
        if (data.name == data[key]) {
            str =str + dl + dt + data[key] + enddt;  
        }else{
            for (let i = 0; i < prod.styles.length; i++) {
                str =str + dd + prod.styles[i] + enddd;  
            }
        }
    }
    str = str + enddl;
    return str
} 
var result = getTpl(prod); 
console.log(result);
prod.styles = ['短款', '冬季', '春装','连衣裙','包包'];
var result2 = getTpl(prod); 
console.log(result2);

// 补全如下代码,让输出结果为字符串: hello\\饥人谷
// var str = //补全代码
// // console.log(str)
var str = 'hello\\\\饥人谷'
console.log(str)

// 写一个函数，判断一个字符串是回文字符串，如 abcdcba是回文字符串, abcdcbb不是
var str1 = 'abcdcba';
var str2 = 'abcdcbb';
function IsHuiwen(n){
    return n === n.split('').reverse().join('');
}
console.log(IsHuiwen(str1));
console.log(IsHuiwen(str2));

// 写一个函数，统计字符串里出现出现频率最多的字符
var str = 'sdgsfsfsdfsff,sdf,slgks;fs,flsdgjasilfd';
function useFrequent(n){
        var obj = {};
        var time = 0;
        var maxvalues = '';
    for (var i = 0;i<n.length;i++) {
        if (obj[n[i]]) {
            obj[n[i]]++;
        }else{
            obj[n[i]] = 1;
        }
    }
    for (const key in obj) {
        if (obj[key]>time) {
        time = obj[key];
        maxvalues = key;  
        }
    }
    return {使用最多的字符:maxvalues,使用次数:time};
}
console.log(useFrequent(str));

// 写一个camelize函数，把my-short-string形式的字符串转化成myShortString形式的字符串，如
// camelize("background-color") == 'backgroundColor'
// camelize("list-style-image") == 'listStyleImage'
var str = "background-color";
function camelize(n) {
    var newStr = n.split('-');
    for (const key in newStr) {
        if (key > 0) {
            newStr[key] = newStr[key].replace(newStr[key][0],newStr[key][0].toUpperCase());
        }
    }
    return newStr.join('');
}
console.log(camelize(str));

// 写一个 ucFirst函数，返回第一个字母为大写的字符 （***）
var str = 'hunger';
function ucFirst(n) {
    var newStr = n.replace(n[0],n[0].toUpperCase());
    return newStr;
}
console.log(ucFirst(str));

// 写一个函数truncate(str, maxlength), 如果str的长度大于maxlength，会把str截断到maxlength长，并加上...，如
// truncate("hello, this is hunger valley,", 10) == "hello, thi...";
// truncate("hello world", 20) == "hello world"
var str1 = 'hello, this is hunger valley';
var str2 = 'hello world';
function truncate(str,maxlength) {
    var end = '...';
    var newStr = '';
    if (str.length>maxlength) {
        newStr = str.substr(0,maxlength)+ end;
    } else{
        newStr = str;
    }
    return newStr;
}
console.log(truncate(str1,10));
console.log(truncate(str2,20));


// 写一个函数，返回从min到max之间的 随机整数，包括min不包括max 
function random(min,max){
    return min+Math.floor(Math.random()*(max-min));
}

// 写一个函数，返回从min都max之间的 随机整数，包括min包括max 
function random2(min,max){
    return min+Math.floor(Math.random()*(1+max-min));
}

// 写一个函数，生成一个长度为 n 的随机字符串，字符串字符的取值范围包括0到9，a到 z，A到Z。
function random(min,max){
    return min+Math.floor(Math.random()*(max-min));
}
function randomID(len){
    var dict = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomID = '';
    for (let i = 0; i < len; i++) {
        randomID = dict[random(0,62)] + randomID;  
    }
    return randomID;
}
console.log(randomID(10));

// 写一个函数，生成一个随机 IP 地址，一个合法的 IP 地址为 0.0.0.0~255.255.255.255
function random(min,max){
    return min+Math.floor(Math.random()*(max-min));
}
function randomIP(){
    var randomIP = [];
    for (let i = 0; i < 4; i++) {
        randomIP.push(random(0,256));  
    }
    return randomIP.join('.');
}
console.log(randomIP());

// 写一个函数，生成一个随机颜色字符串，合法的颜色为#000000~ #ffffff
function random(min,max){
    return min+Math.floor(Math.random()*(max-min));
}
function randomColor(){
    var dict = '0123456789abcdef';
    var randomColor = '';
    for (let i = 0; i < 6; i++) {
        randomColor =randomColor + dict[random(0,16)];  
    }
    return  '#' + randomColor;
}
console.log(randomColor());

// 用splice实现push\pop\shift\unshift
var arr = [1,2,3,4,5,6];
arr.splice(6,0,'x');  //等效于arr.push('x')
arr.splice(5,1)  //等效于arr.pop()
arr.splice(0,1)  //等效于arr.shift()
arr.splice(0,0,'x') //等效于arr.unshift('x')

// 写一个函数，操作数组，数组中的每一项变为原来的平方，在原数组上操作
function squareArr(arr){
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i]*arr[i];
    }
    return arr;
}
var arr = [2, 4, 6]
console.log(squareArr(arr))

// 写一个函数，操作数组，返回一个新数组，新数组中只包含正数，原数组不变
function filterPositive(arr){
    var a2 = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0 && typeof(arr[i]) === 'number') {
            a2.push(arr[i]); 
        }
    }
    return a2;
}
var arr = [3, -1,  2,  '饥人谷', true]
var newArr = filterPositive(arr)
console.log(newArr)
console.log(arr)

// 写一个函数，计算设定的日期与当前日期的时间差。
function getTimecha(time){
    var time = new Date(time);
    var now = new Date();
    var timecha = now - time;
    var seconds;
    var minutes;
    var hours;
    var days;
    var months; 
    var years;
    if (timecha < 0) {
        timecha = Math.abs(timecha);
        seconds = Math.floor(timecha/1000)%60;
        minutes = Math.floor((timecha/1000)/60)%60;
        hours = Math.floor(((timecha/1000)/60)/60)%24;
        days = Math.floor((((timecha/1000)/60)/60)/24)%30;
        months = Math.floor(((((timecha/1000)/60)/60)/24)/30)%12;
        years = Math.floor((((((timecha/1000)/60)/60)/24)/30)/12);
        return '据今天还有' + years + '年' +  months + '月' + days + '日' + hours + '小时' + minutes + '分钟' + seconds + '秒';
    }else{
        seconds = Math.floor(timecha/1000)%60;
        minutes = Math.floor((timecha/1000)/60)%60;
        hours = Math.floor(((timecha/1000)/60)/60)%24;
        days = Math.floor((((timecha/1000)/60)/60)/24)%30;
        months = Math.floor(((((timecha/1000)/60)/60)/24)/30)%12;
        years = Math.floor((((((timecha/1000)/60)/60)/24)/30)/12);
        return '距当时过去了' + years + '年' +  months + '月' + days + '日' + hours + '小时' + minutes + '分钟' + seconds + '秒';
    }
}
console.log(getTimecha('2019-05-25'));

// 把YY-MM-DD格式的日期变成中文日期
function getChsDate(date){
	var newDate =date.split("-"),
		year = newDate[0],
		month = newDate[1],
		day = newDate[2];
	var dict ={"0":"零","1": "一", "2": "二", "3": "三","4": "四","5": "五","6": "六","7": "七", "8": "八", "9": "九", "10": "十", "11": "十一", "12": "十二","13": "十三", "14": "十四",  "15": "十五", "16": "十六", "17": "十七", "18": "十八", "19": "十九","20": "二十","21": "二十一", "22": "二十二", "23": "二十三", "24": "二十四",  "25": "二十五","26": "二十六", "27": "二十七", "28": "二十八", "29": "二十九", "30": "三十", "31": "三十一"};
return dict[year[0]]+dict[year[1]]+dict[year[2]]+dict[year[3]] + '年' + dict[Number(month)] +'月' + dict[Number(day)] + '日';
};
getChsDate('2015-01-08');

// 根据输入的时间与现在的时间差距，做出不同的中文判断。
function timelag(old){
    var old = new Date(old);
    var now = new Date();
    var timecha = now - old;
    var timelag = '';
    if (timecha/1000/60 <= 1){
        return timelag = '刚刚';
    }else if (timecha/1000/60 <= 3){
        return timelag = '3分钟前';
    }else if (timecha/1000/60 <= 60){
        return timelag = '1小时前';
    }else if (timecha/1000/60/60 <= 8){
        return timelag = '8小时前';
    }else if (timecha/1000/60/60/24 <= 3){
        return timelag = '3天前';
    }else if (timecha/1000/60/60/24 <= 30){
        return timelag = '1个月前';
    }else if (timecha/1000/60/60/24/30 <= 12){
        return timelag = '1年前';
    }else { return timelag = '超过1年';}
}
console.log(timelag('2017.12.05'))

// 对一个数组进行升序或者降序排列
var arr = [1,5,15,62,10,-1,-53];
arr.sort (function (a,b){
    return b - a ;
})      // 降序
arr.sort (function (a,b){
    return a - b ;
})      // 升序

// 对一个含有字符串的对象集数组进行升序或者降序排列
var arr = [
    {name:'xx',age:25},
    {name:'df',age:25},
    {name:'xed',age:22},
    {name:'fde',age:21},
    {name:'aef',age:28},
];
arr.sort (function (o1,o2){
    if ((o1.name > o2.name) ){
        return 1;
    }else return -1;
})      //升序

// forEach的使用
var arr = [
    {name:'xx',age:25},
    {name:'df',age:25},
    {name:'xed',age:22},
    {name:'fde',age:21},
    {name:'aef',age:28},
];
arr.forEach(function(value,index){                  ////名字中有X字符的人的年龄加30岁
    if (value.name.indexOf('x') !== -1){
    if (value.name.indexOf('x') !== -1){
        return value.age = value.age + 30;
    }
}})

// map的使用(会生成新数组)
var arr = [
    {name:'xx',age:25},
    {name:'df',age:25},
    {name:'xed',age:22},
    {name:'fde',age:21},
    {name:'aef',age:28},
];
var newarr = arr.map(function(value){              //名字中有X字符的人的年龄加30岁，生产新组
    if (value.name.indexOf('x') !== -1){
        return { name:value.name , age:(value.age + 30)};
    }else {
        return value
    }
})

// filter的使用(会生成新数组)
var arr = [
    {name:'xx',age:25},
    {name:'df',age:25},
    {name:'xed',age:22},
    {name:'fde',age:21},
    {name:'aef',age:28},
];
var newarr = arr.filter(function(value){    //删除大于25岁的人
    if(value.age <= 25){
        return value;
    }
})

// reduce的使用,rightreduce同理
var arr = [1,1,1,2];
var number = arr.reduce(function(x,y){
    return 2*x + 3*y ;
})
number

// 写一个函数，测试某年是否为闰年
function leap(y){
    var date = new Date(y+'-02-29');
    return date.getDate() === 29
}
console.log(leap(2000));
console.log(leap(2004));
console.log(leap(2005));
console.log(leap(2006));

// 3的平方是9,9的平方式81
var str = '3的平方是9,9的平方式81';
str = str.replace(/\d+/g,function(num){
      return num * num  
})
str

// 写一个函数isValidUsername(str)，判断用户输入的是不是合法的用户名（长度6-20个字符，只能包括字母、数字、下划线）
var name = '156161611fdsfsf'
function isValidUsername(name){
    var reg = /^\w{6,20}$/;
    if (reg.test(name)){ 
        if (/^[1-9]{6,20}$/.test(name)
        ||/^[a-z]{6,20}$/.test(name)
        ||/^[A-Z]{6,20}$/.test(name)
        ||/^_{6,20}$/.test(name)) {
            return false;
        }else return true;
    } return false;
}
isValidUsername(name);

//写一个正则表达式，得到如下字符串里所有的颜色
var subj = "color: #121212; background-color: #AA00ef; width: 12px; bad-colors: f#fddee ";
var reg= subj.match(/#[0-5a-fA-Z]{6}|#[0-5a-fA-Z]{3}(?!\w)/g);

//改写代码，让其输出[""hunger"", ""world""].
var str = 'hello  "hunger" , hello "world"';
var pat =  /"\w*"/g;
str.match(pat);

// BOM的常识
var header = document.querySelector ('body> .header');
var img = document.createElement('img');
img.setAttribute('src','\img\未点选-圆形选框.png');
header.appendChild(img);
header.innerHTML = '<p>first test</p>'
header.classList

// 如何选中如下代码所有的li元素？ 如何选中btn元素？
{/* <div class="mod-tabs">
   <ul>
       <li>list1</li>
       <li>list2</li>
       <li>list3</li>
   </ul>
   <button class="btn">点我</button>
</div> */}
// 不考虑兼容模式
var li = document.querySelectorAll('.mod-tabs li');
var btn = document.querySelector('.btn');
// 考虑兼容模式
var li = document.getElementsByTagName('li')
var btn = document.getElementsByClassName('btn')


// 有如下代码，要求当点击每一个元素li时控制台展示该元素的文本内容。不考虑兼容
{/* <ul class="ct">
    <li>这里是</li>
    <li>饥人谷</li>
    <li>前端6班</li>
</ul>
<script>
//todo ...
</script> */}
function $(e) {
    return document.querySelector(e);
};
function $$(e) {
    return document.querySelectorAll(e);
}
$('ul.ct').addEventListener('click',function(e){
    console.log(this.innerText);
})

// 补全代码，要求：
// 当点击按钮开头添加时在<li>这里是</li>元素前添加一个新元素，内容为用户输入的非空字符串；当点击结尾添加时在最后一个 li 元素后添加用户输入的非空字符串.
// 当点击每一个元素li时控制台展示该元素的文本内容。
// <ul class="ct">
//     <li>这里是</li>
//     <li>饥人谷</li>
//     <li>任务班</li>
// </ul>
// <input class="ipt-add-content" placeholder="添加内容"/>
// <button id="btn-add-start">开头添加</button>
// <button id="btn-add-end">结尾添加</button>
// <script>
// //你的代码
// </script>
function $(e) {
    return document.querySelector(e);
};
function $$(e) {
    return document.querySelectorAll(e);
}
$('ul.ct').addEventListener('click',function(e){
    console.log(this.innerText);
})
$('#btn-add-start').addEventListener('click',function(e){
    if ($('.ipt-add-content').value) {var li = document.createElement('li');
        li.innerText = $('.ipt-add-content').value;
        $('ul.ct').insertBefore(li, $('ul.ct').children[0]);
    }
}) 
$('#btn-add-end').addEventListener('click',function(e){
    if ($('.ipt-add-content').value) {var li = document.createElement('li');
        li.innerText = $('.ipt-add-content').value;
         $('ul.ct').appendChild(li);
    }
})  

// // 补全代码，要求：当鼠标放置在li元素上，会在img-preview里展示当前li元素的data-img对应的图片。
// // <ul class="ct">
// {/* <li data-img="./img/wow1.jpg" >鼠标放置查看图片1</li>
// <li data-img="./img/未点选-圆形选框.png">鼠标放置查看图片2</li>
// <li data-img="./img/点选-圆形选框.png">鼠标放置查看图片3</li> */}
// // </ul>
// // <div class="img-preview"></div>

function $$(e) {
  return document.querySelectorAll(e);
}
function $(e) {
  return document.querySelector(e);
};
for (let i = 0; i < $$('ul li').length; i++) {
  $$('ul li')[i].addEventListener('mouseenter',function(e){
    $('.img-preview').innerHTML = '<img src="'+$$('ul li')[i].getAttribute('data-img')+'">';
  }) 
}

// 原生js做模态框
// <!DOCTYPE html>
// <html>
// <head>
// <title>Event Propagation</title>

// <style type="text/css">
// html,body {
//   height: 100%;
//   }
// .ct {
//   position: absolute;
//   width: 200px;
//   height: 300px;
//   left: 50%;
//   top: 50%;
//   margin-left: -100px;
//   margin-top: -150px;
//   background: #ccc;
//   display: none;
// }
// .open {
//   display: block;
// }
// </style>

// </head>
// <body>
//   <button>点我</button>
//   <div class="ct"><span class="close">X</span></div>
// </body>
{/* <script type="text/javascript">
function $(e) {
    return document.querySelector(e);
  };

function open(e){
    $('.ct').style.display = 'block'
    e.stopPropagation();
  };

  function close(e) {
    $('.ct').style.display = 'none'
    e.stopPropagation();
  }
$('button').addEventListener('click',open);
$('.ct').addEventListener('click',open);
$('body').addEventListener('click',close);
$('.close').addEventListener('click',close);
 </script> */}

// 老师的思路
 {/* function $(e) {
    return document.querySelector(e);
  };
    $('button').addEventListener('click',function(e){
      $('.ct').classList.add('open');
      e.stopPropagation();
    })
    $('.close').addEventListener('click',function(e){
      $('.ct').classList.remove('open');
    })
    $('body').addEventListener('click',function(e){
      $('.ct').classList.remove('open');
    })
    $('.ct').addEventListener('click',function(e){
      e.stopPropagation();
    })

</html> */}

// 闭包
var fnArr = [];
for (var i = 0; i < 10; i ++) {
    (function(i){
        fnArr[i] = function(){
            console.log(i)
        }
    })(i);
}
console.log(fnArr[3]());


// var fnArr = [];
// for (var i = 0; i < 10; i ++) {
//     fnArr[i] = function(i){
//         return function(){
//             console.log(i)
//         }
//     }(i);
// }
// console.log(fnArr[3]());

// 下面这段代码输出？如何输出delayer: 0, delayer:1...（使用闭包来实现）
// for(var i=0;i<5;i++){
// 	setTimeout(function(){
//          console.log('delayer:' + i );
// 	}, 0);
// 	console.log(i);
// }
for(var i=0;i<5;i++){
	setTimeout((function(i){
        return function(){
            console.log('delayer:' + i )};
	})(i), 0);
	console.log(i);
}

// 封装一个汽车对象
var Car = (function(){
    var speed = 0;
    function setSpeed(s){
        speed = s
    }
    function getSpeed(){
        return speed
    }
    return {
       setSpeed: setSpeed,
       getSpeed: getSpeed 
    }
 })()
 Car.setSpeed(30);
 Car.getSpeed(); //30

//  如何获取元素的真实宽高


// 判断用户浏览器类型
function isChrome(){
	return /Chrome/i.test(window.navigator.userAgent)
}


// 封装一个ajax
ajax({
    url: 'http://api.jirengu.com/weather.php',
    data: {
        city: '北京',
        work: 'IT',
        hometown: '宜宾'
    },
    type: 'get',
    dataType: 'json',
    onsuccess: function(ret){
        console.log(ret)
    },
    onerror: function(){
        console.log('服务器异常')
    }
})
function ajax(obj){
    var url = obj.url;
    var data = obj.data;   // 是个对象
    var type = obj.type || 'get';
    var dataType = obj.dataType || 'json';
    var onsuccess = obj.onsuccess || function(){};
    var onerror = obj.onerror || function(){};
    var xhr = new XMLHttpRequest();
    var arr = [];
    var str = '';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            arr.push(key+'='+data[key]) ;
        }
    }
    str ='?' + arr.join('&');
    if(type ==='get'){
        url = url + str;
        xhr.open(type,url,true);
        xhr.send();
    }else{
        xhr.open(type,url,true);
        xhr.send(str);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readystate===4 && (xhr.status>=200 
            ||xhr.status<300 
            || xhr.status ===304 )){
                if(dataType ==='json'){
                    onsuccess(JSON.parse(xhr.responseText));
                }else {
                    onsuccess(xhr.responseText);
                }
        }else {
            onerror();  // readystate会变化3次，所以每一次都会弹出
        }
    }
    xhr.onerror =  onerror;
}


// 给$node 添加自定义属性data-src
$node.data("src",str)

// 获取、设置$node 的宽度、高度(分别不包括内边距、包括内边距、包括边框、包括外边距)
$node.width();//不包括内边距宽度,仅包括内容
$node.height();//不包括内边距高度,仅包括内容
$node.innerWidth();//包括内容和内边距宽度
$node.innerHeight();//包括内容和内边距高度
$node.outerWidth();//包括内容,内边距,边框宽度
$node.outerHeight();//包括内容,内边距,边框高度
$node.outerHeight(true);//包括内容,内边距,边框,外边距高度
$node.outerWidth(true);//包括内容,内边距,边框,外边距宽度

// 获取窗口滚动条垂直滚动距离
$(window).scrollTop()
$(window).scrollLeft()

// 获取$node 到根节点水平、垂直偏移距离
$node.offset().left
$node.offset().top

// 如何判断一个元素是否出现在窗口可视范围（浏览器的上边缘和下边缘之间，肉眼可视）。写一个函数 isVisible实现
function isVisible(e){
    return e.offset().top <= $(window).height() + $(window).scrollTop() && e.offset().top >= $(window).scrollTop()
}

// 当窗口滚动时，判断一个元素是不是出现在窗口可视范围。在元素第一次出现时在控制台打印 true，以后再次出现不做任何处理。用代码实现
var isFirst = true;
$(window).on('scroll',function(){
    if(isFirst && isVisible($('this'))){
        console.log(true);
        isFirst = false;
    }
})