$(function() {
	var setting = {};

	/*var zNodes = [{
			name: "广东电信省公司",
			open: true,
			iconSkin: false,
			children: [{name: "软件部"},
				{name: "装维部"},
				{name: "设计部"},
				{
					name: "部门一",
					open: false,
		  children: [{
			    name: "部门二"
					}, ]
				},
			]
		},
		{
			name: "佛山电信分公司",
			open: false,
			children: [{
					name: "父节点21 - 展开",
					open: false,
					children: [{
							name: "叶子节点211333333333333333333333333"
						},
						{
							name: "叶子节点212"
						},
						{
							name: "叶子节点213"
						},
						{
							name: "叶子节点214"
						}
					]
				},
				{
					name: "父节点22 - 折叠",
					open: false,
					children: [{
							name: "叶子节点221"
						},
						{
							name: "叶子节点222"
						},
						{
							name: "叶子节点223"
						},
						{
							name: "叶子节点224"
						}
					]
				},
				{
					name: "父节点23 - 折叠",
					open: false
				}
			]
		},
		{
			name: "云浮电信分公司",
			isParent: true,
			children: [{
					name: "叶子节点231"
				},
				{
					name: "叶子节点232"
				},
				{
					name: "叶子节点233"
				},
				{
					name: "叶子节点234"
				}
			]
		}

	];*/
	
	//$.fn.zTree.init($("#treeDemo"), setting, zNodes);

		//选项框结构功能开始

		$('.file').mouseenter(function(event) {
				$(this).prepend($('<em class="iconfont add">&#xe7d2;</em>'));	
		}).mouseleave(function(event) {
			$(this).children('.add').remove();
		});
		$(document).on('mouseenter', '.sm_three_ul li', function() {
			$(this).append($('<em class="iconfont con_remove">&#xe66c;</em>'));
		});
		$(document).on('mouseleave', '.sm_three_ul li', function() {
			$(this).children('.con_remove').remove();
		});
		//第二个框点击效果开始
		$(".sm_two_ul").on('click', '.file', function() {
			if($(this).children('.con_select').attr('class') == 'iconfont con_select') {

			} else {
				$('.sm_three_ul').append($('<li><span id="'+$(this).children('span').attr("id")+'">' + $(this).children('span').text() + '</span></li>'));
				$(this).append($('<em class="iconfont con_select">&#xe64d;</em>'));
				$(this).css('color', '#c1c1c1');
				$(this).children('.add').hide();
				$(this).children('.trangle').hide();
				$(this).mouseenter(function(event) {
					$('.add').remove();
				});

			}
		});
		//第三个框点击删除效果	
		$(document).on('click','.con_remove',function(){
			$(this).parent().remove();
			for(var i=0;i<$('.file').length;i++)
			{
				if($('.file').eq(i).children('span').text()==$(this).parents().children('span').text())
				{
					$('.file').eq(i).css('color','#333');
					$('.file').eq(i).children('.con_select').remove();
					$('.file').eq(i).mouseenter(function(event) {
						 $(this).prepend($('<em class="iconfont add">&#xe7d2;</em>'));
					});
				}
			}	
			
		})
		//清空效果开始
		$(document).on('click', '.float_R', function() {
			$('.sm_two_ul .file').css('color', '#333');
			$('.sm_two_ul .file').children('.con_select').remove();
			$('.sm_two_ul .file').mouseenter(function(event) {
				$(this).prepend($('<em class="iconfont add">&#xe7d2;</em>'));
			});
			$(".sm_three_ul li").remove().html()
		});

		//成员全体增加效果
		$(document).on('click', '.all_add', function() {
			var len = $(".sm_two_ul .file").length;
			for(var i = 0; i < len; i++) {
				if($('.file').eq(i).find('em').hasClass('con_select')) {

				} else {
					$(".sm_three_ul").append($('.file').eq(i).clone());
					$('.sm_two_ul .file').eq(i).append($('<em class="iconfont con_select">&#xe64d;</em>'));
					$('.sm_two_ul .file').eq(i).css('color', '#c1c1c1');
					$('.sm_two_ul .file').eq(i).children('.add').hide();
					$('.sm_two_ul .file').eq(i).mouseenter(function(event) {
						$('.add').remove();

					})

				}
			}
		});

		//模糊查询匹配数据开始 
		//弹出列表框  
		$('.div_item').mouseenter(function(event) {
				$(this).prepend($('<em class="iconfont mored">&#xe7d2;</em>'));	
		}).mouseleave(function(event) {
			$(this).children('.mored').remove();
		});
		$(".div_items").on('click', '.div_item', function() {
			if($(this).children('.moreds').attr('class') == 'iconfont moreds') {
				
			} else {
				$(this).prepend($('<em class="iconfont moreds">&#xe64d;</em>'));
				$(this).children('.mored').hide();
				$(this).mouseenter(function() {
					$(this).children('.mored').remove()
				})
			}
		})

		$(".txt1").click(function() {
			$(".div_items").css('display', 'block');
			return false;
		});

		//隐藏列表框  
		$("body").click(function() {
			$(".div_items").css('display', 'none');
		});
		//文本框输入  
		$(".txt1").keyup(function() {
			$(".div_items").css('display', 'block'); //只要输入就显示列表框  
			$(".div_item").css('display', 'none'); //如果填了，先将所有的选项隐藏  
			for(var i = 0; i < $(".div_item").length; i++) {
				//模糊匹配，将所有匹配项显示  
				if($(".div_item").eq(i).text().substr(0, $(".txt1").val().length) == $(".txt1").val()) {
					$(".div_item").eq(i).css('display', 'block');
				}
			}
		});
		//项点击  
		$(".div_item").click(function() {
			$(".txt1").val($(this).children('span').text());
			$(this).siblings('li').children('.moreds').remove()
			$('.div_item').mouseenter(function(event) {
			if($(this).find("em").length > 0){
			}else{
				$(this).prepend($('<em class="iconfont mored">&#xe7d2;</em>'));
			}
		});

	});	
		

});