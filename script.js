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
	context.strokeStyle = "black";
	context.lineWidth = 1;

	context.beginPath();
	context.arc(x, y, r, 0,  2* Math.PI);
	context.fillStyle = color;
	context.fill();
	context.stroke();
}

function drawVerticalLine(x, y, length, thickness, color) {

	context.moveTo(x, y);
	context.lineTo(x, y+length);
	context.strokeStyle = color;
	context.lineWidth = thickness;
	context.stroke(); 
}

function drawHorizontalLine(x, y, length, thickness, color) {
		context.moveTo(x, y);
		context.lineTo(x+length, y);
		context.strokeStyle = color;
		context.lineWidth = thickness;
		context.stroke(); 
}

function drawDots(paddingLength, canvasWidth, canvasHeight, distBetweenDots, circleRadius) {
	for (let i = paddingLength; i < canvasWidth; i+=distBetweenDots) {
		for (let j = paddingLength; j < canvasHeight; j+=distBetweenDots) {
			drawCircle(i, j, circleRadius, 'red');
		}
	}
}

function drawVerticalLines(paddingLength, canvasWidth, yLastRow, distBetweenDots) {
	for (let x = paddingLength; x < canvasWidth; x += distBetweenDots) {
		for (let y = paddingLength; y < yLastRow; y += distBetweenDots) {
			drawVerticalLine(x, y, distBetweenDots, 1, 'black');
		}
	}
}

function drawHorizontalLines(paddingLength, canvasWidth, xLastColumn, distBetweenDots) {
	for (let x = paddingLength; x < xLastColumn; x += distBetweenDots) {
		for (let y = paddingLength; y < canvasHeight; y += distBetweenDots) {
			drawHorizontalLine(x, y, distBetweenDots, 1, 'black');
		}
	}
}

// Get cursor position was borrowed from stackoverflow
// https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    //console.log("x: " + x + " y: " + y);
    return [x, y];
}


////////////////////////////////////////////////////////////////////////////////////////////////////////



drawVerticalLines(paddingLength, canvasWidth, yLastRow, distBetweenDots);
drawHorizontalLines(paddingLength, canvasWidth, xLastColumn, distBetweenDots);
drawDots(paddingLength, canvasWidth, canvasHeight, distBetweenDots, circleRadius);


const firstDot = {
	x: null,
	y: null
};
const secondDot = {
	x: null,
	y: null
};

let gameWon = false;

const lines = {};

// Fill object with info about horizontal lines
for (var i = 0; i <= 2; i++) {
	for (var j = 0; j <= 3; j++) {
		lines[[i, j, (i+1), j]] = 0;
		lines[[(i+1), j, i, j]] = 0;
	}
}
// Fill object with info about vertical lines
for (var i = 0; i <= 3; i++) {
	for (var j = 0; j <= 2; j++) {
		lines[[i, j, i, j+1]] = 0;
		lines[[i, j+1, i, j]] = 0;
	}
}

function validFirstDot(x, y) {
	if (firstDot.x === 0) {
		return true;
	}
	else {
		
		// Check if the left dot is unmarked
		if ((x > 0) && (lines[[x, y, x-1, y]] === 0)) return true;
		// Check if right dot is unmarked
		else if ((x <= 2) && (lines[[x, y, x+1, y]] === 0)) return true;
		// Check if top dot is unmarked
		else if ((y > 0) && (lines[[x, y, x, y-1]] === 0)) return true;
		// Check if bottom dot is unmarked
		else if ((y <= 2) && (lines[[x, y, x, y+1]] === 0)) return true;
		else {
			console.log('reached here');
			return false;
		}
	}
}

function validSecondDot(x1, y1, x2, y2) {
	if (lines[[x1, y1, x2, y2]] === 0) return true;
	else return false;
}

function detectSquareHorizontal(x1, y1, x2, y2) {
	// Make sure point 1 always comes before point 2
	if (x1 > x2) {
		let temp = x1;
		x1 = x2;
		x2 = temp;
	}
	// Detect top square
	if (y1 > 0) {
		let topLine = [x1, y1-1, x2, y2-1];
		let leftLine = [x1, y1-1, x1, y1];
		let rightLine = [x2, y2-1, x2, y2];
		if ((lines[topLine] === 1) && (lines[leftLine] === 1) && (lines[rightLine] == 1)) {
			console.log('*******Square********');
		}
	}
	// Detect Bottom square
	if (y1 < 3) {
		let bottomLine = [x1, y1+1, x2, y2+1];
		let leftLine = [x1, y1, x1, y1+1];
		let rightLine = [x2, y2, x2, y2+1];
		if ((lines[bottomLine] === 1) && (lines[leftLine] === 1) && (lines[rightLine] == 1)) {
			console.log('*******Square********');
		}
	}
}

