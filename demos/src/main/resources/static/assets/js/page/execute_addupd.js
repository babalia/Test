//单选	 
  

$(document).ready(function(){
	//失去焦点时触发事件
	//打分不合格的校验begin
	$("#score_id").blur(function(){
		var s  = $("#score_id").val();//scoreDesc_id
		if($.trim(s)==20){
			$("#scoreDesc_id").parents('dt').removeClass("error").addClass("form_control success");
			$("#scoreDesc_id").parents('dt').children('.font_red').remove();
			$("#scoreDesc_id").attr("valid","char200");
		}else{
			$("#scoreDesc_id").attr("valid","notNull");
			$("#scoreDesc_id").parents('dt').children('.font_red').remove();
			$("#scoreDesc_id").parents('dt').addClass("error").addClass("form_control error");
			$("#scoreDesc_id").parents('dt').children('.font_red');
			$("#scoreDesc_id").parents('.bor_cor1').find('i').addClass('boder_r_red').addClass('font_red');
			$("#scoreDesc_id").parents('dt').append(nullP);
		}
	});
	$("#on_score_id").blur(function(){
		var s1 = $("#on_score_id").val();//on_scoreDesc_id
		if($.trim(s1) == 30){
			$("#on_scoreDesc_id").parents('dt').removeClass("error").addClass("form_control success");
			$("#on_scoreDesc_id").parents('dt').children('.font_red').remove();
			$("#on_scoreDesc_id").attr("valid","char200");
		}else{
			$("#on_scoreDesc_id").attr("valid","notNull");
			$("#on_scoreDesc_id").parents('dt').children('.font_red').remove();
			$("#on_scoreDesc_id").parents('dt').addClass("error").addClass("form_control error");
			$("#on_scoreDesc_id").parents('dt').children('.font_red');
			$("#on_scoreDesc_id").parents('.bor_cor1').find('i').addClass('boder_r_red').addClass('font_red');
			$("#on_scoreDesc_id").parents('dt').append(nullP);
		}
	});
	$("#back_score_id").blur(function(){
		var s2 = $("#back_score_id").val();//back_scoreDesc_id
		if($.trim(s2) == 50){
			$("#back_scoreDesc_id").parents('dt').removeClass("error").addClass("form_control success");
			$("#back_scoreDesc_id").parents('dt').children('.font_red').remove();
			$("#back_scoreDesc_id").attr("valid","char200");
		}else{
			$("#back_scoreDesc_id").attr("valid","notNull");
			$("#back_scoreDesc_id").parents('dt').children('.font_red').remove();
			$("#back_scoreDesc_id").parents('dt').addClass("error").addClass("form_control error");
			$("#back_scoreDesc_id").parents('dt').children('.font_red');
			$("#back_scoreDesc_id").parents('.bor_cor1').find('i').addClass('boder_r_red').addClass('font_red');
			$("#back_scoreDesc_id").parents('dt').append(nullP);
		}
	});
	//打分不合格的校验end
	
	
	
	
	queryPageData();
	// 初始化动态时间插件
	$('table').on('focus','.dateti',function() {  
        $(this).datetimepicker({
	        language:'zh-CN',
		 	format: 'yyyy-mm-dd',
		 	autoclose: true,
		 	todayBtn: true
        });
    });
}) ;


