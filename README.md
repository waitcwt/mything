#marquee 实现了两种轮播首页大图方式#
* 1.lubo.js里面是滚筒式轮播，摘一个补一个
* 2.n_slierjs里面是复制了一份，实现方式比较简单

#网易游戏门户网站轮播
* 1.nie.js 实现的是nie.1630.com里面的轮播，实现方式不一样，事件处理干净，不会动画队列积累

#slider.html实现的是一小排走马灯式的轮播
*slider.js 实现可以定制使用参数
{
			wrap:$('div'),
      Handle:$('.scrollArea'),
			selector:'li',
			btnSelector:'li',
			btnLeft:'.left',
			btnRight:'.right',
			dir:0, 方向（0，是上下；1是左右）
			autoPlay:true,
			timer:5000，
			cnt:1 (一次轮播多少个）
	}
