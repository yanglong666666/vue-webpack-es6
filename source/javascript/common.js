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

/**
 *overflowPop
 * */
$('body').on('mouseover', '.overflow-pop-up', function () {
    var parent = $(this).parent();
    var self = $(this);
    if (self[0].scrollWidth > self.innerWidth()) {
        parent.css('position', 'relative');
        var text = self.text() || self.val();
        parent.append('<div class="float-tip-up">' + text + '<em></em><span></span></div>');
        var left = self.offset().left - parent.offset().left;
        var bottom = parseInt(parent.css('padding-bottom').replace('px', '')) +
            parseInt(self.css('padding-bottom').replace('px', '')) +
            parseInt(self.css('margin-bottom').replace('px', '')) +
            self.height() +
            5;
        parent.find('.float-tip-up').css('left', left).css('bottom', bottom);
    }
}).on('mouseover', '.overflow-pop-down', function () {
    var parent = $(this).parent();
    var self = $(this);
    if (self[0].scrollWidth > self.innerWidth()) {
        parent.css('position', 'relative');
        var text = self.text() || self.val();
        parent.append('<div class="float-tip-down">' + text + '<em></em><span></span></div>');
        var left = self.offset().left - parent.offset().left;
        var top = parseInt(parent.css('padding-top').replace('px', '')) +
            parseInt(self.css('padding-top').replace('px', '')) +
            parseInt(self.css('margin-top').replace('px', '')) +
            self.height() +
            5;
        parent.find('.float-tip-down').css('left', left).css('top', top);
    }
}).on('mouseout', '.overflow-pop-up,.overflow-pop-down', function () {
    $(this).siblings('.float-tip-up,.float-tip-down').remove();
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
/*
 * https://fullcalendar.io/docs/
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
            unselectAuto: false,
            events: param.events,
            eventOrder: "id",
            select: function(start, end, jsEvent, view ) {
                if(param.onSelected && typeof(param.onSelected) == "function"){
                    param.onSelected(start._d,end._d);
                }
            },
            eventAfterAllRender: function(view){
                if(param.eventAfterAllRender && typeof(param.eventAfterAllRender) == "function"){
                    param.eventAfterAllRender(view);
                }
            }
        });
    }
});

/*
 * jQuery placeholder, fix for IE6,7,8,9
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
            var pos = self.position(), h = self.outerHeight(true)+ "px", paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:"30px", "line-height":"30px", "padding-left":paddingleft, color:'#aaa'}).appendTo(self.parent());
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            }).on('change',function(){
                if(self.val()){
                    holder.hide();
                }else{
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
            console.log(self.val());
            if(self.val()){
                holder.hide();
            }
        });
    }
};
$(function(){
    JPlaceHolder.init();
});

var Dloading = function (param) {
    param = param || {};
    var timeout = parseInt(param.timeout);
    var time = timeout ? timeout : timeout == 0 ? timeout : 10000;
    var html = param.text? '<div class="Dloading"><img src="../images/loading.gif"><div>'+ param.text +'</div></div>' : '<div class="Dloading"><img src="../images/loading.png"></div>';
    $('body').append(html);
    var $currentDloading = $('.Dloading');
    $currentDloading.find('img').css('margin-top',$currentDloading.height()/2 - 48 + "px");
    if(param.callback) param.callback();
    setTimeout(function () {
        $currentDloading.remove();
    }, time*1000);
};
var hideDloading = function(){
    $('.Dloading').remove();
};

/**
 * tableSort插件 start
 *
 * */
var TableSort = function(el,options){
    options = $.extend({}, $.fn.tableSort.defaults, options);
    this.options = options;
    this.tbodyArray = [];
    this.init(el);
};
TableSort.prototype = {
    init: function(el){
        var _this = this;
        $(el).on('click',function(){
            var $self = $(this);
            _this.tdIndex = $self.index();
            for(j = 0;j < $self.parents('table').find("tbody").find('tr').length;j++){
                _this.tbodyArray[j] = $self.parents('table').find("tbody")[0].rows[j];
            }
            if(!$self.hasClass('up') && !$self.hasClass('down')){
                //第一次点击排序默认升序
                if(_this.firstSort == "down"){
                    $self.addClass('down');
                    _this.down();
                }else{
                    $self.addClass('up');
                    _this.up();
                }
            }else{
                //升序、降序切换
                $self.toggleClass('up').toggleClass('down');
                if($self.hasClass('up')){
                    _this.up();
                }else if($self.hasClass('down')){
                    _this.down();
                }
            }

            //append
            $self.siblings().removeClass('up').removeClass('down');
            for(i=0;i<_this.tbodyArray.length;i++){
                $self.parents('table').find('tbody')[0].appendChild(_this.tbodyArray[i]);
            }
        });
    },
    sorting: function(){
        var _self = this;
        if(this.tbodyArray[0].cells[_self.tdIndex].getAttribute('sortIndex')){
            _self.tbodyArray.sort(function (tr1,tr2) {
                var n1 = tr1.cells[_self.tdIndex].getAttribute('sortIndex');
                var n2 = tr2.cells[_self.tdIndex].getAttribute('sortIndex');
                return parseFloat(n1) - parseFloat(n2);
            });
        }else {
            _self.tbodyArray.sort(function (tr1,tr2) {
                var n1 = tr1.cells[_self.tdIndex].innerHTML;
                var n2 = tr2.cells[_self.tdIndex].innerHTML;
                return parseFloat(n1) - parseFloat(n2);
            });
        }
    },
    up: function(){
        //降序
        this.sorting();
    },
    down: function(){
        //升序
        this.sorting();
        this.tbodyArray.reverse();
    }
};
// 注册插件
$.fn.tableSort = function (options) {
    return this.each(function () {
        new TableSort(this, options);
    });
};
// 默认设置
$.fn.tableSort.defaults = {
    firstSort: "up"
};
/**
 * tableSort插件 end
 * */
