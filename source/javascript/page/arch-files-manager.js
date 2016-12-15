$(function(){
	$('#valid_list').diySelect();
	$('#model_list').diySelect();
	$('#name_list').diySelect();
	$('#hander_list').diySelect();
  	CrtDialogInit();
  	ListDialogInit();
    ModelDialogInit();


  $('body').on('click','.num-add-btn',function(){
    $(this).parents('.num-wrap').append(
      '<div class="num-item">' +
      '<input class="num-input" />' +
      '<div class="num-up"></div>' +
      '<div class="num-down"></div>' +
      '<a class="num-a">采集</a>' +
      '<a class="num-a">采集</a>' +
      '<div class="btn btn-deny num-delete-btn">删除</div>' +
      '</div>'
    )
  }).on('click','.num-delete-btn',function(){
    if($('.num-item').length > 1){
      $(this).parents('.num-item').remove();
    }
  });
});
function CrtDialogInit(){
	var contentHtml = '<div class="dialog-item-wrap">' +
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">业务类型</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="area_list" class="diy-select" style="display: none;">' +
              '<option selected="" value="1">PC</option>' +
              '</select>' +
            '</div>' +
          '</div>'+
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">档案文件名称</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input"  value="创业板开通现场头像" />' +
            '</div>' +
          '</div>'+
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">档案文件模板内容</div>' +
              '<div class="dialog-right">' +
                '<div class="num-wrap">' +
                  '<div class="num-item">' +
                    '<input class="num-input" />' +
                    '<div class="num-up"></div>' +
                    '<div class="num-down"></div>' +
                    '<a class="num-a">采集</a>' +
                    '<a class="num-a">采集</a>' +
                    '<div class="btn btn-deny num-delete-btn">删除</div>' +
                  '</div>' +
                  '<div class="btn num-add-btn">添加</div>' +
                '</div>' +

              '</div>' +
            '</div>' +
            '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">备注</div>' +
            '<div class="dialog-right">' +
            '<textarea class="dialog-textarea"></textarea>' +
            '</div>' +
            '</div>' +
          '</div>'+
        '</div>'
  $('.btn-add').dialog({
    title: '创建业务',
    content: contentHtml,
    hasBtn: true,
    width: 500,
    height: 'auto',
    btnText: ['立即'],
    padding: '21px 27px 32px 27px',
    confirm: function (dialog) {
      dialog.destory();
    },
    afterShow: function () {
      $('#area_list').diySelect();
      $('.upload-box').on('click','.w-label',function(event){
        event.preventDefault();
        if (event && event.stopPropagation) {
          event.stopPropagation();
        } else {//IE浏览器
          event.cancelBubble = true;
        }

        var child = $(this).children("input[type='radio']");
        var ck = child.prop("checked");
        child.prop("checked",!ck);
      })
    }
  })
}
function ListDialogInit(){
	var contentHtml = '<div class="main-table">' +
    '<table width="100%" cellpadding="0" cellspacing="0" class="data-table table-padding7">' +
      '<thead>' +
      '<tr>' +
        '<th width="10%">ID</th>' +
        '<th width="50%">操作时间</th>' +
        '<th width="30%">操作人</th>' +
        '<th width="10%">状态</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>' +
        '<tr>' +
          '<td>001</td>' +
          '<td>2016-05-17 12:12:12</td>' +
          '<td>李二狗（10015）</td>' +
          '<td>有效</td> ' +
        '</tr>' +
        '<tr>' +
          '<td>001</td>' +
          '<td>2016-05-17 12:12:12</td>' +
          '<td>李二狗（10015）</td>' +
          '<td>有效</td> ' +
        '</tr>' +
      '</tbody>' +
    '</table>' +
  '</div>';
  $('.view-btn').dialog({
    title: '档案位置变更流水',
    content: contentHtml,
    hasBtn: false,
    width: 500,
    height: 'auto',
    padding: '21px 27px 32px 27px',
    confirm: function (dialog) {
      dialog.destory();
    },
    afterShow: function () {

    }
  })
}
function ModelDialogInit(){
  var contentHtml = '<div class="dialog-pic-wrap">' +
    '<div class="pic-time">2016年8月12</div>' +
    '<div class="pic-items">' +
      '<div class="pic-item-3"> ' +
        '<img src="" style="" alt="">' +
        '<p class="pic-page-num">第1页</p>' +
        '<p class="pic-page-info">条形码：12312313</p>  ' +
      '</div>' +
      '<div class="pic-item-3"> ' +
        '<img src="" style="" alt="">' +
        '<p class="pic-page-num">第2页</p>' +
        '<p class="pic-page-info">条形码：12312313</p>  ' +
      '</div>' +
      '<div class="pic-item-3"> ' +
        '<img src="" style="" alt="">' +
        '<p class="pic-page-num">第3页</p>' +
        '<p class="pic-page-info">条形码：12312313</p>  ' +
      '</div>' +
    '</div>' +
  '</div>'

  $('.set-btn').dialog({
    title: '档案模板详情',
    content: contentHtml,
    hasBtn: false,
    width: 550,
    height: 'auto',
    padding: '21px 27px 32px 27px',
    confirm: function (dialog) {
      dialog.destory();
    },
    afterShow: function () {

    }
  })
}
