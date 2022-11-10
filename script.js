// Use DOM selectors to get the HTML elements that we want to change
const turnElement = document.getElementById('currentTurn');
const redScoreElement = document.getElementById('scoreRed');
const blueScoreElement = document.getElementById('scoreBlue');
const yellowScoreElement = document.getElementById('scoreYellow');
const btnElement = document.getElementById('restartButton');
const canvas = document.getElementById('myCanvas');
// Get the context of the canvas element, which is used to draw on the canvas
const context = canvas.getContext('2d'); 

// Define the sizes of the shapes in our game board
const circleRadius = 15;
const canvasHeight = 700;
const canvasWidth = 700;
const paddingLength = 74;
const gridSize = 4
const distBetweenDots = 184;

// Get the positions of the last rows and columns in our game board
const yLastRow = paddingLength + ((gridSize-1)*distBetweenDots);
const xLastColumn = paddingLength + ((gridSize-1)*distBetweenDots);

// Draws a circle when given x and y coordinates, radius and color
function drawCircle(x, y, r, color) {
	context.beginPath();
	context.arc(x, y, r, 0,  2* Math.PI);
	context.fillStyle = color;
	context.fill();
}

// Draws a vertical line when given x and y coordinates of the starting point, length, thickness
//   of the line and color
function drawVerticalLine(x, y, length, thickness, color) {
	context.moveTo(x, y);
	context.lineTo(x, y+length);
	context.strokeStyle = color;
	context.lineWidth = thickness;
	context.stroke(); 
}

// Draws a horizontal line when given x and y coordinates of the starting point, length, thickness
//   of the line and color
function drawHorizontalLine(x, y, length, thickness, color) {
		context.moveTo(x, y);
		context.lineTo(x+length, y);
		context.strokeStyle = color;
		context.lineWidth = thickness;
		context.stroke(); 
}

// Draws a square when given the coordinates of the top left corner and color
function drawSquare(x, y, color) {
	context.globalAlpha = 0.5;
	context.fillStyle = color;
	context.fillRect(paddingLength+(x*distBetweenDots)+10,paddingLength+(y*distBetweenDots)+10,
		distBetweenDots-20,distBetweenDots-20);
	context.globalAlpha = 1;
}

// Populates the game board a 4x4 grid of dots
function drawDots(paddingLength, canvasWidth, canvasHeight, distBetweenDots, circleRadius) {
	for (let i = paddingLength; i < canvasWidth; i+=distBetweenDots) {
		for (let j = paddingLength; j < canvasHeight; j+=distBetweenDots) {
			drawCircle(i, j, circleRadius, 'black');
		}
	}
}

// Draws black vertical lines between the dots in the game board
function drawVerticalLines(paddingLength, canvasWidth, yLastRow, distBetweenDots) {
	for (let x = paddingLength; x < canvasWidth; x += distBetweenDots) {
		for (let y = paddingLength; y < yLastRow; y += distBetweenDots) {
			drawVerticalLine(x, y, distBetweenDots, 1, 'black');
		}
	}
}

// Draws black horizontal lines between the dots in the game board
function drawHorizontalLines(paddingLength, canvasWidth, xLastColumn, distBetweenDots) {
	for (let x = paddingLength; x < xLastColumn; x += distBetweenDots) {
		for (let y = paddingLength; y < canvasHeight; y += distBetweenDots) {
			drawHorizontalLine(x, y, distBetweenDots, 1, 'black');
		}
	}
}

// This function was borrowed from stackoverflow
// https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y];
}

// Set up the game board
drawVerticalLines(paddingLength, canvasWidth, yLastRow, distBetweenDots);
drawHorizontalLines(paddingLength, canvasWidth, xLastColumn, distBetweenDots);
drawDots(paddingLength, canvasWidth, canvasHeight, distBetweenDots, circleRadius);

// Define two objects that hold the coordinates of the line a that a player creates in a turn
const firstDot = {
	x: null,
	y: null
};
const secondDot = {
	x: null,
	y: null
};

// Define variables to hold the current turn, the colors of the three players and the score
let curTurn = 0;  // 0 - first player, 1 = second player, 2 = 3rd player
let turnColors = ['red', 'blue', 'yellow'];
let scores = [0, 0, 0];

// Create an object that keeps track of which lines have been drawn by the players
const lines = {};

