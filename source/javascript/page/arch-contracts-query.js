$(function(){
	$('#yyb_list').diySelect();
	EventBind();
})
function EventBind(){
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
	$(".view-back").on('click',function(){
		$(".arch-info").hide();
		$(".arch-contracts-query").show();
	})
	$(".turn-back").on('click',function(){
		$(".arch-detail").hide();
		$(".arch-info").show();
	})
	$(".list-detail").on('click','.view-btn-c',function(){
		$(".arch-contracts-query").hide();
		$(".arch-info").show();

		$('.begin-time').datepicker({
	      onClose: function( selectedDate ) {
	        $('.end-time').datepicker( "option", "minDate", selectedDate );
	      }
	    });
	    $('.end-time').datepicker({
	      onClose: function( selectedDate ) {
	          $('.begin-time').datepicker( "option", "maxDate", selectedDate );
	        }
	    });
		$('#khyyb').diySelect();
	})
	$(".table-info").on('click','.view-btn-cc',function(){
		$(".arch-info").hide();
		$(".arch-detail").show();
	})
}