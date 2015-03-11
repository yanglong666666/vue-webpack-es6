var isIE6 = ($.browser || 0).msie && $.browser.version == 6.0;
/**
 * 名称: diyselect.js
 * 描述: 用其它 HTMLElement 模拟 select
 * 属性: UI组件
 * 版本: 0.9.5
 * 依赖: jQuery ~> 1.7.2, pin ~> 0.9.0
 * 开发: wuwj
 */

var DiySelect = function (select, options) {
    options = $.extend({}, $.fn.diySelect.defaults, options);

    this.options = options;
    this.hasInit = false;

    this.init(select);
};

DiySelect.prototype = {

    constructor: DiySelect,

    init: function (select) {
        // 是否初始化且目标元素是否为 `select`
        if (this.hasInit && select.tagName.toLowerCase !== 'select') {
            return;
        }

        var id = select.id;
        this.unique(id); // 去重

        this.selectSpan = $('<span/>').addClass(this.options.selectClass).attr('id', id + '-select');
        this.optionDiv = $('<div/>').addClass(this.options.optionClass).attr('id', id + '-option');
        this.optionUl = $('<ul/>');
        this.option = $(select).find('option');
        this.optionSize = this.option.length;
        this.arrowHtml = '<i class="' + this.options.arrowClass + '"></i>';
        this.bgIframe = $('<iframe/>').addClass('bgiframe').attr('frameborder', '0');

        // 组装模拟元件
        this.setupOption();
        this.setupSelect();

        // DOM 操作：
        // 隐藏原 `select`，再其后加入模拟的 `HTMLElement`
        $(select).hide();
        this.selectSpan.insertAfter($(select));
        this.optionDiv.insertAfter(this.selectSpan).hide();

        // 初始化完成标记
        this.hasInit = true;

        var that = this;
        var active = -1;
        var list = this.optionDiv.find('li');

        // 事件绑定
        list.on('click', function (e) {
            var text = $(this).text();

            e.preventDefault();
            e.stopPropagation();

            that.chooseOption(text);
            $(select).trigger('change');
        });

        list.on('mouseenter', function () {
            list.removeClass('active');
            $(this).addClass('active');
            active = list.filter(':visible').index(this);
        });

        this.selectSpan.on('click', function (e) { 
            e.preventDefault();
            e.stopPropagation();

            // 自定义事件
            if (that.options.beforeSelect) {
                that.options.beforeSelect.apply(this);
            };

            $('.' + that.options.optionClass).hide();

            // if (that.optionVisible) {
            //  that.hideOption();
            // } else {
            //  that.showOption();
            // }
            that.showOption();
        });

        $(select).on('choose', function (e, text) {
            e.stopPropagation();
            that.chooseOption(text);
        });

        $(select).on('revert', function (e) {
            e.stopPropagation();
            that.revert();
        });

        // 窗口变化时调整位置
        $(window).on('resize', $.proxy(this.setPosition, this));

        // 模拟 `select` 失焦
        $(document).on('click', function () {
            if (that.optionVisible) { that.hideOption(); }
        });

        // 键盘事件
        $(document).on('keydown', function (e) {
            if (that.optionDiv.is(':visible')) {
                switch (e.keyCode) {
                    case 13: // enter
                        if (active !== -1) {
                            var text = list.slice(active, active + 1).text();
                            that.chooseOption(text);
                        }

                        that.hideOption();
                        $(select).trigger('change');
                        break;
                    case 27: // esc
                        that.hideOption();
                        break;
                    case 38: // up
                        e.preventDefault();
                        moveSelect(-1);
                        break;
                    case 40: // down
                        e.preventDefault();
                        moveSelect(1);
                        break;
                }
            }
        });

        /**
         * 焦点位移
         * @param  {float} step 位移步长
         */
        function moveSelect(step) {
            var count = list.length;

            active += step;

            if (active < 0) {
                active =  0;
            } else if (active >= count) {
                active = count - 1;
            } else {
                list.removeClass('active');
                list.slice(active, active + 1).addClass('active');

                // 出现滚动条的情况
                if ( active >= (that.options.maxSize / 2) && count > that.options.maxSize) {
                    that.optionDiv.scrollTop(list.height() * (active - (that.options.maxSize / 2)));
                }
            }
        }
    },

    setupOption: function () {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < this.optionSize; i++) {
            var li = document.createElement('li');
            var value = this.option[i].value;
            var text = this.option[i].text;

            li.innerHTML = text;

            if (value) { 
                li.setAttribute('data-' + this.options.valueAttr, value); 
            }

            fragment.appendChild(li);
        }

        this.optionDiv.append(this.optionUl);
        this.optionUl.get(0).appendChild(fragment);
        this.optionVisible = false;
    },

    setupSelect: function () {
        var checkText = this.options.checkText || this.option.filter(':selected').text();

        // 初始选择（可设置）
        this.chooseOption(checkText);

        if (this.options.width) {
            this.selectSpan.width(this.options.width);
        }
            
        var spanStyle = this.selectSpan.attr('style');
        
        if (spanStyle) {
            spanStyle += ';' + this.options.style;
        }

        this.selectSpan.attr('style', spanStyle);
    },

    setPosition: function () {
        // 可视窗口顶部到 `selectSpan` 的距离
        var top_height = this.selectSpan.offset().top + this.selectSpan.outerHeight() - $(window).scrollTop();

        // 可视窗口剩余空间与 `optionDiv` 高度的差值
        var diff = $(window).height() - top_height - this.optionDiv.height();

        // 差值大于零，说明剩余空间还可容纳 `optionDiv`
        // `optionDiv` 就位居 `selectSpan` 正下方展示
        // 反之亦然
        if ( diff > 0 ) {
            this.optionDiv.pin({
                base: this.selectSpan,
                baseXY: [0, '100%-1px']
            });
        } else {
            this.optionDiv.pin({
                base: this.selectSpan,
                selfXY: [0, '100%-1px']
            });
        }
    },

    chooseOption: function(text) {
        this.hideOption();
        this.selectSpan.html(text + this.arrowHtml);
        // this.option.attr('selected', false);
        
        for (var i = 0; i < this.optionSize; i++) {
            if (text === this.option[i].text) {
                // 原生 `select` 跟随选择
                this.option[i].selected = true;
                break;
            }
        }

        if (this.options.afterChoose) {
            this.options.afterChoose.apply(this);
        }
    },

    showOption: function () {
        this.optionDiv.show();

        this.optionDiv.height(Math.min(this.optionDiv.height(), 
            this.optionDiv.find('li').height() * this.options.maxSize));

        this.optionDiv.css({
            'min-width': this.selectSpan.outerWidth()-2,
            'z-index': this.options.zIndex
        });

        if (isIE6) {
            this.optionDiv.css('zoom', 1);
        }

        this.setPosition();
        this.optionVisible = true;
    },

    hideOption: function () {
        this.optionDiv.hide();
        this.optionVisible = false;
    },

    unique: function (id) {
        if ($('#' + id + '-select')) { $('#' + id + '-select').remove(); }
        if ($('#' + id + '-option')) { $('#' + id + '-option').remove(); }
    },

    revert: function () {
        this.selectSpan.remove();
        this.optionDiv.remove();
    }
};

