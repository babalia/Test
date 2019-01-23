/*
 * author: jiangju
 * data: 2017/1/5
 * Effect: 公用校验 
 * Edition: 1.3
 */
var arrayKey = [];
var judge = [];
var judgeSelect = [];
var retFalse = 'false';
var retTrue = 'true';
var nullP = "<p class='font_red'>不能空哦</p>";
var param = {
			selectError: ["","请选择"],
            digits: [/^\d+$/, "请填写数字"],
            digits2: [/^\d{0,2}$/ , "请填写2位数字"],
            digits20: [/^([1-9]|1[0-9]|20)$/ , "请填写1到20分"],
            digits30: [/^([12][0-9]|30|[1-9])$/ , "请填写1到30分"],
            digits50: [/^([1234][0-9]|50|[1-9])$/ , "请填写1到50分"]
            ,letters: [/^[a-z]+$/i, "请填写字母"]
            ,date: [/^\d{4}-\d{2}-\d{2}$/, "请填写有效的日期，格式:yyyy-mm-dd"]	
            ,time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请填写有效的时间，00:00到23:59之间"]
            ,email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "请填写有效的邮箱"]
            ,url: [/^(https?|s?ftp):\/\/\S+$/i, "请填写有效的网址"]
            ,qq: [/^[1-9]\d{4,}$/, "请填写有效的QQ号"]
            ,IDcard: [/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, "请填写正确的身份证号码"]
            ,tel: [/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, "请填写有效的电话号码"]
            ,mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"]
			,char200:[ /^[\s]|[\S]{0,200}$/,"不能超过200字"]
            ,zipcode: [/^\d{6}$/, "请检查邮政编码格式"]
            ,chinese: [/^[\u0391-\uFFE5]+$/, "请填写中文字符"]
            ,username: [/^\w{3,20}$/, "请填写3-20位数字、字母、下划线"]
            ,password: [/^[\S]{6,16}$/, "请填写6-16位字符，不能包含空格"]
			,price:[/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,"请正确输入金额,最多两位小数"]
            ,accept: function (element, params){
                if (!params) return true;
                var ext = params[0],
                    value = $(element).val();
                return (ext === '*') ||
                       (new RegExp(".(?:" + ext + ")$", "i")).test(value) ||
                       this.renderMsg("只接受{1}后缀的文件", ext.replace(/\|/g, ','));
            	}
            };
$(function(){
	// 获取所有input
	$(".basic-infoh").find("dl").children("dt").find("input").each(function(index ,value){
		$(value).focusout(function(){
			/*
			*	开始当前点击input 校验
			*	this: 当前input
			*/
			checkInputVal($(this),index);
		});
		$(value).change(function(){
			/*
			*	开始当前点击input 校验
			*	this: 当前input
			*/
			checkInputVal($(this),index);
		});
	});
	
	// 获取所有input
	$(".basic-infoh").find("dl").children("dt").find("textarea").each(function(index ,value){
		$(value).focusout(function(){
			/*
			*	开始当前点击input 校验
			*	this: 当前input
			*/
			checkInputVal($(this),index);
		});
	});
	
	$(".basic-infoh").find("dl").children("dt").find("select").each(function(index, value){
		$(value).on("select2:close", function (e) { 
			checkSelect($(this),index);
		});  
	});
	
	$(".bor_cor1").find("input").each(function(index ,value){
		$(value).focusout(function(){
			checkTableVal($(this),index);
		});
		$(value).change(function(){
			checkTableVal($(this),index);
		});
	});
	$(".bor_cor1").find("select").each(function(index ,value){
		$(value).on("select2:close", function (e) { 
			checkTableVal($(this),index);
		}); 
	});
});

// select 校验开始 -----------------------
function checkSelect(select, index){
	if(select.attr("valid") != "" && select.attr("valid") != undefined && select.attr("valid")=='notNull'){
		if (select.val() != '请选择' && select.val() != '') {
			select.parents('dt').removeClass("error success").addClass("form_control success");
			select.parents('dt').children('.font_red').remove();
			
			return judgeSelect[index] = 'true';
		} else {
			select.parents('dt').removeClass("error success").addClass("form_control error");
			select.parents('dt').children('.font_red').remove();
			var errorP = "<p class='font_red'>"+param.selectError[1]+"</p>";
			select.parents('dt').append(errorP);
			return judgeSelect[index] = retFalse;
		}
	}
}

