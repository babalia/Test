var code; //在全局 定义验证码   
function createCode() {
    code = "";
    var codeLength = 4;//验证码的长度   
    var checkCode = document.getElementById("checkCode");
    var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//所有候选组成验证码的字符，当然也可以用中文的   
   
    for (var i = 0; i < codeLength; i++) {
        var charIndex = Math.floor(Math.random() * 36);
        code += selectChar[charIndex];
    }  
    //alert(code);
    if (checkCode) {
        checkCode.className = "code";
        checkCode.value = code;
    }
}
   
function validate() {
    var inputCode = document.getElementById("input1").value;
    if (inputCode.length <= 0) {
        alert("请输入验证码！");
    } else if (inputCode != code) {
        alert("验证码输入错误！");
    createCode();//刷新验证码   
    } else {
    alert("^-^ OK");
    }
}

$(document).ready(function(){
	if($("#msg").val()!="" && $("#msg").val()!=undefined){
		layer.alert($("#msg").val());
	}
	$('.user_name input:eq(0),.pass_word input:eq(0), .yanzm input:eq(0)').focus(function(event) {
		$(this).parent().addClass('active');
	});
	$("input").blur(function(){
	    $(this).parent().removeClass('active');
	  });
    /*点击按钮登录*/
    $("#login_btn").click(function() {
    	validatorForm();
    });
    /*键盘enter登录*/
    $("#loginForm").keydown(function() {
        if (event.keyCode == "13") {//keyCode=13是回车键
        	validatorForm();
        }
    });
    
   function validatorForm(){
		var userId = $("#username");
		var pwd = $("#password");
		var loginCode = $("input[name='loginCode']");
		var msg = "";
		if ($.trim(document.getElementById("username").value) == "") {
			msg = "用户名不能为空";
			userId.focus();
		} else if ($.trim(document.getElementById("password").value) == "") {
			msg = "密码不能为空";
			pwd.focus();
		} else if ($.trim(document.getElementById("code").value) == "") {
			msg = "验证码不能为空";
			createCode();
			loginCode.focus();
		} else if (document.getElementById("code").value.toUpperCase() != code) {
			msg = "验证码输入错误";
			createCode();
			loginCode.focus();
		}
		if (msg != "") {
			layer.alert(msg);
			return false;
		} else {
			/*
			var params = $("#loginForm").serialize();
			*/
			$("#loginForm").submit();
			$("#login_btn").text("正在登录中...");
		}
   }
   
   /*忘记密码开始*/ 
   $('#page1').click(function(){
	   		$("#username1").val("");
	   		$(".f_passw1").show();
		    $(".f_passw2").hide();
		    $(".f_passw3").hide();
		    $(".f_passw4").hide();
		 	var page1=layer.open({
			  type: 1,
			  title: '&nbsp;',
			  closeBtn: true,
			  skin: 'my_layerSkin_window', //自定义皮肤 
			  area: ['720px', '500px'], //宽高
			  content:$('#list'),//DOM对象
			  shade:false
			  /*offset : ['80%' , '70%']*/
			});
   })
   
   
   $('#page2').click(function(){
	    var username = $("#username1").val();
	    $("#username2").val(username);
	    if(username == ""){
	    	fail("请输入用户名");
	    	return;
	    }
	   $.ajax({
			url :"../user/forgetPwd4CW.do",
			type:"post",
			dataType:"json",
			data:{username:username},
			success :function(data){
				if(data.flag == '1'){
					$(".f_passw1").hide();
				    $(".f_passw2").show();
				    $("#id").val(data.user.id);
				    var mobile  = data.user.staff.mobile;
				    $("#mobile").val(mobile.substring(0,4)+"****"+mobile.substring(8,mobile.length));
				}else{
					fail("用户名不存在");
				}
			},fail:function(){
				fail("网络异常");
			}
	    });
	   event.stopPropagation();
   });
   
   $('#page3').click(function(){
	   $("#yespassWord").val("");
	   $("#passWord").val("");
	   if($("#SMSCODE").val()==null || $.trim($("#SMSCODE").val())==''){
		   fail("输入验证码");
		   return;
	   }
	   $.ajax({
			url :"../user/forgetPwd4CSMSP.do",
			type:"post",
			async: false,
			dataType:"json",
			data:{id:$("#id").val(),SMSCODE:$("#SMSCODE").val()},
			success :function(data){
				 if(data.flag == '0'){
					 $(".f_passw2").hide();
					 $(".f_passw3").show();
				 }else{
					 fail(data.result);
				 }
			},fail:function(){
				fail("网络异常");
			}
	    });
   });
   var  timeout;
   $('#page4').click(function(){
	   if($("#passWord").val() == ''){
		   fail("新密码没输入");
	   }  
	   if($("#yespassWord").val() == ''){
		   fail("确认密码没输入");
	   }
	   if($("#yespassWord").val() != $("#passWord").val()){
		   fail("两次密码输入不一致");
	   }
	   $.ajax({
			url :"../user/updatePsw.do",
			type:"post",
			async: false,
			dataType:"json",
			data:{passWord:$("#passWord").val(),id:$("#id").val(),updateType:"forget"},
			success :function(data){
				  $(".f_passw3").hide();
				  $(".f_passw4").show();
				   var timeIndex = 5;
				   $("username").val($("#username2").val());
				   $("password").val($("#passWord").val());
				   $("#checkCode").val(code); 
				   timeout = setInterval(function(){
					   timeIndex--; 
					   $("#timeout").text(timeIndex);
					   if(timeIndex == 0){
						   layer.closeAll();
						   clearInterval(timeout);
						   $(".f_passw4").hide();
						   $(".f_passw1").show();
					   }
				   },1000);
			},fail:function(){
				fail("网络异常");
			}
	    });
		   event.stopPropagation();
   });
   
   $('#getCode').click(function(){
	   $.ajax({
			url :"../user/forgetPwd4Mobile.do",
			type:"post",
			data:{username:$("#username2").val()},
			async: false,
			dataType:"json",
			success :function(data){
				if(data.flag == '0'){
					fail("网络异常");
					return ;
				}
			},fail:function(){
				fail("网络异常");
			}
	   });
	   time = setInterval(function(){
	    	  settime();	
	   },1000);
	  
   });
  
   /*忘记密码结束*/ 
   
    //成功
   function success(msg){
	   layer.msg(msg,{
	     	skin: 'my_layerSkin_succed',//皮肤设置，默认Layer自带样式
	     	closeBtn:1,//关闭按钮数量
	     	icon:0,//设置图标
	     	time:3000//设定自动消失时间毫秒/ms
	     });
   }
   
 	//失败
   function fail(msg){
	   layer.msg(msg,{
	     	skin: 'my_layerSkin_fail',//皮肤设置，默认Layer自带样式
	     	closeBtn:1,//关闭按钮数量
	     	icon:1, //设置图标
	     	time:5000//设定自动消失时间毫秒/ms 
	     });
   }
   
   //定时器
   var time;
   //倒计时
   var countdown=120;	
   function settime() { 
	   if (countdown == 0) { 
		   document.getElementById("getCode").disabled = false;    
		   document.getElementById("getCode").value="免费获取验证码"; 
		   countdown = 120; 
		   clearInterval(time);
	   } else { 
		   document.getElementById("getCode").disabled = true; 
		   document.getElementById("getCode").value="重新发送(" + countdown + "s)"; 
		   countdown--; 
	   } 
   }

})