// 注册插件
$.fn.diySelect = function (options) {
    return this.each(function () {
        new DiySelect(this, options);
    });
};

$.fn.chooseSelect = function (value) {
    return this.trigger('choose', [value]);
};

$.fn.revertSelect = function () {
    return this.trigger('revert');
};

// 默认设置
$.fn.diySelect.defaults = {
    selectClass: 'js-select',
    optionClass: 'js-option',
    arrowClass: 'arrow',
    valueAttr: 'select-val',
    zIndex: '10000',
    offsetY: 1,
    maxSize: 6
};

$.fn.Constructor = DiySelect;
// 定义 Overlay 类
var Overlay = function (element, options) { 
    options = $.extend({}, $.fn.overlay.defaults, options);

    this.options = options;
    this.overlay = $(element);

    this.init(options);
};

Overlay.prototype = {

    constructor: Overlay,

    init: function (options) {
        this.overlay.addClass(this.options.className);

        // 添加外部自定义的样式
        this.overlay.attr('style', this.options.style);

        // 基本 CSS
        this.overlay.css({
            width: this.options.width,
            height: this.options.height,
            zIndex: this.options.zIndex
        });

        // 将浮出层插入 DOM 并进行定位
        this.overlay.appendTo($(this.options.parent));
        this.setPosition();

        // 窗口变化重新定位
        $(window).on('resize', $.proxy(this.setPosition, this));
    },

    show: function () {     
        this.overlay.show();
    },

    hide: function () {
        this.overlay.hide();
    },

    remove: function () {
        this.overlay.remove();
    },

    blurHide: function () {
        $(document).on('click', $.proxy(this.hide, this));
        this.overlay.on('click', function (e) {
            e.stopPropagation();
        });
    },

    setPosition: function () {
        this.overlay.pin({
            // 基准定位元素，默认为当前可视区域
            base: this.options.align.base,
            // element 的定位点，默认为中心
            selfXY: this.options.align.selfXY,
            // 基准定位元素的定位点，默认为中心
            baseXY: this.options.align.baseXY
        });
    }
};

// 注册插件
$.fn.overlay = function (options) {
    return this.each(function () {
        new Overlay(this, options);
    });
};

// 默认设置
$.fn.overlay.defaults = {
    className: '',
    style: '',
    width: 'auto',
    height: 'auto',
    zIndex: 999,
    parent: 'body',
    align: {
        base: null,
        selfXY: ['50%', '50%'],
        baseXY: ['50%', '50%']
    }
};

