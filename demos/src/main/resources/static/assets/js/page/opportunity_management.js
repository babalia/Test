	
$(document).ready(function(){
	 /*字段太长省略号显示开始  */
		/*$('.ellipsis_cs').mouseleave(function(event) {
		layer.closeAll('tips');
		});  */
		
	$('table').on("mouseenter",'.ellipsis',function (e){
		var this_text = $(this).text();
		layer.tips(this_text,this, {
		tips: [3, '#666'],
		 closeBtn:false,
		   time:2000,
		});
		});
		
     /*$("table").on("click",'.Business_name',function (e) {
       $.windowOper('商机管理详情',$(".Opportunity_management_details"),'836px','auto');
    });*/
   $("table").on("click",'.Business_name',function (e) {
			  $.windowOperObtn('商机管理详情',$(".Opportunity_management_details"),'836px','auto');
		})
    //多选
	/*$(".sel_menu2").select2({
	 	  width:'300px',//设定宽度来源
	 	  
		  closeOnSelect:false //每次选定后是否自动关闭选择项列表
	});*/
function submitBtn() {
        alert("点击确定按钮");


    }
    function closeBtn() {
        alert("点击取消按钮");
    }
	$("#toolbar").on("click",'#Assigned_btn',function (e) {
       $.windowOper('指派项目经理',$(".Assigned_person"),'500px','auto',submitBtn,closeBtn);
    });
	
	
	$('#btn_delete').click(function(){
	 $.confirm('确定删除商机')
})
		
$("#example-single").select2({
	    width:'420px',
  		placeholder:"请选择tags",
		tags: true,
		maximumSelectionLength :10  //限制搜索的个数
		/*allowClear: true*/
		});
		


    
		
})
