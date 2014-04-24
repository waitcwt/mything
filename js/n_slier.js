
    function slider($opt){
       this.conf = $.extend({
            ul:$('.scrollArea ul'),
            li:$('.scrollArea li'),
            sleft:-540,
            slength:695,
            timer:'',
            dely:4000,
            canClick:true
        },$opt)
    }
    slider.prototype.slide=function(dir){
        var conf = this.conf , that = this,tleft = parseInt(conf.ul.css('left'));
            if(!conf.canClick)return false; 
            conf.canClick = false;
            var edge = dir ? (-(conf.li.length*2-3)*conf.slength+conf.sleft) : conf.sleft; 
            var releft = dir ? tleft+(conf.li.length)*conf.slength : tleft-(conf.li.length)*conf.slength; 
            var slength = dir ? -conf.slength : conf.slength;
            if(parseInt(tleft)==edge){
                conf.ul.css('left',releft+'px');
                tleft = releft;
            }
            conf.ul.animate({'left':(tleft+slength)+'px'},800,'swing',function(){that.conf.canClick = true;});
    }
    slider.prototype.loop=function(){
          that = this;
          this.conf.timer = setTimeout(function(){
                that.slide(1);
                that.loop();
            },that.conf.dely);
    }
    slider.prototype.start=function(){
         this.conf.ul.append(this.conf.li.clone());
         this.loop();
    }
    slider.prototype.stop=function(){
         if(this.conf.timer)clearTimeout(this.conf.timer);
    }
    slider.prototype.btnclk=function(dir){
        if(this.conf.timer)clearTimeout(this.conf.timer);
            this.slide(dir);
            this.loop();
    }