$.fn.overlay.Constructor = Overlay;
/**
 * 名称: pin.js
 * 描述: 通过两个对象分别描述定位元素及其定位点，然后将其定位点重合
 * 属性: 工具
 * 版本: 0.9.0
 * 依赖: jQuery ~> 1.7.2
 * 开发: wuwj
 */

$.fn.pin = function (options, fixed) {
    options = $.extend({
        base: null,
        selfXY: [0, 0],
        baseXY: [0, 0]
    }, options || {});

    // 是否相对于当前可视区域（Window）进行定位
    var isViewport = !options.base,

            // 定位 fixed 元素的标志位，表示需要特殊处理
            isPinFixed = false,

            parent = this.offsetParent(),

            // 基准元素的偏移量
            offsetLeft, offsetTop,

            // 基准元素根据定位点坐标 `baseXY` 分别获得纵横两个方向上的 size
            baseX, baseY,

            // 同上，根据定位点坐标 `selfXY` 获取的横纵两个方向上的 size
            selfX, selfY,

            // 定位元素位置
            left, top;

    // 设定目标元素的 position 为绝对定位
    // 若元素的初始 position 不为 absolute，会影响元素的 display、宽高等属性
    if (this.css('position') !== 'fixed' || isIE6) {
        this.css('position', 'absolute');
        isPinFixed = false;
    } else {
        isPinFixed = true;
    }

    // 修正 ie6 下 absolute 定位不准的 bug
    if (isIE6) {
        this.css('zoom', 1);
        parent.css('zoom', 1);
    }

    // 如果不定义基准元素，则相对于当前可视区域进行定位
    if (isViewport) {
        offsetLeft = $(document).scrollLeft();
        offsetTop = $(document).scrollTop();

        baseX = getSize($(window), options.baseXY[0], 'outerWidth');
        baseY = getSize($(window), options.baseXY[1], 'outerHeight');
    } else {
        // 判断定位元素的祖先是否被定位过，是的话用 `$.position()`，否则用 `$.offset()`
        var offsetFixed = (parent[0] === document.documentElement) ?
                                            options.base.offset() :
                                            options.base.position();

        offsetLeft = offsetFixed.left;
        offsetTop = offsetFixed.top;

        baseX = getSize(options.base, options.baseXY[0], 'outerWidth');
        baseY = getSize(options.base, options.baseXY[1], 'outerHeight');
    }

    selfX = getSize(this, options.selfXY[0], 'outerWidth');
    selfY = getSize(this, options.selfXY[1], 'outerHeight');

    // 计算定位元素位置
    // 若定位 fixed 元素，则父元素的 offset 没有意义
    left = (isPinFixed? 0 : offsetLeft) + baseX - selfX;
    top = (isPinFixed? 0 : offsetTop) + baseY - selfY;

    // 进行定位
    this.css({ left: left, top: top });
};

// 扩展：相对于当前可视区域页面上某一元素的居中定位
$.fn.pinCenter = function (options) {
    this.pin({
        base: (options) ? options.base : null,
        selfXY: ['50%', '50%'],
        baseXY: ['50%', '50%']
    });
};

/**
 * 根据坐标点获取对应尺寸值
 * @param  {jquery} object 被获取尺寸的元素
 * @param  {array}  coord  坐标点
 * @param  {string} type   尺寸类型
 * @return {number}
 */
function getSize(object, coord, type) {
    // 参考 `https://github.com/aralejs/position/blob/master/src/position.js`
    // 中的 `xyConverter` 方法
    // 先将坐标值转成字符串
    var x = coord + '';

    // 处理 alias，此处正则表达式内的 `:?` 表示此括号为非捕获型括号
    if (/\D/.test(x)) {
        x = x.replace(/(?:top|left)/gi, '0%')
                    .replace(/center/gi, '50%')
                    .replace(/(?:bottom|right)/gi, '100%');
    }

    // 处理 `px`
    if (x.indexOf('px') !== -1) {
        x = x.replace(/px/gi, '');
    }

    // 将百分比转为像素值
    if (x.indexOf('%') !== -1) {
        // 支持小数
        x = x.replace(/(\d+(?:\.\d+)?)%/gi, function (m, d) {
            return object[type]() * (d / 100.0);
        });
    }

    // 处理类似 100%+20px 的情况
    if (/[+\-*\/]/.test(x)) {
        try {
            x = (new Function('return ' + x))();
        } catch (e) {
            throw new Error('Invalid position value: ' + x);
        }
    }

    // 转回为数字
    return parseFloat(x, 10);
}


/*
 * TIP 提示窗口插件
 * @namespace TIP
 */
