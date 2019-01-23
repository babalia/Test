/**
 * @description bootstrap table的初始化基本参数封装
 * @param {*} obj 
 * @augments:一 必需（1、targID--需要初始化的表格ID；2、columns--表格列（表头））；
 *           二 可选（1、url--选择请求服务器数据时需要；2、data--直接加载json数据时需要；3、searchOnEnterKey--回车搜索,这里默认为false;4、showRefresh--刷新按钮，这里默认为true;   5、showColumns--列选择按钮，这里默认为true；6、showToggle--是否显示详细视图和列表视图的切换按钮，这里默认为true；7、height--表格高度，这里默认设置500；8、method--请求数据方式，这里默认为"post"；9、search--是否搜索，这里默认为false；10、pagination--是否显示分页，这里默认分页；11、sidePagination--分页方式，这里默认服务端分页；12、pageSize--每页行数，这里默认10；13、  pageList--分页步进值，这里默认设置了[10,20, 50, 100, 'All']；14、queryParamsType--限定请求数据时返回参数的格式，这里默认设置为空；15、contentType--发送到服务器的数据编码类型，这里默认设置为"application/x-www-form-urlencoded"；16、successCB--请求数据成功后的回调函数；17、errorCB--请求数据失败后的回调函数）
 */

function initMyBTTable(obj){
    $("#"+obj.targID).bootstrapTable({
        searchAlign: "right", //查询框对齐方式
        searchOnEnterKey: obj.searchOnEnterKey||false, //回车搜索
        showRefresh:obj.showRefresh==null?true:obj.showRefresh, //刷新按钮
        showColumns: obj.showColumns==null?true:obj.showColumns, //列选择按钮
        showToggle: obj.showToggle==null?true:obj.showToggle, //是否显示详细视图和列表视图的切换按钮
        buttonsAlign: "right", //按钮对齐方式
        toolbarAlign: "left", //工具栏对齐方式
        height: obj.height||500, //高度调整
        method: obj.method||'post',
        // toolbar: '#toolbar',
        search: obj.search||false,//是否搜索
        
        striped: false, //是否显示行间隔色
        cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: obj.pagination==null?true:obj.pagination, //是否显示分页（*）
        sidePagination: obj.sidePagination||"server", //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: obj.pageSize||10,
        pageList: obj.pageList||[10,20, 50, 100, 'All'], //分页步进值
        minimumCountColumns: 2, //最少允许的列数
        hideColumn: "ID", //每一行的唯一标识，一般为主键列
        
        cardView: false,
        clickToSelect: true,
        url:obj.url,
        columns:obj.columns,
        data:obj.data,
        locale: "zh-CN",
        queryParamsType: obj.queryParamsType||"",
        contentType: obj.contentType||"application/x-www-form-urlencoded",
        queryParams: obj.queryParams,
        fixedColumns: obj.fixedColumns||false,//固定列
        fixedNumber:obj.fixedNumber||1,
        fixedDirect:obj.fixedDirect,
        onLoadSuccess: function () {
            if(obj.successCB()){
            	obj.successCB();	
            }
        },
        onLoadError: function () {
            if(obj.errorCB()){
            	obj.errorCB();
            }
        }
    })
}