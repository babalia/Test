/*调整左边导航高度,出现滚动条*/
function sidebarH(){
   var winH=$(window).height()-$(".sidebar_top_logo").height();
   $("ul.page-sidebar-menu").height(winH);
}
$(window).load(function(){
	sidebarH();
		
			//查看用户信息开始
			$('.page_header_user_box').click(function(){
				$('#user_information').show().animate({right:'10px'},300);
			})
			$('#user_information .close_btn').click(function(){
				$('#user_information').animate({right:'-500px'},300,function(){
					$(this).hide()
				})
			})
			//查看用户信息结束
			
			$("ul.page-sidebar-menu > li > ul.sub-menu>li").click(function() {

				$(this).addClass("open").siblings().removeClass("open");
				
			})
						
			$(".page-sidebar-menu > li >a").click(function(){
			//2级别菜单展开时更换箭头方向
				var ic=$('.page-sidebar-menu > li >a').not(this);

				if ($(this).siblings(".sub-menu").is(":hidden")) {
						ic.find("span.arrow").html("&#xe60b;")
						$(this).find("span.arrow").html("&#xe614;")
				} else{
					$(this).find("span.arrow").html("&#xe60b;")
				}				
				
				
			})
						
			$('ul.page-sidebar-menu > li > ul.sub-menu > .sub-menu_2').click(function(){
				var ic=$('ul.page-sidebar-menu > li > ul.sub-menu > .sub-menu_2').not(this);
				if ($(this).children(".sub-menu").is(":hidden")) {
					     ic.removeClass("open");

						ic.find("span.arrow").html("&#xe60b;")
						$(this).find("span.arrow").html("&#xe614;")
				} else{
					$(this).find("span.arrow").html("&#xe60b;")
				}
				//3级别菜单展开时更换箭头方向
				  ic.find(".sub-menu").hide()
				

			})
			
			//窗口标签栏部分
			$('.J_mainContent').height($(window).height()-103);  
				$('#close_tab_btn').click(function(){
						if ($('#close_tab_menu').is(':visible')) {
							$('#close_tab_menu').hide();
							$(this).removeClass('open');
							
						} else{
							$('#close_tab_menu').show();
							$(this).addClass('open');
							
						}
						
					}).mouseleave(function(){
						$('#close_tab_menu').hide()
					})
		}).resize(function(){
					$('.J_mainContent').height($(window).height()-103);  
				})	
				//左边导航出现树向滚动条
				
$(window).resize(function () {
    sidebarH();
})	

//退出系统
function loginout(){
	 $.confirm('确定要退出吗?',function(){
	 	document.getElementById("exit").click(); 
	 });
}
//修改密码
function updatePsw(){
	$('#user_information').animate({right:'-500px'},300,function(){
		$(this).hide()
	});
	$.post('sysManage/formWPossword', {id:$("#userId").val()},function(htmlInner){
		  layer.open({
		      type: 1,
			  title: ['修改密码', 'font-size:16px;'],
			  skin: 'my_layerSkin_window', //自定义皮肤 
			  area: ['50%', 'auto'], //宽高
			  scrollbar:false,//是否允许浏览器出现滚动条
			  shadeClose:true,
		      content: htmlInner
		  });
	});
}
				
				
				
				
				
				
				
				
				
				
				
				
				
				