var TIP = {
    box:       {},
    timerID:   null, // 计时器ID
    needsInit: true,

    //初始化
    init: function () {
        if (!this.needsInit) {return;}

        this.box = $("<div/>")
            .hide()
            .addClass("tiplayer")
            .css({"position": "absolute"})
            .appendTo(document.body);

        this.needsInit = false;
    },

    show: function (t, options, callback) {
        // 默认设置
        var opts = $.extend({
            tipType:  "suc", // 提示类型 ，suc 成功, confirm 确认, warn 警告, err 出错
            tipText:  "", // 填充文字
            effect:   "", // 显示特效 ，默认为空直接显示 ，fade 渐变，slide 滑动
            imgSrc:   "/images/transparent.gif", // icon 路径
            hasBtn:   false,
            conf: '',
            canc: '',
            btnText:  ["确定"],
            btnCls: ["btn-medium-blue", "btn-medium-gray"],
            zindex:   1000,
            fixset:   3,
            hasImg: true,
            btnRole:["confirm"],
            conf:function(){},                       // 相对定位的偏移量，默认为 3px
            canc:function(){}                          // 相对定位的偏移量，默认为 3px
        }, options || {});

        if (t) {
            offset = $(t).offset()
        }

        if (this.timerID) {
            clearTimeout(this.timerID);
        }

        this.init();

        // 填充内容
            // 是否有图片
        var hasimg = opts.hasImg?'<img class="tipicon '+opts.tipType + '" src='+opts.imgSrc+' />':''
        this.box
            .css({"z-index": opts.zindex,"boxShadow":"0 0 10px #969696"})
            .html('<div class="tipcont">'+hasimg+
                '<div class="innertext">' +
            opts.tipText + '</div></div>');
        
        if ($(".masker").length === 1)
        {
            $(".masker").show()
        }
        else{
            this.overlayer = $("<div/>")
               .addClass("masker")
               .css({
                 "position":   this.isIE6 ? "absolute" : "fixed",
                 "z-index":    999,
                 "background": "#000",
                 "opacity":    0.15,
                 "filter":     "alpha(opacity=15)",
                 "display":    "block",
                 "width":      this.isIE6 ? Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) : "100%",
                 "height":     this.isIE6 ? Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) : "100%",
                 "left":       0,
                 "top":        0
               })
               .appendTo($(document.body)).show();
            }

        // 展现方式
        switch (opts.effect) {
            case "fade":
                this.box.fadeIn();
                break;
            case "slide":
                this.box.slideDown();
                break;
            default:
                this.box.show();
        }

        if (opts.hasBtn) {
            var btnDiv = $("<div/>").addClass("tipbtn").appendTo(this.box.find(".tipcont"));
            // if(opts.btnText.length === 1)
            // {
            //     btnDiv.append("<a class=\"" + opts.btnCls[0] + " btn\" href=\"javascript:;\" onclick=\"" + opts.conf + "\"><em>" + opts.btnText[0] + "<\/em><\/a>");
            // }
            // else if (opts.btnText.length > 1)
            // {
            //     btnDiv.append("<a class=\"" + opts.btnCls[0] + " btn\" href=\"javascript:;\" onclick=\"" + opts.conf + "\"><em>" + opts.btnText[0] + "<\/em><\/a><a class=\"" + opts.btnCls[1] + " btn\" href=\"javascript:;\" onclick=\"" + opts.canc + "\"><em>" + opts.btnText[1] + "<\/em><\/a>");
            // }
            for (var i=0;i<opts.btnText.length;i++)
            {
             btnDiv.append('<a class="' + opts.btnCls[i] + ' btn" href="javascript:;" data-role='+opts.btnRole[i]+'><em>' + opts.btnText[i] + '<\/em><\/a>');
            }
        }
        function shutTIP (para){
            TIP.hide();
            $(".masker").hide();
            para()
        }

        // 绑定事件
        $(".tipbtn").find("[data-role='confirm']").on("click",function(){
            shutTIP(opts.conf);
        })
        $(".tipbtn").find("[data-role='cancel']").on("click",function(){
            shutTIP(opts.canc);
        })

        // 定位
        switch (opts.position) {
            case "top":
                this.box.css({
                    "top":  offset.top - this.box.outerHeight() - opts.fixset,
                    "left": offset.left + ($(t).outerWidth() - this.box.outerWidth()) / 2 + parseInt($(t).css("padding-left"))
                });
                break;

            case "bottom":
                this.box.css({
                    "top":  offset.top + $(t).outerHeight() + opts.fixset,
                    "left": offset.left + ($(t).outerWidth() - this.box.outerWidth()) / 2 + parseInt($(t).css("padding-left"))
                });
                break;

            case "left":
                this.box.css({
                    "top":  offset.top + ($(t).outerHeight() - this.box.outerHeight()) / 2 + parseInt($(t).css("padding-top")),
                    "left": offset.left - this.box.outerWidth() - opts.fixset
                });
                break;

            case "right":
                this.box.css({
                    "top":  offset.top + ($(t).outerHeight() - this.box.outerHeight()) / 2 + parseInt($(t).css("padding-top")),
                    "left": offset.left + $(t).outerWidth() + opts.fixset
                });
                break;

            default:
                this.box.css({
                    "top":         $(window).height() / 2 + $(document).scrollTop(),
                    "left":        "50%",
                    "margin-top":  -this.box.height() / 2,
                    "margin-left": -this.box.width() / 2
                });
        }

        return this;

    },

    hide: function () {
        this.box.hide();
    },

    remove: function () {
        this.box.remove();
        this.needsInit = true;
    },

    closeDelay: function (delayTime, isRemove, callback) {
        var _this = this;
        this.timerID = setTimeout(function () {
            (isRemove) ? _this.remove() : _this.hide();
            $(".masker").hide();
            if (callback) {
                callback();
            }
        }, delayTime);
    }
};

