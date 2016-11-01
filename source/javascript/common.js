/*
 * 财富页面的切换
 */
var go_url = function (href, param, name) {
  var contentHtml = ['<div class="form form-add">',
    '<div class="form-group">',
    '标签不能超过七个，请关闭其他标签',
    '</div>'].join('');

  var li_all = $(".nav-cftrade ul li");
  if (li_all.length == 7) {
    var dailog = new Dialog(null, {
      title: '提示',
      content: contentHtml,
      hasBtn: true,
      width: 240,
      btnText: ['确定'],
      confirm: function (dialog) {
        dialog.destroy();
      },
      afterShow: function () {
      }
    });
    dailog.show();
  }else{
    $('.shadow-div').show();
    $('.iframepage').hide();
    var tabHasThis = false;
    for (var i in li_all) {
      if (href == li_all.eq(i).data("href")) {
        $('.shadow-div').show();
        li_all.removeClass("active");
        li_all.eq(i).addClass("active");
        $(document.getElementById(href)).show();
        tabHasThis = true;
      }
    }
    if(!tabHasThis){
      //tab栏增加一项
      li_all.removeClass("active");
      var child_li = ' <li data-href="' + href + '"data-param="' + param + '" title="' + name + '" class="active">' + name + '<i class="icon-close" title="关闭"></i></li>';
      $(".nav-cftrade ul").append(child_li);

      var doc = document;
      var ifr = doc.createElement('iframe');
      ifr.id = href;
      ifr.className = "iframepage";
      ifr.src = href + '.html' + param;
      var iframeWrap = doc.getElementById('iframeWrap');
      iframeWrap.appendChild(ifr);
    }
  }

  $('.shadow-div').hide();
};

//初始化checkbox
$('body').on('click','.param-checkbox',function(){
  var $self = $(this);
  if($self.hasClass('checkAll')){
    if($self.hasClass('checkbox-checked')){
      $('.param-checkbox').removeClass('checkbox-checked');
    }else{
      $('.param-checkbox').addClass('checkbox-checked');
    }
  }else{
    if($self.hasClass('checkbox-checked')){
      $self.removeClass('checkbox-checked');
    }else{
      $self.addClass('checkbox-checked');
    }
    if($('table .param-checkbox').length == $('table .param-checkbox.checkbox-checked').length){
      $('.param-checkbox.checkAll').addClass('checkbox-checked');
    }else{
      $('.param-checkbox.checkAll').removeClass('checkbox-checked');
    }
  }
});
