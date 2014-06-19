    function initSlider(option){
        var conf = {},that = this,maxLength=0,wraplength=0,btnRight='',btnLeft='',direction='',btnHandle='',boxsize='',maxcnt=0,slideLength=0;
        function slider(option){
            this.conf = $.extend({
                wrap:$('.div1'),
                Handle:$('.scrollArea'),
                selector:'li',
                isbtn:false,
                dirbtn:$('.button'),
                btnHandle:$('.btnscroll'),
                btnselecot:'a',
                dir:1,
                autoPlay:false,
                timer:5000,
                timeItd:'',
                btnLeft:'.left',
                btnRight:'.right',
                shape:'slide',
                canClick:true,
                current:0,
                index:0,
                show:1,
                cnt:1     //一次滑动多少个
            },option);
        }
        slider.prototype.start= function() {
            this.calculate();
            conf.wrap.find(conf.dirbtn).hide();
            if(wraplength<maxLength){
                this.bindEvent();
                if(this.conf.autoPlay){
                    this.conf.shape==='slide' && (maxcnt%conf.cnt===0) ? this.copyDom() :'';
                    this.loop();
                }else{
                    conf.wrap.find(conf.dirbtn).find(conf.btnLeft).hide();
                }
            }
        };
        slider.prototype.loop = function(){
            if(this.conf.autoPlay){
                conf.timeItd = setTimeout(function(){
                    that.concrol(true);
                    that.loop();
                },conf.timer)
            }
        };
        slider.prototype.stop = function(){
            if(this.conf.timeItd)
                clearTimeout(this.conf.timeItd);
        };

        slider.prototype.concrol= function(flag){
            if(!conf.canClick) return;
            conf.canClick = false;
            flag ?  this.conf.current++ : this.conf.current --;
            conf.shape==='slide' ? this.scroll(conf.current) : this.fade(conf.current);
            var cur = conf.current > maxcnt-1 ? conf.current-(maxcnt) : conf.current;
            btnHandle.find(conf.btnselecot).eq(cur).addClass('cur').siblings().removeClass('cur');
        };
        slider.prototype.scroll = function(current){
            //如果是顺序轮播，就是当前margin + 需要轮播值
            var zslide = current>conf.index ? -slideLength*conf.cnt : slideLength*conf.cnt;
            var slide  = parseInt(conf.Handle.css(direction))+zslide;
            if(conf.autoPlay && maxcnt%conf.cnt===0){
                this.autoPlay(slide);
                slide  = parseInt(conf.Handle.css(direction))+zslide;
            }else{
                slide = this.noAuto(slide);
            }
            conf.Handle.animate(this.animateObj(direction,slide),400,'swing',function(){conf.canClick=true;});
            conf.index = conf.current;
        };
        slider.prototype.jumpscroll = function(current){
            var slide = -current*slideLength*conf.cnt;
            conf.Handle.animate(this.animateObj(direction,slide),400,'swing',function(){conf.canClick=true;});
            conf.index = conf.current;
        };
        slider.prototype.fade =function(current){
            conf.current = current > maxcnt-1 ? 0 : (current < 0 ? maxcnt-1 :current);
            conf.Handle.find(conf.selector).eq(conf.index).css('z-index',-1).fadeOut('normal',function(){conf.canClick =true;});
            conf.Handle.find(conf.selector).eq(conf.current).css('z-index',1).fadeIn('normal',function(){conf.canClick =true;});
            conf.index = conf.current;
        };
        slider.prototype.animateObj = function(animatedirection,slide){
            aobj = {};
            aobj[animatedirection] = slide+'px';
            return aobj;
        };

        slider.prototype.autoPlay = function(slide){
            //设置需要自动轮播 并且轮播个数能够被所有个数整除
            if(Math.abs(slide)+wraplength>2*maxLength){
                conf.Handle.css(direction,-(maxcnt-conf.show)*slideLength+'px');
                conf.current = maxcnt;
            }else if(slide>0){
                conf.Handle.css(direction,-maxLength+'px');
                conf.current = maxcnt-1;
            }
        };
        slider.prototype.noAuto= function(slide){
            if(conf.autoPlay){
                //如果是自动轮播，但是轮播个数不能被总个数整除
                if(conf.current>Math.ceil(maxcnt/conf.show)-1){
                    slide = 0;
                    conf.current=0;
                }else if(conf.current<0){
                    slide = -(Math.ceil(maxcnt/conf.show)-1)*slideLength*conf.cnt;
                    conf.current = Math.ceil(maxcnt/conf.show)-1;
                }
            }else{
                //不需要自动轮播
                if(Math.abs(slide)+wraplength>=maxLength){
                    btnRight.hide();	
                    btnLeft.show();	
                }
                else if(Math.abs(slide) == 0){
                    btnLeft.hide();
                    btnRight.show();	
                }else{
                    btnRight.show();
                    btnLeft.show();
                }
            }
            return slide;
        };
        slider.prototype.copyDom = function(){
            conf.Handle.append(conf.Handle.find(conf.selector).clone());
            conf.Handle.css(boxsize,2*maxcnt*slideLength+'px');
        }

        slider.prototype.calculate = function(){
            conf = this.conf;that = this;  
            slideLength = conf.dir ? conf.Handle.find(conf.selector).outerWidth(true) : conf.Handle.find(conf.selector).outerHeight(true);
            maxcnt = Math.ceil(conf.Handle.find(conf.selector).length);
            wraplength = conf.dir ? conf.wrap.width() : conf.wrap.height();
            direction = conf.dir ? 'marginLeft' :'marginTop';
            boxsize = conf.dir ? 'width' :'height';
            conf.Handle.css(boxsize,maxcnt*slideLength+'px');
            conf.show = Math.floor(wraplength/slideLength);
            maxLength = conf.dir ? conf.Handle.outerWidth(true):conf.Handle.outerHeight(true);
        };
        slider.prototype.bindEvent= function(){
            btnLeft = conf.wrap.find(conf.btnLeft);
            btnRight = conf.wrap.find(conf.btnRight);
            btnHandle = conf.wrap.find(conf.btnHandle);
            btnLeft.click(function(){
                that.concrol(false)
            });
            btnRight.click(function(){
                that.concrol(true)
            });
            btnHandle.find(conf.btnselecot).click(function(){
                if(!conf.canClick) return;
                var cur =  $(this).data('type');
                if(cur!=conf.current){
                    conf.current = cur;
                    $(this).addClass('cur').siblings().removeClass('cur');
                    conf.shape ==='slide' ?  that.jumpscroll(conf.current) : that.fade(conf.current);
                }
            });
            conf.wrap.hover(function(){
                that.stop();
                conf.wrap.find(conf.dirbtn).show();
            },function(){
                conf.wrap.find(conf.dirbtn).hide();11
                that.loop();
            });
        };
        return new slider(option);
    }
