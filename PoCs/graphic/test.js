var cnv = null;
var context = null;
var h,w;

var props = {
	particles: 100
};

len = props.particles;

var model = [];

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
	h = cnv.height;
	w = cnv.width;
}

function init() {
	"use strict";

	for(var i=0; i<props.particles; i++) {
		var entity = {
			x: Math.floor(Math.random() * w) + 1,
			y: Math.floor(Math.random() * h) + 1,
			speedY: Math.floor(Math.random() * 20) + 1,
			speedX: Math.floor(Math.random() * 20) + 1
		};

		model.push(entity);
	}

	setInterval(function() {
		loop();
	}, 16);
}

function loop() {
	"use strict";
	//draw model
	context.clearRect ( 0 , 0 , w, h );
	context.fillStyle = 'white';
	var len = model.length;

	var entity;
	while(len--) {
		entity = model[len];

		//draw a circle
		context.beginPath();
		context.arc(entity.x, entity.y, 2, 0, Math.PI*2, true);
		context.closePath();
		context.fill();

		entity.x += entity.speedX;
		entity.y += entity.speedY;

		if(entity.x < 0 || entity.x > w) {
			entity.speedX = entity.speedX*-1;
		}

		if(entity.y < 0 || entity.y > h) {
			entity.speedY = entity.speedY*-1;
		}
	}

	//
	len = model.length;
	while(len--) {
		
	}
}