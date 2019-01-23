$(document).ready(function(){
   
		(function($) {
			
		/*让不支持placeholder输入提示的浏览器兼容开始*/
		
		  var placeholderfriend = {
		    focus: function(s) {
		      s = $(s).hide().prev().show().focus();
		      var idValue = s.attr("id");
		      if (idValue) {
		        s.attr("id", idValue.replace("placeholderfriend", ""));
		      }
		      var clsValue = s.attr("class");
		   if (clsValue) {
		        s.attr("class", clsValue.replace("placeholderfriend", ""));
		      }
		    }
		  }
		  //判断是否支持placeholder
		  function isPlaceholer() {
		    var input = document.createElement('input');
		    return "placeholder" in input;
		  }
		  //不支持的代码
		  if (!isPlaceholer()) {
		    $(function() {
		      var form = $(this);
		      //遍历所有文本框，添加placeholder模拟事件
		      var elements = form.find("input[type='text'][placeholder]");
		      elements.each(function() {
		        var s = $(this);
		        var pValue = s.attr("placeholder");
		  var sValue = s.val();
		        if (pValue) {
		          if (sValue == '') {
		            s.val(pValue);
		          }
		        }
		      });
		      elements.focus(function() {
		        var s = $(this);
		        var pValue = s.attr("placeholder");
		  var sValue = s.val();
		        if (sValue && pValue) {
		          if (sValue == pValue) {
		            s.val('');
		          }
		        }
		      });
		      elements.blur(function() {
		        var s = $(this);
		        var pValue = s.attr("placeholder");
		  var sValue = s.val();
		        if (!sValue) {
		          s.val(pValue);
		        }
		      });
		      //遍历所有密码框，添加placeholder模拟事件
		      var elementsPass = form.find("input[type='password'][placeholder]");
		      elementsPass.each(function(i) {
		        var s = $(this);
		        var pValue = s.attr("placeholder");
		  var sValue = s.val();
		        if (pValue) {
		          if (sValue == '') {
		            //DOM不支持type的修改，需要复制密码框属性，生成新的DOM
		            var html = this.outerHTML || "";
		            html = html.replace(/\s*type=(['"])?password\1/gi, " type=text placeholderfriend")
		              .replace(/\s*(?:value|on[a-z]+|name)(=(['"])?\S*\1)?/gi, " ")
		              .replace(/\s*placeholderfriend/, " placeholderfriend value='" + pValue
		              + "' " + "onfocus='placeholderfriendfocus(this);' ");
		            var idValue = s.attr("id");
		            if (idValue) {
		              s.attr("id", idValue + "placeholderfriend");
		            }
		            var clsValue = s.attr("class");
		   if (clsValue) {
		              s.attr("class", clsValue + "placeholderfriend");
		            }
		            s.hide();
		            s.after(html);
		          }
		        }
		      });
		      
		      elementsPass.blur(function() {
		        var s = $(this);
		        var sValue = s.val();
		        if (sValue == '') {
		          var idValue = s.attr("id");
		          if (idValue) {
		            s.attr("id", idValue + "placeholderfriend");
		          }
		          var clsValue = s.attr("class");
		    if (clsValue) {
		            s.attr("class", clsValue + "placeholderfriend");
		          }
		          s.hide().next().show();
		        }
		      });
		    });
		  }
		  window.placeholderfriendfocus = placeholderfriend.focus;
		})(jQuery);    
		/*让不支持placeholder输入提示的浏览器兼容结束*/
    
    $('.date_picker_wrap .date_icon').click(function(){
    	//让时间控件输入框的日历图标点击等同于点击输入框本身展开选择器
    	$(this).siblings('input.form-control').focus();
    })
     $('.date_picker_wrap .date_remove').click(function(){
    	//清空时间输入框内的值
    	$(this).siblings('input.form-control').val('');
    })   
    
 		//TAB切换栏开始    	
 	$('.tab_wrap').each(function(){
 		$(this).find('.tab_menu_ctn').eq(0).addClass('active');//默认选中第一个菜单;
 		$(this).find('.tab_ctn').eq(0).addClass('active');//默认选中第一个选项卡内容;	 	
 	})
 	$('.tab_wrap .tab_menu .tab_menu_ctn').eq(0).addClass('active')	
 	$('.tab_wrap .tab_ctn').eq(0).addClass('active')
    $('.tab_wrap .tab_menu .tab_menu_ctn').click(function(){
    	var tab_wrap=$(this).parents('.tab_wrap');
    	var this_index=$(this).index();
    	
    	tab_wrap.find('.tab_ctn').eq(this_index).addClass('active').siblings('.tab_ctn').removeClass('active');
    	tab_wrap.find('.tab_menu_ctn').eq(this_index).addClass('active').siblings('.tab_menu_ctn').removeClass('active');
    })
    	//TAB切换栏结束  
    	
	  $('.form_list_cs .form_control input,.form_list_cs .form_control select,.form_list_cs .form_control textarea').focus(function(){
	  	$(this).parents('.form_control').addClass('active');
	  }).blur(function(){
	  	$(this).parents('.form_control').removeClass('active');
	  	var this_partent = $(this).parents('.form_control');
	  	var this_valid_msg = this_partent.find("p");
	  	
	  })


	//盒子工具操作关闭按钮
    $(".close-btn").click(function () {
        $(this).parentsUntil(".ibox_cs_box").hide();
    })
	//盒子工具操作折叠按钮
/*    $("body").on('click','.fs-btn',function () {
        if($(this).hasClass("fold-btn")){
            $(this).parents(".ibox_cs").find(".in_ibox_cs_flod>div").removeClass("in_ibox_css_echarts");
            conDivHeight= $(this).parents(".ibox_cs").find(".in_ibox_cs_flod>div").outerHeight();
            titleHeight=$(this).parents(".ibox_cs").find(".ibox_title_box").outerHeight();
            $(this).parents(".ibox_cs").find(".in_ibox_cs_flod").height(conDivHeight);
            contentHeight=$(this).parents(".ibox_cs").find(".in_ibox_cs_flod").outerHeight();
            iboxHeight=titleHeight+contentHeight;
            $(this).parents(".ibox_cs").animate({height:iboxHeight});
            $(this).html("&#xe64b;");
            $(this).removeClass("fold-btn");
            $(this).parentsUntil(".ibox_cs_box").find(".ibox_title_box").removeClass("ibox_title_box_nb");
        }
        else {$(this).html("&#xe9c0;");$(this).addClass("fold-btn");
            $(this).parentsUntil(".ibox_cs_box").find(".ibox_title_box").addClass("ibox_title_box_nb");
            $(this).parents(".ibox_cs").animate({height:"50px"});
            $(this).parents(".ibox_cs").find(".in_ibox_cs_flod>div").addClass("in_ibox_css_echarts");
        }
    });*/
    
    $("body").on('click','.ibox_title_box',function () {
        /*if($(this).hasClass("fold-btn")){*/
       	if($(this).children('.ibox_tools').find('.fs-btn').hasClass("fold-btn")){
            $(this).parents(".ibox_cs").find(".in_ibox_cs_flod>div").removeClass("in_ibox_css_echarts");
            conDivHeight= $(this).parents(".ibox_cs").find(".in_ibox_cs_flod>div").outerHeight();
            /*titleHeight=$(this).parents(".ibox_cs").find(".ibox_title_box").outerHeight();*/
            titleHeight=$(this).outerHeight();
            $(this).parents(".ibox_cs").find(".in_ibox_cs_flod").height(conDivHeight);
            contentHeight=$(this).parents(".ibox_cs").find(".in_ibox_cs_flod").outerHeight();
            iboxHeight=titleHeight+contentHeight;
            $(this).parents(".ibox_cs").animate({height:iboxHeight});
            /*$(this).html("&#xe64b;");*/
            $(this).children('.ibox_tools').find('.fs-btn').html("&#xe64b;");
            /*$(this).removeClass("fold-btn");*/
            $(this).children('.ibox_tools').find('.fold-btn').removeClass("fold-btn");
            /*$(this).parentsUntil(".ibox_cs_box").find(".ibox_title_box").removeClass("ibox_title_box_nb");*/
            $(this).removeClass("ibox_title_box_nb");
        }
        else {/*$(this).html("&#xe9c0;");$(this).addClass("fold-btn");*/
        	  $(this).children('.ibox_tools').find('.fs-btn').html("&#xe9c0;");                                                                           			  $(this).children('.ibox_tools').find('.fs-btn').addClass("fold-btn");
            /*$(this).parentsUntil(".ibox_cs_box").find(".ibox_title_box").addClass("ibox_title_box_nb");*/
           $(this).addClass("ibox_title_box_nb");
            $(this).parents(".ibox_cs").animate({height:"50px"});
            $(this).parents(".ibox_cs").find(".in_ibox_cs_flod>div").addClass("in_ibox_css_echarts");
           
        }
    });

   /* $("body").on('click','.ibox_title_box',function () {
        if($(".fs-btn").hasClass("fold-btn")){  //通过箭头去进行判断
            $(this).parents(".ibox_cs").find(".in_ibox_cs_flod>div").removeClass("in_ibox_css_echarts");
            conDivHeight= $(this).parents(".ibox_cs").find(".in_ibox_cs_flod>div").outerHeight();
            titleHeight=$(this).parents(".ibox_cs").find(".ibox_title_box").outerHeight();
            $(this).parents(".ibox_cs").find(".in_ibox_cs_flod").height(conDivHeight);
            contentHeight=$(this).parents(".ibox_cs").find(".in_ibox_cs_flod").outerHeight();
            iboxHeight=titleHeight+contentHeight;
            $(this).parents(".ibox_cs").animate({height:iboxHeight});
            $(".fs-btn").html("&#xe64b;");
            $(".fs-btn").removeClass("fold-btn");
            $(".fs-btn").parentsUntil(".ibox_cs_box").find(".ibox_title_box").removeClass("ibox_title_box_nb");
        }
        else {$(".fs-btn").html("&#xe9c0;");$(".fs-btn").addClass("fold-btn");
            $(".fs-btn").parentsUntil(".ibox_cs_box").find(".ibox_title_box").addClass("ibox_title_box_nb");
            $(this).parents(".ibox_cs").animate({height:"50px"});
            $(this).parents(".ibox_cs").find(".in_ibox_cs_flod>div").addClass("in_ibox_css_echarts");
        }
    });*/
    
});

//如果超时就处理 ，指定要跳转的页面  
$(document).ajaxComplete(function(event,obj,settings){
 $.ajaxSetup({   
     contentType:"application/x-www-form-urlencoded;charset=utf-8",   
     complete:function(XMLHttpRequest,textStatus){   
         var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
         if(sessionstatus=="timeout"){   
        	 location.href = yuhui.getUrl() +'/index/sendRedirectloginUI.do';
             }   
          }   
     });  
})


