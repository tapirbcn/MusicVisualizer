var red = 87, green = 40, blue = 25;
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");
var size = canvas.width = canvas.height = 600;
var imageData = ctx.createImageData(canvas.width, canvas.height);
var pos = 0;
var dataArray = imageData.data;

var count, s, a, b, t;
for (y = canvas.height; y--;) {
	for (x = 0; x++ < canvas.width;) {
		count = s = a = b = 0;
		while (count++ < size && a * a + b * b < 5) {
			t = a * a - b * b;
			b = 2 * a * b + y * 4 / size - 2;
			a = t + x * 4 / size - 2
		}
		dataArray[pos++] = (size - count) * red % 256;
		dataArray[pos++] = (size - count) * green % 256;
		dataArray[pos++] = (size - count) * blue % 256;
		dataArray[pos++] = 255;
	}
}
ctx.putImageData(imageData, 0, 0);
