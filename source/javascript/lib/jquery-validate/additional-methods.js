/**
 * 教程：
 * http://www.runoob.com/jquery/jquery-plugin-validate.html
 * */

// 手机号码验证
jQuery.validator.addMethod("mobile", function(value, element) {
  var tel = /^(13|15|17|18)[0-9]{9}$/;
  return this.optional(element) || (tel.test(value));
}, "请正确填写您的手机号码");

// 固话号码验证
jQuery.validator.addMethod("phone", function(value, element) {
  var tel = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
  return this.optional(element) || (tel.test(value));
}, "请正确填写您的固话号码");
