$(function() {
	$("#search").click(function() {
		initTable();
	});
	$("#btn_add").click(function() {
		add();
	});
	
	initTable();
	
});

function initTable() {
	// 先销毁表格
	$('#table_result').bootstrapTable('destroy');
	var url = 'workflowList.do';
	var columns = [/*
					 * { field: 'id', title: 'ID', checkbox : true, formatter :
					 * function(value, row, index){ return '<div
					 * style="display:none;">'+value+'</div>'; } },
					 */
			{
				field : 'definitionId',
				title : '流程定义ID',
				align : 'center'
			},
			{
				field : 'deploymentId',
				title : '流程部署ID',
				align : 'center'

			},
			{
				field : 'key',
				title : '流程定义KEY',
				align : 'center'

			},
			{
				field : 'version',
				title : '版本',
				align : 'center'

			},
			{
				field : 'resourceName',
				title : '资源名称',
				align : 'center'

			},
			{
				field : 'name',
				title : '名称',
				align : 'center'

			},
			{
				field : 'diagramResourceName',
				title : '流程图PNG',
				align : 'center'

			},
			{
				field : 'deploymentTime',
				title : '部署时间',
				align : 'center'
			},
			{
				field : 'suspended',
				title : '是否挂起',
				align : 'center'

			},
			{
				field : 'operate',
				title : '操作',
				align : 'center',
				formatter : function(value, row, index) {
					 var html='<button class="layui-btn layui-btn-primary layui-btn-sm">挂起</button>'
					  +'<button class="layui-btn layui-btn-primary layui-btn-sm">删除</button>'
					 +'<button class="layui-btn layui-btn-primary layui-btn-sm">启动</button>';
					 return html;
				}
			} ];
	var param = {
		key : $.trimStr($("#key").val()),
		name : $.trimStr($("#name").val()),
	};
	$.loadTable4Data('table_result', url, columns, param);
}
function del(key){
  	var ids =[];
     $("tbody > tr[class='selected']").find("td:first").each(function(index,value){
    	 ids.push($(value).text());
      });
 	 if(ids.length == 0){
 		layer.msg('请选择要删除的项！', {icon: 1});
 	 	return;
 	 }
 	 
 	 
 	$.confirm('确定要删除吗?',function(){
 		 $.ajax({
			url :"../workflow/delDeployment.do",
			type : "POST",
			async: false,
			dataType:"json",
			data:{ids:ids},
			success :function(data){
				layer.closeAll();
				if(data.state=="1"){
					initTable();
	                layer.msg('删除成功！', {icon: 1});
				}else{
				     layer.msg('失败请稍后再试！', {icon: 2});
				}
			}
	    });
 	 });
}

function add() {
	var html = '<div class="ibox_cs"  id="form_box">'
			+ '<form action="import.do" method="post" class="form_list_cs" id="flowadd" enctype="multipart/form-data">'
			+ '<li class="form_control">'
			+ '<label>流程名：</label>'
			+ '<input type="text" placeholder="流程名字" name="name"  id="name"/>'
			+ '</li>'
			+ '<li class="form_control">'
			+ '<label>上传文件：</label>'
			+ '<input type="file"  name="file" />'
			+ '</li>'
			+ ' <li class="form_btn_box">'
			+ '<button type="button" class="btn_main_cs" id="add_submit">提交</button>'
			+ '<button type="button" class="btn_red_cs" id="close_form" onclick="layer.closeAll()">取消</button>'
			+ '</li>' + '</form>' + '</div>';
	$.windowOperObtn('新增流程定义', html, '50%', '60%');
	submitForm();

}
/*function add(){
	$.post('../workflow/add.do', {}, function(str){
		// 处理返回值
		$.layerOperObtn( "新增编辑", "60%", "auto", str, function(){}, // layer弹框, 该方法位于operate.js 
		function(){
			resetValue();// 重置input框, 该方法位于check.js
			checkReset();// 重置验证ui, 该方法位于check.js
			return false;
			
		});
	
  });
}*/
function submitForm(){
	$("#add_submit").on("click", function() {
		 $("#flowadd").ajaxSubmit({
	            success : function(data){
	            	layer.closeAll();
	            	//console.log(data);
	            	console.log(data.state);
					if(data.state=="0"){
						console.log("-------");
						layer.msg('上传失败！', {icon: 1});
					}else if(data.state=="1"){
						console.log("-------");
						layer.msg('上传成功！', {icon: 1});
						initTable();
					}
	            },
	            error : function(){
	                alert("请求错误");
	            }
	        });
	});
	
}