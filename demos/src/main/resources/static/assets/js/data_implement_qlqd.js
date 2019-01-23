			    
			//单选
			var data = [{ id: 0, text: 'option1' }, { id: 1, text: 'option2' }, { id: 2, text: 'option3' }, { id: 3, text: 'option4' }, { id: 4, text: 'option5' }];
				 $("#sel_city").select2({
	 				  data: data
					/*开启多选功能：在ID标签处加上multiple="multiple"属性即可 */
					
				 });  
				
				
        $(function() {
            //根据窗口调整表格高度
            $(window).resize(function() {
                $('#table_result').bootstrapTable('resetView', {
                    height: tableHeight()
                })
            })

            $('#table_result').bootstrapTable({
                height: tableHeight(),//高度调整
                striped:true,//设置为 true 会有隔行变色效果
                pagination: true,//是否分页
                pageSize: 20,//单页记录数
                pageList: [ 20, 50, 100, 'All'],//分页步进值
                search: true,//是否搜索
                searchAlign: "right",//查询框对齐方式
                searchOnEnterKey: false,//回车搜索
                showRefresh: true,//刷新按钮
                showColumns: true,//列选择按钮
                showPaginationSwitch:true,//单页全部显示数据按钮
                showToggle:true,//是否显示 切换试图（table/card）按钮
                buttonsAlign: "right",//按钮对齐方式
                toolbar: "#toolbar",//指定工具栏
                toolbarAlign: "left",//工具栏对齐方式
                columns: [

                    
                ],
                onClickRow: function(row, $element) {
                    //$element是当前tr的jquery对象
                    alert("你点击了第"+ $element.index()+"栏")
                },//单击row事件
                locale: "zh-CN",//中文支持,
                detailView: false, //是否显示详情折叠
                
            });

        })

        function tableHeight() {
            return $(window).height() - $('.query_terms_wrap').height()-100;
        }
        
        
/*弹窗树形菜单开始*/
		var setting = {
			
			check: {
				enable: true,
				chkboxType: {"Y":"ps", "N":"ps"}
			},
			view: {	
				dblClickExpand: true,//双击节点展开子节点
				showIcon: showIconForTree
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeClick: beforeClick,
				onCheck: onCheck
			}
		};

		var zNodes =[
			{ id:1, pId:0, name:"随意勾选 1", open:true},
			{ id:11, pId:1, name:"随意勾选 1-1", open:true},
			{ id:111, pId:11, name:"随意勾选 1-1-1"},
			{ id:112, pId:11, name:"随意勾选 1-1-2"},
			{ id:12, pId:1, name:"随意勾选 1-2", open:true},
			{ id:121, pId:12, name:"随意勾选 1-2-1"},
			{ id:122, pId:12, name:"随意勾选 1-2-2"},
			{ id:2, pId:0, name:"随意勾选 2",  open:false},
			{ id:21, pId:2, name:"随意勾选 2-1"},
			{ id:22, pId:2, name:"随意勾选 2-2", open:false},
			{ id:221, pId:22, name:"随意勾选 2-2-1"},
			{ id:222, pId:22, name:"随意勾选 2-2-2"},
			{ id:23, pId:2, name:"随意勾选 2-3"}
		];
		
		function onCheck(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			nodes = zTree.getCheckedNodes(true),
			v = "";
			for (var i=0, l=nodes.length; i<l; i++) {
				v += nodes[i].name + ",";
			}
			if (v.length > 0 ) v = v.substring(0, v.length-1);
			var treeObj = $("#treeSel");
			treeObj.attr("value", v);
		};
		
		function beforeClick(treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.checkNode(treeNode, !treeNode.checked, null, true);
			return false;
		};
		
		function showIconForTree(treeId, treeNode) {
			/*去除一级菜单图标*/
			return !treeNode.isParent;
		};
		
		function showMenu() {
			var treeMenu =	layer.open({
						  type: 1,
						  title:['选择筛选条件'],
						  skin: 'my_layerSkin_window', //自定义皮肤 
						  area: ['100%', '100%'], //宽高
						  content:$('#menuContent'),//DOM对象
						  scrollbar:false,//是否允许浏览器出现滚动条
						  btn: ['确定'],
						  shadeClose:true,
						  btn1: function(){
						  	layer.close(treeMenu);
						    //按钮【按钮一】的回调
						  },
						  btnAlign: 'c'//按钮居中对齐
						});
		}
		
		
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		});
		
/*弹窗树形菜单结束*/	
	        