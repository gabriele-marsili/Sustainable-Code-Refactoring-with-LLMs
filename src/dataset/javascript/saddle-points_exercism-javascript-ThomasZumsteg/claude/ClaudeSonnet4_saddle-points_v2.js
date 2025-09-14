var Matrix = function(matrix) {
	/* Two dimensional matrix class */
	const lines = matrix.split("\n");
	this.rows = new Array(lines.length);
	
	for (let i = 0; i < lines.length; i++) {
		const elements = lines[i].trim().split(' ');
		this.rows[i] = new Array(elements.length);
		for (let j = 0; j < elements.length; j++) {
			this.rows[i][j] = parseInt(elements[j]);
		}
	}

	const numCols = this.rows[0].length;
	this.columns = new Array(numCols);
	for (let col = 0; col < numCols; col++) {
		this.columns[col] = new Array(this.rows.length);
		for (let row = 0; row < this.rows.length; row++) {
			this.columns[col][row] = this.rows[row][col];
		}
	}
	
	this.saddlePoints = saddlePoints(this);
}

function saddlePoints(matrix) {
	/* Finds saddle points in a matrix */
	const numRows = matrix.rows.length;
	const numCols = matrix.columns.length;
	
	const row_max = new Array(numRows);
	for (let i = 0; i < numRows; i++) {
		let max = matrix.rows[i][0];
		for (let j = 1; j < matrix.rows[i].length; j++) {
			if (matrix.rows[i][j] > max) {
				max = matrix.rows[i][j];
			}
		}
		row_max[i] = max;
	}
	
	const column_min = new Array(numCols);
	for (let i = 0; i < numCols; i++) {
		let min = matrix.columns[i][0];
		for (let j = 1; j < matrix.columns[i].length; j++) {
			if (matrix.columns[i][j] < min) {
				min = matrix.columns[i][j];
			}
		}
		column_min[i] = min;
	}
	
	const saddlePoints = [];
	for (let r = 0; r < numRows; r++) {
		for (let c = 0; c < matrix.rows[r].length; c++) {
			const element = matrix.rows[r][c];
			if (element === row_max[r] && element === column_min[c]) {
				saddlePoints.push([r, c]);
			}
		}
	}
	
	return saddlePoints;
}

export default Matrix;