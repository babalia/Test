var zNodes ;
function flashTreee(id){
		
	//左边的树
	$(document).ready(function(){  
     
		 $.ajax({
			
			url :"../privilege/privilegeList.do",
			type:"post",
			async: false,
			dataType:"json",
			data:"",
			success :function(data){
				var all={id:"",name:"全部",pid:"",open:true};
				var paramData = new Array();
				var array;
				$.each(data,function(index,value){
					array = {
						id: value.id,
						name : value.name,
						pId : value.pId,
						lev:value.lev
					};
					paramData.push(array);
				});
				zNodes=paramData;
				zNodes.push(all);
			}
	    });
		
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		if(id != null){
			zTree.selectNode(zTree.getNodeByParam("id", id));
			flashRight(id);
			return;
		}
		zTree.selectNode(zTree.getNodeByParam("id", ""));
		flashRight("");
	});
	
}

function flashRight(id){
         //先销毁表格
         $('#table_result').bootstrapTable('destroy');
//          var loading =  $.loading();
         //初始化表格,动态从服务器加载数据
         $('#table_result').bootstrapTable({
             dataType: "json",
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
             pagination: true,                   //是否显示分页（*）
             sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
             pageNumber:1,                       //初始化加载第一页，默认第一页
             pageSize: 10,
             pageList: [ 20, 50, 100, 'All'],   //分页步进值
             minimumCountColumns: 2,             //最少允许的列数
             hideColumn: "id",                     //每一行的唯一标识，一般为主键列
             showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
             cardView: false,                     //是否显示详细视图
             clickToSelect:true,
				url:'../privilege/childlistUI.do',
             columns: [{
                 field: 'id',
                 title: 'ID',
                 checkbox : true,
                 formatter : function(value, row, index){
                     return  '<div style="display:none;">'+value+'</div>';
                 }
             }, {
                 field: 'name',
                 title: '权限名称',
                 align: 'center',
					valgn:'center'
             },
             {
                 field: 'orderid',
                 title: '排序',
                 align: 'center',
			     valgn:'center'
             },{
                 field: 'pri_type',
                 title: '权限类型',
                 align: 'center',
			     valgn:'center',
			     formatter : function(value, row, index){
                     return  value == 'MENU'? '菜单' : '按钮';
                 }
             },{
                 field: 'url',
                 title: '访问地址',
                 align: 'center',
                 valgn:'center'
             }],
             locale: "zh-CN",
             "queryParamsType": "limit",
             contentType:"application/x-www-form-urlencoded",
             queryParams: function queryParams(params) {
                 return {
                     //传参
                     pageNumber:params.offset,
                     pageSize:params.limit,
                     start:0,
                     id:id
                 };
             },
             onLoadSuccess: function(){  //加载成功时执行
//                  layer.close(loading);
                 //layer.msg("加载成功");
             },
             onLoadError: function(){  //加载失败时执行
                 //layer.msg("加载数据失败", {time : 1500, icon : 2});
             }
         });
}



var setting = {
			view: {
				showIcon: showIconForTree
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeExpand: beforeExpand,
				onExpand: onExpand,
				onClick: onClick
			}
		};

		function showIconForTree(treeId, treeNode) {
			return !treeNode.isParent;
		};
		
		function createNodes(maxNodesNumInLevel, maxLevel, curLevel, curPId) {
			if (maxNodesNumInLevel<5) {
				maxNodesNumInLevel = 5;
			}
			var nodes = [], num = 0;
			while(num<3) {
				num = parseInt(Math.random()*1024)%maxNodesNumInLevel+1;
			}
			for (var i=0; i<num; i++) {
				var id = curPId ? curPId + "-" + i : "" + i, isParent = (parseInt(Math.random()*9999)%3!=0),
				node = {id: id, pId : curPId, name : "N" + id};
				nodes.push(node);
				if (isParent && curLevel<maxLevel) {
					nodes = nodes.concat(createNodes(maxNodesNumInLevel, maxLevel, curLevel+1, id));
				}
			}
            return nodes;
		}
		var zNodes =createNodes(5, 5, 0);

		var curExpandNode = null;
		function beforeExpand(treeId, treeNode) {
			var pNode = curExpandNode ? curExpandNode.getParentNode():null;
			var treeNodeP = treeNode.parentTId ? treeNode.getParentNode():null;
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			for(var i=0, l=!treeNodeP ? 0:treeNodeP.children.length; i<l; i++ ) {
				if (treeNode !== treeNodeP.children[i]) {
					zTree.expandNode(treeNodeP.children[i], false);
				}
			}
			while (pNode) {
				if (pNode === treeNode) {
					break;
				}
				pNode = pNode.getParentNode();
			}
			if (!pNode) {
				singlePath(treeNode);
			}

		}
		function singlePath(newNode) {
			if (newNode === curExpandNode) return;

            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                    rootNodes, tmpRoot, tmpTId, i, j, n;

            if (!curExpandNode) {
                tmpRoot = newNode;
                while (tmpRoot) {
                    tmpTId = tmpRoot.tId;
                    tmpRoot = tmpRoot.getParentNode();
                }
                rootNodes = zTree.getNodes();
                for (i=0, j=rootNodes.length; i<j; i++) {
                    n = rootNodes[i];
                    if (n.tId != tmpTId) {
                        zTree.expandNode(n, false);
                    }
                }
            } else if (curExpandNode && curExpandNode.open) {
				if (newNode.parentTId === curExpandNode.parentTId) {
					zTree.expandNode(curExpandNode, false);
				} else {
					var newParents = [];
					while (newNode) {
						newNode = newNode.getParentNode();
						if (newNode === curExpandNode) {
							newParents = null;
							break;
						} else if (newNode) {
							newParents.push(newNode);
						}
					}
					if (newParents!=null) {
						var oldNode = curExpandNode;
						var oldParents = [];
						while (oldNode) {
							oldNode = oldNode.getParentNode();
							if (oldNode) {
								oldParents.push(oldNode);
							}
						}
						if (newParents.length>0) {
							zTree.expandNode(oldParents[Math.abs(oldParents.length-newParents.length)-1], false);
						} else {
							zTree.expandNode(oldParents[oldParents.length-1], false);
						}
					}
				}
			}
			curExpandNode = newNode;
		}

		function onExpand(event, treeId, treeNode) {
			curExpandNode = treeNode;
		}

		function onClick(e,treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			$("#pid").val(treeNode.id);
			$("#lev").val(treeNode.lev);
			flashRight(treeNode.id);
			zTree.expandNode(treeNode, null, null, null, true);
		}