/*
 * Dialog 弹出窗口插件
 * @namespace DIALOG
 */
var DIALOG = {
    timeID:    null,
    needsInit: true, // 是否需要初始化
    isIE6:     !window.XMLHttpRequest, // 是否 ie6
    init:      function (options) {
        if (!this.needsInit)
            return;

        // TODO 修正 ie6 下  position: fixed 无效
        if (this.isIE6 && this.fixed) {
            if (document.body.currentStyle.backgroundAttachment !== "fixed") {
                if (document.body.currentStyle.backgroundImage === "none") {
                    document.body.runtimeStyle.backgroundRepeat = "no-repeat";
                    document.body.runtimeStyle.backgroundImage = "url(about:blank)";
                }
                document.body.runtimeStyle.backgroundAttachment = "fixed";
            }
            this.fixlayer = document.createElement("<div style=\"display:none;position:absolute;z-index:999;overflow:hidden;background:transparent;top:expression((document).documentElement.scrollTop);left:expression((document).documentElement.scrollLeft);width:expression((document).documentElement.clientWidth);height:expression((document).documentElement.clientHeight);\">");
            document.body.insertBefore(this.fixlayer, document.body.childNodes[0]);
        }

        // 显示层
        this.box = $("<div id='dragId'></div>")
            .css({
                "position": this.fixed ? (this.isIE6 ? "absolute" : "fixed") : "absolute",
                "z-index":  999
            })
            .appendTo((this.isIE6 && this.fixed) ? $(this.fixlayer) : $(document.body));

        this.overlayer = $("<div/>")
          .addClass("masklayer")
          .css({
            "position":   this.isIE6 ? "absolute" : "fixed",
            "z-index":    850,
            "background": "#000",
            "opacity":    0.15,
            "filter":     "alpha(opacity=15)",
            "display":    "block",
            "width":      this.isIE6 ? Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) : "100%",
            "height":     this.isIE6 ? Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) : "100%",
            "left":       0,
            "top":        0
          })
          .appendTo($(document.body)).hide();

        this.needsInit = false;
    },

    show: function (options) {
        var opts = $.extend({ // 默认
            width:    400,
            title:    "提示",
            locked:   'dragarea',
            html:     "",
            mask:     true, // 是否显示遮罩
            fixed:    false, // 是否固定位置
            isTip:    false, // 是否为信息提示
            imgSrc:   "/images/transparent.gif", // 图标路径
            boxId:    "boxId",
            dragable: false,
            hasBtn:   false,
            btnCls:   ["blueBtn edit-btn btn", "btn edit-btn"],
            btnEvent: ["", "DIALOG.hide()"],
            btnText:  ["确定", "取消"],
            clsEvent: function (){}
        }, options || {});
        var st = document.body.scrollTop || document.documentElement.scrollTop,
            sl = document.body.scrollLeft || document.documentElement.scrollLeft;

        this.fixed = opts.fixed;

        if (opts.isTip) {
            opts.html = "<div class=\"tipbody\"><div class=\"tipwrap\"><img src=\"" + opts.imgSrc + "\" class=\"tipicon " + opts.tipType + "\" alt=\"\" \/><span class=\"tiptxt\">" + opts.tipText + "<\/span><\/div><\/div>"
        }

        if (this.timerID) {clearTimeout(this.timerID);}

        this.init();

        if (this.isIE6 && this.fixed) this.fixlayer.style.display = "block";

        if (opts.mask) {this.overlayer.show();}

        // 填充内容
        this.box
            .html("<table class=\"layerbox\"><tr><td class=\"popborder hborder\" colspan=\"3\"></td></tr><tr><td class=\"popborder vborder\"></td><td class=\"popcontent\"><div class=\"boxtitle\" id=\""+opts.locked+"\"><h2 onselectstart=\"return false;\">" +
            opts.title +
            "<\/h2><a class=\"close\" href=\"javascript:;\" title=\"点击关闭\" id=\"clos\">X<\/a><\/div><div class=\"boxcont\" id=\"" + opts.boxId + "\">" +
            opts.html +
            "<\/div><\/td><td class=\"popborder vborder\"><\/td><\/tr><td class=\"popborder hborder\" colspan=\"3\"><\/td><\/tr><iframe class=\"anyChatIframe\"></iframe><\/table>")
            .css({
                "width":       opts.width,
                "display":     "block"
            }).pinCenter();

        if (opts.hasBtn) {
            var btnDiv = $("<div/>").addClass("confirmC centre").appendTo(this.box.find(".boxcont"));
            for (var i = 0; i < opts.btnText.length; i++) {
                btnDiv.append("<a class=\"btn " + opts.btnCls[i] + "\" href=\"javascript:;\" onclick=\"" + opts.btnEvent[i] + "\"><em>" + opts.btnText[i] + "<\/em><\/a>");
            }
        }
        if(opts.dragable)
        {
            $('#'+opts.locked).css({"cursor":"move"})
        var m;
         $('#'+opts.locked).mousedown(function(e){
                if(e.which){
                    m=true;
                    _x=e.pageX-parseInt($('#dragId').css('left'));
                    _y=e.pageY-parseInt($('#dragId').css('top'));
                }
                })
            
            $(document).ready(function(){}).mousemove(function(e){
                if(m){
                    var x=e.pageX-_x;
                    var y=e.pageY-_y;
                    $('#dragId').css({left:x});
                    $('#dragId').css({top:y});
                }
            }).mouseup(function(){
                m=false;
            });
        }
        $("#clos").click(function(){
            DIALOG.hide()
            opts.clsEvent()
        })

        this.box.height(); // TODO：解决 ie6 ie7 下首次触发定位不准的 bug

        // ESC 动作
        $(document.body).bind("keydown", function (e) {
            if (e.keyCode === "27") {
                DIALOG.hide();
            }
        });

        return this;
    },

    hide: function () {
        this.box.hide();
        this.overlayer.hide();
        if (this.isIE6 && this.fixed) {
            this.fixlayer.style.display = "none";
        }
    },

    remove: function () {
        this.box.remove();
        this.overlayer.remove();
        if (this.isIE6 && this.fixed) {
            this.fixlayer.parentNode.removeChild(this.fixlayer);
        }
        this.needsInit = true;
    },

    closeDelay: function (delayTime, isRemove, callback) {
        var _this = this;
        this.timerID = setTimeout(function () {
            (isRemove) ? _this.remove() : _this.hide();
            if (callback) callback();
        }, delayTime);
    }
};
/**
 *
 *  Plugin: Jquery.dragBox
 *  Developer: yk
 *  Version: 1.0 Beta
 *  Update: 2013.8.29
 *
**/
function DRAGBOX (options){
    options = $.extend({},$.fn.dragBox.defaults,options);
    this.init(options)
}
    DRAGBOX.prototype = {
        constractor:DRAGBOX,
        init:function(options){
            var m;
            var st;
            st = document.body.scrollTop || document.documentElement.scrollTop;
            if($('#'+options['parent']).length > 0)
            {
                return;
            }
            else{
            $('body').append('<div id="'+options['parent']+'" class="dragBox" ><div id="'+options['inside']+'"  class="inside"><h1 id="'+options['locked']+'" onselectstart="return false;">'+(options['title']?options['title']:'照片大图')+'<a class="span" href="javascript:void(0);"></a></h1><img id="imgs" src="'+options['imgPath']+'"></div><iframe class="anyChatIframe"></iframe></div>');
            $('#'+options['parent']).css({"visibility":"hidden"})
            setTimeout(function () {
                var w = $('#'+options['inside']).find("img").width()
                var h = $('#'+options['inside']).find("img").height()
                $('#'+options['parent']).css({"width":$('#'+options['inside']).find("img").width(),"marginLeft":-w/2+'px',"marginTop":-h/2+st+'px',"visibility":"visible"})
            }, 300)
            $('#'+options['locked']+' .span').click(function(){
                $('#'+options['parent']).remove();
            });
             if(options['dragable'])
            {
                $('#'+options['locked']).mousedown(function(e){
                    e.preventDefault();
                    if(e.which){
                        m=true;
                        _x=e.pageX-parseInt($('#'+options['parent']).css('left'));
                        _y=e.pageY-parseInt($('#'+options['parent']).css('top'));
                    }
                })
                $('body').mousemove(function(e){
                    if(m){
                    var x=e.pageX-_x;
                    var y=e.pageY-_y;
                    $('#'+options['parent']).css({left:x});
                    $('#'+options['parent']).css({top:y});
                    }
                }).mouseup(function(){
                    m=false;
                });
            }
        }
       }
    }
     $.fn.dragBox = function(options){
        return this.each(function () {
        new DRAGBOX(options);
    });
}
 $.fn.dragBox.defaults = {
     parent:'dragBox',
     inside:'inside',
     locked:'locked',
     dragable:true
 }
