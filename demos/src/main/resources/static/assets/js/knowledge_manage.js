 var setting = {
		data: {
			key: {
				title:"t"
			},
			simpleData: {
				enable: true
			}
		},
		callback: {
			
			onClick: onClickswewe
		}
	};
	

 
 function onClickswewe(event, treeId, treeNode, clickFlag) {
	
	 	//alert(treeNode.id+"__"+treeNode.name);
	 	$("#know_tree_id").val(treeNode.id);//setValue treeId
	 	//alert(treeNode.name)
	 	$("#tip_key_id").html(treeNode.name);//setValue treeId
		$("#tName_id").val(treeNode.name);//setValue treeId
	 	queryKnowledgeFiles(treeNode.id);
	 	
	 	var curLocation="";//当前位置

	 	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	 		var nodes = treeObj.getSelectedNodes();
	 		if(nodes.length>0){
	 			var allNode = nodes[0]['name'];//获取当前选中节点
	 			var node = nodes[0].getParentNode();
	 			getParentNodes(node,allNode);
	 		}
	 		var location = "";
	 		var nodeArrs = curLocation.split("_");
	 		for(var i=nodeArrs.length-1;i>=0;i--){
	 			location += nodeArrs[i]+"_";
	 		}
	 		location = location.substring(0, location.lastIndexOf("_"));
	 	
	 		$("#treeName_id").val(location);//用于生成对应的文件夹名
	 	 	
	 		$("#treeId_id").val(treeNode.id);//用于生成对应的文件夹名
	 	function getParentNodes(node,allNode){
	 		if(node!=null){
	 			allNode += "_"+node['name'];
	 			curNode = node.getParentNode();
	 			getParentNodes(curNode,allNode);
	 		}else{
	 			//根节点
	 			curLocation = allNode;
	 		}
	 	}
	 
}
 
function load_know_tree(){
	//ajax:一进入页面就获取文件夹的树和我的收藏文件begin		
	  $.ajax({
	   type: "POST",
     url: "../knowledge/knowledgeTrees",
     data:"",
     dataType: "json",
     success: function(data){
  	   $.fn.zTree.init($("#treeDemo"), setting, data);		    
     },
		 error : function(data){
		 	$.fail('操作失败！');
		 }
	});
	//ajax:一进入页面就获取文件夹的树和我的收藏文件end	  
}
	 
 
  
 
 
$(document).ready(function(){	
		
	load_know_tree();
	
	$('.favorites_btn').click(function(){
		//点击收藏按钮效果
		if($(this).hasClass("active")){
			 layer.msg('已取消收藏！');
		     $(this).removeClass("active")
		}else{		    
		     layer.msg('收藏成功！');
			$(this).addClass("active")
		}
	})
	
	$('.search_wrap input.search').focus(function(){
		$('#search_btn').addClass("active");
	}).blur(function(){
		$('#search_btn').removeClass("active");
	})
	
	//	监听Enter按键开始
		var code = document.getElementById('search_input');
		var btnS = document.getElementById('search_btn');
	
		function jump(event) {
			var event = event || window.event;
			if(event.keyCode == 13) {
				search_fun()
			}
		}
		code.onkeydown = jump;
	//	监听Enter按键结束	
	
	
	/**	
	$('.file_list .tools_box .attr_btn').click(function(){
		$('.file_property_wrap').slideDown(200);
	})	
	$('.file_property_wrap .header .close_btn').click(function(){
		$(this).parents('.file_property_wrap').slideUp(200);
	})
	**/	
});

