$(document).ready(function(){
    $(".spread-btn").click(function () {
        $(this).parent().parent().parent().parent().find(".panel-body ").slideToggle(300);
        if($(this).hasClass("fold-btn")){
            $(this).html("&#xe64b;");
            $(this).removeClass("fold-btn");
        }
        else {$(this).html("&#xe9c0;");$(this).addClass("fold-btn");}
    });
	/*面板工具操作结束*/
});

var yuhui={
		refashdiv:function(url,divid){
			var objhtml=$.ajax({
				url:yuhui.getUrl()+url,
			    cache:false,
			    async:false,
			    success:function(){
			    }
			    
			});
			$(divid).html(objhtml.responseText);
		},
		getUrl:function(){
			var baseUrl=window.document.location.pathname;
			baseUrl=baseUrl.substring(0,baseUrl.substr(1).indexOf('/')+2);
			return baseUrl;
		},
		go:function(url){
			window.location.href = url;
		},
		goDownload : function(url){
	    	var HostUrl=window.document.location.host;
	    	 if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8.") { 
					 window.location.href('http://'+HostUrl+'/file'+url);
	    	 }else{
	    		 	window.open('http://'+HostUrl+'/file'+url);
	    	 }
	    	
		},
		exportExcel:function(url){
			 if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8.") { 
					 window.location.href(url);
	    	 }else{
	    		 	window.open(url);
	    	 }
		}, fileUploadDataShow : function(type,data,file,Iconflag){
			var htmlInner = "";
			 if(type == "审批评估" || type == "售前立项审批"){
				 htmlInner =  '<tr>'
		                +'<td class="hover" title="点击查看文件">'
		                +$.setFiletypeIcon(file.ext)+"<span>"+data.fileName+'</span></td>'
		                +'<td class=""><div class="bor_cor1"><input class="table_inp"  class="table_inp" type="text"></div></td>'
		                +'<td class="">'+data.fileSize+'</td>'
		                +'<td class="">'+data.updateTime+'</td>'
		                +'<td class="">'+data.userName+'</td>'
		       	     	+'<td style="display:none">'+file.ext+'</td>'
		                +'<td style="display:none">'+data.filePath+'</td>'
		                +'<td style="display:none"></td>'
		                +'<td class="tools_box">';
//								+'<i class="float_L iconfont" title="下载" onclick=\'downloadFile("'+data.filePath.split(":")[1]+'")\'>&#xe604;</i>'
								if(Iconflag === "false"){
									htmlInner+='<i class="float_L iconfont" title="下载" onclick=\'downloadFile("'+data.filePath+'")\'>&#xe604;</i>';
								}
								htmlInner+='<i class="float_L iconfont del" title="删除" onclick=\'deleteFile("'+data.filePath+'",this)\'>&#xe6a5;</i>'
							+'</td>'
		           	+'</tr>';
		           	$("#uploadList").append(htmlInner);
		           	return;
			}
	    	 htmlInner =  '<tr>'
                +'<td class="hover" title="点击查看文件">'
                +$.setFiletypeIcon(file.ext)+"<span>"+data.fileName+'</span></td>'
                +'<td class="">'+data.userName+'</td>'
                +'<td class="">'+data.updateTime+'</td>'
                +'<td class="">'+data.fileSize+'</td>'
                +'<td style="display:none">'+data.filePath+'</td>'
			    +'<td style="display:none">'+file.ext+'</td>'
                +'<td class="tools_box">';
//						+'<i class="float_L iconfont" title="下载" onclick=\'downloadFile("'+data.filePath.split(":")[1]+'")\'>&#xe604;</i>'
						if(Iconflag === "false"){
							htmlInner+='<i class="float_L iconfont" title="下载" onclick=\'downloadFile("'+data.filePath+'")\'>&#xe604;</i>';
						}
						htmlInner+='<i class="float_L iconfont del" title="删除" onclick=\'deleteFile("'+data.filePath+'",this)\'>&#xe6a5;</i>'
					+'</td>'
           	+'</tr>';
           	$("#uploadList").append(htmlInner);
	    },
};

window.yuhui=yuhui;

Date.prototype.format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		//"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"h+" : this.getHours(), // 小时
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	var week = {
		"0" : "\u65e5",
		"1" : "\u4e00",
		"2" : "\u4e8c",
		"3" : "\u4e09",
		"4" : "\u56db",
		"5" : "\u4e94",
		"6" : "\u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f"
								: "\u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};


//子框架添加tab方法
function addTab(href,contit,id){

	var f = false;
	$('#J_menuTabs a',window.top.document).each(function() {
		//alert($(this).data("id"));
		if($(this).data("id") == href){
			$(this).addClass("active").siblings(".J_menuTab").removeClass("active");
			
			$(".J_mainContent .J_iframe",window.top.document).each(function() {
				if($(this).data("id") == href) {
					$(this).show().siblings(".J_iframe").hide();
				}
			});
			f = true;
		}
	});

	if(f){
		return;
	}
	
	
    var p = '<a href="javascript:;"  class="J_menuTab active" " data-id="' + href + '">' + contit+ ' <i class="iconfont">&#xe66c;</i></a>';
    var n = '<iframe class="J_iframe" name="iframe' + id + '" width="100%" height="100%" src="' + href + '" frameborder="0" data-id="' + href + '" seamless style="display: inline"></iframe>';
    $_menuTabs=$("#J_menuTabs",window.top.document);
    $_menuTabs_a=$("#J_menuTabs a",window.top.document);
    $_menuTabs_a.removeClass("active",window.top.document);
    $_menuTabs.append(p);
    $_curFrame=$("#J_mainContent iframe",window.parent.document).css("display","none");
    $_mainContent=$("#J_mainContent",window.top.document);
    $_mainContent.append(n);
    
}

function removeTab(){
	var framTab = $("#J_menuTabs a[class='J_menuTab active'] i",window.parent.document);
	framTab.click();
}
