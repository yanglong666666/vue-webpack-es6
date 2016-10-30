$(function(){
	$('#model_list').diySelect();
	$('#hold_list').diySelect();
	$('#yyb_list').diySelect();
	HoldDialogInit();
	MoveDialogInit();
	UseDialogInit();
	$(".set-btn").on('click',function(){
		ListDialogInit(this);
	})
})
function UseDialogInit(){
	var contentHtml = '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">借阅客户号</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="123123123" />' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">客户档案选择</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="arch_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">全部档案</option>' + 
              '</select>' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">接受营业部</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="uyyb_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">杭州营业部</option>' + 
              '</select>' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">借阅人</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input" value="李二狗" />' +
            '</div>' +
          '</div>'+
         
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">备注</div>' +
              '<div class="dialog-right">' +
              '<textarea class="dialog-textarea"></textarea>' +
            '</div>' +
          '</div>'
  $('.btn-use').dialog({
    title: '创建业务',
    content: contentHtml,
    hasBtn: true,
    width: 500,
    height: 'auto',
    btnText: ['确定借阅'],
    padding: '21px 27px 32px 27px',
    confirm: function (dialog) {
      dialog.destory();
    },
    afterShow: function () {
      $('#arch_list').diySelect();
      $('#uyyb_list').diySelect();
      
    }
  })
}
function MoveDialogInit(){
	var contentHtml = '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">接收营业部</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="myyb_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">杭州营业部</option>' + 
              '</select>' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">接收档案管理员</div>' +
              '<div class="dialog-right item-inner">' +
              '<select name="" id="manager_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">李二狗</option>' + 
              '</select>' +
            '</div>' +
          '</div>'+
         
          '<div class="config-dialog-item">' +
            '<div class="dialog-left">备注</div>' +
              '<div class="dialog-right">' +
              '<textarea class="dialog-textarea"></textarea>' +
            '</div>' +
          '</div>'
  $('.btn-move').dialog({
    title: '档案位置归档',
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
      	$('#myyb_list').diySelect();
		$('#manager_list').diySelect();
    }
  })
}
function HoldDialogInit(){
	var contentHtml = '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">存放位置</div>' +
              '<div class="dialog-right item-inner small-item">' +
              '<select name="" id="hyyb_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">营业部</option>' + 
              '</select>' +
              '<select name="" id="arch_hus_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">档案柜</option>' + 
              '</select>' +
              '<select name="" id="arch_flr_list" class="diy-select" style="display: none;">' + 
              '<option selected="" value="1">档案层</option>' + 
              '</select>' +
            '</div>' +
          '</div>' + 
          '<div class="config-dialog-item">' +
          '<div class="dialog-item-tips">' + '杭州营业部-1号档案柜-1层' +
          '</div>' +
          '</div>';
  $('.btn-add').dialog({
    title: '档案位置归档',
    content: contentHtml,
    hasBtn: true,
    width: 600,
    height: 'auto',
    btnText: ['保存', '取消'],
    padding: '21px 27px 32px 27px',
    confirm: function (dialog) {
      dialog.destory();
    },
    afterShow: function () {
      	$('#hyyb_list').diySelect();
		$('#arch_hus_list').diySelect();
		$('#arch_flr_list').diySelect();
    }
  })
}
function ListDialogInit(obj){
	var contentHtml = '<div class="main-table">' +
    '<table width="100%" cellpadding="0" cellspacing="0" class="data-table table-padding7">' + 
      '<thead>' + 
      '<tr>' + 
        '<th width="8%">ID</th>' + 
        '<th width="15%">档案条形码</th>' + 
        '<th width="10%">档案名称</th>' + 
       	'<th width="10%">操作人</th>' + 
        '<th width="15%">存放物理位置</th>' + 
        '<th width="12%">操作日期</th>' + 
        '<th width="10%">接受人</th>' + 
        '<th width="10%">类型</th>' + 
        '<th width="10%">备注</th>' + 
      '</tr>' + 
      '</thead>' + 
      '<tbody>' + 
        '<tr>' +
          '<td><div class="attr-panl">001</div></td>' +
          '<td>6001110135</td>' +
          '<td>创业板开通档案</td>' +
          '<td>五月</td>' +
          '<td>杭州营业部-1号档案柜-1层</td>' +
          '<td>2016-05-17</td>' +
          '<td>李二狗</td>' +
          '<td>首次归档</td> ' +
          '<td>快递单号</td> ' +
        '</tr>' +
        '<tr>' +
          '<td><div class="attr-panl">001</div></td>' +
          '<td>6001110135</td>' +
          '<td>创业板开通档案</td>' +
          '<td>五月</td>' +
          '<td>杭州营业部-1号档案柜-1层</td>' +
          '<td>2016-05-17</td>' +
          '<td>李二狗</td>' +
          '<td>首次归档</td> ' +
          '<td>快递单号</td> ' +
        '</tr>' +
      '</tbody>' + 
    '</table>' + 
  '</div>';
  $(obj).dialog({
    title: '档案位置变更流水',
    content: contentHtml,
    hasBtn: false,
    width: 800,
    height: 'auto',
    padding: '21px 27px 32px 27px',
    confirm: function (dialog) {
      dialog.destory();
    },
    afterShow: function () {
      	
    }
  })
}
