if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () {},
      fBound = function () {
        return fToBind.apply(this instanceof fNOP && oThis
            ? this
            : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  };
}

/*
 * 财富页面的切换
 */
var go_url = function (href, param, name) {
  var $self = $(this);
  var tabHasThis = false;
  var li_all = $(".nav-cftrade ul li");
  for (var i in li_all) {
    if (href == li_all.eq(i).data("href")) {
      $(".leftul .index a").removeClass('active');
      $self.addClass('active');
      $('.iframepage').hide();
      li_all.eq(i).remove();
      $(document.getElementById(li_all.eq(i).data('href'))).remove();
    }
  }

  var contentHtml = ['<div class="form form-add">',
    '<div class="form-group">',
    '标签不能超过七个，请关闭其他标签',
    '</div>'].join('');
  if (li_all.length >= 100) {
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
    return false;
  }

  $(".leftul .index a").removeClass('active');
  $self.addClass('active');
  //tab栏增加一项
  $('.iframepage').hide();
  li_all.removeClass("active");
  var child_li = ' <li data-href="' + href + '"data-param="' + param + '" title="' + name + '" class="active">' + name + '<i class="icon-close" title="关闭"></i></li>';
  $(".nav-cftrade ul").append(child_li);

  var doc = document;
  var ifr = doc.createElement('iframe');
  ifr.id = href;
  ifr.frameBorder = 'no';
  ifr.className = "iframepage";
  ifr.src = href + '.html' + param;
  var iframeWrap = doc.getElementById('iframeWrap');
  iframeWrap.appendChild(ifr);
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

//多选框
$.fn.extend({
  MultDropList: function (params) {
    var selectedItem =  params.selectedItem || "",
      selectAllBox =  params.selectAllBox || false,
      width =  params.width || '200',
      $self = $(this),
      $parent,
      options = $self.siblings('.holderRightList').val();
    var op = { wraperClass: "mult-wraper", width: width.replace('px','') + "px", data: options};
    return this.each(function () {
      var $hf = $(this).next(); //指向隐藏控件存
      var conSelector = $self.parent().children();
      var $wraper = conSelector.wrapAll("<div><div></div></div>").parent().parent().addClass(op.wraperClass);

      var $list = $('<div class="list"></div>').appendTo($wraper);
      $parent = $(this).parents(".mult-wraper");

      $list.css({ "width": op.width,"height":"inherit"});
      //控制弹出页面的显示与隐藏
      $self.click(function (e) {
        $parent.find('.list').hide();
        $list.toggle();
        e.stopPropagation();
      });

      $(document).click(function () {
        $list.hide();
      });

      $list.filter("*").click(function (e) {
        e.stopPropagation();
      });
      //插入selectAll
      $list.append('<ul><li><label><input type="checkbox" class="selectAll" value="" />全选/全不选</label></li></ul>');
      //绑定selectAll点击事件
      $parent.find('.selectAll').click(function (){
        if($(this).is(':checked')) {
          $parent.find(".list input").prop("checked",true);
        }
        else{
          $parent.find(".list input").prop("checked",false);
        }
      });
      //是否显示selectAll
      if(selectAllBox != true){
        $parent.find('.selectAll').parent().hide();
      }

      var $ul = $list.find("ul");
      var listArr=[];
      //加载json数据
      $.each(eval("(" + op.data + ")"), function(key, value) {
        listArr.push({key:key,value:value});
      });
      for(var i = 0; i < listArr.length; i++) {
        var jsonData = listArr[i];
        $ul.append('<li><label><input type="checkbox" value="' + jsonData.key + '" />'
          +  jsonData.value + '</label></li>');
      }
      //点击其它复选框时，更新隐藏控件值,文本框的值
      $parent.find(".list").on("click","label",function () {
        var kArr = "";
        $parent.find(".list input[class!='selectAll']:checked").each(function (index) {
          if(index==0){
            kArr += $(this).val();
          }else{
            kArr +=  ',' + $(this).val();
          }
        });
        $self.val(kArr);
      });
      $parent.find(".list input[class!='selectAll']").on('click',function(){
        if($parent.find(".list input[class!='selectAll']:checked").length == $parent.find(".list input[class!='selectAll']").length){
          $parent.find('.selectAll').prop("checked",true);
        }else{
          $parent.find('.selectAll').prop("checked",false);
        }
      });
      if(selectedItem){
        $self.siblings('.holderRightChoosed').val(selectedItem);
      }
      $self.MultDropChoosed();
    });
  },
  MultDropChoosed: function(){
    //加载勾选项
    var $self = $(this);
    var $parent = $(this).parents(".mult-wraper");
    var selected = $self.siblings('.holderRightChoosed').val();
    var seledArr = [];
    if (selected.length > 0) {
      seledArr = selected.split(",");
    }
    if(seledArr.length > 0){
      $.each(seledArr, function (index,selectItem) {
        $self.parents('.mult-wraper').find('.list li').each(function (index,item) {
          if($(item).find('input').val() == selectItem){
            $(item).find('input').prop('checked',true);
          }
        });
      });
      var kArr = "";
      $parent.find(".list input[class!='selectAll']:checked").each(function (index) {
        if(index==0){
          kArr += $(this).val();
        }else{
          kArr +=  ',' + $(this).val();
        }
      });
      $self.val(kArr);
    }
  }
});

var strlen = function(str){
  var len = 0;
  for (var i=0; i<str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
      len++;
    }
    else {
      len+=2;
    }
  }
  return len/2;
};
$('body').on('mouseover', '.overflow-pop-up', function () {
  var parent = $(this).parent();
  var self = $(this);
  if(parseInt(self.css('font-size').replace('px','')) * strlen(self.text()) >= self.width()){
    parent.css('position', 'relative');
    parent.append('<div class="float-tip-up">' + self.text() + '<em></em><span></span></div>');
    var left = self.offset().left - parent.offset().left;
    var bottom = parseInt(parent.css('padding-bottom').replace('px','')) +
      parseInt(self.css('padding-bottom').replace('px','')) +
      parseInt(self.css('margin-bottom').replace('px','')) +
      self.height() +
      5;
    parent.find('.float-tip-up').css('left',left).css('bottom',bottom);
  }
}).on('mouseout', '.overflow-pop-up', function () {
  $(this).siblings('.float-tip-up').remove();
}).on('mouseover', '.overflow-pop-down', function () {
  var parent = $(this).parent();
  var self = $(this);
  if(parseInt(self.css('font-size').replace('px','')) * strlen(self.text()) >= self.width()){
    parent.css('position', 'relative');
    parent.append('<div class="float-tip-down">' + self.text() + '<em></em><span></span></div>');
    var left = self.offset().left - parent.offset().left;
    var top = parseInt(parent.css('padding-top').replace('px','')) +
      parseInt(self.css('padding-top').replace('px','')) +
      parseInt(self.css('margin-top').replace('px','')) +
      self.height() +
      5;
    parent.find('.float-tip-down').css('left',left).css('top',top);
  }
}).on('mouseout', '.overflow-pop-down', function () {
  $(this).siblings('.float-tip-down').remove();
}).on('mouseover','.overflow-pop-scroll',function(){
  var parent = $(this).parents('.scroll-table');
  var self = $(this);
  if(parseInt(self.css('font-size').replace('px','')) * strlen(self.text()) >= self.width()){
    parent.css('position', 'relative');
    parent.append('<div class="float-tip-scroll">' + self.text() + '<em></em><span></span></div>');
    var left = self.offset().left - parent.offset().left;
    var bottom =  (self.parent().siblings().length + 1 - self.parent().index()) * 48 - 5;
    parent.find('.float-tip-scroll').css('left',left).css('bottom',bottom);
  }
}).on('mouseout','.overflow-pop-scroll',function(){
  $(this).parents('.scroll-table').find('.float-tip-scroll').remove();
});

