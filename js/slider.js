function initSlider(option){
	var conf = {},that = this,maxLength=0,wraplength=0,btnRight='',btnLeft='';
	function slider(option){
		this.conf = $.extend({
			Handle:$('.scrollArea'),
			wrap:$('div'),
			selector:'li',
			btnSelector:'li',
			dir:0,
			autoPlay:true,
			timer:5000,
			timeItd:'',
			btnLeft:'.left',
			btnRight:'.right',
			canClick:true,
			current:0,
			index:0,
			slideLength:0,
			cnt:3
		},option);
	}
	slider.prototype.start= function() {
		this.bindEvent();
		this.calculate();
		if(this.conf.autoPlay){
			this.loop();
		}
	};
	slider.prototype.loop = function(){
		if(this.conf.autoPlay){
			conf.timeItd = setTimeout(function(){
				that.dodir(true);
				that.loop();
			},conf.timer)
		}
	};
	slider.prototype.stop = function(){
		if(this.conf.timeItd)
			clearTimeout(this.conf.timeItd);
	};
	slider.prototype.scroll = function(current){
		var slide = -conf.current*conf.slideLength*conf.cnt;
		this.btnplay(slide);
		if(conf.dir){
			conf.Handle.animate({marginLeft:slide+'px'},400,'swing',function(){conf.canClick=true;})
		}else{
			conf.Handle.animate({marginTop:slide+'px'},400,'swing',function(){conf.canClick=true;})
		}

	};
	slider.prototype.calculate = function(){
		conf.slideLength = conf.dir ? conf.Handle.find(conf.selector).width() : conf.Handle.find(conf.selector).height();
	};
	slider.prototype.btnplay= function(slide){
		if(Math.abs(slide)+wraplength>=maxLength){
			if(conf.autoPlay){
				conf.current = -1;
			}else{
				btnRight.hide();	
				btnLeft.show();
			}
		}
		else if(Math.abs(slide) == 0){
			btnLeft.hide();
			btnRight.show();	
		}else{
			btnRight.show();
			btnLeft.show();
		}
	};
	slider.prototype.dodir= function(flag){
		if(!conf.canClick) return;
		conf.canClick = false;
		flag ?  this.conf.current++ : this.conf.current --;
		this.scroll(conf.current);

	};
	slider.prototype.bindEvent= function(){
		conf = this.conf,that = this,maxLength = conf.dir ? conf.Handle.width() : conf.Handle.height(); 
		wraplength = conf.dir ? conf.wrap.width() : conf.wrap.height();
		btnLeft = conf.wrap.find(conf.btnLeft);
		btnRight = conf.wrap.find(conf.btnRight);
		btnLeft.click(function(){
			that.stop();
			that.dodir(false)
			that.loop();
		});
		btnRight.click(function(){
			that.stop();
			that.dodir(true)
			that.loop();
		});
	};
	return new slider(option);
}