//表格验证
function checkTableVal(input, index){
	
	if(input.attr("valid") != "" && input.attr("valid") != undefined ){
		var titleArr = input.attr("valid").split(",");
		//多个验证条件的，逐个验证
		for(var i=0;i<titleArr.length;i++){
			// 获取当前input 标签中的title值
			var title = titleArr[i];
			//不为空验证
			if(title=='notNull'){
				if($.trim(input.val()) != "" && input.val().length != 0 ){
					input.parents('.bor_cor1').removeClass('bor_cor_red');
					input.parents('.bor_cor1').find('span.iconfont').removeClass('font_red');
					input.parents('.bor_cor1').find('span.date_icon').removeClass('boder_r_red');
					input.parents('.bor_cor1').find('i').removeClass('boder_r_red').removeClass('font_red');
					return judge[index] = 'true';
				}else{
					input.parents('.bor_cor1').addClass('bor_cor_red');
					input.parents('.bor_cor1').find('span.iconfont').addClass('font_red');
					input.parents('.bor_cor1').find('span.date_icon').addClass('boder_r_red');
					input.parents('.bor_cor1').find('i').addClass('boder_r_red').addClass('font_red');
					return judge[index] = retFalse;
				}
			}else{
				//正则验证
				var value = input.val();
				if($.trim(input.val()) != "" && input.val().length != 0 ){
					if(param[title][0].test(value)){
						input.parents('.bor_cor1').removeClass('bor_cor_red');
						input.parents('.bor_cor1').find('span.iconfont').removeClass('font_red');
						input.parents('.bor_cor1').find('span.date_icon').removeClass('boder_r_red');
						input.parents('.bor_cor1').find('i').removeClass('boder_r_red').removeClass('font_red');
						return judge[index] = 'true';
					}else{
						input.parents('.bor_cor1').addClass('bor_cor_red');
						input.parents('.bor_cor1').find('span.iconfont').addClass('font_red');
						input.parents('.bor_cor1').find('span.date_icon').addClass('boder_r_red');
						input.parents('.bor_cor1').find('i').addClass('boder_r_red').addClass('font_red');
						return judge[index] = retFalse;
					}
				}
			}
		}
		
		
	}
}
// select 校验结束 --------------------------

// 校验 开始--------------
function checkInputVal(input, index){
		
		/*if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8.") {
			// ie placeholder 值实例为字体问题 强制处理 - 不通过
			if ($.trim(input.val()) == input.attr("placeholder")) {
				input.parent().removeClass("error success").addClass("form_control error");
				input.siblings('.valid_msg').remove();
				input.parent().append(nullP);
				return judge[index] = retFalse;
			}
		}*/
		// title值不为空,进行校验
		if(input.attr("valid") != "" && input.attr("valid") != undefined){
			var titleArr = input.attr("valid").split(",");
			//多个验证条件的，逐个验证
			for(var i=0;i<titleArr.length;i++){
				// 获取当前input 标签中的title值
				var title = titleArr[i];
				if(title=="notNull"){
					if($.trim(input.val()) != "" && input.val().length != 0 ){
						//input.removeClass("bor_cor_red");
						input.parents('dt').removeClass("error success").addClass("form_control success");
						input.parents('dt').children('.font_red').remove();
						
					} else {
						//input.addClass("bor_cor_red");
						input.parents('dt').removeClass("error success").addClass("form_control error");
						input.parents('dt').children('.font_red').remove();
						input.parents('dt').append(nullP);
						return judge[index] = retFalse;
					}
				}else{
					// 获取当前input 标签中的value值
					var value = input.val();
					if($.trim(input.val()) != "" && input.val().length != 0 ){
						// 正则判断
						if(param[title][0].test(value)){
							input.parents('dt').removeClass("error success").addClass("form_control success");
							input.parents('dt').children('.font_red').remove();
						} else {
							input.parents('dt').removeClass("error success").addClass("form_control error");
							input.parents('dt').children('.font_red').remove();
							var errorP = "<p class='font_red'>"+param[title][1]+"</p>";
							input.parents('dt').append(errorP);
							return judge[index] = retFalse;
						}
					}
					
				}
				
			}
			return judge[index] = retTrue;
			
		}
}
// 校验 结束 -----------------------------------

	
// 重置
function checkReset(){
	// 清空所有提示样式
	$(".basic-infoh").find("dl").children("dt").each(function(index ,value){
		$(value).removeClass("error success").addClass("form_control success");
		$(value).find('.font_red').remove();
		//除去表格验证红色框
		$('.bor_cor1').removeClass('bor_cor_red');
		$('.bor_cor1').find('i').removeClass('boder_r_red').removeClass('font_red');
		$('.bor_cor1').find('span.iconfont').removeClass('font_red');
		$('.bor_cor1').find('span.date_icon').removeClass('boder_r_red');
	});
	
}
//input 的值为‘’ add by zhu.chunsen
function resetValue(){
	// 清空所有的值

	$("input[type='text']").val("");
	$("textarea").val("");	
	
}
//input 的值为‘’ add by zhu.chunsen

// 返回值为 true 或者 false
function checkConfirm(){
	
	// 获取所有input
	$(".basic-infoh").find("dl").children("dt").find("input").each(function(index ,value){
			checkInputVal($(this),index);
	});
	
	// 获取所有input
	$(".basic-infoh").find("dl").children("dt").find("textarea").each(function(index ,value){
			checkInputVal($(this),index);
	});
	
	$(".basic-infoh").find("dl").children("dt").find("select").each(function(index, value){
			checkSelect($(this),index);
	});
	
	//表格验证
	$(".bor_cor1").find("input").each(function(index ,value){
			checkTableVal($(this),index);
	});
	$(".bor_cor1").find("select").each(function(index ,value){
			checkTableVal($(this),index);
	});
	
	for(var y = 0; y < judgeSelect.length; y++ ){
		if(retFalse == judgeSelect[y]){
			return retFalse;
		}
	}
	for(var i = 0; i < judge.length; i++){
		if(retFalse == judge[i]){
			return retFalse;
		}
	}
	checkReset();
	return retTrue;
}