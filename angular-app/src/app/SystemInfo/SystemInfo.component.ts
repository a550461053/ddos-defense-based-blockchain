import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
// import { MapOptions } from 'angular2-baidu-map';

// import * as $ from 'jquery';
// declare var $:any;

@Component({
	selector: 'app-SystemInfo',
	templateUrl: './SystemInfo.component.html'
	// ,
	// styleUrls: ['../../assets/css/master.css',
	// 	'../../../node_modules/bootstrap/dist/css/bootstrap.css'
	// 	// '../../assets/css/bootstrap.css'
	// ]
})

export class SystemInfoComponent {
	// options : MapOptions;
	title = '123 works!';
	constructor() {
		// this.options = {
		//   centerAndZoom: {
		//     lat: 39.92,
		//     lng: 116.40,
		//     zoom: 16
		//   },
		//   enableKeyboard: true
		// };


		// 此处引用：鼠标滚轮mousewheel插件
		// !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

		// $(function(){
		// 	// $(".nav-div a").click(function(){
		// 	// 	$(this).parent().addClass("active").siblings().removeClass("active");
		// 	// })
		// 	// $('section').bind('mousewheel', function(event, delta) {
		// 	// 	var topheight = $(document).scrollTop();
		// 	// 	//alert(topheight);
		// 	// 	if(topheight > 900){
		// 	// 		$(".dh-div").addClass("dh-main");
		// 	// 	}else if(topheight < 700 || topheihgt>1300){
		// 	// 		$(".dh-div").removeClass("dh-main");
		// 	// 	}
		// 	// 	if(topheight > 1600){
		// 	// 		$(".dh-div02").addClass("dh-main");
		// 	// 	}else if(topheight < 1300 || topheight > 1700){
		// 	// 		$(".dh-div02").removeClass("dh-main");
		// 	// 	}
		// 	// });
        //
		// 	$("a[href=#div02]").bind('click', function(){
		// 		$(".dh-div").removeClass("dh-main");
		// 		$(".dh-div").addClass("dh-main");
		// 	});
        //
		// });
        //
        //
		// $(".s06").bind('animationend',function(){
        //
		// 	$("#s01").removeClass('s01');
		// 	$("#s02").removeClass('s02');
		// 	$("#s03").removeClass('s03');
		// 	$("#s04").removeClass('s04');
		// 	$("#s05").removeClass('s05');
		// 	$("#s06").removeClass('s06');
		// 	setTimeout(function() {
		// 		$("#s01").addClass('s01');
		// 		$("#s02").addClass('s02');
		// 		$("#s03").addClass('s03');
		// 		$("#s04").addClass('s04');
		// 		$("#s05").addClass('s05');
		// 		$("#s06").addClass('s06');
		// 	}, 1000);
		// 	$(".system-before").addClass('system-beforeadd');
        //
		// });
        //
        //
		// $(".jty").bind('animationend',function(){
		// 	$(".stxt").addClass('stxtadd');
		// 	setTimeout(function() {
		// 		$(".jtx").addClass('jtxadd');
		// 		$(".system-now").addClass('system-nowadd');
		// 	}, 2000);
		// });
        //
        //
		// $(".snt2").bind('animationend',function(){
        //
		// 	$("#sn01").removeClass('sn01');
		// 	$("#sn02").removeClass('sn02');
		// 	$("#sn03").removeClass('sn03');
		// 	$("#sn04").removeClass('sn04');
		// 	$("#sn05").removeClass('sn05');
		// 	$("#sn06").removeClass('sn06');
		// 	$("#sn07").removeClass('sn07');
		// 	$("#sn08").removeClass('sn08');
		// 	$("#sn09").removeClass('sn09');
		// 	$("#sn10").removeClass('sn10');
		// 	$("#sn11").removeClass('sn11');
		// 	$("#sn12").removeClass('sn12');
		// 	$("#sn13").removeClass('sn13');
		// 	$("#sn14").removeClass('sn14');
		// 	$("#sn15").removeClass('sn15');
		// 	$("#sn16").removeClass('sn16');
		// 	$("#sn162").removeClass('sn162');
		// 	$("#sn163").removeClass('sn163');
		// 	$("#sn164").removeClass('sn164');
		// 	$("#snt1").removeClass('snt1');
		// 	$("#snt2").removeClass('snt2');
		// 	$("#sn20").removeClass('sn20');
		// 	$("#sn21").removeClass('sn21');
		// 	setTimeout(function() {
		// 		$("#sn01").addClass('sn01');
		// 		$("#sn02").addClass('sn02');
		// 		$("#sn03").addClass('sn03');
		// 		$("#sn04").addClass('sn04');
		// 		$("#sn05").addClass('sn05');
		// 		$("#sn06").addClass('sn06');
		// 		$("#sn07").addClass('sn07');
		// 		$("#sn08").addClass('sn08');
		// 		$("#sn09").addClass('sn09');
		// 		$("#sn10").addClass('sn10');
		// 		$("#sn11").addClass('sn11');
		// 		$("#sn12").addClass('sn12');
		// 		$("#sn13").addClass('sn13');
		// 		$("#sn14").addClass('sn14');
		// 		$("#sn15").addClass('sn15');
		// 		$("#sn16").addClass('sn16');
		// 		$("#sn162").addClass('sn162');
		// 		$("#sn163").addClass('sn163');
		// 		$("#sn164").addClass('sn164');
		// 		$("#sn20").addClass('sn20');
		// 		$("#sn21").addClass('sn21');
		// 		$("#snt1").addClass('snt1');
		// 		$("#snt2").addClass('snt2');
		// 	}, 1000);
        //
		// });
	}
}