$.fn.overlay.ddd = Overlay;


// ie6PNG
(function($){var jspath=$('script').last().attr('src');var basepath='';if(jspath.indexOf('/')!=-1){basepath+=jspath.substr(0,jspath.lastIndexOf('/')+1);}$.fn.fixpng=function(options){function _fix_img_png(el,emptyGIF){var images=$('img[src*="png"]',el||document),png;images.each(function(){png=this.src;width=this.width;height=this.height;this.src=emptyGIF;this.width=width;this.height=height;this.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+png+"',sizingMethod='scale')";});}function _fix_bg_png(el){var bg=$(el).css('background-image');if(/url\([\'\"]?(.+\.png)[\'\"]?\)/.test(bg)){var src=RegExp.$1;$(el).css('background-image','none');$(el).css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"',sizingMethod='scale')");}}if($.browser.msie&&$.browser.version<7){return this.each(function(){var opts={scope:'',emptyGif:basepath+'blank.gif'};$.extend(opts,options);switch(opts.scope){case'img':_fix_img_png(this,opts.emptyGif);break;case'all':_fix_img_png(this,opts.emptyGif);_fix_bg_png(this);break;default:_fix_bg_png(this);break;}});}}})(jQuery);

// hoverDelay
(function($){
    $.fn.hoverDelay = function(options){
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function(){
                $.noop();
            },
            outEvent: function(){
                $.noop();    
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer, outTimer, that = this;
        return $(this).each(function(){
            $(this).hover(function(){
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function(){sets.hoverEvent.apply(that)}, sets.hoverDuring);
            },function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function(){sets.outEvent.apply(that)}, sets.outDuring);
            });    
        });
    }      
})(jQuery);

//点击错误提示框叉叉
var ifWrong = function(){
    $(".mainCont input").each(function(){
                var txt = $(this).val()
                if(txt.replace(/(^\s*)|(\s*$)/g,"")=="")
                {
                    $(this).parent().find(".typeST").fadeIn()
                }
                
            })
    $(".mainCont textarea").each(function(){
                var txt = $(this).val()
                if(txt.replace(/(^\s*)|(\s*$)/g,"")=="")
                {
                    $(this).parent().find(".typeST").fadeIn()
                }
                
            })
    
}
$(".wrongTips em").each(function(){
    var self = this
    $(this).click(function(){
        $(self).parent().parent().css({"display":"none"})
        
    })
})
//模拟placeholder属性
      if (!("placeholder" in document.createElement("input"))) {
        $("input[placeholder]").each(function () {
            var that = this;
            if($(this).val() == '')
            {
                $(this).val($(this).attr("placeholder"))
            }
            $(this).css({"color":"#b2b2b2"})
            $(this).focus(function(){
              if($(this)[0].value == $(this).attr("placeholder"))
              {
                $(this).val('')
              }
            })
            $(this).bind("keyup", function (event) {
            $(this).css({"color":"#4d4d4d"})
                switch(event.keyCode) {
                    case 8:
                    if($(that)[0].value == "")
                    {
                        $(that).css({"color":"#b2b2b2"})
                    }
                    else{
                        $(this).css({"color":"#4d4d4d"})
                    }
                    break;
                }
            })
            $(this).blur(function(){
                if($(that)[0].value == "" || $(that)[0].value == $(that).attr("placeholder"))
                {
                  $(that).val($(that).attr("placeholder"))
                }
                else{}
          })
        });
      }


 //上传图片预览     
jQuery.fn.extend({
    uploadPreview: function (opts) {
        var _self = this,
            _this = $(this);
        opts = jQuery.extend({
            Img: "imagesname1",
            Width: 350,
            Height: 120,
            ImgType: ["gif", "jpeg", "jpg", "bmp", "png","PNG","JPG","JPEG"],
            Callback: function () {}
        }, opts || {});
        _self.getObjectURL = function (file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        };
        _this.change(function () {
            $("#" + opts.Img).show();
            if (this.value) {
                if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
                    this.value = "";
                    return false;
                }
                if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                    try {
                        $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]))
                    } catch (e) {
                        var src = "";
                        var obj = $("#" + opts.Img);
                        var div = obj.parent("div")[0];
                        _self.select();
                        if (top != self) {
                            window.parent.document.body.focus();
                        } else {
                            _self.blur();
                        }
                        src = document.selection.createRange().text;
                        document.selection.empty();
                        obj.hide();
                        obj.parent("div").css({
                            'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
                            'width': opts.Width + 'px',
                            'height': opts.Height + 'px'
                        });
                        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                    }
                } else {
                    $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]));
                }
                opts.Callback();
            }
        });
    }
});

