$(function () {
  $('#staff_list').diySelect();
  $('#model_list').diySelect();
  $('#name_list').diySelect();
  $('#type_list').diySelect();
  init_goUrl();
  DelDialongInit();
  ModDialongInit();
  CrtDialogInit();
  addItemDialogInit();
});

function init_goUrl() {
  $('.eduit-btn').click(function () {
    var href = $(this).data('json').href;
    var cd = $(this).data('json').cd;
    var name = $(this).data('json').name;
    go_url(href, cd, name);
  })
}
function DelDialongInit() {
  var contentHtml = ['<div class="form">',
    '<div class="form-group">',
    '<div>确认删除？</div>',
    '</div>'].join('');

  $('.delete-btn').dialog({
    title: '提示',
    content: contentHtml,
    hasBtn: true,
    width: 300,
    height: 200,
    padding: '35px 40px 20px 40px',
    btnText: ['取消','删除'],
    confirm: function (dialog) {
      dialog.destory();
    },
    afterShow: function () {
    }
  });
}
function ModDialongInit(){
  var contentHtml = '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">业务类型</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="area_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">PC</option>' + 
              '</select>' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">业务编码</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" disabled="disabled" value="123123123" />' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">档案配置</div>' +
              '<div class="dialog-right">' +
              '<div class="dialog-divbox">'+
              '<span class="add-item-btn"> + 添加</span>' + 
              '<span class="item-btn">客户现场头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '</div>' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">档案名称</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="客户现场头像照片" />' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">备注</div>' +
              '<div class="dialog-right">' +
              '<textarea class="dialog-textarea"></textarea>' +
            '</div>' +
          '</div>'
  $('.set-btn').dialog({
    title: '修改业务',
    content: contentHtml,
    hasBtn: true,
    width: 500,
    height: 'auto',
    btnText: ['保存', '取消'],
    padding: '21px 27px 32px 27px',
    confirm: function (dialog) {
      dialog.destory();
    },
    afterShow: function () {
      // $('.btn-cancel').hide();
      $('#area_list').diySelect();
      $(".dialog-divbox").on('click','.add-item-btn',function(){
        var child = '<span class="item-btn">客户身份证头像</span>';
        $($(this).parent('.dialog-divbox')).append(child);
      }).on('click','.item-btn',function(){
        // var parent = $(this).parent('.dialog-divbox');
        // $(parent).remove
          $(this).remove();
      })
    }
  })
}
function CrtDialogInit(){

  var contentHtml = '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">业务类型</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="area_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">PC</option>' + 
              '</select>' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">业务编码</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" disabled="disabled" value="123123123" />' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">档案配置</div>' +
              '<div class="dialog-right">' +
              '<div class="dialog-divbox">'+
              '<span class="add-item-btn"> + 添加</span>' + 
              '<span class="item-btn">客户现场头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '</div>' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">备注</div>' +
              '<div class="dialog-right">' +
              '<textarea class="dialog-textarea"></textarea>' +
            '</div>' +
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
      // $('.btn-cancel').hide();
      $('#area_list').diySelect();
      $(".dialog-divbox").on('click','.add-item-btn',function(){
        // var child = '<span class="item-btn">客户身份证头像</span>';
        // $($(this).parent('.dialog-divbox')).append(child);
        addItemDialogInit(this);
      }).on('click','.item-btn',function(){
        // var parent = $(this).parent('.dialog-divbox');
        // $(parent).remove
          $(this).remove();
      })
    }
  })
}
function addItemDialogInit(obj){
  var contentHtml = '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">档案文件编号</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="CYB001" />' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">档案文件名称</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="CYB001" />' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">文件格式</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="area_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">PNG</option>' + 
              '<option selected="" value="1">MP4</option>' + 
              '</select>' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">单个文件大小</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input"  value="123" />MB以内' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">数量</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="12" />' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">备注</div>' +
              '<div class="dialog-right">' +
              '<textarea class="dialog-textarea"></textarea>' +
            '</div>' +
          '</div>'
  $(obj).dialog({
    title: '新建档案类型',
    content: contentHtml,
    hasBtn: true,
    width: 500,
    height: 'auto',
    btnText: ['取消', '保存'],
    padding: '21px 27px 32px 27px',
    confirm: function (dialog) {
      dialog.destory();
    },
    afterShow: function () {
      $('#area_list').diySelect();
    }
  })
}
