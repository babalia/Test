$.extend({
	          // 添加% - jiangju
	          TableFieldIsPercent:function(value,type){
	        	  if(value == null || value == "0"){
	        		   return "0%";
	        	   } else {
	        		   return (value.toFixed(6))+"%";
	        	   }
	          },
	          // 浮点数保留4位小数 - jiangju
	          TableFieldIsRetain:function(value,type){
	        	  if(value == null || value == "0"){
	        		  return "0";
	        	  } else {
	        		  return value.toFixed(6);
	        	  }
	          },
	          // 打开窗口2 add by zhu.chunsen 通用 20170119
	          windowOperUtil : function(windowName,htmlInner,param,id){
	        	  check2(id);
	        	  layer.open({
				    	title: [windowName, 'font-size:16px;'],
				        type: 1,
				        area: param,
				        scrollbar: false,
				        shadeClose: true, //点击遮罩关闭
				        maxmin:true,//放大窗口按钮
				        content: htmlInner
			      });
	          },
	          loadOneSelect4ajax : function(){
	        	//单选	 
	 			 $(".sel_menu").select2({
	 				/*开启多选功能：在ID标签处加上multiple="multiple"属性即可 */
	 			 });  
	          },
	          loadMoreSelect4ajax : function(){
	        	//多选
	 			 $(".sel_menu2").select2({
	 			 		width:'off',//设定宽度来源
	 				  closeOnSelect:false //每次选定后是否自动关闭选择项列表
	 			 });
	          },
	          loadOneSelect4ajax2NoSearch : function(){
	        	//单选	 
	 			 $(".sel_menu").select2({
	 				 minimumResultsForSearch: Infinity
	 				/*开启多选功能：在ID标签处加上multiple="multiple"属性即可 */
	 			 });
	          },
	          //清除新增缓存
	          reset : function(){
	  			$("form").children("li").children("input").each(function(index,value){
	  				$(value).val("");
	  			});
	  			$("form").children("li").children("select").each(function(index,value){
	  				$(value).val(null).trigger("change");
	  			});
	  			$("form").children(".form_control").children(".form_control_ctn").find("input").each(function(index,value){
	  				$(value).iCheck('uncheck');
	  			});
	  		},
	  		//公用查询表格
	  		loadTable4Data : function(tarId,url,columns,param){
	  			 $('#'+tarId).bootstrapTable('destroy'); 
	 		    
		    	 var loading =  $.loading();
			     
			        //初始化表格,动态从服务器加载数据  
			     $('#'+tarId).bootstrapTable({
			     	   striped:true,//设置为 true 会有隔行变色效果
		                searchAlign: "right",//查询框对齐方式
		                searchOnEnterKey: false,//回车搜索
		                showRefresh: false,//刷新按钮
		                showColumns: false,//列选择按钮
		                buttonsAlign: "right",//按钮对齐方式
		                toolbarAlign: "left",//工具栏对齐方式
				        height: $.tableHeight(),//高度调整
			            method: 'post',                      
			            toolbar: '#toolbar', 
			            striped: true,                      //是否显示行间隔色
			            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			            pagination: true,                   //是否显示分页（*）
			            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
			            pageNumber:1,  	                   //初始化加载第一页，默认第一页
			            pageSize: 15, 
			            pageList: [ 15,20, 50, 100, 'All'],   //分页步进值                   
			            minimumCountColumns: 2,             //最少允许的列数
			            hideColumn: "ID",                     //每一行的唯一标识，一般为主键列
			            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
			            cardView: false,
			            clickToSelect:true,                               //是否显示详细视图
			            url: url,   		//请求方式（*）
			            columns: columns,  
			            locale: "zh-CN",
			            "queryParamsType": "limit",		
			            contentType:"application/x-www-form-urlencoded",				
			            queryParams: function queryParams(params) {
			            	param.pageNumber = params.offset;
			            	param.pageSize = params.limit;
						    return param;    
			            },  
			            onLoadSuccess: function(){  //加载成功时执行  
			           		 layer.close(loading);
			                //layer.msg("加载成功");  
			            },  
			            onLoadError: function(){  //加载失败时执行  
			              //layer.msg("加载数据失败", {time : 1500, icon : 2});  
			            }
			          }); 
	  		},
	  		//公用查询表格,自定义pageSize
	  		loadSelectTable : function(tarId,url,columns,param){
	  			 $('#'+tarId).bootstrapTable('destroy'); 
		    	 var loading =  $.loading();
			     
			        //初始化表格,动态从服务器加载数据  
			     $('#'+tarId).bootstrapTable({
			     	   striped:true,//设置为 true 会有隔行变色效果
		                searchAlign: "right",//查询框对齐方式
		                searchOnEnterKey: false,//回车搜索
		                showRefresh: false,//刷新按钮
		                showColumns: false,//列选择按钮
		                buttonsAlign: "right",//按钮对齐方式
		                toolbarAlign: "left",//工具栏对齐方式
				        //height: $('.my_layerSkin_window').height(),//高度调整
			            method: 'post',                      
			            toolbar: '#toolbar', 
			            striped: true,                      //是否显示行间隔色
			            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			            pagination: true,                   //是否显示分页（*）
			            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
			            pageNumber:1,  	                   //初始化加载第一页，默认第一页
			            pageSize: 5, 
			            pageList: [ 5,15,20, 50, 100, 'All'],   //分页步进值                   
			            minimumCountColumns: 2,             //最少允许的列数
			            hideColumn: "ID",                     //每一行的唯一标识，一般为主键列
			            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
			            cardView: false,
			            clickToSelect:true,                               //是否显示详细视图
			            url: url,   		//请求方式（*）
			            columns: columns,  
			            locale: "zh-CN",
			            "queryParamsType": "limit",		
			            contentType:"application/x-www-form-urlencoded",				
			            queryParams: function queryParams(params) {
			            	param.pageNumber = params.offset;
			            	param.pageSize = params.limit;
						    return param;    
			            },  
			            onLoadSuccess: function(){  //加载成功时执行  
			           		 layer.close(loading);
			                //layer.msg("加载成功");  
			            },  
			            onLoadError: function(){  //加载失败时执行  
			              //layer.msg("加载数据失败", {time : 1500, icon : 2});  
			            }
			          }); 
	  		},
	  		//公用查询表格 - jiang 项目进度因需要修改元素
	  		loadTable4DataPlan : function(tarId,url,columns,param){
	  			 $('#'+tarId).bootstrapTable('destroy'); 
	 		    
		    	 //var loading =  $.loading();
			     
			        //初始化表格,动态从服务器加载数据  
			     $('#'+tarId).bootstrapTable({
			     	   striped:true,//设置为 true 会有隔行变色效果
		                searchAlign: "right",//查询框对齐方式
		                searchOnEnterKey: false,//回车搜索
		                showRefresh: false,//刷新按钮
		                showColumns: false,//列选择按钮
		                buttonsAlign: "right",//按钮对齐方式
		                toolbarAlign: "left",//工具栏对齐方式
				        height: $.tableHeight(),//高度调整
			            method: 'post',                      
			            toolbar: '#toolbar', 
			            striped: true,                      //是否显示行间隔色
			            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			            pagination: true,                   //是否显示分页（*）
			            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
			            pageNumber:1,  	                   //初始化加载第一页，默认第一页
			            pageSize: 15, 
			            pageList: [ 15,20, 50, 100, 'All'],   //分页步进值                   
			            minimumCountColumns: 2,             //最少允许的列数
			            hideColumn: "ID",                     //每一行的唯一标识，一般为主键列
			            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
			            cardView: false,
			            clickToSelect:true,                               //是否显示详细视图
			            url: url,   		//请求方式（*）
			            columns: columns,  
			            locale: "zh-CN",
			            "queryParamsType": "limit",		
			            contentType:"application/x-www-form-urlencoded",				
			            queryParams: function queryParams(params) {
			            	param.pageNumber = params.offset;
			            	param.pageSize = params.limit;
						    return param;    
			            },  
			            onLoadSuccess: function(){  //加载成功时执行  
			           		 //layer.close(loading);
			                //layer.msg("加载成功"); 
			            	$("span.pie").peity("pie", {
			            		fill: ["#1ab394", "#d7d7d7", "#fff"]
			            	}),$("span.pie.pO").peity("pie", {
			            		fill: ["#fcb365", "#d7d7d7", "#ffffff"]
			            	}),$("span.pie.pR").peity("pie", {
			            		fill: ["#ff7171", "#d7d7d7", "#ffffff"]
			            	}),
			            	$(".line").peity("line", {
			            		fill: "#1ab394",
			            		stroke: "#169c81"
			            	}), $(".bar").peity("bar", {
			            		fill: ["#1ab394", "#d7d7d7"]
			            	}), $(".bar_dashboard").peity("bar", {
			            		fill: ["#1ab394", "#d7d7d7"],
			            		width: 100
			            	});
			            	var i = $(".updating-chart").peity("line", {
			            		fill: "#1ab394",
			            		stroke: "#169c81",
			            		width: 64
			            	});
			            	setInterval(function() {
			            		var t = Math.round(10 * Math.random()),
			            			a = i.text().split(",");
			            		a.shift(), a.push(t), i.text(a.join(",")).change()
			            	}, 1e3);
			            },  
			            onLoadError: function(){  //加载失败时执行  
			              //layer.msg("加载数据失败", {time : 1500, icon : 2});  
			            }
			          }); 
	  		},
	  		//删除数据
	  		deleteDate :function(url,idArray){
	  			var confirm =  layer.confirm('确定要删除吗?',{
			     	skin: 'my_layerSkin_confirm',//皮肤设置，默认Layer自带样式
			     	closeBtn:0,//关闭按钮数量
			     	title:false,//关闭标题
			     	shade:0,//遮罩
			     	icon:2,//设置图标
			     	time:8000,//设定自动消失时间毫秒/ms
			     	 btn: ['确定','取消'] //操作按钮设置
					}, function(){
						//第一个操作按钮onclick事件方法
						 $.ajax({
				     	 	  type: "post",
					             url: "../sysManage/deleteUser",
					             data: {id:idArray},
					             dataType: "json",
					             success: function(data){
					             	$("#search").click();
						         	if(data.state == 0){
						         		$.success(data.msg);
						         		layer.closeAll();
						         	}else{
						 				$.fail(data.msg);
						         	}
					             },
		            			 error : function(data){
		            			 	$.fail('删除失败');
		            			 }
				     	 	});
						layer.close(confirm);//关闭这个弹窗
					}, function(){
						//第二个操作按钮onclick事件方法
						//不设定则默认方法为关闭提示框
				  });
	  		},
	  		selectCity : function (id){
	  			var select = document.getElementById(id);
	  			var options = select.options;
	  			var index = select.selectedIndex;
	  			var selectedText = options[index].text;
	  			return selectedText;
	  		},
	  		//空值返回空格
	  		object : function (value){
	  			if(value==undefined || value==null || value==""){
	  				return "&nbsp;";
	  			}else{
	  				return value;
	  			}
	  		},
	  		dateFormat : function (now,mask){
	  			/**
	  			 * 作用:处理java后台Date类型返回值
	  			 * 
	  			 * 使用方法
	  			 * $.dateFormat(new Date(value),'yyyy-MM-dd HH:mm'); 	
	  			 */
	  			 var d = now;
	  	        var zeroize = function (value, length)
	  	        {
	  	            if (!length) length = 2;
	  	            value = String(value);
	  	            for (var i = 0, zeros = ''; i < (length - value.length); i++)
	  	            {
	  	                zeros += '0';
	  	            }
	  	            return zeros + value;
	  	        };
	  	     
	  	        return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0)
	  	        {
	  	            switch ($0)
	  	            {
	  	                case 'd': return d.getDate();
	  	                case 'dd': return zeroize(d.getDate());
	  	                case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
	  	                case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
	  	                case 'M': return d.getMonth() + 1;
	  	                case 'MM': return zeroize(d.getMonth() + 1);
	  	                case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
	  	                case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
	  	                case 'yy': return String(d.getFullYear()).substr(2);
	  	                case 'yyyy': return d.getFullYear();
	  	                case 'h': return d.getHours() % 12 || 12;
	  	                case 'hh': return zeroize(d.getHours() % 12 || 12);
	  	                case 'H': return d.getHours();
	  	                case 'HH': return zeroize(d.getHours());
	  	                case 'm': return d.getMinutes();
	  	                case 'mm': return zeroize(d.getMinutes());
	  	                case 's': return d.getSeconds();
	  	                case 'ss': return zeroize(d.getSeconds());
	  	                case 'l': return zeroize(d.getMilliseconds(), 3);
	  	                case 'L': var m = d.getMilliseconds();
	  	                    if (m > 99) m = Math.round(m / 10);
	  	                    return zeroize(m);
	  	                case 'tt': return d.getHours() < 12 ? 'am' : 'pm';
	  	                case 'TT': return d.getHours() < 12 ? 'AM' : 'PM';
	  	                case 'Z': return d.toUTCString().match(/[A-Z]+$/);
	  	                // Return quoted strings with the surrounding quotes removed
	  	                default: return $0.substr(1, $0.length - 2);
	  	            }
	  	        });
	  		},//列表添加项删除
	  		deletetrItem : function (object){
	  	    	$(object).parent().remove();
	  	    },
	  	    //自动获取当前时间
	  	    autoGetLocalTime :function(id){
	  	    	var date = new Date();
	  	      var seperator1 = "-";
	  	      var seperator2 = ":";
	  	      var month = date.getMonth() + 1;
	  	      var strDate = date.getDate();
	  	      if (month >= 1 && month <= 9) {
	  	          month = "0" + month;
	  	      }
	  	      if (strDate >= 0 && strDate <= 9) {
	  	          strDate = "0" + strDate;
	  	      }
	  	      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	  	              + " " + date.getHours() + seperator2 + date.getMinutes();
//	  	              + seperator2 + date.getSeconds();
	  	    	$("#"+id).val(currentdate);
	  	    },
	  	    //计算金额的百分比
	  	   calcPercent : function(item,id){
	  		  var total = 0;
	  		  $("#"+id).find("tr").each(function(index,value){
	  			  if(index > 0){
	  				  total = total + Number($(value).find("td:eq("+item+") > div > input").val());
	  			  }
	  		  });
	  		  $("#"+id).find("tr").each(function(index,value){
	  			  if(index > 0){
	  				  var  result = (Number($(value).find("td:eq("+item+") > div > input").val())/total*100).toFixed(0);
	  				  var  resultInput = (Number($(value).find("td:eq("+item+") > div > input").val())/total).toFixed(4);
	  				  if(result == 'NaN'){
	  					  result = 0;
	  				  }
	  				  if(resultInput == 'NaN'){
	  					resultInput = 0;
	  				  }
	  				  $(value).find("td:eq("+Number(item+1)+") > #"+id+"_title").text("成本占比:"+result+"%");
	  				  $(value).find("td:eq("+Number(item+1)+") > #"+id+"_value > div").css("width",result+"%");
	  				  $(value).find("td:eq("+Number(item+1)+") > input").val(resultInput);
	  			  }
	  		  });
	  		  if(id == 'project_cost'){
	  			  $("#cost").val(total);
	  		  }
	  	  },
	  	  //处理不合法的文件路径
	  	  dealFilePath : function(path){
	  		  return path.replace(/\\/g,"\\\\");
	  	  },
	  	  //后台删除文件
	  	  deleteFile : function(path){
	  		//删除文件
	  		$.ajax({
	  			url : yuhui.getUrl() + "/common/deleteFile.do",
	  			cache : false,
	  			type : "post",
	  			async : false,
	  			data :{filePath:path},
	  			success : function(data) {
	  			}
	  		});
	  	  },
	  	  //文件下载
	  	 download:function(url){
		    	yuhui.goDownload(url);
			},
			//根据文件类型设置图标
		 setFiletypeIcon : function(type){
				var htmlInner = "";
				 if("xls;xlsx".indexOf(type) >=0){
	            	 htmlInner ='<i class="iconfont fn-mr5 font_excel">&#xe728;</i>'
	             }else if("doc;docx".indexOf(type) >=0 ){
	            	 htmlInner ='<i class="iconfont fn-mr5 font_word">&#xe643;</i>'
	             }else if("ppt;pptx".indexOf(type) >=0){
	            	 htmlInner ='<i class="iconfont fn-mr5 font_pdf">&#xe644;</i>';
	             }else if("pdf".indexOf(type) >=0){
	            	 htmlInner ='<i class="iconfont fn-mr5 font_pdf">&#xe642;</i>';
	             }
				 return htmlInner;
			},
			//文件导出
			StandardPost:function(url,args){
		        var body = $(document.body),
		            form = $("<form method='post'></form>"),
		            input;
		        form.attr({"action":url});
		        $.each(args,function(key,value){
		            input = $("<input type='hidden'>");
		            input.attr({"name":key});
		            input.val(value);
		            form.append(input);
		        });

		        form.appendTo(document.body);
		        form.submit();
		        
		    },
		    //加载时间控件
		    loadDateTimePicker : function(){
				$('.date_picker1').datetimepicker({
			    	format: 'yyyy-mm-dd',/*日期格式yyyy-mm-dd
										yyyy-mm-dd hh:ii
										yyyy-mm-ddThh:ii
										yyyy-mm-dd hh:ii:ss
										yyyy-mm-ddThh:ii:ssZ， p, P, h, hh, i, ii, s, ss, d, dd, m, mm, M, MM, yy, yyyy 的任意组合。*/

			        language: 'zh-CN',
			        weekStart: 0,//一周从哪一天开始。0（星期日）到6（星期六），默认值：0
			        todayBtn: true,//今天按钮显示。
					  autoclose: true,//当选择一个日期之后是否立即关闭此日期时间选择器
					  todayHighlight: true,//如果为true, 高亮当前日期
					  startView: 2,	/*  
					                      * 	默认2, 'month'
					                      * 	0 or 'hour' for the hour view
												1 or 'day' for the day view
												2 or 'month' for month view (the default)
												3 or 'year' for the 12-month overview
												4 or 'decade' for the 10-year overview. Useful for date-of-birth datetimepicker
											*/
					  minView: 2,	//日期时间选择器所能够提供的最精确的时间选择视图
					  forceParse: true //当选择器关闭的时候，是否强制解析输入框中的值。
			    });
		    	   $('.date_picker').datetimepicker({
				    	format: 'yyyy-mm-dd hh:ii',/*日期格式yyyy-mm-dd
											yyyy-mm-dd hh:ii
											yyyy-mm-ddThh:ii
											yyyy-mm-dd hh:ii:ss
											yyyy-mm-ddThh:ii:ssZ， p, P, h, hh, i, ii, s, ss, d, dd, m, mm, M, MM, yy, yyyy 的任意组合。*/

				        language: 'zh-CN',
				        weekStart: 0,//一周从哪一天开始。0（星期日）到6（星期六），默认值：0
				        todayBtn: true,//今天按钮显示。
						  autoclose: true,//当选择一个日期之后是否立即关闭此日期时间选择器
						  todayHighlight: true,//如果为true, 高亮当前日期
						  startView: 2,	/*  
						                      * 	默认2, 'month'
						                      * 	0 or 'hour' for the hour view
													1 or 'day' for the day view
													2 or 'month' for month view (the default)
													3 or 'year' for the 12-month overview
													4 or 'decade' for the 10-year overview. Useful for date-of-birth datetimepicker
												*/
						  minView: 0,	//日期时间选择器所能够提供的最精确的时间选择视图
						  forceParse: true //当选择器关闭的时候，是否强制解析输入框中的值。
				    });
				     $('.date_picker_wrap .date_remove').click(function(){
				     	//清空时间输入框内的值
				     	$(this).siblings('input.form-control').val('');
				     }) 
				     $('.date_picker_wrap .date_remove').click(function(){
					     	//清空时间输入框内的值
					     	$(this).siblings('input.form-control').val('');
					 })  
					 $('.date_picker_wrap .date_icon').click(function(){
				    	//让时间控件输入框的日历图标点击等同于点击输入框本身展开选择器
				    	$(this).siblings('input.form-control').focus();
				    })
		    	
		    }

	  	
		      
		     
	
});

