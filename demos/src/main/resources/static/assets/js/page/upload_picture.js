$(document).ready(function(){
	 $('input').iCheck({
		  	    //使用icheck插件初始化check-box和radio
			    checkboxClass: 'icheckbox_flat-green',
			    radioClass: 'iradio_flat-green'
			  });

			//多选
				$(".sel_menu2").select2({
				 		width:'100%',//设定宽度来源
					  closeOnSelect:false //每次选定后是否自动关闭选择项列表
				});
			//单选	 
 				 $(".sel_menu").select2({
					/*开启多选功能：在ID标签处加上multiple="multiple"属性即可 */
					width:'100%'
				 });  
				 
				 
		
})