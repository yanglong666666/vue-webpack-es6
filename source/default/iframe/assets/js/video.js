$(".newIncoming a").click(function(){
            DIALOG.show({
                width:330,
                html: '已没有新视频！'
              });
            setTimeout('DIALOG.hide()',2000);
        })
        $(".sendToVerify a").click(function(){
            $("span.wait").show()
        })
                $(function(){
                    $("#IDPositive").diySelect({
                        width:68,
                        beforeSelect:function(){
                            alert("before")
                        },
                        abc:function(){
                            alert(123)
                        }
                    });
                    $("#IDNegative").diySelect({
                        width:68
                    })
                    $("#Pic").diySelect({
                        width:68
                    })
                }) 
        
        $(function(){
            $(".drag_cont_btn").slider({
                range: "min",
                max:10,
                slide: function( event, ui ) {
                    $( "#amount" ).val( ui.value );
                }
            })
            
        })
        $("#videoVerList .PICTURECont img").each(function(){
            $(this).click(function(){
                DIALOG.show({
                dragable:true,
                width:550,
                title:'照片大图',
                html: '<div class="bigPicShow"><img width="300" src="/images/temp/temp10.jpg" alt="" /></div><div class="turn_pic"><h3>点击以下按钮可旋转图片</h3><span class="turn_left"></span><span class="turn_right"></span><br /><a href="" class="btn grayBtn edit-btn"><em>保存</em></a></div>'
              });
            })
        })
         $(".showresult img").click(function(){
            DIALOG.show({
            title:'照片大图',
            width:540,
            html: '<div class="bigPicShow"><img width="500" src="/images/temp/temp10.jpg" alt="" /></div>'
          });
        })
        //录像点击播放
        $(".recList img").click(function(){
           showVideoDialog('/images/3.mp4','/images/3.mp4')
        })
        $(".recList dt").click(function(){
           showVideoDialogSingle('/images/3.mp4')
        })
        $("#videoVerList .VIDEOCont img").click(function(){
            DIALOG.show({
            title:'播放视频',
            width:680,
            html: '<div class="bigPicShow"><img width="640" height="270" src="/images/temp/temp10.jpg" alt="" /></div>',
            clsEvent:function(){
                alert("成功")
            }
          });
        })
        // 录像采集按钮
        var sight = 1
            $(".startRec").click(function(){
                if(sight)
                {
                    $(this).text("结束采集")
                    sight = 0;
                    $(".recording").css({"visibility":"visible"})
                    timeGoing()
                    $(this).css({"background":"url(../images/videoBtn-gray.jpg) 0 0 no-repeat","cursor":"default"})
                }
                 else{
                    $(this).text("录像采集")
                    sight = 1;
                    $(this).css({"background":"url(../images/videoBtn.jpg) 0 0 no-repeat","cursor":"pointer"})
                    stopTime()
                }
            })
       // 公安认证
       $("#policeV").click(function(){
        $("span.wait").show()
       })
           
           //验证通过二次确认 
           $(".verifyConf .blueBtn").click(function(){
             DIALOG.show({
                title:'确认通过',
                boxId:'videoForSure',
                width:340,
                hasBtn:true,
                btnText:["确定","不确定"],
                html: '<div class="cenForSure">您确定要通过吗？</div>'
              });
             $("#videoForSure .blueBtn").click(function(){
                alert("通过！");
                DIALOG.hide();
             })
           })
           //验证不通过二次确认
           $(".verifyConf #deny").click(function(){
             DIALOG.show({
                title:'确认不通过',
                boxId:'videoForDeny',
                width:350,
                hasBtn:true,
                btnText:["确定","不确定"],
                html: '<div class="cenForDeny"><p>请说明验证不通过的原因</p><ul><li><label for="base"><input name="denyreason" id="base" type="checkbox" />基本资料有误</label></li><li><label for="cut"><input name="denyreason" id="cut" type="checkbox" />用户中断</label></li><li><label for="picfail"><input name="denyreason" id="picfail" type="checkbox" />证件照采集失败</label></li><li><label for="police"><input name="denyreason" id="police" type="checkbox" />公安认证信息不一致</label></li><li><label for="other"><input name="denyreason" id="other" type="checkbox" />其他</label></li></ul></div>'
              });
             $("#videoForDeny .blueBtn").click(function(){
                 DIALOG.show({
                    title:'确认不通过',
                    boxId:'videoForDeny',
                    width:350,
                    hasBtn:true,
                    btnText:["确定","不确定"],
                    html: '新页面'
                  });
                DIALOG.hide();
             })
           })
           //计时器
            var a=b=c=0;
           function timeGoing(){
             a++;
                if(a == 60)
                {
                    a = 0;
                    b++;
                }
                if(b == 60)
                {
                    b = 0;
                    c++;
                }
                d=checkTime(a)
                e=checkTime(b)
                f=checkTime(c)
                $(".recording b").text(f+':'+e+':'+d)
            N = setTimeout('timeGoing()',1000)
           }
           function checkTime(m){
                if(m<10)
                {
                    m = "0" + m
                }
                return m
            }
           function stopTime(){
            clearTimeout(N)
            a=b=c=0
            $(".recording b").text(c+':'+b+':'+a)
            $(".recording").css({"visibility":"hidden"})
           }

           //点击编辑按钮
            $("#videoVerify .edit").parent().parent().each(function(){
                $(this).hoverDelay({
                     hoverEvent: function(){
                            $(this).find(".edit").css({"display":"inline-block"})
                      },
                      outEvent: function(){
                          $(this).find(".edit").hide()
                        }
                      })
               
                
                $(this).find(".edit").click(function(){
                    var self = this
                     if($(this).parent().parent().attr("class") == "slct")
                    {
                        //职业
                        if($(this).parent().parent().attr("id") == "occupation")
                        {
                            DIALOG.show({
                            boxId:'editBox',
                            title:'修改'+$(self).parent().parent().prev("td").text(),
                            width:'auto',
                            html: '<select class="diy-select" id="occu"><option value="">牧师</option><option value="">战士</option><option value="">魔法师</option></select><div class="confC"><a href="javascript:" class="btn blueBtn edit-btn"><em>确定</em></a></div>'
                            });
                             $("#occu").diySelect({autoWidth: true});
                        }
                        //教育
                        if($(this).parent().parent().attr("id") == "education")
                        {
                            DIALOG.show({
                            boxId:'editBox',
                            title:'修改'+$(self).parent().parent().prev("td").text(),
                            width:'auto',
                            html: '<select class="diy-select" id="edu"><option value="">大学</option><option value="">博士</option><option value="">圣斗士</option></select><div class="confC"><a href="javascript:" class="btn blueBtn edit-btn"><em>确定</em></a></div>'
                            });
                             $("#edu").diySelect({autoWidth: true});
                        }
                        $(".blueBtn").click(function(){
                            var former =  $(self).parent().parent()[0].firstChild.nodeValue;
                           $(self).parent().parent()[0].firstChild.nodeValue = $("#editBox .js-select").text();
                           var newer =  $(self).parent().parent()[0].firstChild.nodeValue;
                           DIALOG.hide()
                           if(former != newer)
                               {
                                $(".saver a").css({"backgroundPosition":"right -66px","cursor":"pointer"})
                                $(".saver a em").css({"backgroundPosition":"left -24px","cursor":"pointer"})
                               }
                        })
                    }
                    else if($(this).parent().parent().attr("class") == "IDVali")
                    {
                        DIALOG.show({
                            boxId:'IDveri',
                            title:'修改'+$(self).parent().parent().prev("td").text(),
                            width:'auto',
                            html: '<input class="txt" id="beginTime" type="text"><cite>到</cite><input class="txt" type="text" id="finishTime"><div class="confC"><a href="javascript:" class="btn blueBtn edit-btn"><em>确定</em></a></div>'
                            });
                        // 有效期
                            $("#beginTime").datepicker({
                              showOtherMonths: true,
                              selectOtherMonths: true,
                              dateFormat: "yy-mm-dd",
                              changeMonth: true,
                              changeYear: true
                            });
                            var bt = $(self).parent().parent().find(".beginTime").text();
                            $( "#beginTime" ).datepicker( "setDate", bt );
                            $("#finishTime").datepicker({
                              showOtherMonths: true,
                              selectOtherMonths: true,
                              dateFormat: "yy-mm-dd",
                              changeMonth: true,
                              changeYear: true
                            });
                            var et = $(self).parent().parent().find(".endTime").text();
                            $( "#finishTime" ).datepicker( "setDate", et );
                            $(".blueBtn").click(function(){
                                console.info(bt)
                                $(self).parent().parent().find(".beginTime").text($("#beginTime").val());
                                $(self).parent().parent().find(".endTime").text($("#finishTime").val());
                                DIALOG.hide();
                            })
                    }
                    else if($(this).parent().parent().attr("class") == "PCN")
                    {
                        DIALOG.show({
                        boxId:'editBox',
                        title:'修改'+$(this).parent().parent().prev("td").text(),
                        width:416,
                        html: '<div class="PCN"><div class="select-group clearfix"><select name="province" id="province"><option value="-1">请选择省份</option></select><select name="city" id="city"><option value="-1">请选择城市</option></select><select name="district" id="district"><option value="-1">请选择地区</option></select></div><div class="clearfix"><input type="text" class="txt" id="place" value="格雅公寓"/></div></div><div class="confC"><a href="javascript:" class="btn blueBtn edit-btn"><em>确定</em></a></div>'
                      });
                        // 三级省市区联动
    //>> 基本资料========================================================
    // 初始化 select 方法
    function initSelect(id) {
        $('#' + id).diySelect({
            width: 80,
            style: 'margin:0 10px 20px 0'
        });
    }

    // 接受标准的 `JSON` 格式数据来填充内容
    function fillSelect(id, content, name) {
        for (var i = 0; i < content.length; i++) {
            var op = new Option(content[i][name], i);

            // op.setAttribute('value', i);
            // op.appendChild(document.createTextNode(content[i][name]));
            // op.text = content[i][name];
            // op.value = i;

            if (document.getElementById(id)) {
                document.getElementById(id).add(op);
            }
        }

        // document.getElementById(id).appendChild(fragment);
    }

    
    function threeLevelLinkage(dataURL) {
        initSelect('province');
        initSelect('city');
        initSelect('district');
        
        $.getJSON(dataURL, function (data) {
            var region = data.resMap,
                    cityHolder = '<option value="-1">请选择城市</option>',
                    districtHolder = '<option value="-1">请选择地区</option>';

            fillSelect('province', region, 'p');
            initSelect('province');
            $("#province").chooseSelect("河北")
            $("#city").chooseSelect("石家庄")
            $("#district").chooseSelect("长安区")

            $('#province').on('change', function () {
                if (this.value === '-1') { // 请选择
                    $('#city').html(cityHolder);
                    initSelect('city');
                    $('#district').html(districtHolder);
                    initSelect('district');
                } else {
                    var city_list = region[this.value]['c']; 

                    if (city_list !== undefined) { 
                        if (city_list[0]['a'] !== undefined) { // 有城市、地区数据
                            $('#city').html(cityHolder);
                            fillSelect('city', city_list, 'n');
                            initSelect('city');

                            $('#district').html(districtHolder);
                            initSelect('district');

                            $('#city').off('change');
                            $('#city').on('change', function () {
                                if (this.value === '-1') {
                                    $('#district').html(districtHolder);
                                    initSelect('district');
                                } else {
                                    var district_list = city_list[this.value]['a'];

                                    $('#district').html(districtHolder);
                                    fillSelect('district', district_list, 's');
                                    initSelect('district');
                                }
                            });
                        } else { // 只有地区数据
                            $('#city').revertSelect();
                            $('#district').html(districtHolder);
                            fillSelect('district', city_list, 'n');
                            initSelect('district');
                        }
                    } else { // 无城市、地区数据
                        $('#city').revertSelect();
                        $('#district').revertSelect();
                    }
                }
            });
        });
    }
    threeLevelLinkage('/PCN.json');
    $(".blueBtn").click(function(){
        DIALOG.hide();district
        var province = $("#province-select").text()
        var city = $("#city-select").text()
        var district = $("#district-select").text()
        var total = province+city+district+$("#place").val()
        $(self).parent().parent()[0].firstChild.nodeValue = total;
    })
                    }
                    else{
                    var txt = $(this).parent().parent()[0].firstChild.nodeValue
                       DIALOG.show({
                        boxId:'editBox',
                        title:'修改'+$(this).parent().parent().prev("td").text(),
                        width:300,
                        html: '<div class="clearfix"><input type="text" class="txt" value="'+ txt +'"></div><div class="confC"><a href="javascript:" class="btn blueBtn edit-btn"><em>确定</em></a></div>'
                      });
                    $(".blueBtn").click(function(){
                        var former =  $(self).parent().parent()[0].firstChild.nodeValue;
                       $(self).parent().parent()[0].firstChild.nodeValue = $("#editBox input").val()
                       var newer =  $(self).parent().parent()[0].firstChild.nodeValue;
                       if(former != newer)
                       {
                        $(".saver a").removeClass("grayBtn")
                       }
                       DIALOG.hide()
                    })
                    }
                })
            })