// Fill lines object with info about horizontal lines
for (var i = 0; i <= 2; i++) {
	for (var j = 0; j <= 3; j++) {
		lines[[i, j, (i+1), j]] = 0;
		lines[[(i+1), j, i, j]] = 0;
	}
}
// Fill lines object with info about vertical lines
for (var i = 0; i <= 3; i++) {
	for (var j = 0; j <= 2; j++) {
		lines[[i, j, i, j+1]] = 0;
		lines[[i, j+1, i, j]] = 0;
	}
}

// This function determines what message to display when the game is over
function determineWinner() {
	let winners = [];
	let highestValue = Math.max(...scores);
	for (let i = 0; i < scores.length; i++) {
		if (scores[i] == highestValue) {
			winners.push(turnColors[i]);
		}
	}
	let winningMessage = '';
	if (winners.length == 1) {
		winningMessage = `The winner is ${winners[0]}!`;
	} else if (winners.length == 2) {
		winningMessage = `It's a tie between ${winners[0]} and ${winners[1]}!`;
	} else {
		winningMessage = `It's a tie between ${winners[0]}, ${winners[1]} and ${winners[2]}!`;
	}

	let scoreMessage = `Scores:\nRed: ${scores[0]}\nBlue: ${scores[1]}\nYellow: ${scores[2]}`;
	return winningMessage + '\n\n' + scoreMessage; 
}

// This function recieves the coordinates of the first dot a player clicks in a turn, and 
//    determines if this is a valid first dot
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
			return false;
		}
	}
}

// This function recieves the coordinates of the first dot a player clicks in a turn, and 
//    determines if this is a valid second dot
function validSecondDot(x1, y1, x2, y2) {
	if (lines[[x1, y1, x2, y2]] === 0) return true;
	else return false;
}

// If a player makes a horizontal line, this function determines if a square was made above or
//	  below this line
function detectSquareHorizontal(x1, y1, x2, y2, color) {
	// Make sure point 1 always comes before point 2
	if (x1 > x2) {
		let temp = x1;
		x1 = x2;
		x2 = temp;
	}
	let squareDetected = false;
	// Detect top square
	if (y1 > 0) {
		let topLine = [x1, y1-1, x2, y2-1];
		let leftLine = [x1, y1-1, x1, y1];
		let rightLine = [x2, y2-1, x2, y2];
		if ((lines[topLine] === 1) && (lines[leftLine] === 1) && (lines[rightLine] == 1)) {
			drawSquare(x1, y1-1, color);
			squareDetected = true;
			scores[curTurn] += 1;
		}
	}
	// Detect Bottom square
	if (y1 < 3) {
		let bottomLine = [x1, y1+1, x2, y2+1];
		let leftLine = [x1, y1, x1, y1+1];
		let rightLine = [x2, y2, x2, y2+1];
		if ((lines[bottomLine] === 1) && (lines[leftLine] === 1) && (lines[rightLine] == 1)) {
			drawSquare(x1, y1, color);
			squareDetected = true;
			scores[curTurn] += 1;
		}
	}
	return squareDetected
}

// If a player makes a vertical line, this function determines if a square was made to the
//	  left of right of this line
function detectSquareVertical(x1, y1, x2, y2, color) {
	// Make sure point1 always comes before point 2
	if (y1 > y2) {
		let temp = y1;
		y1 = y2;
		y2 = temp;
	}
	let squareDetected = false;
	// Detect left square
	if (x1 > 0) {
		let leftLine =[x1-1, y1, x2-1, y2];
		let topLine = [x1-1, y1, x1, y1];
		let bottomLine = [x2-1, y2, x2, y2];
		if ((lines[leftLine] == 1) && (lines[topLine] === 1) && (lines[bottomLine] === 1)) {
			drawSquare(x1-1, y1, color);
			squareDetected = true;
			scores[curTurn] += 1;
		}
	}
	// Detect right square
	if (x1 < 3) {
		let rightLine =[x1+1, y1, x2+1, y2];
		let topLine = [x1, y1, x1+1, y1];
		let bottomLine = [x2, y2, x2+1, y2];
		if ((lines[rightLine] == 1) && (lines[topLine] === 1) && (lines[bottomLine] === 1)) {
			drawSquare(x1, y1, color)
			squareDetected = true;
			scores[curTurn] += 1;
		}
	}
	return squareDetected;
}

