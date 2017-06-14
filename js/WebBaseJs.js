
/*
调用：<a href="javascript:void(0)" onClick="addBookmark(document.title)" target="_self">加入收藏</a>
*/

function addBookmark(title) {
			 var url=parent.location.href;
			 if (window.sidebar) { 
					window.sidebar.addPanel(title, url,""); 
			 } else if( document.all ) {
			 window.external.AddFavorite( url, title);
			 } else if( window.opera && window.print ) {
			 return true;
			 }
}



/*
调用：<a href="javascript:void(0)" onclick="SetHome(this,window.location)" target="_self">设为首页</a>
*/
function SetHome(obj,vrl){
        try{
                obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
        }
        catch(e){
                if(window.netscape) {
                        try {
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
                        }  
                        catch (e) 
 { 
                                alert("抱歉！您的浏览器不支持直接设为首页。请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为“true”，点击“加入收藏”后忽略安全提示，即可设置成功。");  
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',vrl);
                 }
        }
}

$(document).ready(function() {

	//首页banner箭头位置

	// ban 效果 

	var next1 = 0;

	var prev2 = 0;

	var click_shu = false;

	var str = "<li class='licurr'></li>"

	$(function() {

		var li_width = $("#ban .ban_bj").width();

		// 获取ban 滚动就是 li 的宽度

		$('#ban .ban_bj li').not(':first').css({
			left: li_width
		});

		// 获取 li的个数 也就是 发、滚动的次数

		li_shu = $('#ban .ban_bj li').length;

		for(var i = 1; i < li_shu; i++) {

			str = str + "<li></li>";

		}

		$(".ul_dian").html(str);

		// 自动 滚动 定时器

		movezi = window.setInterval(function() {

			zimove(prev2, next1);

		}, 5000)

		// 触碰 下面小图（就是触碰停止 自动滚动 离开启动 自动滚动 代码）

		$('#ban ul.ul_dian li').hover(function() {

			clearInterval(movezi)

		}, function() {

			movezi = window.setInterval(function() {

				zimove(prev2, next1);

			}, 5000);

		}) /**/

		// 触碰 banner（就是触碰停止 自动滚动 离开启动 自动滚动 代码）

		$('.ban_bj li').hover(function() {

			clearInterval(movezi);

		}, function() {

			movezi = window.setInterval(function() {

				zimove(prev2, next1);

			}, 5000);

		})

		$('.jiantou div').hover(function() {

			clearInterval(movezi);

		}, function() {

			movezi = window.setInterval(function() {

				zimove(prev2, next1);

			}, 5000);

		})

		$(".jiantou .jiantou_left").click(function() {

			if(next1 <= 0) {

				next1 = li_shu - 1;

				prev2 = 0;

			} else {

				prev2 = next1;

				next1 = next1 - 1;

			}

			moveleft(prev2, next1);

		});

		$("#flexslider").hover(function() {

			$(".jiantou").css("display", "inline-block");

		}, function() {

			$(".jiantou").hide(10)

		});

		$(".jiantou .jiantou_right").click(function() {

			if(next1 >= (li_shu - 1)) {

				next1 = 0;

				prev2 = li_shu - 1;

			} else {

				prev2 = next1;

				next1 = next1 + 1;

			}

			moveright(prev2, next1);

		});

		// 点击 下面小图 执行的代码

		$('#ban ul.ul_dian li').click(function() {

			// 这个是获取 点击小图标 是第几个 返回的数 bannercurrIndex 就是 prev2

			var bannercurrIndex = $('#ban ul.ul_dian li').index(this);

			// 这个就是  自动滚动 代码

			moveright(next1, bannercurrIndex);

			// 这样 是为了  下面 执行 滚动

			next1 = bannercurrIndex;

		})

	})

	//首页向   右   自动移动

	function moveright(_prev, _next) {

		li_width = $("#ban .ban_bj").width();

		$('#ban .ban_bj li').eq(_next).addClass("on").siblings().removeClass("on");

		$('#ban .ban_bj li').eq(_prev).stop(true, false).animate({
			left: -li_width
		}, 1000, function() {})

		// 小图标 remove add  .Class

		$('#ban ul.ul_dian li').eq(_prev).removeClass('licurr');

		$('#ban ul.ul_dian li').eq(_next).addClass('licurr');

		$('#ban .ban_bj li').eq(_next).css({
			left: li_width
		}).stop(true, false).animate({
			left: 0
		}, 1000, function() {

			click_shu = false;

		})

	}

	//首页向  左   自动移动

	function moveleft(_prev, _next) {

		li_width = $("#ban .ban_bj").width();

		$('#ban .ban_bj li').eq(_next).addClass("on").siblings().removeClass("on");

		$('#ban .ban_bj li').eq(_prev).stop(true, false).animate({
			left: li_width
		}, 1000, function() {})

		$('#ban ul.ul_dian li').eq(_prev).removeClass('licurr');

		$('#ban ul.ul_dian li').eq(_next).addClass('licurr');

		$('#ban .ban_bj li').eq(_next).css({
			left: -li_width
		}).stop(true, false).animate({
			left: 0
		}, 1000, function() {

			click_shu = false;

		})

	}

	// 自动移动 实际 执行代码

	function zimove() {

		if(next1 >= (li_shu - 1)) {

			next1 = 0;

			prev2 = li_shu - 1;

		} else {

			prev2 = next1;

			next1 = next1 + 1;

		}

		moveright(prev2, next1);

	}

	$(document).ready(function(e) {

		$('.flex_comBtn').hover(function() {

			window.clearInterval(movezi)

		}, function() {

			movezi = window.setInterval(function() {

				zimove(prev2, next1);

			}, 5000)

		})

	});

})
$(function(){
	$('.content_left ul li').click(function(){
		$(this).addClass('bacolor').siblings().removeClass('bacolor')
		$(this).find('a').addClass('fontcolor').parent().siblings().find('a').removeClass('fontcolor')
	})
})
$(function(){
        //ul里头的li中的keep，text都是绝对定位，要遮住img这个图片，keep是个遮罩层，text是遮罩层内的文字
        //big里头的bigKeep是遮罩层，透明度为0
        var oBig = $('#box .big');
        var oBigKeep = oBig.find('.bigKeep');
        var aLi = $('#box ul li');
        oBig.hover(function(){
            oBigKeep.stop().animate({
                opacity:1
            },500);
        },function(){
            oBigKeep.stop().animate({
                opacity:0
            },500);

        })
        var oKeep,oText;
        aLi.hover(function(){
            oKeep = $(this).find('.keep');
            oText = $(this).find('.text');
            oKeep.stop().animate({
                opacity:0.8
            },300);
            oText.stop().animate({
                left:0,
                opacity:1
            },200);
        },function(){
            oKeep.stop().animate({
                opacity:0
            },300);
            oText.stop().animate({
                left:-170,
                opacity:0
            },200);

        })

    });

$(document).ready(function (){

        //点击小图切换大图
        $("#thumbnail li a").click(function(){
            $(".zoompic img").hide().attr({ "src": $(this).attr("href"), "title": $("> img", this).attr("title") });
            $("#thumbnail li.current").removeClass("current");
            $(this).parents("li").addClass("current");
            return false;
        });
        $(".zoompic>img").load(function(){
            $(".zoompic>img:hidden").show();
        });

        //小图片左右滚动
        var $slider = $('.slider ul');
        var $slider_child_l = $('.slider ul li').length;
        var $slider_width = $('.slider ul li').width();
        $slider.width($slider_child_l * $slider_width);

        var slider_count = 0;
        //一开始默认的情况下，如果不够五张图片的话，我们的上一张是点不动的
        if ($slider_child_l < 5) {
            $('#btn-right').css({cursor: 'auto'});
            $('#btn-right').removeClass("dasabled");
        }
        //当我们开始点击下一张的时候，点击的次数记录，不够五张和超过了数量，不再进行累加。
        $('#btn-right').click(function() {
            //不够五张图的情况或者是点击的次数超过了被隐藏的图片数量了，就不再进行累加了
            if ($slider_child_l < 5 || slider_count >= $slider_child_l - 5) {
                return false;
            }

            slider_count++;
            $slider.animate({left: '-=' + $slider_width + 'px'}, 'fast');
            slider_pic();
        });
        //上一张的情况下，如果当前的点击次数为0，也就是没有点击下一张的初始情况下，点击次数为0，我们也不进行累减。
        $('#btn-left').click(function() {
            if (slider_count <= 0) {
                return false;
            }
            slider_count--;
            $slider.animate({left: '+=' + $slider_width + 'px'}, 'fast');
            slider_pic();
        });

        function slider_pic() {
            //到达最后一张图片的时候
            if (slider_count >= $slider_child_l - 5) {
                $('#btn-right').css({cursor: 'auto'});
                $('#btn-right').addClass("dasabled");
            }
            //点来点去的情况下，正规点击的时候
            else if (slider_count > 0 && slider_count <= $slider_child_l - 5) {
                $('#btn-left').css({cursor: 'pointer'});
                $('#btn-left').removeClass("dasabled");
                $('#btn-right').css({cursor: 'pointer'});
                $('#btn-right').removeClass("dasabled");
            }
            //到达第一张图的情况下
            else if (slider_count <= 0) {
                $('#btn-left').css({cursor: 'auto'});
                $('#btn-left').addClass("dasabled");
            }
        }

    });
$(function(){
	$('.more').hover(function(){
		$(this).css('opacity',1)
	},function(){
		$(this).css('opacity',0.8)
	})
})