//diySelect 设置
$.fn.extend({
    diySelectSet: function (val) {
        var $self = $(this);
        if (val) {
            $self.siblings('.js-option').find('li').each(function () {
                if ($(this).attr('data-select-val') == val) {
                    $(this).click();
                }
            });
        } else if (val == "") {
            $self.siblings('.js-option').find('li').each(function () {
                if (!$(this).attr('data-select-val')) {
                    $(this).click();
                }
            });
        }
    }
});

$.fn.extend({
    diySlider: function(param){
        var $self = $(this);
        var $ul = $(this).children('ul');
        var $ballotItem = $ul.find('li');
        var itemNumber = $ballotItem.length;
        var itemWidth = $ballotItem.width() + parseInt($ballotItem.eq(0).css('margin-left')) + parseInt($ballotItem.eq(0).css('margin-right'));
        var nowIndex = 0;
        var $btnNext = $ul.siblings('.btn-img.next');
        var $btnPrev = $ul.siblings('.btn-img.prev');
        var showItemNum;
        param = param || {};
        showItemNum = param.showItemNum || parseInt(($self.width() +30) / (itemWidth+30));
        $ul.width(itemWidth * $ballotItem.length);
        $self.width(itemWidth * showItemNum + 30);

        if ($ballotItem.length <= 4) {
            $btnNext.hide();
        }
        //点击右切换
        $btnNext.on('click', function () {
            if($(this).hasClass('invalid')) return;
            nowIndex++;
            $ul.animate({
                'margin-left': -itemWidth * nowIndex + 'px'
            });
            if (nowIndex === itemNumber - showItemNum) {
                $(this).addClass('invalid');
            }
            if (nowIndex > 0) {
                $btnPrev.removeClass('invalid');
            }
        });

        $btnPrev.on('click', function () {
            if(nowIndex == 0) $(this).addClass('invalid')
            if($(this).hasClass('invalid')) return;
            nowIndex--;
            $ul.animate({
                'margin-left': -itemWidth * nowIndex + 'px'
            });
            if (nowIndex < itemNumber - showItemNum) {
                $btnNext.removeClass('invalid');
            }
            if (nowIndex <= 0) {
                $btnPrev.addClass('invalid');
            }
        });
    }
});
/**
 https://fullcalendar.io/docs/
 */
