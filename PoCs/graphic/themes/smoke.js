config = {
	distanceDetection: 300, //maximum distance between two points to draw a line
	entropyDistanceDetection: 100, //maximum distance of action of the entropy generators
	particles: 100, //particles bouncing on the screen
	entropyParticles: 3, //entroy particles bouncing on the screen
	blur: 6, //blur level
	showPoints: false, //display the bouncing particles?
	showEntropyPoints: false, //display the entropy particles
	showEntropyLines: false, //display lines when a particles collides with entropy paticles
	clearCanvas: true, //clear the canvas on each tick?
	lineWidth: 10, //with of the lines
	entropyPower: 0.5, //power of the entroy repelers
	maxSpeed: 10, //maximum speed of a particle
	colors: ['255,255,255', '73,251,53', '255,120,0', '251,132,53',
			'251,53,172', '132,53,251', '251,231,53', '251,53,73'],
	randomColors: false,
	defaultColor: 'rgba(255,255,255,'
};