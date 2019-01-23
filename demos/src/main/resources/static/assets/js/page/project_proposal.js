	
$(document).ready(function(){
	$('table').on("mouseenter",'.ellipsis',function (e){
		var this_text = $(this).text();
		layer.tips(this_text,this, {
		tips: [3, '#666'],
		 closeBtn:false,
		   time:2000,
		});
		});
   $("table").on("click",'.Business_name',function (e) {
       $.windowOperObtn('项目立项详情',$(".Opportunity_management_details"),'860px','90%');
		})
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
	  var confirm_0 =  layer.confirm('确认删除商机吗？',{
     	skin: 'my_layerSkin_confirm',//皮肤设置，默认Layer自带样式
     	closeBtn:0,//关闭按钮数量
     	title:false,//关闭标题
     	shade:0,//遮罩
     	icon:2,//设置图标
     	time:8000,//设定自动消失时间毫秒/ms
     	 btn: ['确定','取消'] //操作按钮设置
		}, function(){
			//第一个操作按钮onclick事件方法
			/*alert('你点击了确认');*/
			layer.close(confirm_0)//关闭这个弹窗
		}, function(){
			//第二个操作按钮onclick事件方法
			//不设定则默认方法为关闭提示框
	  });
})
		
$("#example-single").select2({
	    width:'420px',
  		placeholder:"请选择tags",
		tags: true,
		maximumSelectionLength :10  //限制搜索的个数
		/*allowClear: true*/
		});
		


    
		
})
