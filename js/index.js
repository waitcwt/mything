define(function(require,exports,module){
    var indexSlider = function(options){
        var conf = $.extend({
            focusHand:$('.focusimg .imgL'),
            childSelector:'li',
            btnHand:$('.focusbtn'),
            btnHover:'.hover',
            timeItd:5000,
            current:0,
            index:0,
            canClick:true,
            ocur:0,
            timer:'',
            hoverTimer:''
        },options),
        btnTop = conf.btnHand.find(conf.btnHover).height(),
        Length = conf.focusHand.find(conf.childSelector).width(),
        liSize = conf.btnHand.find(conf.childSelector).length-1,
        btnHandli = conf.btnHand.find(conf.childSelector);
        btnHandli.click(function(){
            if(!conf.canClick) return;
            conf.canClick = false;
            var cur = $(this).data('type')-1;
            if(cur !=conf.current && (cur !=4 || conf.current!=-1))
            indexSlider.scroll(cur);
        });
        btnHandli.mouseenter(function(){
            if(!conf.canClick) return;
            var cur = $(this).data('type')-1;
            btnHandli.eq(conf.ocur).animate({top:0}).stop();
            indexSlider.enter(cur);
            indexSlider.stop();
        });
        btnHandli.mouseleave(function(){
            if(!conf.canClick) return;
            var cur = $(this).data('type')-1;
            if(cur !=conf.current && (cur !=4 || conf.current!=-1))
                indexSlider.leave(cur);
            conf.ocur = cur;
            indexSlider.start();
        });
        conf.focusHand.find(conf.childSelector).hover(function(){
            indexSlider.stop();
        },function(){
            indexSlider.start();
        });
        return {
        start:function(){
            conf.timer = setTimeout(
                function(){
                    conf.current++;
                    indexSlider.scroll(conf.current);
                    indexSlider.start();
                },conf.timeItd)
        },
        stop : function(){
            if(conf.timer)clearTimeout(conf.timer); 
            conf.canClick = true;
        },
        scroll : function(current){
            conf.current = current >=liSize ? -1 : current<0 ? liSize-1 : current;
            var index = conf.index,
            startSlide = current > index ? -(current-1)*Length : -(current+1)*Length ,
            slide =  -current*Length;
            btnHandli.eq(index).find(conf.btnHover).animate({top:0},150,'swing');
            btnHandli.eq(current).find(conf.btnHover).animate({top:-btnTop},300,'swing');
            conf.focusHand.css('margin-left',startSlide+'px').animate({marginLeft:slide+'px'},400,'swing',function(){conf.canClick=true;});
            conf.index = current;
        },
        enter:function(current){
            conf.hoverTimer = setTimeout(function(){
                btnHandli.eq(current).find(conf.btnHover).animate({top:-btnTop},350,'swing');
            },150);
        },
        leave:function(current){
            if(conf.hoverTimer)clearTimeout(conf.hoverTimer);
            btnHandli.eq(current).find(conf.btnHover).animate({top:0},150,'swing');
        }
        }
    }();
    module.exports = indexSlider;
});
