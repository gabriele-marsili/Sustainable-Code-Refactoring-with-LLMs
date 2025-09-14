var Matrix = function(matrix) {
	/* A 2d matrix class */
	const splitRows = matrix.split("\n");
	const numRows = splitRows.length;
	const rows = new Array(numRows);
	
	for (let i = 0; i < numRows; i++) {
		const rowElements = splitRows[i].split(" ");
		const numCols = rowElements.length;
		rows[i] = new Array(numCols);
		for (let j = 0; j < numCols; j++) {
			rows[i][j] = parseInt(rowElements[j], 10);
		}
	}
	
	this.rows = rows;
	
	const numCols = rows[0].length;
	const columns = new Array(numCols);
	
	for (let j = 0; j < numCols; j++) {
		columns[j] = new Array(numRows);
		for (let i = 0; i < numRows; i++) {
			columns[j][i] = rows[i][j];
		}
	}
	
	this.columns = columns;
}

export default Matrix;