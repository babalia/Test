//单选	 
 $(".sel_menu").select2({
	/*开启多选功能：在ID标签处加上multiple="multiple"属性即可 */
});  

$(function(){
	$('table').on("mouseenter",'.ellipsis_css',function (e){
		var this_text = $(this).html();
		this_text = this_text.substring(this_text.indexOf("</i>"));
		layer.tips(this_text,this, {
		tips: [3, '#666'],
		 closeBtn:false,
		   time:2000,
		});
		});
	
	$('.ellipsis_css').mouseleave(function(event) {
		layer.closeAll('tips');
	});
	initTable(1);
	//console.log("66666");
});
//---------当点击查询按钮的时候执行  
function search2(){
	var t = $("#my_addin_code").val();
	var v = $("#search_input2").val();
	$("#my_file_id").html(v);
    initTable2(t);
}
//---------当点击查询按钮的时候执行  

//---------左边项目资料目录begin---------
function initTable(id) { 
			var columns = [{ 
                field: 'projName',
               // title: '<i class="iconfont">&#xe660;</i><a onClick="initTable(1)">项目名称</a>         <i class="iconfont">&#xe660;</i><a onClick="initTable(2)">商机名称</a>',
                //title:  ',
                align: 'left',
               	formatter : function(value, row, index){
               			if(0 == index){//默认触发第一列的值
                   			queryProjFiles(row.projCode,row.projName);
                   			return  "<div class='current div_ellipsis_css' ><a class='ellipsis_css ui_a_click' onClick='queryProjFiles("+"\""+row.projCode+"\""+",\""+row.projName+"\")'>"+'<i class="iconfont ui_icon" style="color:#fff;">&#xe648;</i>'+row.projName+'</a></div>';
                   		}else{
                   			return  "<div  class=' div_ellipsis_css' ><a class='ellipsis_css ui_a_click ' onClick='queryProjFiles("+"\""+row.projCode+"\""+",\""+row.projName+"\")'>"+'<i class="iconfont ui_icon">&#xe62e;</i>'+row.projName+'</a></div>';
                   		}
        		    }
                	
            }];
			var param = {
					projName:$("#projName").val(),
					planName:$("#planName").val()
			};
			
			$.loadTable4Data('table_result','../projectData/queryProjects.do?type='+id,columns,param);
			//默认显示第一条记录
}  

//---------左边项目资料目录 end---------
//---------右边项目文件begin---------
function initTable2(jcode) { 
	
			var columns = [{ 
                field: '',
                title: '序号',
                align: 'left',
                formatter:function(value,row,index){
                	return index+1;
                }
            },{ 
                field: 'fileName',
                title: '文件名称',
                align: 'left',
                formatter:function(value,row,index){
                	if("xls" == row.fileType || "xlsx" == row.fileType){
                		return "<i class='iconfont fn-mr5 font_excel'>&#xe728;</i>"+row.fileName;
                	}
                	if("doc" == row.fileType || "docx" == row.fileType){
                		return "<i class='iconfont fn-mr5 font_word'>&#xe728;</i>"+row.fileName;
                	}
                	if("pdf" == row.fileType){
                		return "<i class='iconfont fn-mr5 font_pdf'>&#xe728;</i>"+row.fileName;
                	}else{
                		return row.fileName;
                	}
                	
                }
               
            },{ 
                field: 'fileClass',
                title: '项目过程',
                align: 'left'
            } 
            ,{ 
            	field: 'planType',
            	title: '文档类别',
            	align: 'left'
            },{ 
                field: 'staffName',
                title: '创建者',
                align: 'left'
            },{ 
                field: 'createTime',
                title: '创建时间',
                align: 'left'
            },{ 
                field: 'size',
                title: '大小',
                align: 'left'
            },{ 
                field: 'p',
                title: '操作',
                align: 'left',
                formatter:function(value,row,index){
                	//onclick=\'downloadFile("'+data.filePath+'")\'
						//+'<i class="float_L iconfont" title="下载" onclick=\'downloadFile("'+data.filePath+'")\'>&#xe604;</i>'

                	var d = '<a onClick=\'downloadFile("'+row.url+'")\'><i class="iconfont download_btn" title="下载">&#xe604;</i></a>';
					var de= "<privilege:privilegeByName name='项目资料文件删除'>"+
							"<a onClick='deleteProjFile("+row.id+")'><i class='iconfont delete_btn' title='删除' >&#xe6a5;</i></a>"+
							"</privilege:privilegeByName>";
					if("N" == row.isVisable){
						de="";
					}
                	return d +'  '+ de;
                }
                
                	
            }];
			var v = $("#search_input2").val();
			var param = {
					projCode:jcode,
					projName: v
			};
			
			$.loadTable4Data('table_result2','../projectData/queryProjectFiles.do',columns,param);
		 }  

//---------右边项目文件 end---------

//---------左边项目资料点击事件begin---------
function queryProjFiles(jcode,jname){
//	alert(jcode+"----"+jname);
	$("#my_file_id").html(jname);//我的文件 
	$("#my_addin_code").val(jcode);
	initTable2(jcode);
}
//---------左边项目资料点击事件end---------
//---------下载文件begin--------------
/**
 * 
function downProFile(u){
	 var url= "../projectData/downProjFile.do?id="+u;
	  
	    if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8.") { 
				 window.location.href(url);
		}else{
				window.open(url);
	   }
}
*/
//文件下载
function downloadFile(filePath){
	//console.log(filePath);
	$.download(filePath);
} 
//---------下载文件end--------------
//---------删除项目文件begin---------
function deleteProjFile(id){
	 $.confirm('确定要删除吗?',function(){
		  // ----ajax  begin
		 	$.ajax({
		 	  	 type: "POST",
		         url: "../projectData/deleteProjectFile.do",
		         data:{"id":id},
		         dataType: "text",
		         success: function(data){
		        	$.success("删除成功！");
		        	queryProjFiles($("#my_addin_code").val(),$("#my_file_id").html());
		         },
				 error : function(data){
				 }
			});
		 //----ajax end   	
	 });
	
}
//---------删除项目文件end---------
//---------上传多个项目文件begin---------
function btn_upload_div(){
	var c = $("#my_addin_code").val();
	var n =$("#my_file_id").html();
	$.post('../projectData/toUploadPage.do', {"addin_code":c,"project_name":n}, function(str){
		  layer.open({
			    type: 1,
			    title:'上传文件',
			    scrollbar: true,
			    area: ['80%', '80%'],
			    shadeClose: true,
			    content: str
		  });
	});
}
//---------上传多个项目文件end---------

/*$("table").on("click",'.ui_a_click',function (e) {
		$(this).children('i').html('&#xe648;').css('color','#fff');
	})*/
	
	$("table").on("click",'.ui_a_click',function (e){
	$('.ui_table_border1 div').removeClass('current').find('i').html('&#xe62e;').css('color','#ccc');
	$(this).parent().addClass('current').find('i').html('&#xe648;').css('color','#fff');
	
	
	
	
})

$('.ibox_title_know li').click(function(){
		$(this).siblings('li').removeClass('curr');
		$(this).addClass('curr');	
	})

