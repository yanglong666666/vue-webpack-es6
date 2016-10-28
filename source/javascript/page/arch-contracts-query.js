$(function(){
	$('#yyb_list').diySelect();
	EventBind();
})
function EventBind(){
	console.log('start');
	$(".list-more").on('click',function(){
		var $e = $(this) ;
		console.log($e.hasClass('opend'));
		if($e.hasClass('opend'))
		{
			$e.removeClass('opend');
			$($e.next()).removeClass('details-show').addClass('details-hide')
			// $($e.next()).hide(500)
		}
		else{
			$e.addClass('opend') ;
			$($e.next()).removeClass('details-hide').addClass('details-show')
			// $($e.next()).show(500)

		}
	})
}