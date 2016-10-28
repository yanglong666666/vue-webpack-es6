$(function () {
  $('#staff_list').diySelect();
  $('#model_list').diySelect();
  $('#name_list').diySelect();
  $('#type_list').diySelect();
  init_goUrl();
  DelDialongInit();
  ModDialongInit();
});

function init_goUrl() {
  $('.btn-add,.eduit-btn').click(function () {
    var href = $(this).data('json').href;
    var cd = $(this).data('json').cd;
    var name = $(this).data('json').name;
    go_url(href, cd, name);
  })
}
function DelDialongInit() {
  var contentHtml = ['<div class="form">',
    '<div class="form-group">',
    '<div>这是审核意见</div>',
    '</div>'].join('');

  $('.delete-btn').dialog({
    title: '提示',
    content: contentHtml,
    hasBtn: true,
    width: 410,
    height: 240,
    padding: '35px 40px 20px 40px',
    btnText: ['取消','删除'],
    confirm: function (dialog) {
      dialog.hide();
    },
    afterShow: function () {
    }
  });
}
function ModDialongInit(){
  var contentHtml = [' <table class="small-table big-table">',
    '<thead>',
    ' <tr>',
    ' <th width="60%">参数名称</th>',
    ' <th width="40%">设置参数值</th>',
    ' </tr>',
    '</thead>',
    ' <tbody>',
    ' <tr>',
    '  <td>money</td>',
    '<td><input type="text"class="small-input">元</td>',
    ' </tr>',
    ' <tr>',
    '  <td>percent</td>',
    ' <td><input type="text"class="small-input">%</td>',
    '</tr>',
    '</tbody>',
    '</table>',
    '</div>'].join('');
  $('.set-btn').dialog({
    title: '修改业务',
    content: contentHtml,
    hasBtn: true,
    width: 410,
    height: 'auto',
    btnText: ['保存', '取消'],
    padding: '21px 27px 32px 27px',
    confirm: function (dialog) {
      dialog.hide();
    },
    afterShow: function () {
      // $('.btn-cancel').hide();
    }
  })
}

