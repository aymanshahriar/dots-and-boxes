// Use a DOM selector method to get the canvas element
const canvas = document.getElementById('myCanvas');
// Get the context of the canvas element, which is used to draw on the canvas
const context = canvas.getContext('2d'); 

const circleRadius = 15;
const canvasHeight = 700;
const canvasWidth = 700;
const paddingLength = 74;
const gridSize = 4
const distBetweenDots = 184;

const yLastRow = paddingLength + ((gridSize-1)*distBetweenDots);
const xLastColumn = paddingLength + ((gridSize-1)*distBetweenDots);

function drawCircle(x, y, r, color) {
	/*context.strokeStyle = "black";
	context.lineWidth = 1;*/

	context.beginPath();
	context.arc(x, y, r, 0,  2* Math.PI);
	context.fillStyle = color;
	context.fill();
	context.stroke;
}

function drawHorizontalLine(x, y, length, thickness, color) {
		context.moveTo(x, y);
		context.lineTo(x+length, y);
		context.strokeStyle = color;
		context.lineWidth = thickness;
		context.stroke(); 
}

drawCircle(paddingLength, paddingLength, circleRadius, 'black');

drawCircle(paddingLength+distBetweenDots, paddingLength, circleRadius, 'black');

drawCircle(-5, -5, 1, 'white');

drawHorizontalLine(paddingLength+circleRadius, paddingLength, distBetweenDots-(2*circleRadius), 5, 'blue');











