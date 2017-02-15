$(function(){
	$('#yyb_list').diySelect();
	$('#model_list').diySelect();
	$('#used_list').diySelect();
	LogDialogInit();
	DestDialogInit();
})
function LogDialogInit(){
	var contentHtml = '<div class="dialog-item-wrap">' +
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">合同起始编号</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="123123123" />' +
            '</div>' +
          '</div>'+
          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">合同结束编号</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="123123123" />' +
            '</div>' +
          '</div>'+

          '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">业务类型</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="type_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">创业板开通</option>' + 
              '</select>' +
            '</div>' +
          '</div>'+
           '<div class="dialog-item">' +
            '<div class="dialog-left must-icon">使用营业部</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="uyyb_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">杭州营业部</option>' + 
              '</select>' +
            '</div>' +
          '</div>'+
          '</div>';
  $('.btn-add').dialog({
    title: '登记',
    content: contentHtml,
    hasBtn: true,
    width: 500,
    height: 'auto',
    btnText: ['立即创建'],
    padding: '21px 27px 32px 27px',
    confirm: function (dialog) {
      dialog.destory();
    },
    afterShow: function () {
      $('#type_list').diySelect();
      $('#uyyb_list').diySelect();
      
    }
  })
}
function DestDialogInit(){

}