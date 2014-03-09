config = {
	distanceDetection: 200, //maximum distance between two points to draw a line
	entropyDistanceDetection: 100, //maximum distance of action of the entropy generators
	particles: 120, //particles bouncing on the screen
	entropyParticles: 3, //entroy particles bouncing on the screen
	blur: 1, //blur level
	showPoints: false, //display the bouncing particles?
	showEntropyPoints: false, //display the entropy particles
	showEntropyLines: false, //display lines when a particles collides with entropy paticles
	clearCanvas: true, //clear the canvas on each tick?
	lineWidth: 8, //with of the lines
	entropyPower: 0.5, //power of the entroy repelers
	maxSpeed: 10, //maximum speed of a particle
	randomColors: true,
	defaultColor: 'rgba(255,255,255,'
};