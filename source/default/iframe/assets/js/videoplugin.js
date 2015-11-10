/**
* @authors yuk
*/
function showVideoDialog(url1,url2){
	DIALOG.show({
        title:'播放视频',
        boxId:"videoBox",
        width:716,
        html: '<div class="bigPicShow"><div class="videos_wrap clearfix"><video style="float:left;margin-right:10px;" width="320" height="240" id="vid1" src="'+url1+'"><embed src="'+url1+'" type="application/x-shockwave-flash"  wmode="transparent" height="240" width="320"></video><video style="float:left" width="320" height="240" id="vid2" src="'+url2+'"><embed src="'+url2+'" type="application/x-shockwave-flash"  wmode="transparent" height="240" width="320"></video></div><div id="progressbar"><span id="played"></span></div><br><button id="playpause" title="播放">play</button><button id="stop" title="停止"">stop</button><button id="vup" title="增大音量" >+</button><button id="vdown" title="减小音量">-</button><button id="rewind" title="慢放">&laquo;</button><button id="ffwd" title="快进">&raquo;</button><button id="mute" title="静音">mute</button></div>',
        clsEvent:function(){
            alert("成功")
        }
  	});


	$("video").each(function() {
		$(this)[0].controls = false;
		if (!$(this)[0].addEventListener) {
		   	$(this)[0].attachEvent("play", function(){
				  	var ppbutton = document.getElementById("playpause")
				  	ppbutton.title = "暂停"
					ppbutton.textContent = "pause"
				});
		}
		else {
		    $(this)[0].addEventListener("play", function(){
				  	var ppbutton = document.getElementById("playpause")
				  	ppbutton.title = "暂停"
					ppbutton.textContent = "pause"
				}, false);
		}
		if (!$(this)[0].addEventListener) {
		   	$(this)[0].attachEvent("pause", function(){
		  	var ppbutton = document.getElementById("playpause")
		  	ppbutton.title = "播放"
			ppbutton.textContent = "play"
		});
		}
		else {
		    $(this)[0].addEventListener("pause", function(){
		  	var ppbutton = document.getElementById("playpause")
		  	ppbutton.title = "播放"
			ppbutton.textContent = "play"
		}, false);
		}
		
		if (!$(this)[0].addEventListener) {
		   	$(this)[0].attachEvent("timeupdate", updateProgress);
		}
		else {
		    $(this)[0].addEventListener("timeupdate", updateProgress, false);
		}
	});

	$("#stop").on('click', function(event) {
		$("video").each(function() {
		 	event.preventDefault();
		 	$(this)[0].pause();
			$(this)[0].currentTime = 0;
			$("#played").width("0%")
		});
	});


$("#playpause").on('click', function(event) {
	$("video").each(function() {
		event.preventDefault();
		if($(this)[0].paused || $(this)[0].ended){
			if ($(this)[0].ended) {
				$(this)[0].currentTime = 0;
			}
			$(this)[0].play()
		}
		else {
			$(this)[0].pause();
		}
	});
});

function changeVolumn(direction){
	$("video").each(function() {
		var volume = Math.floor($(this)[0].volume*10)/10
		$(this)[0].muted= false;
		if(direction == '-'){
			if(volume<0.1) $(this)[0].volume = 0
		  else $(this)[0].volume -=0.1
		}
		else{
			if(volume>0.9) $(this)[0].volume = 1
			else $(this)[0].volume += 0.1
		}
	})
}
$("#vup").on('click', function(event) {
	event.preventDefault();
	changeVolumn("+")
});
$("#vdown").on('click', function(event) {
	event.preventDefault();
	changeVolumn("-")
});

$("#mute").on('click', function(event) {
	$("video").each(function() {
		event.preventDefault();
		if ($(this)[0].muted) {
			document.getElementById('mute').textContent = "mute"
			$(this)[0].muted = false;
		}
		else{
			document.getElementById('mute').textContent = "unmute"
			$(this)[0].muted = true;
		}
	});
});


function changePlaybackSpeed(direction){
	$("video").each(function() {
		if ($(this)[0].playbackRate!=undefined) {
			if(direction == "-") $(this)[0].playbackRate -= 1;
			else $(this)[0].playbackRate +=1;
		}
		else{
			if (direction == '-') $(this)[0].currentTime -=1;
			else $(this)[0].currentTime +=1
		}
	})
}
$("#rewind").on('click', function(event) {
	event.preventDefault();
	changePlaybackSpeed("-")
});
$("#ffwd").on('click', function(event) {
	event.preventDefault();
	changePlaybackSpeed("+")
});


function updateProgress(){
	$("video").each(function() {
		var value = 0;
		if ($(this)[0].currentTime>0) {
			value = Math.floor(($(this)[0].currentTime/$(this)[0].duration)*100);
			document.getElementById("played").style.width = value+"%"
		};
	})
}

var boxLeft = $("#dragId:has('#videoBox')").offset().left
var borderWidth = $(".vborder").width()
var progressbar = document.getElementById('progressbar')
// progressbar.addEventListener('mouseup',function(e){setPlayPosition(e.pageX);},false)
if (!progressbar.addEventListener) {
		   	progressbar.attachEvent("mouseup", function(e){setPlayPosition(e.pageX);});
		}
		else {
		    progressbar.addEventListener("mouseup", function(e){setPlayPosition(e.pageX);}, false);
		}
function setPlayPosition(x){
	$("video").each(function() {
		var progressbar = document.getElementById('progressbar')
		var value = (x-progressbar.offsetLeft-boxLeft-borderWidth).toFixed(2)
		var timetoset = ((value/progressbar.offsetWidth).toFixed(2)*$(this)[0].duration).toFixed(2)
		$(this)[0].currentTime = timetoset;
	})
}
}



