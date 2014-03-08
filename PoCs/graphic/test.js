var cnv = null;
var context = null;

var streamProps = {
	bps: 0,
	volume: 0,
	note: 0
}

$( document ).ready(function() {
	cnv = $('#display')[0];
	context = cnv.getContext('2d');
	fullScreenCanvas();
	init();
});

$(window).resize(function() {
	fullScreenCanvas();
});

function fullScreenCanvas() {
	"use strict";
	cnv.width = $(document).width();
	cnv.height = $(document).height();
}

function init() {
	"use strict";

	var color = 0;
	var direction = 1;


	setInterval(function() {
		//graphical code here
		//updateStreamProps();
		
	}, 16);
}

function updateStreamProps() {
	"use strict";
	streamProps = {
		bps: 20,
		volume: 20,
		note:40
	};
}