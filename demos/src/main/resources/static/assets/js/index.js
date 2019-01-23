$(function () {
    console.log("123444");
    //sendHistoryTable();

    $("#enter").on("click",function () {

        var userName = $("#username").val();
        var passWord = $("#password").val();

        $.ajax({
            type:'POST',
            url:'../wechat/login',
            data:{"username":userName,"password":passWord},
            success:function (data) {
                if (data.code == 0) {
                    location.href = '../wechat/index';
                } else {
                    alert(data.msg);
                }
            }
        })

    })

})

/**发送历史-表格 */
function sendHistoryTable(){
    /*var bodyH=$(window).height();
    var height=bodyH-offsetT-34;*/
    var doneHtml="<div class='done_more'>"+
        "<a href='javascript:void(0)' class=''>预览</a>"+
        "</div>"

    $.ajax({
        type:'POST',
        url:'flowInfo/findAllFlow',
        data:{},
        success:function (data) {
            var tableObj2={
                targID:"table_result",
                fixedColumns: true,
                fixedNumber:1,
                fixedDirect:"right",
                height:340,
                search:true,
                searchOnEnterKey:true,
                pagination:true,
                sidePagination:"client",//客户端分页
                pageSize:20,//显示条数
                columns:[
                    {field:"ids",title:"",checkbox:true},
                    {field:"flowInitiator",title:"发起人"},
                    {field:"flowName",title:"当前节点"},
                    {field:"recipientType",title:"接收人类型"},
                    {field:"flowOrder",title:"流程顺序"},
                    {field:"flowRole",title:"当前处理人角色"},
                    {field:"flowPerson",title:"当前处理人"},
                    {field:"flowStatus",title:"流程状态"},
                    {field:"flowAdvise",title:"审批意见"},
                    {field:"flowNext",title:"下一个处理人"},
                    {field:"flowLast",title:"上一个处理人"},
                    {field:"flowLink",title:"上一环节"},
                    {field:"flowLinkAdvise",title:"上一环节审批意见"},
                    {field:"createDate",title:"创建日期"}
                ],
                data:data.rows
            }
            initMyBTTable(tableObj2);
        }

    })



}