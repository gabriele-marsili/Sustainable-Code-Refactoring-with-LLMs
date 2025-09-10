var Matrix = function(matrix) {
	/* A 2d matrix class */
	const rows = matrix.split("\n");
	const numRows = rows.length;
	const firstRow = rows[0].split(" ");
	const numCols = firstRow.length;

	this.rows = new Array(numRows);
	for (let i = 0; i < numRows; i++) {
		const row = rows[i].split(" ");
		this.rows[i] = new Array(numCols);
		for (let j = 0; j < numCols; j++) {
			this.rows[i][j] = parseInt(row[j], 10);
		}
	}

	this.columns = new Array(numCols);
	for (let j = 0; j < numCols; j++) {
		this.columns[j] = new Array(numRows);
		for (let i = 0; i < numRows; i++) {
			this.columns[j][i] = this.rows[i][j];
		}
	}
}

export default Matrix;