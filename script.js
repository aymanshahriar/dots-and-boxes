

// Draw a circle on the canvas
// function used to draw a circle:
// arc(x_position, y_position, radius, angle_start_angle end)
/*context.beginPath();
context.arc(60, 60, 10, 0,  2* Math.PI);
context.fillStyle = 'red'
context.fill();
context.stroke();*/


function drawCircle(x, y, r, context, color) {
	context.strokeStyle = "black";
	context.lineWidth = 1;

	context.beginPath();
	context.arc(x, y, r, 0,  2* Math.PI);
	context.fillStyle = color;
	context.fill();
	context.stroke();
}

function drawVerticalLine(x, y, length, context, thickness, color) {

	context.moveTo(x, y);
	context.lineTo(x, y+length);
	context.strokeStyle = color;
	context.lineWidth = thickness;
	context.stroke(); 
}

function drawHorizontalLine(x, y, length, context, thickness, color) {
		context.moveTo(x, y);
		context.lineTo(x+length, y);
		context.strokeStyle = color;
		context.lineWidth = thickness;
		context.stroke(); 
}

function drawDots(context, paddingLength, canvasWidth, canvasHeight, distBetweenDots, circleRadius) {
	for (let i = paddingLength; i < canvasWidth; i+=distBetweenDots) {
		for (let j = paddingLength; j < canvasHeight; j+=distBetweenDots) {
			drawCircle(i, j, circleRadius, context, 'red');
		}
	}
}

function drawVerticalLines(context, paddingLength, canvasWidth, yLastRow, distBetweenDots) {
	for (let x = paddingLength; x < canvasWidth; x += distBetweenDots) {
		for (let y = paddingLength; y < yLastRow; y += distBetweenDots) {
			drawVerticalLine(x, y, distBetweenDots, context, 1, 'black');
		}
	}
}

function drawHorizontalLines(context, paddingLength, canvasWidth, xLastColumn, distBetweenDots) {
	for (let x = paddingLength; x < xLastColumn; x += distBetweenDots) {
		for (let y = paddingLength; y < canvasHeight; y += distBetweenDots) {
			drawHorizontalLine(x, y, distBetweenDots, context, 1, 'black');
		}
	}
}

///////// If a user clicks on a dot, it turns red ////////////////////////

// Get cursor position was borrowed from stackoverflow
// https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    //console.log("x: " + x + " y: " + y);
    return [x, y];
}
// see if I can disable event


/*function getFirstDotClicked(canvas, context, circleRadius, firstDot) {

	
	canvas.addEventListener('mousedown', function(e) {
		let mousePos = getCursorPosition(canvas, e);
    	const x = mousePos[0];
    	const y = mousePos[1];
   		let dist = 0;
			
		for (let i = 74; i < 700; i+=184) {
			for (let j = 74; j < 700; j+=184) {
				dist = ((x-i)**2 + (y-j)**2)**0.5;
				if (dist <= circleRadius) {
					drawCircle(i, j, circleRadius, context, 'green');
					console.log(i, j);
					firstDot.x = i;
					firstDot.y = j;
					canvas.removeEventListener('mousedown');
				}
			}
		}
	});
}*/



//getFirstDotClicked();


/*canvas.addEventListener('mousedown', function(e) {
    let mousePos = getCursorPosition(canvas, e);
    const x = mousePos[0];
    const y = mousePos[1];
   	let dist = 0;

   	// Check if the clicked point is inside a circle
   	// To know if a point is inside a circle, check if the distance between the mouse point and 
   	//    centre point of the circle is <= radius
   	for (let i = 74; i < 700; i+=184) {
		for (let j = 74; j < 700; j+=184) {
			dist = ((x-i)**2 + (y-j)**2)**0.5;
			if (dist <= circleRadius) {
				context.beginPath();
				context.arc(i, j, circleRadius, 0,  2* Math.PI);
				context.fillStyle = 'green';
				context.fill();
				context.stroke();
			}
		}
	}
    
});
*/
/*canvas.addEventListener('mousemove', function(e) {
    getCursorPosition(canvas, e)
})*/


////////////////////////////////////////////////////////////////////////////////////////////////////////
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

drawVerticalLines(context, paddingLength, canvasWidth, yLastRow, distBetweenDots);
drawHorizontalLines(context, paddingLength, canvasWidth, xLastColumn, distBetweenDots);
drawDots(context, paddingLength, canvasWidth, canvasHeight, distBetweenDots, circleRadius);


const firstDot = {
	x: null,
	y: null
};
const secondDot = {
	x: null,
	y: null
};

function getSecondDotClicked(e) {
		let mousePos = getCursorPosition(canvas, e);
    	const x = mousePos[0];
    	const y = mousePos[1];
   		let dist = 0;
		
		// Use a double loop to check which dot has been clicked
		// Also check if this dot is beside the first dot
		for (let i = 74; i < 700; i+=184) {
			for (let j = 74; j < 700; j+=184) {
				dist = ((x-i)**2 + (y-j)**2)**0.5;
				if ((dist <= circleRadius) && (Math.abs(firstDot.x-i)+Math.abs(firstDot.y-j) === 184)) {
					// Once the clicked dot has been identified, and it is 
					// verified to be besides the first dot, turn it green
					drawCircle(i, j, circleRadius, context, 'green');
					secondDot.x = i;
					secondDot.y = j;
					canvas.removeEventListener('mousedown', getSecondDotClicked);
					// Create a line between the two dots
					if (firstDot.x === secondDot.x) {
						// Draw vertical line
						drawVerticalLine(firstDot.x, Math.min(firstDot.y, secondDot.y), 184, context, 5, 'blue');

					} 
				}
			}
		}
}

function getFirstDotClicked(e) {
	let mousePos = getCursorPosition(canvas, e);
    	const x = mousePos[0];
    	const y = mousePos[1];
   		let dist = 0;
		
		// Use a double loop to check which dot has been clicked
		for (let i = 74; i < 700; i+=184) {
			for (let j = 74; j < 700; j+=184) {
				dist = ((x-i)**2 + (y-j)**2)**0.5;
				if (dist <= circleRadius) {
					// Once the clicked dot has been identified, turn it green
					drawCircle(i, j, circleRadius, context, 'green');
					firstDot.x = i;
					firstDot.y = j;
					canvas.removeEventListener('mousedown', getFirstDotClicked);
					canvas.addEventListener('mousedown', getSecondDotClicked);
				}
			}
		}
}


	
canvas.addEventListener('mousedown', getFirstDotClicked);