// 外部引用常用语
    $.ajax({
            type: "GET",
            url: '/phrases.json',
            dataType: 'json',
            success: function (data) {
               var len = data.phrases.length;
                for(var q=0;q<len;q++)
                {
                    $("<li>"+data.phrases[q]+"<span>×</span></li>").appendTo($(".phrases"))
                }
            }
        });
    // 移进selectBtn
    $(".more-message").hoverDelay({
         hoverEvent: function(){
                $(this).parent().addClass("selectHover");
                $(".phrases").show();
                $(".phrases li").mouseover(function(){
                    $(this).addClass("hoverGray")
                    $(this).find('span').show()
                    $(this).siblings().removeClass("hoverGray");
                    $(this).siblings().find('span').hide();
                    $(this).click(function(){
                        $(".phrases").hide();
                         $(".input-msg .msg-box").val($(this)[0].firstChild.nodeValue)
                    })
                    $(this).find('span').click(function(event) {
                        event.preventDefault();
                        $(this).parent().remove()
                    });
                })
                // ie6常用语最大高度

          },
          outEvent: function(){
              $(this).parent().removeClass("selectHover");
              $(".phrases").hide();
            }
          })

    // 保存常用语
    
    $(".txt-cont li .save-phrase").off().click(function(e){
                 TIP.show($(e.target),{
                    tipType: "suc",
                    tipText:'保存成功！'
                    }).closeDelay(1000);
            })
    
$(".no-flo").on('click', function(event) {
    $(this).css({"backgroundPosition":"right -704px"})
    $(this).find("em").css({"backgroundPosition":"0 -676px","color":"#b8b8b8","cursor":"default"})
});