//------提交----begin
function btn_save(){
	
	//---基本数据project
	 data1={
			 projCode:$("#p_projCode_id").val(),//项目编号
			 createCmpName:$("#p_createCmpName_id").val(),//*创建单位
			 createStaff:$("#p_createStaff_id").val(),//创建人员
			 type:$("input[name='nice_name']:checked").val(),//*执行单位类型
			 executeOrder:$("#p_executeOrder_id").val(),//执行单编号
			 projName:$("#p_projName_id").val(),//项目名称
			 level:$("#p_level_id").val(),//项目等级
			 cityName:$("#p_cityName_id").val(),//所在城市
			 custPerson:$("#p_custPerson_id").val(),//客户联系人
			 custManager:$("#p_custManager_id").val(),//客户经理
			 custManagerDesc:$("#p_custManagerDesc_id").val(),//客户需求描述
			 source:$("#p_source_id").val(),//项目来源
			
			 createDepName:$("#p_createDepName_id").val(),//创建部门
			 createTime:$("#p_createTime_id").val(),//创建时间
			 officePhone:$("#p_officePhone_id").val(),//办公电话
			 createPhone:$("#p_createPhone_id").val(),//联系电话
			 custMail:$("#p_custMail_id").val(),//电子邮件
			 relateProduct:$("#p_relateProduct_id").val(),//关联产品
			 custName:$("#p_custName_id").val(),//客户名称
			 custId:$("#p_custId_id").val(),//客户编号
			 custPhone:$("#p_custPhone_id").val(),//客户联系人联系方式
			 custManagerPhone:$("#p_custManagerPhone_id").val(),//客户经理联系方式
			 areaId:$("#p_areaName_id").val(),//所在区县
			 areaName:$.trim($("#p_areaName_id").find("option:selected").text()),//所在区县
			 relateCode:$("#p_relateCode_id").val()//关联编码
			 };
	 
			 //售前支撑信息
	data2={	 
			 projCode:$("#p_projCode_id").val(),//项目编号
			 dutyComp:$("#dutyComp_id").val(),//*责任单位
			 dutyPerson:$("#dutyPerson_id").val(),//责任单位联系人
			 dutyPhone:$("#dutyPhone_id").val(),//责任单位联系方式
			 haveSi:$("#haveSi_id").find("option:selected").val(),//有无SI支撑
			 projectDoTime:$("#projectDoTime_id").val(),//计划实施时间
			 remark:$("#remark_id").val(),//其它说明
			 partComp:$.trim($("#select_partComp_id").find("option:selected").text()),//合作单位select_partComp_id  这几个要作特殊处理
			 partPerson:$("#se_partPerson_id").val(),//合作单位联系人 $("#se_partPerson_id").val(data.f2);
			 partPhone:$("#se_partPhone_id").val(),//合作单位联系方式 $("#se_partPhone_id").val(data.f3);
			 partWork:$("#partWork_id").val(),//承担工作
			 score:$("#score_id").val(),//SI服务打分
			 scoreDesc:$("#scoreDesc_id").val()//扣分说明
		};
	 //售中服务信息
	data3={	
			saleId:$("#on_saleId_id").val(),//主键ID
			projCode:$("#p_projCode_id").val(),//项目编号
			dutyComp:$("#on_dutyComp_id").val(),//*责任单位
			fDate:$("#on_finishDate_id").val(),//*要求完成时间
			remark:$("#on_remark_id").val(),//其它说明
			//dutyPerson:$("#on_dutyPerson_id").val(),//*项目经理
			//dutyPhone:$("#on_dutyPhone_id").val(),//*项目经理联系方式
			score:$("#on_score_id").val(),//SI服务打分
			scoreDesc:$("#on_scoreDesc_id").val()//扣分原因
		};
	//售中实施单位信息--列表
	var array1 = [];
	// 遍历table 表格中的所有tr
	$('#table_id1 > tbody > tr').each(function (index, value){
			// 获取tr 中所有td 的值并装入临时的param 散列表
		
			var param = {
					saleDLId: $("#sale_on_"+index).val(),//主键ID
					//compType: $("#sale_on_"+index).val(),//单位类型
					operComp: $("#on_operCom_"+index).find("option:selected").text(),//单位名称
					eDate: $(value).find("td:eq(2) input").val()//要求完成时间
					
			};
			// 将带有所有页面值的 散列表装入array 数组中
			array1.push(param);
	});
	//售后服务信息
	data4={	
			saleId:$("#back_saleId_id").val(),//主键ID
			projCode:$("#p_projCode_id").val(),//项目编号
			dutyComp:$("#back_dutyComp_id").val(),//*责任单位
			fDate:$("#back_finishDate_id").val(),//售后交付时间
			remark:$("#back_remark_id").val(),//其它说明
			dutyPerson:$("#back_dutyPerson_id").val(),//产品维护经理
			dutyPhone:$("#back_dutyPhone_id").val(),//产品维护经理联系方式
			score:$("#back_score_id").val(),//SI服务打分
			scoreDesc:$("#back_scoreDesc_id").val()//扣分原因
		};
	//售中实施单位信息--列表
	var array2 = [];
	// 遍历table 表格中的所有tr
	$('#table_id2 > tbody > tr').each(function (index, value){
		
			// 获取tr 中所有td 的值并装入临时的param 散列表
			var param = {
					saleDLId: $("#sale_back_"+index).val(),//主键ID
					operComp: $("#back_operCom_"+index).find("option:selected").text(),//单位名称
					sDate: $(value).find("td:eq(2) input").val(),//维保期
					eDate: $(value).find("td:eq(3) input").val(),//维保期
					paySource: $("#back_paySource_"+index).find("option:selected").text()//成本来源
			};
			// 将带有所有页面值的 散列表装入array 数组中
			array2.push(param);
	});
	//上传文件的信息
	
	
	//console.log( $("#back_scoreDesc_id").attr("valid") );
	//提交校验-------------
	if(checkConfirm() =="true"){
		var loading =  $.loading();
		//提交校验-------------
		 // ----ajax  begin
		 	$.ajax({
		 	  	 type: "POST",
		         url: "../execute/saveExecuteData.do",
		         data:{
		        	 data1: JSON.stringify(data1),
		        	 data2: JSON.stringify(data2),
		        	 data3: JSON.stringify(data3),
		        	 data4: JSON.stringify(data4),
		        	 array1:JSON.stringify(array1),
		        	 array2:JSON.stringify(array2)
		         },
		         dataType: "text",
		         success: function(data){
		        	 layer.close(loading);
		        	 $.success('修改成功！');
		        	  var timer1=window.setTimeout(function(){
			        	  	removeTab();
			        	  },3000);

		         },
				 error : function(data){
						//$.success('！');
				 }
			});
		 //----ajax end  
	}
	
	
}
//------提交----end


