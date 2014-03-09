var cnv = null;
var context = null;
var h,w;
var paused = false;

///////////////////////// config variables, do not edit, use themes!

var distanceDetection;
var entropyDistanceDetection ;
var props = {};
var blur;
var showPoints;
var showEntropyPoints;
var showEntropyLines;
var clearCanvas;

var lineWidth;
var entropyPower;
var maxSpeed;

var colors;
			
var randomColors;

var defaultColor;

//////////////////////// end config, do not edit, use themes!

var model = [];
var entropyModel = [];
var len, numColors;

$( document ).ready(function() {
	cnv = $('#display')[0];
	context = cnv.getContext('2d');
	//get config!
	var theme = GetURLParameter('theme');

	if(!theme) { 
		theme = 'light';
	}
	$.getScript( "themes/"+theme+".js" ).done(function( script, textStatus ) {
		distanceDetection = config.distanceDetection;
		entropyDistanceDetection = config.entropyDistanceDetection ;
		props = {
			particles: config.particles,
			entropyParticles: config.entropyParticles
		};
		blur = config.blur;
		showPoints = config.showPoints;
		showEntropyPoints = config.showEntropyPoints;
		showEntropyLines = config.showEntropyLines;
		clearCanvas = config.clearCanvas;
		lineWidth = config.lineWidth;
		entropyPower = config.entropyPower;
		maxSpeed = config.maxSpeed;
		colors = config.colors;
		randomColors = config.randomColors;;
		defaultColor = config.defaultColor;
		numColors = colors.length;
		len = props.particles;
		
		fullScreenCanvas();
		init();
	}).fail(function( jqxhr, settings, exception ) {
		alert('Incorrect theme name!');
	});

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

function pause() {
	"use strict";
	paused = true;
}

function unpause() {
	"use strict";
	paused = false;
}

function init() {
	"use strict";
	var entity;
	var mycolor;
	cnv.style.webkitFilter = "blur("+blur+"px)";
	for(var i=0; i<props.particles; i++) {
		if(randomColors) {
			mycolor = 'rgba('+colors[~~(Math.random()*numColors)]+',';
		} else {
			mycolor = defaultColor;
		}
		
		entity = {
			x: Math.floor(Math.random() * w) + 1,
			y: Math.floor(Math.random() * h) + 1,
			speedY: Math.random() * 2 * maxSpeed - maxSpeed,
			speedX: Math.random() * 2 * maxSpeed - maxSpeed,
			color: mycolor
		};

		model.push(entity);
	}

	var num = props.entropyParticles;
	while (num--) {
		generateEntropyEntity();
	}

	setInterval(function() {
		if(!paused)
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
	if(clearCanvas) {
		context.clearRect ( 0 , 0 , w, h );
	}

	///////////////////////////////////draw balls models
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

	////////////////////////////////draw entropy model
	context.fillStyle = 'red';
	var len = entropyModel.length;

	var entity;
	while(len--) {
		entity = entropyModel[len];

		if(showEntropyPoints) {
			//draw a circle
			context.beginPath();
			context.arc(entity.x, entity.y, 4, 0, Math.PI*2, true);
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


	///////////////////////////////////draw balls lines
	len = model.length;
	var len2 = len;
	var entity2, offsetY, offsetX, alpha, lineLong;
	while(len--) {
		//get entity
		entity = model[len];
		len2 = len;
		while(len2--) {
			entity2 = model[len2];
			offsetY = Math.abs(entity.y-entity2.y);
			offsetX = Math.abs(entity.x-entity2.x);

			if(offsetX <= distanceDetection && offsetY <= distanceDetection) {
				//calculate line using pitagoras
				lineLong = Math.sqrt(Math.pow(offsetX,2) + Math.pow(offsetY, 2));
				if(lineLong <= distanceDetection) {
					//draw line between two points
					alpha = (distanceDetection - lineLong) / distanceDetection;
					context.strokeStyle = entity2.color + alpha+')';
					context.beginPath();
					context.moveTo(entity.x, entity.y);
					context.lineTo(entity2.x, entity2.y);

					context.lineWidth = lineWidth - ((lineWidth*lineLong) / distanceDetection);

					context.stroke();
					context.closePath();
				}
			}
		}
	}

	/////////////////////////////////////// detect entroy range
	len = model.length;
	var entropyLen = entropyModel.length;
	var entity2;
	var deltaX, deltaY, speedAux;
	while(len--) {
		//get entity
		entity = model[len];
		len2 = entropyLen;
		while(len2--) {
			entity2 = entropyModel[len2];
			deltaX = entity.x-entity2.x;
			deltaY = entity.y-entity2.y;
			if(Math.abs(deltaX) < entropyDistanceDetection
				&& Math.abs(deltaY) < entropyDistanceDetection) {

				if (showEntropyLines) {
					//draw line between point and entropy line
					context.beginPath();
					context.strokeStyle = 'red';
					context.moveTo(entity.x, entity.y);
					context.lineTo(entity2.x, entity2.y);
					context.lineWidth = 1;
					context.stroke();
					context.closePath();
				}

				speedAux = entity.speedX + entropyPower * deltaX/Math.abs(deltaX);
				entity.speedX = speedAux > maxSpeed ? maxSpeed : speedAux;
				speedAux = entity.speedY + entropyPower * deltaY/Math.abs(deltaY);
				entity.speedY = speedAux > maxSpeed ? maxSpeed : speedAux;
			}
		}
	}
}

//misc 

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}