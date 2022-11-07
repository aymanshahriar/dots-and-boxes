// Develop a function that takes a dot and decides if this is valid to select this as first dot

// Develop a function that takes a first dot, second dot and decides if this is valid to select as second dot

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



function validFirstDot(firstDot) {
	if (firstDot.x === 0) {
		return true;
	}
	else {
		arrX = (firstDot.x-paddingLength)/distBetweenDots;
		arrY = (firstDot.y-paddingLength)/distBetweenDots;
		// Check if the left dot is unmarked
		if ((arrX > 0) && (lines[arrX, arrY, arrX-1, arrY] === 0)) return true;
		// Check if right dot is unmarked
		else if ((arrX <= 2) && (lines[arrX, arrY, arrX+1, arrY] === 0)) return true;
		// Check if top dot is unmarked
		else if ((arrY > 0) && (lines[arrX, arrY, arrX, arrY-1] === 0)) return true;
		// Check if bottom dot is unmarked
		else if ((arrY <= 2) && (lines[arrX, arrY, arrX, arrY+1] === 0)) return true;
		else return false
	}

}

function validSecondDot(secondDot) {
	if (lines[firstDot.x, firstDot.y, secondDot.x, secondDot.y] === 0) return true;
	else return false;
}

/*
function validFirstDot(firstDot) {
	if (firstDot.x === 0) {
		return true;
	}
	else {
		arrX = (firstDot.x-paddingLength)/distBetweenDots;
		arrY = (firstDot.y-paddingLength)/distBetweenDots;
		// Check if the left dot is unmarked
		if ((arrX > 0) && (dotArr[arrY][arrX-1] === 0)) return true;
		// Check if right dot is unmarked
		else if ((arrX < len(dotArr)-1) && (dotArr[arrY][arrX+1]) === 0) return true;
		// Check if top dot is unmarked
		else if ((arrY > 0) && (dotArr[arrY-1][arrX]) === 0) return true;
		// Check if bottom dot is unmarked
		else if ((arrY < len(dotArr)-1) && (dotArr[arrY+1][arrX]) === 0) return true;
		else return false
	}

}*/

