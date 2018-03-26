
function Barrel(obj){
    this.data = {
        keyword: obj.keyword || 'beijing',
        page: obj.page || 1,
        image_page: obj.imgPage || 15
    }
    this.url = obj.url || 'https://pixabay.com/api/?key=5856858-0ecb4651f10bff79efd6c1044&';
    this.arr = [];
    this.arrWidth = 0;
    this.ct = obj.ct || $('.wrapper');
    this.ctWidth = this.ct.width();
    this.basicHeight = 200;
    this.time = null;
    this.loadClock = false;
    this.getData();
}
Barrel.prototype = {
    getData: function(){
        if(this.loadClock){
            return;
        }
        this.loadClock = true;
        var self = this;
        $.get(self.url,self.data).done(function(ret){
            self.forEachNode(ret.hits)
            self.data.page += 1;
        }).fail(function(){
            alert('获取信息失败');
            this.loadClock = false;
        })
    },
    forEachNode: function(data){
        console.log(data)
        var self = this;
        $(data).each(function(i,o){
            var imgWidth = o.previewWidth;
            var imgHeight = o.previewHeight;
            var imgWidthChange = self.basicHeight*imgWidth/imgHeight;
            self.arrWidth += imgWidthChange;
            if(self.arrWidth> self.ctWidth){
                self.arrWidth -= imgWidthChange;
                self.render(self.arr);
                self.arr = [];
                self.arrWidth = imgWidthChange;
            }
            self.arr.push(o);
        })
    },
    render: function(arr){
        console.log(arr)
        var self = this;
        var noedeHeight = (this.ctWidth)/(this.arrWidth/this.basicHeight)
        var str = '';
        arr.forEach(function(o){
            str += `<img class="BarrelImg" src=${o.previewURL}></img>`;
        })
        var $node = $(str);
        $node.css({
            height:noedeHeight,
            padding: '5px',
            'box-sizing': 'border-box'
        });
        self.ct.append($node);
        if(self.time){
            window.clearTimeout(self.time)
        }
        self.time=window.setTimeout(function(){
            self.loadClock = false;
            LazyLoadBarrel.getData(self);
        },2500)
    } 
}
function LazyLoad(obj){
    this.getDataMethod = obj.getDataMethod || Barrel1.getData;
    this.ct = obj.ct || $('.wrapper');
    this.renderBtn();
    this.time = null;
}
LazyLoad.prototype = {
    renderBtn: function(source){
        $btn = $('<button class="btn"></button>').css({
            opacity:0,
            height: '100%'
        });
        this.ct.append($btn);
    },
    isVisible: function(){
        return $('.btn').offset().top <= $(window).height()+$(window).scrollTop()&&$('.btn').offset().top>$(window).scrollTop();
    },
    getData: function(source){
        var self = this;
        if(this.isVisible()){
            this.getDataMethod.call(source);
        }
        $(window).on('scroll',function(){
            if(self.time){
                window.clearTimeout(self.time)
            }
            self.time=window.setTimeout(function(){
                console.log(1)
                if(self.isVisible()){
                    self.getDataMethod.call(source);
                }
            },500)
        })
    }
}
var Barrel1 = new Barrel({});
var LazyLoadBarrel = new LazyLoad({
    getDataMethod: Barrel1.getData,
    ct: $('body')
})