$.fn.extend({
    diyFullCalendar: function(param){
        var $self = $(this);

        if(param.width){
            $self.find('.big-calendar').css('width',param.width);
        }
        $self.find('.big-calendar').fullCalendar({
            theme: true,
            buttonText: {today: '今天', month: '月', week: '周', day: '日', list: 'list'},
            monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            dayNamesShort: ['日','一','二','三','四','五','六'],
            displayEventTime: false,
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            titleFormat:'YYYY MMMM',
            editable: true,
            allDayDefault: false,
            selectable: true,
            select: function(start, end, jsEvent, view ) {
                if(param.onSelected && typeof(param.onSelected) == "function"){
                    param.onSelected(start._d,end._d);
                }
            },
            events: param.events
        });
        param.legends.forEach(function(item1,index1){
            var num = 0;
            param.events.forEach(function(item2){
                if(item2.id == index1){
                    num += item2.num;
                }
            });
            $self.find('.calendar-legend-item-wrap').append('<div class="calendar-legend-item"><i style="background-color: ' + item1.color + ' "></i> ' + item1.text + '(' + num + '个) </div>')
        });
        $self.find('.calendar-legend-item').on('click',function(){
            var $self2 = $(this);
            $self2.addClass('active').siblings('.calendar-legend-item').removeClass('active');
            $self2.parents('.calendar-legend').siblings('.calendar-content-wrap').find('.calendar-content-item').eq($self2.index()).show().siblings('.calendar-content-item').hide();
        }).eq(0).click();
    }
});
