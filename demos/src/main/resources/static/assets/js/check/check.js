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
var nullP = "<p class='valid_msg'>不能空哦</p>";
var param = {
			selectError: ["","请选择"],
            digits: [/^\d+$/, "请填写数字"]
            ,letters: [/^[a-z]+$/i, "请填写字母"]
            ,date: [/^\d{4}-\d{2}-\d{2}$/, "请填写有效的日期，格式:yyyy-mm-dd"]	
            ,time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请填写有效的时间，00:00到23:59之间"]
            ,email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "请填写有效的邮箱"]
            ,url: [/^(https?|s?ftp):\/\/\S+$/i, "请填写有效的网址"]
            ,qq: [/^[1-9]\d{4,}$/, "请填写有效的QQ号"]
            ,IDcard: [/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, "请填写正确的身份证号码"]
            ,tel: [/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, "请填写有效的电话号码"]
            ,mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"]
            ,zipcode: [/^\d{6}$/, "请检查邮政编码格式"]
            ,chinese: [/^[\u0391-\uFFE5]+$/, "请填写中文字符"]
            ,username: [/^\w{3,20}$/, "请填写3-20位数字、字母、下划线"]
            ,password: [/^[\S]{6,16}$/, "请填写6-16位字符，不能包含空格"]
            ,accept: function (element, params){
                if (!params) return true;
                var ext = params[0],
                    value = $(element).val();
                return (ext === '*') ||
                       (new RegExp(".(?:" + ext + ")$", "i")).test(value) ||
                       this.renderMsg("只接受{1}后缀的文件", ext.replace(/\|/g, ','));
            	}
            };
$(document).ready(function(){
	// 获取所有input
	$("form").children("li").children("input").each(function(index ,value){
		$(value).focusout(function(){
			/*
			*	开始当前点击input 校验
			*	this: 当前input
			*/
			checkInputVal($(this),index);
		});
	});
	$("form").children("li").children("select").each(function(index, value){
		$(value).on("select2:close", function (e) { 
			checkSelect($(this),index);
		});  
	});
});

// select 校验开始 -----------------------
function checkSelect(select, index){
	if('*' == select.prev().children().text()){
		if (select.val() != '请选择') {
			select.parent().removeClass("error success").addClass("form_control success");
			select.parents('.form_control').find('.valid_msg').remove();
			return judgeSelect[index] = 'true';
		} else {
			select.parent().removeClass("error success").addClass("form_control error");
			var errorP = "<p class='valid_msg'>"+param.selectError[1]+"</p>";
			select.parents('.form_control').find('.valid_msg').remove();
			select.parent().append(errorP);
			return judgeSelect[index] = retFalse;
		}
	}
}
// select 校验结束 --------------------------

// 校验 开始--------------
function checkInputVal(input, index){
	if('*' == input.prev().children().text()){
		
		if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8.") {
			// ie placeholder 值实例为字体问题 强制处理 - 不通过
			if ($.trim(input.val()) == input.attr("placeholder")) {
				input.parent().removeClass("error success").addClass("form_control error");
				input.siblings('.valid_msg').remove();
				input.parent().append(nullP);
				return judge[index] = retFalse;
			}
		}
		
		// title值是空, 那么就不需要判断正则.检查是否为空即可
		if(input.attr("title") == "" || input.attr("title") == undefined){
			if($.trim(input.val()) != "" && input.val().length != 0 ){
				input.parent().removeClass("error success").addClass("form_control success");
				input.siblings('.valid_msg').remove();
				return judge[index] = retTrue;
			} else {
				input.parent().removeClass("error success").addClass("form_control error");
				input.siblings('.valid_msg').remove();
				input.parent().append(nullP);
				return judge[index] = retFalse;
			}
		}
		
		// title值不为空
		if(input.attr("title") != "" || input.attr("title") != undefined){
			// 判断是否为空
			if($.trim(input.val()) != "" && input.val().length != 0 ){
				// 获取当前input 标签中的title值
				var title = input.attr("title");
				// 获取当前input 标签中的value值
				var value = input.val();
				// 正则判断
				if(param[title][0].test(value)){
					input.parent().removeClass("error success").addClass("form_control success");
					input.siblings('.valid_msg').remove();
					return judge[index] = retTrue;
				} else {
					input.parent().removeClass("error success").addClass("form_control error");
					var errorP = "<p class='valid_msg'>"+param[title][1]+"</p>";
					input.siblings('.valid_msg').remove();
					input.parent().append(errorP);
					return judge[index] = retFalse;
				}
			} else {
				input.parent().removeClass("error success").addClass("form_control error");
				input.siblings('.valid_msg').remove();
				input.parent().append(nullP);
				return judge[index] = retFalse;
			}
		}
	}
}
// 校验 结束 -----------------------------------

	
// 重置
function checkReset(){
	// 清空所有提示样式
	$("form").children("li").each(function(index ,value){
		$(value).children("p").remove();
		$(value).removeClass("error success");
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
	// 获取所有input 进行验证
	$("form").children("li").children("input").each(function(index ,value){
		checkInputVal($(this),index);
	});
	$("form").children("li").children("select").each(function(index, value){
		checkSelect($(this), index);
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