var cnv = null;
var context = null;
var h,w;

var distanceDetection = 100;
var entropyDistanceDetection = 100;

var props = {
	particles: 150,
	entropyParticles: 3
};

len = props.particles;

var model = [];
var entropyModel = [];

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
	var entity, maxSpeed = 10;
	for(var i=0; i<props.particles; i++) {

		entity = {
			x: Math.floor(Math.random() * w) + 1,
			y: Math.floor(Math.random() * h) + 1,
			speedY: Math.random() * 2 * maxSpeed - maxSpeed,
			speedX: Math.random() * 2 * maxSpeed - maxSpeed
		};

		model.push(entity);
	}

	var num = props.entropyParticles;
	while (num--) {
		generateEntropyEntity();
	}

	setInterval(function() {
		loop();
	}, 16);
}

function generateEntropyEntity () {
	var entity = {
		x: Math.floor(Math.random() * w) + 1,
		y: Math.floor(Math.random() * h) + 1,
		speedY: Math.random() * 2 - 1,
		speedX: Math.random() * 2 - 1
	};

	entropyModel.push(entity);
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

	//draw entropy model
	context.fillStyle = 'red';
	var len = entropyModel.length;

	var entity;
	while(len--) {
		entity = entropyModel[len];

		//draw a circle
		context.beginPath();
		context.arc(entity.x, entity.y, 4, 0, Math.PI*2, true);
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
	var len2 = len;
	var entity2;
	while(len--) {
		//get entity
		entity = model[len];
		len2 = len;
		while(len2--) {
			entity2 = model[len2];
			if(Math.abs(entity.x-entity2.x) < distanceDetection
				&& Math.abs(entity.y-entity2.y) < distanceDetection) {

				//draw line between two points
				context.strokeStyle = 'white';
				context.beginPath();
				context.moveTo(entity.x, entity.y);
				context.lineTo(entity2.x, entity2.y);
				context.lineWidth = 1;
				context.stroke();
				context.closePath();
			}
		}
	}

	len = model.length;
	var entropyLen = entropyModel.length;
	var entity2;
	while(len--) {
		//get entity
		entity = model[len];
		len2 = entropyLen;
		while(len2--) {
			entity2 = entropyModel[len2];
			if(Math.abs(entity.x-entity2.x) < entropyDistanceDetection
				&& Math.abs(entity.y-entity2.y) < entropyDistanceDetection) {

				//draw line between two points
				context.beginPath();
				context.strokeStyle = 'red';
				context.moveTo(entity.x, entity.y);
				context.lineTo(entity2.x, entity2.y);
				context.lineWidth = 1;
				context.stroke();
				context.closePath();
			}
		}
	}
}