function detectSquareVertical(x1, y1, x2, y2) {
	// Make sure point1 always comes before point 2
	if (y1 > y2) {
		let temp = y1;
		y1 = y2;
		y2 = temp;
	}
	// Detect left square
	if (x1 > 0) {
		let rightLine =[x1-1, y1, x2-1, y2];
		let topLine = [x1-1, y1, x1, y1];
		let bottomLine = [x2-1, y2, x2, y2];
		if ((lines[rightLine] == 1) && (lines[topLine] === 1) && (lines[bottomLine] === 1)) {
			console.log('*******Square********');
		}
	}
	// Detect right square
	if (x1 > 0) {
		let leftLine =[x1+1, y1, x2+1, y2];
		let topLine = [x1, y1, x1+1, y1];
		let bottomLine = [x2, y2, x2+1, y2];
		if ((lines[leftLine] == 1) && (lines[topLine] === 1) && (lines[bottomLine] === 1)) {
			console.log('*******Square********');
		}
	}
}


function getSecondDotClicked(event) {
		let mousePos = getCursorPosition(event);
    	const x = mousePos[0];
    	const y = mousePos[1];
   		let dist = 0;
		
		// Use a double loop to check which dot has been clicked
		// Also check if this dot is beside the first dot
		for (let i = paddingLength; i < canvasWidth; i+=distBetweenDots) {
			for (let j = paddingLength; j < canvasHeight; j+=distBetweenDots) {
				dist = ((x-i)**2 + (y-j)**2)**0.5;
				let x1 = (firstDot.x-paddingLength)/distBetweenDots;
				let y1 = (firstDot.y-paddingLength)/distBetweenDots;
				let x2 = (i-paddingLength)/distBetweenDots;
				let y2 = (j-paddingLength)/distBetweenDots;
				if ((dist <= circleRadius+10) && validSecondDot(x1, y1, x2, y2)
				  && (Math.abs(firstDot.x-i)+Math.abs(firstDot.y-j) === 184)) {
					// Once the clicked dot has been identified, and it is 
					// verified to be besides the first dot, turn it green
					drawCircle(i, j, circleRadius, 'green');
					secondDot.x = i;
					secondDot.y = j;					

					canvas.removeEventListener('mousedown', getSecondDotClicked);
					// Create a line between the two dots
					if (firstDot.x === secondDot.x) drawVerticalLine(firstDot.x, Math.min(firstDot.y, secondDot.y), 184, 5, 'blue');
					else drawHorizontalLine(Math.min(firstDot.x, secondDot.x), firstDot.y, 184, 5, 'blue');					
					// Update lines object
					lines[[x1, y1, x2, y2]] = 1;
					lines[[x2, y2, x1, y1]] = 1;
					console.log('line drawn');

					if (y1 === y2) detectSquareHorizontal(x1,y1,x2,y2);
					else detectSquareVertical(x1,y1,x2,y2);

					// While game is not won, loop again
					if (!gameWon) {
						canvas.addEventListener('mousedown', getFirstDotClicked);
					}

					
				}
			}
		}
}

function getFirstDotClicked(event) {
	let mousePos = getCursorPosition(event);
    	const x = mousePos[0];
    	const y = mousePos[1];
   		let dist = 0;
		
		// Use a double loop to check which dot has been clicked
		for (let i = paddingLength; i < canvasWidth; i+=distBetweenDots) {
			for (let j = paddingLength; j < canvasHeight; j+=distBetweenDots) {
				let dist = ((x-i)**2 + (y-j)**2)**0.5;
				let y1 = (j-paddingLength)/distBetweenDots;
				let x1 = (i-paddingLength)/distBetweenDots;
				if ((dist <= circleRadius+10) && validFirstDot(x1, y1)){
					// Once the clicked dot has been identified, turn it green
					drawCircle(i, j, circleRadius, 'green'); 
					firstDot.x = i;
					firstDot.y = j;
					
					canvas.removeEventListener('mousedown', getFirstDotClicked);
					canvas.addEventListener('mousedown', getSecondDotClicked);

					
					
				}
			}
		}
}


	
canvas.addEventListener('mousedown', getFirstDotClicked);






