var Matrix = function(matrix) {
	const lines = matrix.split("\n");
	const numRows = lines.length;
	
	this.rows = new Array(numRows);
	let numCols = 0;
	
	for (let i = 0; i < numRows; i++) {
		const row = lines[i].trim().split(' ');
		const rowLength = row.length;
		this.rows[i] = new Array(rowLength);
		
		for (let j = 0; j < rowLength; j++) {
			this.rows[i][j] = parseInt(row[j], 10);
		}
		
		if (i === 0) numCols = rowLength;
	}

	this.columns = new Array(numCols);
	for (let col = 0; col < numCols; col++) {
		this.columns[col] = new Array(numRows);
		for (let row = 0; row < numRows; row++) {
			this.columns[col][row] = this.rows[row][col];
		}
	}
	
	this.saddlePoints = saddlePoints(this);
}

function saddlePoints(matrix) {
	const numRows = matrix.rows.length;
	const numCols = matrix.columns.length;
	
	const row_max = new Array(numRows);
	for (let i = 0; i < numRows; i++) {
		const row = matrix.rows[i];
		let max = row[0];
		for (let j = 1; j < row.length; j++) {
			if (row[j] > max) max = row[j];
		}
		row_max[i] = max;
	}
	
	const column_min = new Array(numCols);
	for (let i = 0; i < numCols; i++) {
		const column = matrix.columns[i];
		let min = column[0];
		for (let j = 1; j < column.length; j++) {
			if (column[j] < min) min = column[j];
		}
		column_min[i] = min;
	}
	
	const saddlePoints = [];
	for (let r = 0; r < numRows; r++) {
		const row = matrix.rows[r];
		const maxVal = row_max[r];
		for (let c = 0; c < row.length; c++) {
			if (row[c] === maxVal && row[c] === column_min[c]) {
				saddlePoints.push([r, c]);
			}
		}
	}
	
	return saddlePoints;
}

export default Matrix;