// 定义 Dialog 类
var Dialog = function (element, options) {
    options = $.extend({}, $.fn.dialog.defaults, options);

    this.options = options;
    this.hasInit = false;

    this.setup(element);
    this.element = element;
};

Dialog.prototype = {

    constructor: Dialog,

    init: function () {
        // 创建弹出层
        this.dialog = new Overlay(this.options.template, {
            className: this.options.dialogClass,
            width: this.options.width,
            height: this.options.height,
            zIndex: this.options.zIndex
        });

        if (this.options.hasMask) {
            var $mask = $('.' + this.options.maskClass);

            if ($mask.length === 0) {
                // 创建遮罩
                this.mask = new Overlay(document.createElement('div'), {
                    className: this.options.maskClass,
                    width: isIE6? $(document).outerWidth() : '100%',
                    height: isIE6? $(document).outerHeight() : '100%',
                    zIndex: this.options.zIndex - 1,
                    position: 'fixed'
                });
            } else {
                // 已有遮罩
                this.mask = $mask;
            }
        }

        // 内容填充
        this.render();

        // 先隐藏浮动层与遮罩
        this.dialog.hide();
        if (this.options.hasMask) {
            this.mask.hide();
        }

        // 关闭按钮事件绑定
        $(this.dialog.overlay).find('.js-close').on('click', $.proxy(this.hide, this));

        // 其它按钮事件绑定
        $(this.dialog.overlay).find('[data-role=confirm]').on('click', $.proxy(this.confirm, this));
        $(this.dialog.overlay).find('[data-role=cancel]').on('click', $.proxy(this.hide, this));

        // 初始化完成标志
        this.hasInit = true;
    },

    setup: function (element) {
        var that = this;

        if (element) {
            // 触发绑定
            $(element).on('click', function (e) {
                e.preventDefault();

                that.trigger();
            });
        } else {
            that.trigger();
        }

        // 用于一些初始化的操作
        if (that.options.once) {
            $(element).one('click', function (e) {
                e.preventDefault();
                that.options.once();
            });
        }
    },

    trigger: function () {
        if (!this.hasInit) {
            this.init();
        }

        this.show();
    },

    show: function () {
        if (this.options.beforeShow) {
            this.options.beforeShow.apply(this);
        }

        this.dialog.setPosition();
        this.dialog.show();
        if (this.options.hasMask) {
            this.mask.show();
        }

        if (this.options.afterShow) {
            this.options.afterShow.apply(this);
        }
    },

    hide: function () {
        if (this.options.beforeHide) {
            this.options.beforeHide.apply(this);
        }

        this.dialog.hide();
        if (this.options.hasMask) {
            this.mask.hide();
        }

        if (this.options.afterHide) {
            this.options.afterHide.apply(this);
        }

        if (this.options.needDestroy) {
            this.destroy();
        }
    },

    render: function () {
        var $head = $(this.dialog.overlay).find('.hd');
        var $body = $(this.dialog.overlay).find('.bd');
        var $close = $(this.dialog.overlay).find('.close');
        var html;

        if (!this.options.hasTitle) {
            $head.remove();
        } else {
            $head.find('h2').text(this.options.title);
        }

        if (this.options.noClose) {
            $close.remove();
        }

        if (this.options.confirmType) {
            html = '<p class="confirm-wrap"><i class="icon-sprite icon icon-' + this.options.confirmType + '-32"></i>' + this.options.message + '</p>'
        } else {
            html = this.options.content;
        }

        if (this.options.hasBtn) {
            var btnCls;
            html += '<div class="btn-wrap">';
            for (var i = 0; i < this.options.btnText.length; i++) {
                if (this.options.btnRole[i] === 'cancel') {
                    btnCls = 'gray';
                } else {
                    btnCls = 'blue';
                }

                html += '<input type="button" data-role="' + this.options.btnRole[i] + '" class="dialog_btn btn-default-' + btnCls + '" value="'+ this.options.btnText[i] +'"/>' 
            }
            html += '</div>'
        };

        $body.html(html).css('padding', this.options.padding);
    },

    closeDelay: function (time) {
        setTimeout($.proxy(this.hide, this), time);
    },

    destroy: function () {
        this.dialog.remove();
        if (this.options.hasMask) {
            this.mask.hide();
        }
        this.destroyed = true;
    },

    confirm: function () {
        this.options.confirm.apply(this);
    }
}

// 注册插件
$.fn.dialog = function (options) {
    return this.each(function () {
        new Dialog(this, options);
    });
};

// 默认设置
$.fn.dialog.defaults = {
    dialogClass: 'js-dialog',
    maskClass: 'js-mask',
    template: '<table> <tr> <td class="edge top-edge" colspan="3"></td> </tr> <tr> <td class="edge left-edge"></td> <td class="center"> <div class="content"> <div class="hd"> <h2>提示</h2> </div> <div class="bd"></div> <div class="close"> <a href="javascript:;" class="js-close">关闭</a> </div> </div> </td> <td class="edge right-edge"></td> </tr> <tr> <td class="edge bottom-edge" colspan="3"></td> </tr> </table>',
    width: 450,
    height: 'auto',
    zIndex: 999,
    hasMask: true,
    hasTitle: true,
    title: '提示',
    cotent: '',
    padding: '20px',
    hasBtn: false,
    btnText: ['确定', '取消'],
    btnRole: ['confirm', 'cancel'],
    message: ''
};

$.fn.dialog.Constructor = Dialog;