function showVideoDialogSingle(url1){
	DIALOG.show({
        title:'播放视频',
        boxId:"videoBox",
        width:716,
        html: '<div class="bigPicShow"><div class="videos_wrap clearfix"><video style="float:left;margin-right:10px;" width="650" height="240" id="vid" src="'+url1+'"><embed src="'+url1+'" type="application/x-shockwave-flash"  wmode="transparent" height="240" width="650"></video></div><div id="progressbarS"><span id="playedS"></span></div><br><button id="playApause" title="播放">play</button><button id="stopS" title="停止"">stop</button><button id="vupS" title="增大音量" >+</button><button id="vdownS" title="减小音量">-</button><button id="rewindS" title="慢放">&laquo;</button><button id="ffwdS" title="快进">&raquo;</button><button id="muteS" title="静音">mute</button></div>',
        clsEvent:function(){
            alert("成功")
        }
  	});


	$("video").each(function() {
		$(this)[0].controls = false;
		if (!$(this)[0].addEventListener) {
		   	$(this)[0].attachEvent("play", function(){
				  	var ppbutton = document.getElementById("playApause")
				  	ppbutton.title = "暂停"
					ppbutton.textContent = "pause"
				});
		}
		else {
		    $(this)[0].addEventListener("play", function(){
				  	var ppbutton = document.getElementById("playApause")
				  	ppbutton.title = "暂停"
					ppbutton.textContent = "pause"
				}, false);
		}
		if (!$(this)[0].addEventListener) {
		   	$(this)[0].attachEvent("pause", function(){
		  	var ppbutton = document.getElementById("playApause")
		  	ppbutton.title = "播放"
			ppbutton.textContent = "play"
		});
		}
		else {
		    $(this)[0].addEventListener("pause", function(){
		  	var ppbutton = document.getElementById("playApause")
		  	ppbutton.title = "播放"
			ppbutton.textContent = "play"
		}, false);
		}
		
		if (!$(this)[0].addEventListener) {
		   	$(this)[0].attachEvent("timeupdate", updateProgress);
		}
		else {
		    $(this)[0].addEventListener("timeupdate", updateProgress, false);
		}
	});

	$("#stopS").on('click', function(event) {
		$("video").each(function() {
		 	event.preventDefault();
		 	$(this)[0].pause();
			$(this)[0].currentTime = 0;
			$("#playedS").width("0%")
		});
	});


$("#playApause").on('click', function(event) {
	$("video").each(function() {
		event.preventDefault();
		if($(this)[0].paused || $(this)[0].ended){
			if ($(this)[0].ended) {
				$(this)[0].currentTime = 0;
			}
			$(this)[0].play()
		}
		else {
			$(this)[0].pause();
		}
	});
});

function changeVolumn(direction){
	$("video").each(function() {
		var volume = Math.floor($(this)[0].volume*10)/10
		$(this)[0].muted= false;
		if(direction == '-'){
			if(volume<0.1) $(this)[0].volume = 0
		  else $(this)[0].volume -=0.1
		}
		else{
			if(volume>0.9) $(this)[0].volume = 1
			else $(this)[0].volume += 0.1
		}
	})
}
$("#vupS").on('click', function(event) {
	event.preventDefault();
	changeVolumn("+")
});
$("#vdownS").on('click', function(event) {
	event.preventDefault();
	changeVolumn("-")
});

$("#muteS").on('click', function(event) {
	$("video").each(function() {
		event.preventDefault();
		if ($(this)[0].muted) {
			document.getElementById('muteS').textContent = "mute"
			$(this)[0].muted = false;
		}
		else{
			document.getElementById('muteS').textContent = "unmute"
			$(this)[0].muted = true;
		}
	});
});


function changePlaybackSpeed(direction){
	$("video").each(function() {
		if ($(this)[0].playbackRate!=undefined) {
			if(direction == "-") $(this)[0].playbackRate -= 1;
			else $(this)[0].playbackRate +=1;
		}
		else{
			if (direction == '-') $(this)[0].currentTime -=1;
			else $(this)[0].currentTime +=1
		}
	})
}
$("#rewindS").on('click', function(event) {
	event.preventDefault();
	changePlaybackSpeed("-")
});
$("#ffwdS").on('click', function(event) {
	event.preventDefault();
	changePlaybackSpeed("+")
});


function updateProgress(){
	$("video").each(function() {
		var value = 0;
		if ($(this)[0].currentTime>0) {
			value = Math.floor(($(this)[0].currentTime/$(this)[0].duration)*100);
			document.getElementById("playedS").style.width = value+"%"
		};
	})
}

var boxLeft = $("#dragId:has('#videoBox')").offset().left
var borderWidth = $(".vborder").width()
var progressbar = document.getElementById('progressbarS')
// progressbar.addEventListener('mouseup',function(e){setPlayPosition(e.pageX);},false)
if (!progressbar.addEventListener) {
		   	progressbar.attachEvent("mouseup", function(e){setPlayPosition(e.pageX);});
		}
		else {
		    progressbar.addEventListener("mouseup", function(e){setPlayPosition(e.pageX);}, false);
		}
function setPlayPosition(x){
	$("video").each(function() {
		var progressbar = document.getElementById('progressbarS')
		var value = (x-progressbar.offsetLeft-boxLeft-borderWidth).toFixed(2)
		var timetoset = ((value/progressbar.offsetWidth).toFixed(2)*$(this)[0].duration).toFixed(2)
		$(this)[0].currentTime = timetoset;
	})
}
}