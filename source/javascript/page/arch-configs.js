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
  var contentHtml =  $("#js-window1").html();
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
  var contentHtml = $("#js-window2").html()
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
