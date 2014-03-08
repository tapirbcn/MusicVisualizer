var cnv = null;
var context = null;
var h,w;

//config
var distanceDetection = 100;
var props = {
	particles: 100
};

var blur = 0; //slow in chrome :(
var showPoints = false;
var clearCanvas = true;
var lineWidth = 1;
//end config

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
	cnv.style.webkitFilter = "blur("+blur+"px)";
	for(var i=0; i<props.particles; i++) {
		var entity = {
			x: Math.floor(Math.random() * w) + 1,
			y: Math.floor(Math.random() * h) + 1,
			speedY: Math.floor(Math.random() * 10) + 1,
			speedX: Math.floor(Math.random() * 10) + 1
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
	if(clearCanvas) {
		context.clearRect ( 0 , 0 , w, h );
	}

	context.fillStyle = 'white';
	var len = model.length;

	var entity;
	while(len--) {
		entity = model[len];

		if(showPoints) {
			//draw a circle
			context.beginPath();
			context.arc(entity.x, entity.y, 2, 0, Math.PI*2, true);
			context.closePath();
			context.fill();
		}

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
	var len2 = len;
	var entity2, offsetY, offsetX;
	while(len--) {
		//get entity
		entity = model[len];
		len2 = len;
		while(len2--) {
			entity2 = model[len2];
			offsetY = Math.abs(entity.y-entity2.y);
			offsetX = Math.abs(entity.x-entity2.x);
			if(offsetX < distanceDetection && offsetY < distanceDetection) {
				//draw line between two points
				context.strokeStyle = 'white';
				context.beginPath();
				context.moveTo(entity.x, entity.y);
				context.lineTo(entity2.x, entity2.y);
				context.lineWidth = lineWidth;
				context.stroke();
				context.closePath();
			}
		}
	}
}