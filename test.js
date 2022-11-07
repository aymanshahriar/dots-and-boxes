// given a line (two points), determine if vertical or horizontal line
// if horizontal line, check if square was made above or below
// if vertical line, check if square was made left of right

function vertOrHor(x1, y1, x2, y2) {
	if (y1 === y2) return 'horizontal';
	else return 'vertical';
	
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

		if ((lines[topLine] === 1) || (lines[leftLine] === 1) || (linesr[ightLine] == 1)) {
			console.log('*******Square********');
		}
	}
	// Detect Bottom square
	if (y1 < 3) {
		let bottomLine = [x1, y1+1, x2, y2+1];
		let leftLine = [x1, y1, x1, y1+1];
		let rightLine = [x2, y2, x2, y2+1];
		if ((lines[topLine] === 1) || (lines[leftLine] === 1) || (lines[rightLine] == 1)) {
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
		if ((lines[rightLine] == 1) || (lines[topLine] === 1) || (lines[bottomLine] === 1) || ) {
			console.log('*******Square********');
		}
	}
	// Detect right square
	if (x1 > 0) {
		let leftLine =[x1+1, y1, x2+1, y2];
		let topLine = [x1, y1, x1+1, y1];
		let bottomLine = [x2, y2, x2+1, y2];
		if ((lines[leftLine] == 1) || (lines[topLine] === 1) || (lines[bottomLine] === 1) || ) {
			console.log('*******Square********');
		}
	}
}