// This functions listens and reacts for when the user clicks on a second dot
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
				 && (Math.abs(firstDot.x-i)+Math.abs(firstDot.y-j) === distBetweenDots)) {
				// Once the clicked dot has been identified, and it is verified to be besides 
			    //    the first dot, set it to be the second dot
				secondDot.x = i;
				secondDot.y = j;					
				// Stop listening for the second dot, since we already have it
				canvas.removeEventListener('mousedown', getSecondDotClicked);
				// Create a line between the two selected dots
				drawCircle(-5, -5, 1, 'white');  // prevents glitch
				if (firstDot.x === secondDot.x) drawVerticalLine(firstDot.x, Math.min(firstDot.y, secondDot.y)+circleRadius, distBetweenDots-(2*circleRadius), 5, turnColors[curTurn]);
				else drawHorizontalLine(Math.min(firstDot.x, secondDot.x)+circleRadius, firstDot.y, distBetweenDots-(2*circleRadius), 5, turnColors[curTurn]);					
				drawCircle(firstDot.x, firstDot.y, circleRadius, 'black'); // color dot back to black
				// Update lines object
				lines[[x1, y1, x2, y2]] = 1;
				lines[[x2, y2, x1, y1]] = 1;
				// Check whether any square were made by the line drawn		
				let squareDetected = false;
				if (y1 === y2) squareDetected = detectSquareHorizontal(x1,y1,x2,y2, turnColors[curTurn]);
				else squareDetected = detectSquareVertical(x1,y1,x2,y2, turnColors[curTurn]);
				// If a square (or two squares) was made in this turn, give the player an extra turn
				// Else if no squares were made in this turn, give the next player the next turn
				if (!squareDetected) {
					curTurn = (curTurn+1)%3;
				}
				// Change the current player and score that is being displayed
				turnElement.innerHTML = turnColors[curTurn];
				turnElement.className = turnColors[curTurn];
				redScoreElement.innerHTML = scores[0];
				blueScoreElement.innerHTML = scores[1];
				yellowScoreElement.innerHTML = scores[2];
				// While game is not won, loop again, let the next player do their turn
				if (scores.reduce((a,b)=>a+b) < 9) {
					canvas.addEventListener('mousedown', getFirstDotClicked);
				} else {
					setTimeout(function(){ alert(determineWinner()); }, 500);
					
				}

			}
		}
	}
	// If at this point, it must mean that user didn't click on a circle, so remove first dot clicked
	drawCircle(firstDot.x, firstDot.y, circleRadius, 'black');
	firstDot.x = null;
	secondDot.x = null;

	canvas.removeEventListener('mousedown', getSecondDotClicked);
	canvas.addEventListener('mousedown', getFirstDotClicked);
}

// This function listens and reacts to when a user clicks on the first dot in a turn
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
				drawCircle(i, j, circleRadius, turnColors[curTurn]); 
				firstDot.x = i;
				firstDot.y = j;
				// Stop listening for the first dot, and start to listen for the second dot
				canvas.removeEventListener('mousedown', getFirstDotClicked);
				canvas.addEventListener('mousedown', getSecondDotClicked);					
			}
		}
	}
}

// At the start of the game, display the current player and score
turnElement.innerHTML = turnColors[curTurn];
turnElement.className = turnColors[curTurn];

redScoreElement.innerHTML = scores[0];
blueScoreElement.innerHTML = scores[1];
yellowScoreElement.innerHTML = scores[2];

// Start to listen for the first dot selected by the player
canvas.addEventListener('mousedown', getFirstDotClicked);

// Make sure when the player clicks on the reset button, the state of the game is reset
btnElement.addEventListener('click', function() {
	canvas.removeEventListener('mousedown', getSecondDotClicked);
	canvas.removeEventListener('mousedown', getFirstDotClicked);
	// Reset the two points, scores, lines
	firstDot.x = 0;
	firstDot.y = 0;
	secondDot.x = 0;
	secondDot.y = 0;

	curTurn = 0;  
	scores = [0, 0, 0];

	for (key in lines) {
		lines[key] = 0;
	}

	// Clear the canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawVerticalLines(paddingLength, canvasWidth, yLastRow, distBetweenDots);
	drawHorizontalLines(paddingLength, canvasWidth, xLastColumn, distBetweenDots);
	drawDots(paddingLength, canvasWidth, canvasHeight, distBetweenDots, circleRadius);

	turnElement.innerHTML = turnColors[curTurn];
	turnElement.className = turnColors[curTurn];

	redScoreElement.innerHTML = scores[0];
	blueScoreElement.innerHTML = scores[1];
	yellowScoreElement.innerHTML = scores[2];
	
	canvas.addEventListener('mousedown', getFirstDotClicked);

});



