
indexSlide = {
    data : {
        Handle:$('.scrollArea'), 
        boxul:$('.scrollArea ul'), 
        Ele:$('.scrollArea li'),
        timer:null,
        stime:6000,
        odir:'',
        flag:false,
        Swidth:$('.scrollArea li').width()
    },
    scroll:function(dir){
        if(this.data.flag) return;
        this.data.flag = true;
        var that = this;
        slength = dir ? '-'+this.data.Swidth+'px':this.data.Swidth+'px';
        // 正向
        if(dir){
        //方向如果和以前方向不一致就不用把第一个元素移走
            if(dir==this.data.odir){
                $('.scrollArea li:eq(0)').remove().appendTo(this.data.boxul).css('margin-left','');
            }
            $('.scrollArea li:eq(0)').animate({'marginLeft':slength},1000,'swing',function(){
                that.data.flag=false;
                that.data.odir = dir; 
            }); 
        }else{
            //反向
            if(dir == this.data.odir){
                $('.scrollArea li:last-child').remove().prependTo(that.data.boxul).css('margin-left','-'+slength); 
            }
            $('.scrollArea li:eq(0)').animate({'marginLeft':0},1000,'swing',function(){
                that.data.flag=false;
                $('.scrollArea li:eq(1)').css('margin-left',''); 
                that.data.odir = dir 
            });
        }
    },

    start:function(){
        that=this;
        this.timer=setTimeout(function(){
        //  that.scroll(1);
        //  that.start();
        },this.data.stime)
    },
    stop:function(){
        clearTimeout(this.timer);
    },
    clk:function(dir){
        clearTimeout(this.timer);
        this.scroll(dir);
        this.start();
    }
}
