$(function(){
	$('#valid_list').diySelect();
	$('#model_list').diySelect();
	$('#name_list').diySelect();
	$('#hander_list').diySelect();
  	CrtDialogInit();
  	ListDialogInit();
})
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
            '<div class="dialog-left must-icon">档案文件名称</div>' +
              '<div class="dialog-right">' +
              '<input class="dialog-input"  value="创业板开通现场头像" />' +
            '</div>' +
          '</div>'+
          '<div class="config-dialog-item">' +
            '<div class="dialog-left must-icon">档案文件模板内容</div>' +
              '<div class="dialog-right">' +
              '<div class="dialog-divbox2">'+
              	'<div><span class="log-tl">页一</span>' + 
              	'<div class="upload-box">' + 
		          '<div class="upload">' + 
		            '<span class="upload-bg">请选择文件</span>' + 
		            '<input class="input-file" type="file" size="90">' + 
		          '</div>' + 
		          '<span class="advice"><label class="w-label"><input class="status"  type="checkbox">免现场扫描</label>' + 
		        '</div>' + 
              	'</div>' + 

              	'<div><span class="log-tl">页二</span>' + 
              	'<div class="upload-box">' + 
		          '<div class="upload">' + 
		            '<span class="upload-bg">请选择文件</span>' + 
		            '<input class="input-file" type="file" size="90">' + 
		          '</div>' + 
		          '<span class="advice"><label class="w-label"><input class="status"  type="checkbox">免现场扫描</label>' + 
		        '</div>' + 
              	'</div>' +

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
      $('#area_list').diySelect();
     
    }
  })
}
function ListDialogInit(){
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
  $('.view-btn').dialog({
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