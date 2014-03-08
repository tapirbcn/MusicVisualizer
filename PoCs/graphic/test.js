var cnv = null;
var context = null;
$( document ).ready(function() {
	cnv = $('#display')[0];
	context = cnv.getContext('2d');
	fullScreenCanvas();
	initialDraw();
});

$(window).resize(function() {
	fullScreenCanvas();
});

function fullScreenCanvas() {
	"use strict";
	cnv.width = $(document).width();
	cnv.height = $(document).height();
}

function initialDraw() {
	"use strict";

	var color = 0;
	var direction = 1;

	setInterval(function() {
		context.fillStyle = "rgb("+color+", "+color+", "+color+")";
		color += direction;
		if(color === 255) {
			direction = direction * -1;
		}

		if(color === 0) {
			direction = direction * -1;
		}

		context.fillRect(0,0,cnv.width,cnv.height);
	}, 0);
}