//---------queryPageData  begin---------
function queryPageData(){
	
		  // ----ajax  begin
		 	$.ajax({
		 	  	 type: "POST",
		         url: "../execute/queryPageData.do",
		         data:{"PROJ_CODE":$("#p_projCode_id").val() },
		         dataType: "JSON",
		         success: function(data){
		        	 //-------售前支撑信息----begin
		        	 for(var q in data.s){
		        		 $("#"+q+"_id").val(data.s[q]);
		        		
		        		 $("#remark_id").html(data.s['remark']);
		        		 $("#scoreDesc_id").html(data.s['scoreDesc']);
		        		 $("#s_haveSi_id").val(data.s['haveSi']).trigger("change");//设置默认值选中  
		        	 }
		        	 	//售前支撑里的合作单位信息-----b
		        	
		        	 	 var ps = data.ps;//拼成下拉
		        	 	 var ps_sele="<option value=''>--请选择--</option>";
	   		        	 for(var d=0 ; d < ps.length ; d++){
	   		        		 $("#se_partPerson_id").val(ps[0]['f2']);//合作单位联系人	 默认显示第一个
	   		        		 $("#se_partPhone_id").val(ps[0]['f3']);//合作单位联系方式 	默认显示第一个
	   		        		 var v =ps[d]['f1'];
	   		        		 var id=ps[d]['id'];
	   		        		 var c =data.s['partComp'];
	   		        		 if(v == c ){
	   		        			 ps_sele += "<option  value='"+ id +"' selected>"+ v +"</option>";
	   		        		 }else{
	   		        			 ps_sele += "<option  value='"+ id +"'>"+ v +"</option>";
	   		        		 }
	   		        	 }
	   		        	$("#select_partComp_id").append(ps_sele);
		        	 	//售前支撑里的合作单位信息-----e
		        	 //-------售前支撑信息----end
		        	 //-------售中实施信息----begin
		        	 for(var a in data.n1){
		        		 $("#on_"+a+"_id").val(data.n1[a]);
		        		 $("#on_remark_id").html(data.n1['remark']);
		        		 $("#on_scoreDesc_id").html(data.n1['scoreDesc']);
		        	 }
		        	 var r =data.n1.finishDate;	//要求完成时间
		        	 if( r == null ){
		        		 r = '';
		        	 }else{
		        		 r = $.dateFormat(new Date(r),'yyyy-MM-dd');
		        	 }
		        	 $("#on_finishDate_id").val( r );
		        	 //-------售中实施信息----end
		        	 //-------售后服务信息----begin
		        	 for(var a in data.n2){
		        		 $("#back_"+a+"_id").val(data.n2[a]);
		        		 $("#back_remark_id").html(data.n2['remark']);
		        		 $("#back_scoreDesc_id").html(data.n2['scoreDesc']);
		        	 }
		        	 var r2 = data.n2.finishDate;	//*售后交付时间
		        	 if( r2 == null ){
		        		 r2 = '';
		        	 }else{
		        		 r2 = $.dateFormat(new Date(r2),'yyyy-MM-dd');
		        	 }
		        	 $("#back_finishDate_id").val( r2 );//直接拿出来，是对象
		        	 //-------售后服务信息----end
		        	 //----售中实施单位信息  循环表格--begin
		        	 var tr1="";
		        	 for(var b=0;b < data.s1.length;b++){//7条
		        		 var t1="";
		        		 var t2="";
		        		 var t3="";
		        		 var b3 =data.s1[b];
		        	
		        		 //循环  单位名称  拼成下拉    Partner 实体 -----------
	   		        	 var p_select="<select  class='sel_menu ' id='on_operCom_"+b+"' ><option value=''>--请选择--</option>";
	   		        	 for(var d=0 ; d < data.lp.length ; d++){
	   		        		 var v=data.lp[d]['partnerName'];
	   		        		 if(v == b3['operComp']){
	   		        			 p_select += "<option  selected value='"+ v +"'>"+ v +"</option>";
	   		        		 }else{
	   		        			 p_select += "<option  value='"+ v +"'>"+ v +"</option>";
	   		        		 }
	   		        	 }
	   		        	p_select +="</select>";
	   		        		//循环  单位名称  拼成下拉    Partner 实体 -----------b3['endDate']
	   		        		var t =b3['endDate']; //直接拿出来，是对象
			   		         if(t == null){
				        		 t="";
				        	 }else{
				        		 t =$.dateFormat(new Date(b3['endDate']),'yyyy-MM-dd');//直接拿出来，是对象
				        	 }
		        			 t3= "<div class='bor_cor1'>"+
		        				 "<div class='date_picker_wrap date_picker_wrapp'>"+
				 	        		"<input class='form-control date_picker_border dateti' id='finsh_date_"+b+"' type='text' value='"+ t +"' readonly title='请输入日期' >"+
						            "<span class='date_remove iconfont'>&#xe688;</span>"+
									"<span class='date_icon iconfont'>&#xe8a6;</span>"+
								"</div></div>";
		        			 
		        			 
		        				t1 ="<td>"+b3['compType']+ "<input type='hidden' id='sale_on_"+b+"' value='"+b3['saleDLId']+"' valid='notNull'/>" +"</td>";
		        				t2 ="<td>" +
		        						p_select +
		        					"</td>";
			        			t3="<td>"+ t3 +"</td>";	
		        		 
		        		 tr1 +="<tr>"+ t1 + t2 + t3 +"</tr>";
		        	 }
		        	 $("#tr_id1").html(tr1);
		        	 //----售中实施单位信息  循环表格--end
		        	
		        	 //----售后维护单位信息  循环表格--begin
		        	 var tr2="";
		        	 for(var b=0;b < data.s2.length;b++){//7条
		        		 var t1="";// 维护单位类型
		        		 var t2="";//单位名称
		        		 var t3="";//维保期开始
		        		 var t4="";//维保期结束
		        		 var t5="";//	成本来源
		        		 var b3 =data.s2[b];
		        		 //循环  单位名称  拼成下拉    Partner 实体-----------begin
	   		        	 var p_select2="<select  class='sel_menu ' id='back_operCom_"+b+"'><option value=''>--请选择--</option>";
	   		        	 for(var d2=0 ; d2 < data.lp.length ; d2++){
	   		        		 var v=data.lp[d2]['partnerName'];
	   		        		if(v == b3['operComp']){
	   		        			p_select2 += "<option  selected>"+ v +"</option>";
	   		        		}else{
	   		        			p_select2 += "<option>"+ v +"</option>";
	   		        		}
	   		        	 }
	   		        	p_select2 +="</select>";
	   		        	//循环  单位名称  拼成下拉    Partner 实体-----------end
	   		        	//循环   成本来源   拼成下拉   Parameter 实体----------begin
			        	 var s_select="<select  class='sel_menu ' id='back_paySource_"+b+"'><option value=''>--请选择--</option>";
			        	 for(var d=0 ; d < data.pt.length ; d++){
			        		 var v = data.pt[d]['value'];
			        		 if(v == b3['paySource'] ){
			        			 s_select += "<option  selected value='"+ v +"'>"+v+"</option>";
			        		 }else{
			        			 s_select += "<option  value='"+v+"'>"+v+"</option>";
			        		 }
			        	 }
			        	 s_select +="</select>";
			        	 //循环   成本来源   拼成下拉   Parameter 实体----------end
			        	 var t = b3['startDate'];
			        	  t2 =b3['endDate'];//直接拿出来，是对象
			        	 if(t == null){
			        		 t="";
			        	 }else{
			        		 t =$.dateFormat(new Date(t),'yyyy-MM-dd');//直接拿出来，是对象
			        	 }
			        	 if(t2 == null){
			        		 t2="";
			        	 }else{
			        		 t2 =$.dateFormat(new Date(t2),'yyyy-MM-dd');//直接拿出来，是对象
			        	 }
			        	  
			        	 
		        			
		        			 var v =b3['compType'];
		        			 if(v =="平台维护单位" || v =="应用系统维护单位"){
		        				 v="<span class='font_red'>*</span>"+v;
		        				 t1 ="<td>"+ v + "<input type='hidden' id='sale_back_"+b+"' value='"+b3['saleDLId']+"' valid='notNull' />"+"</td>";
		        				 t3= "<div class='bor_cor1'>"+
			        				 "<div class='date_picker_wrap date_picker_wrapp'>"+
					 	        		"<input class='form-control date_picker_border dateti'  type='text' value='"+ t +"' readonly title='请输入日期' valid='notNull'>"+
							            "<span class='date_remove iconfont'>&#xe688;</span>"+
										"<span class='date_icon iconfont'>&#xe8a6;</span>"+
									"</div></div>";
			        			 t4= "<div class='bor_cor1'>"+
			        				 "<div class='date_picker_wrap date_picker_wrapp'>"+
			        			 "<input class='form-control date_picker_border dateti'  type='text' value='"+ t2 +"' readonly title='请输入日期' valid='notNull'>"+
			        			 "<span class='date_remove iconfont'>&#xe688;</span>"+
			        			 "<span class='date_icon iconfont'>&#xe8a6;</span>"+
			        			 "</div></div>";
		        			 }else{
		        				 
		        				 t1 ="<td>"+ v + "<input type='hidden' id='sale_back_"+b+"' value='"+b3['saleDLId']+"'  />"+"</td>";
		        				 t3= "<div class='bor_cor1'>"+
			        				 "<div class='date_picker_wrap date_picker_wrapp'>"+
					 	        		"<input class='form-control date_picker_border dateti'  type='text' value='"+ t +"' readonly title='请输入日期' >"+
							            "<span class='date_remove iconfont'>&#xe688;</span>"+
										"<span class='date_icon iconfont'>&#xe8a6;</span>"+
									"</div></div>";
			        			 t4= "<div class='bor_cor1'>"+
			        				 "<div class='date_picker_wrap date_picker_wrapp'>"+
					        			 "<input class='form-control date_picker_border dateti'  type='text' value='"+ t2 +"' readonly title='请输入日期' >"+
					        			 "<span class='date_remove iconfont'>&#xe688;</span>"+
					        			 "<span class='date_icon iconfont'>&#xe8a6;</span>"+
				        			 "</div></div>";
		        			 }
		        				t2 ="<td>"
		        						+ p_select2 +
		        					"</td>";
			        			t3="<td>"+ t3 +"</td>";	
			        			t4="<td>"+ t4 +"</td>";	
			        			t5="<td>"
			        					+ s_select +
			        				"</td>";	
		        		 tr2 +="<tr>"+ t1 + t2 + t3 + t4 + t5 +"</tr>";
		        	 }
		        	 $("#tr_id2").html(tr2);
		        	 //----售后维护单位信息  循环表格--end
		        	 //-------循环附件的列表信息----begin
		        	 var htmlInner="";
		        	
		        	 for(var i =0;i<data.us.length;i++){
		        		 var d = data.us[i];
		        		 var id = d['id'];
		        		  htmlInner +=  '<tr>'
			                 +'<td class="hover" title="点击查看文件">'
			                 +$.setFiletypeIcon(d['fileType'])+"<span>"+d['fileName']+'</span></td>'
			                 +'<td class="">'+d['staffName']+'</td>'
			                 +'<td class="">'+d['fileClass']+'</td>'
			                 +'<td class="">'+d['createTime']+'</td>'
			                 +'<td class=" ">'+d['size']+'</td>'
			                 +'<td style="display:none">'+d['url']+'</td>'
			        	     +'<td style="display:none">'+d['fileType']+'</td>'
			                 +'<td class="tools_box">'
			        			+'<i class="float_L iconfont" title="下载" onclick=\'downloadFile("'+d['url']+'")\'>&#xe604;</i>'
			        			+'<privilege:privilegeByName name="执行单附件删除">'
			        			+	"<i class='float_L iconfont del'  title='删除' onclick='deleteFileById("+id+",this)'>&#xe6a5;</i>"
			        			+'</privilege:privilegeByName>'
			        		+'</td>'
			            	+'</tr>';
		        	 }
		        	   
		        	 	$(".sel_menu").select2({
		        	 		width:'100%'
		        	 	});//初始化的
		        	 	
		            	$("#uploadList").append(htmlInner);
		            	//对删除进行控制----------------
		            	var isD=$('#del_vis_id').val();
		            	if('N' == isD){
		            		$("#uploadList .del").css('visibility','hidden'); 
		            	}
		            	if('Y' == isD){
		            		//$("#uploadList .del").css('visibility','visible'); 
		            		
		            	}
		        	 //-------循环附件的列表信息----end
		            	// 初始化动态时间插件
		            	$('table').on('focus','.dateti',function() {  
		            		$(this).datetimepicker({
		            	        language:'zh-CN',
		            		 	format: 'yyyy-mm-dd',
		            		 	autoclose: true,
		            		 	todayBtn: true,
		            		 	minView: "month"
		                    });
		                });
		         },
				 error : function(data){
				 }
			});
		 //----ajax end   	
	
		 

}
//---------queryPageData   end---------

// 初始化动态时间插件
$('table').on('focus','.dateti',function() {  
	$(this).datetimepicker({
        language:'zh-CN',
	 	format: 'yyyy-mm-dd',
	 	autoclose: true,
	 	todayBtn: true,
	 	minView: "month"
    });
});

