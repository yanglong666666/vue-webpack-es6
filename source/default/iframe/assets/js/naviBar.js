$(function(){
	var a = $('.LeftUl').find('li[style]').has('ul');
	if (a.length == 0) {
		var b = $('.LeftUl').find('li[style]');
		if (b.length > 0) {
			$(".nav b").text('首页  >  ' + $('.LeftUl').find('li[style]').find('a').text());
		}
	} else {
		var level1 = a.find('p').text();
		var level2 = a.find('li[style]').find('a').text();
		$(".nav b").text('首页  >  ' + level1 + '  >  ' + level2);
	}
});