$(window).load(function(){
	//左侧导航栏的高度
	$("#s_menu").height($(window).height()-154);
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
				if ($(this).siblings(".first-sub").is(":hidden")) {
						ic.find("span.arrow").html("&#xe60b;")
						$(this).find("span.arrow").html("&#xe614;")
				} else{
					$(this).find("span.arrow").html("&#xe60b;")

				}				
				
			})
			
			
				$(".sub-menu > li >a").click(function(){
				
			//3级别菜单展开时更换箭头方向
				var ic=$('.sub-menu  > li >a').not(this);

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
							$(this).removeClass('open')
						} else{
							$('#close_tab_menu').show();
							$(this).addClass('open')
						}
						
					}).mouseleave(function(){
						$('#close_tab_menu').hide()
					})
		}).resize(function(){
					$('.J_mainContent').height($(window).height()-103);  
				})	
