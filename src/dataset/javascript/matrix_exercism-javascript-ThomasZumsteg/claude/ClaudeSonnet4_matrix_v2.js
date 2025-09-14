var Matrix = function(matrix) {
	/* A 2d matrix class */
	const splitRows = matrix.split("\n");
	const numRows = splitRows.length;
	const numCols = splitRows[0].split(" ").length;
	
	this.rows = new Array(numRows);
	this.columns = new Array(numCols);
	
	// Parse rows once and build columns simultaneously
	for (let i = 0; i < numRows; i++) {
		const rowElements = splitRows[i].split(" ");
		this.rows[i] = new Array(numCols);
		
		for (let j = 0; j < numCols; j++) {
			const value = parseInt(rowElements[j]);
			this.rows[i][j] = value;
			
			if (!this.columns[j]) {
				this.columns[j] = new Array(numRows);
			}
			this.columns[j][i] = value;
		}
	}
}

export default Matrix;