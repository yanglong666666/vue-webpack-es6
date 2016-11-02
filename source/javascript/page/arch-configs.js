$(function () {
  $('#staff_list').diySelect();
  $('#model_list').diySelect();
  $('#name_list').diySelect();
  $('#type_list').diySelect();
  ModDialongInit();
  // CrtDialogInit();
  addItemDialogInit();

    $('.main-table').on('click','.delete-btn', function(){
      var $self = $(this);
      var dialog = new Dialog(null, {
        title: '提示',
        content: '确定删除此项吗？',
        hasBtn: true,
        width: 240,
        confirm: function (dialog) {
          $self.parents('tr').remove();
          dialog.destroy();
        }
      });
    });
});

function ModDialongInit(){
  var contentHtml =  '<div class="dialog-item-wrap">' +
        '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">业务类型</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="area_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">PC</option>' + 
              '</select>' +
            '</div>' +
          '</div>' +
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">业务编码</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" disabled="disabled" value="123123123" />' +
            '</div>' +
          '</div>' +
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">档案配置</div>' +
              '<div class="dialog-right">' +
              '<div class="dialog-divbox">' +
              '<span class="add-item-btn"> + 添加</span>' + 
              '<span class="item-btn">客户现场头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '<span class="item-btn">客户身份证头像</span>' + 
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">档案名称</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="客户现场头像照片" />' +
            '</div>' +
          '</div>' +
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">备注</div>' +
              '<div class="dialog-right">' +
              '<textarea class="dialog-textarea"></textarea>' +
            '</div>' +
          '</div>' +
        '</div>';
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
          $(this).remove();
      })
    }
  })
}

function addItemDialogInit(){
  var contentHtml = '<div class="dialog-item-wrap">' +
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">档案文件编号</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="CYB001" />' +
            '</div>' +
          '</div>' +
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">档案文件名称</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="CYB001" />' +
            '</div>' +
          '</div>' +
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">文件格式</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="area_list" class="diy-select" style="display: none;"> ' +
              '<option selected="" value="1">PNG</option> ' +
              '<option selected="" value="1">MP4</option> ' +
              '</select>' +
            '</div>' +
          '</div>' +
          '<div class="dialog-item">' +
              '<div class="dialog-left must-icon">单个文件大小</div>' +
              '<div class="dialog-right">' +
                '<input class="dialog-input not-all"  value="123" />MB以内' +
              '</div>' +
          '</div>' +
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">数量</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="12" />' +
            '</div>' +
          '</div>' +
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">备注</div>' +
              '<div class="dialog-right">' +
              '<textarea class="dialog-textarea"></textarea>' +
            '</div>' +
          '</div>' +
        '</div>' ;
  $('.btn-add').dialog({
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
