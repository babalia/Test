$(document).ready(function(){
	$('.basic-info input').iCheck({
		  	    //使用icheck插件初始化check-box和radio
			    /*checkboxClass: 'icheckbox_flat-green',*/
			    radioClass: 'iradio_flat-green'
			  });
				  
				  
				  
			 var form_box
			  
			  
			 

			    
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
				 
			$(".ionrange_2").ionRangeSlider({
				min: 0,
    			max: 100,
    			//prefix: "",//设置数值前缀

				postfix: "%"//设置数值后缀

    			/*from: 550*/
			});	
			
//			var btns = document.getElementById('select_all');
//			var ipts = document.getElementsByClassName('select_ch');
//			btns.onclick = function() {
//				for(var i = 0; i < ipts.length; i++) {
//					if(ipts[i].checked == true) {
//						ipts[i].checked = false
//					} else {
//						ipts[i].checked = true;
//					}
//				}
//			}
})