$.extend({
	getColumns: function (fieldArray,titleArray){
		
		var param=[];
		for(var i = 0 ; i < fieldArray.length ; i++){
			var obj =new Object();
			if(i == 0  && (fieldArray[0] == 'id' || fieldArray[0] == 'ID')){
				obj.checkbox = true;
				obj.field = fieldArray[i];
				obj.align= 'center';
				obj.title= titleArray[i];
				obj.formatter = function(value, row, index){
	          		 return  '<div style="display:none;">'+value+'</div>';
	              };
			}else{
				obj.field = fieldArray[i];
				obj.align= 'center';
				obj.title= titleArray[i];
			}
			param.push(obj);
		}
		return param;
	},
	  initTable : function(columns) {  
		        //初始化表格,动态从服务器加载数据  
		     $('#table_result').bootstrapTable({
		    	    striped:true,//设置为 true 会有隔行变色效果
	                searchAlign: "right",//查询框对齐方式
	                searchOnEnterKey: false,//回车搜索
	                showRefresh: true,//刷新按钮
	                showColumns: true,//列选择按钮
	                buttonsAlign: "right",//按钮对齐方式
	                toolbarAlign: "left",//工具栏对齐方式
			        height: $.tableHeight(),//高度调整
		            method: 'post',                      
		            toolbar: '#toolbar', 
		            striped: true,                      //是否显示行间隔色
		            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		            pagination: true,  					//是否显示分页（*）
		            columns: columns,  
		            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
		            pageNumber:1,                       //初始化加载第一页，默认第一页
		            pageSize: 10, 
		            pageList: [ 20, 50, 100, 'All'],   //分页步进值                   
		            minimumCountColumns: 2,             //最少允许的列数
		            hideColumn: "ID",                     //每一行的唯一标识，一般为主键列
		            showToggle:true,
		            cardView:false,
                    //showPaginationSwitch:true,//单页全部显示数据按钮
		            clickToSelect:true,  //是否显示详细视图和列表视图的切换按钮
		            contentType: "application/x-www-form-urlencoded"
		          });  
		      }, 
		      //加载数据
		      loading:function(){
		    	  var loading =  layer.open({
					  type: 1,
					  title:false,
					  closeBtn:0,
					  shade: [0.5,'#fff'],
					  //time:5000,//此时间为演示作用，应用时要根据实际设定关闭时机，方法：layer.close(loading);
					  skin: 'my_layerSkin_loading', //加上边框
					  area: ['100px', '100px'], //宽高
					  content: '<img src="../assets/js/layer/skin/default/loading-0.gif" />'
					});
		    	  return loading;
		      },
		      confirm:function (content,callback){
		    	  var confirm =  layer.confirm(content,{
				     	skin: 'my_layerSkin_confirm',//皮肤设置，默认Layer自带样式
				     	closeBtn:0,//关闭按钮数量
				     	title:false,//关闭标题
				     	shade:0,//遮罩
				     	icon:2,//设置图标
				     	time:8000,//设定自动消失时间毫秒/ms
				     	 btn: ['确定','取消'] //操作按钮设置
						}, function(){
							//第一个操作按钮onclick事件方法
							callback();
							layer.close(confirm)//关闭这个弹窗
						}, function(){
							//第二个操作按钮onclick事件方法
							//不设定则默认方法为关闭提示框
					  });
		      },
		      //操作成功
		      success:function(content){
		    	  layer.msg(content,{
				     	skin: 'my_layerSkin_succed',//皮肤设置，默认Layer自带样式
				     	closeBtn:1,//关闭按钮数量
				     	icon:0,//设置图标
				     	time:1000//设定自动消失时间毫秒/ms
				     });
		      },
		      //操作失败
		      fail:function(content){
		    	  layer.msg(content,{
				     	skin: 'my_layerSkin_fail',//皮肤设置，默认Layer自带样式
				     	closeBtn:1,//关闭按钮数量
				     	icon:1, //设置图标
				     	time:5000//设定自动消失时间毫秒/ms 
				     });
		      }, 
		      //去除空格
		      trimStr: function(str){
		    	  return str.replace(/(^\s*)|(\s*$)/g,"");
		      },
		      //自动适配
		      tableHeight :function() {
	               return $(parent.window).height() - $('.query_terms_wrap').height()-234;
	          },
	          //ie浏览器Placeholder默认传值
	          IePlaceholderSetNULL : function(id){
	        	  if ($("#"+id).val() == $("#"+id).attr('placeholder')) {
						return "";
					}
	        	  return $("#"+id).val();
	          },
	          //type number or text
	          TableFieldIsNull:function(value,type){
	        	  if(value == null){
		        	   if(type == "number"){
		        		   return "0";
		        	   }else{
		        		   return "";
		        	   }
	        	   }
	        	  return value;
	          },
	          // 打开窗口
	          windowOper : function(windowName,htmlInner,windowWidth,windowHeight,callback1,callback2){
	        	  layer.open({
				    	title: [windowName, 'font-size:16px;'],
				        type: 1,
				        area: [windowWidth, windowHeight],
				        scrollbar: false,
				        shadeClose: true, //点击遮罩关闭
				        maxmin:true,//放大窗口按钮
					    btn: ['确定','取消'],
				        content: htmlInner,
					  yes:function () {
				    		if (typeof callback1=="function"){
				    			callback1();
							}

                      },
					  btn2:function () {
                          if (typeof callback2=="function"){
                              callback2();
                          }
                      }
			      })
                  },
    windowOperObtn: function(windowName,htmlInner,windowWidth,windowHeight,callback1,callback2){
        layer.open({
            title: [windowName, 'font-size:16px;'],
            type: 1,
            area: [windowWidth, windowHeight],
            scrollbar:false,
            shadeClose: true, //点击遮罩关闭
            maxmin:false,//放大窗口按钮
            content: htmlInner,
            resize:false

        })
    },
    layerOperObtn: function( title, width, heigth, htmlInner, btn1Fun, btn2Fun, btn3Fun, btnName){
    	// 当按钮3(默认取消按钮)为空时  赋予默认方法
    	if(undefined == btn3Fun){
    		btn3Fun = function(){
    			layer.close(layerId);
    		}
    	}
    	
    	// 默认按钮名称
    	if(undefined == btnName){
    		btnName = ['提交','重置','取消'];
    	}
    	
    	layerId = layer.open({
    		  type: 1,
    		  title:[title],
    		  skin: 'my_layerSkin_window', //自定义皮肤 
    		  area: [width, heigth], //宽高
    		  content:htmlInner,//DOM对象
    		  scrollbar:false,//是否允许浏览器出现滚动条
    		  shadeClose:true,
    		  maxmin:true,//放大窗口按钮
    		  btn: btnName,
    		  btn1: btn1Fun,
    		  btn2: btn2Fun,
    		  btn3: btn3Fun
//    		  btnAlign: 'c'//按钮居中对齐
    		});
    	
    	return layerId;
    },

    /**
     * url: 文件上传至后台路径
     * extensions: 文件格式
     * maxCount: 限制个数
     * formData: 传至后台参数
     * formatterSuccess： 上传成功后函数
     * formatterError: 上传失败后函数
     */
    fileUpload: function(url,extensions, maxCount, formData, formatterSuccess, formatterError){
    	
    	//以下为上传文件的参数
    	jQuery(function() {
    		
    	 var $ = jQuery,
    	  $list_1 = $('#thelist'),
    	  $btn_1 = $('.layui-layer-btn0'),
    	  state = 'pending',
    	  count = 0,
    	  uploader;
    	 
    	 //初始化，实际上可直接访问Webuploader.upLoader
    	 uploader = WebUploader.create({
    		 
    		  // 不压缩image
    		  resize: false,
    		 
    		  // swf文件路径
    		  swf: '../assets/js/webuploader/Uploader.swf',
    		 
    		  // 发送给后台代码进行处理，保存到服务器上
    		  server: url,
    		  
    	      accept: {
    			extensions: extensions
    		  },
    		  
    		  formData: formData,
    			
    		  // 选择文件的按钮。可选。
    		  // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    		  pick: '#picker'
    	 });
    	 
    	 // uploader添加事件，当文件被加入队列后触发
    	 uploader.on( 'fileQueued', function( file ) {
    	 //在加入队列时，创建一个样式，供后面上传成功失败等等调用，定义一个*p表示指向该事件样式
    	  $list_1.append( '<div id="' + file.id + '" class="file_item_cs">' +
    	   '<h2 class="info">' + file.name + '</h2>' +
    	  '</div>' );
    	 });
    	 
    	 // 文件上传过程中触发，携带上传进度，file表示上传的文件，percentage表示上传的进度
    	 uploader.on( 'uploadProgress', function( file, percentage ) {
    	 //定义一个变量名创建进度模块
    	  var $li_1 = $( '#'+file.id ),
    	 //找到$li下class为progress的，并定义为$percent------为什么先寻找在创建
    	   $percent = $li_1.find('.progress .progress-bar');
    	 
    	  //如果$percent没值，就创建进度条加入到对应的文件名下， 避免重复创建
    	  if ( !$percent.length ) {
    	   $percent = $('<div class="progress progress-striped active">' +
    	    '<div class="progress-bar" role="progressbar" style="width: 0%">' +
    	    '</div>' +
    	   '</div>').appendTo( $li_1 ).find('.progress-bar');
    	  }
    	  
    	 //为进度模块添加弹出文本
    	  $li_1.find('p.state').text('上传中');
    	  
    	 //为进度模块创建读条的百分比
    	  $percent.css( 'width', percentage * 100 + '%' );
    	 });
    	 
    	 //uploader触发事件，当上传成功事调用这个事件
    	 uploader.on( 'uploadSuccess', function( file, result ) {
    		 
    	  if(result.state == 1){
    		  layer.msg( "文件名重复！", {icon : 1});
    		  uploader.removeFile(uploader.getFile(file.id));//删除
    		  $("#thelist").empty();
    		
    	  } else if(result.state == 0){
    	      //调用文件被加入时触发的事件，findstate，并添加文本为已上传
    		  $( '#'+file.id ).find('p.state').text('已上传');
    		  formatterSuccess(result)
    	  } else {
    		  layer.msg( "文件上传失败, 请稍后重试！", {icon : 1});
    		  uploader.removeFile(uploader.getFile(file.id));//删除
    		  $("#thelist").empty();
    	  }
    	 
    	 });
    	 
    	 //uploader触发事件，当上传失败时触发该事件
    	 uploader.on( 'uploadError', function( file ) {
    	 //调用文件被加入时触发的事件，findstate，并添加文本为上传出错
    	  $( '#'+file.id ).find('p.state').text('上传出错');
    	  formatterError(result)
    	 });
    	  
    	 //该事件表示不管上传成功还是失败都会触发该事件
    	 uploader.on( 'uploadComplete', function( file ) {
    	 //调用
    	  $( '#'+file.id ).find('.progress').fadeOut();
    	 });
    	 
    	 //这是一个特殊事件，所有的触发都会响应到，type的作用是记录当前是什么事件在触发，并给state赋值
    	 uploader.on( 'all', function( type ) {
    	  if ( type === 'startUpload' ) {
    	   state = 'uploading';
    	  } else if ( type === 'stopUpload' ) {
    	   state = 'paused';
    	  } else if ( type === 'uploadFinished' ) {
    	   state = 'done';
    	  }
    	  
    	 //根据state判断弹出文本
    	  if ( state === 'uploading' ) {
    	   $btn_1.html('<i class="iconfont">&#xe6c6;</i>暂停上传');
    	  } else {
    	   $btn_1.html('<i class="iconfont">&#xe6c6;</i>开始上传');
    	  }
    	 });
    	 
    	 // 计算上传文件个数
    	 uploader.on( 'fileQueued', function() { 
             count++; 
         }); 

         uploader.on( 'fileDequeued', function() { 
             count--; 
         }); 

         uploader.on( 'uploadFinished', function() { 
             count = 0; 
         }); 
         
         // 判断文件个数如果超过一个文件则不予上传
         uploader.on( 'beforeFileQueued', function( file ) {
        	    
             if ( count >= maxCount  ) {
                 this.trigger( 'error', 'Q_EXCEED_NUM_LIMIT', maxCount, file );
                 layer.msg( "只能上传 "+ maxCount +"个JS文件！", {icon : 1});
             }

             return count >= maxCount ? false : true;
         });
    	 
    	 //当按钮被点击时触发，根据状态开始上传或是暂停
    	 $btn_1.on( 'click', function() {
    	  if ( state === 'uploading' ) {
    	   uploader.stop();
    	  } else {
    	   uploader.upload();
    	  }
    	 });
    	 
     });
    	
    }

});

