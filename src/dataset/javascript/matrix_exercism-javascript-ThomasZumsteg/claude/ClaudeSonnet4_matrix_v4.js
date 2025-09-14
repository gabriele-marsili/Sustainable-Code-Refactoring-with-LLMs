var Matrix = function(matrix) {
	const rows = matrix.split("\n");
	const numCols = rows[0].split(" ").length;
	
	this.rows = new Array(rows.length);
	this.columns = new Array(numCols);
	
	for (let i = 0; i < rows.length; i++) {
		const rowElements = rows[i].split(" ");
		this.rows[i] = new Array(numCols);
		for (let j = 0; j < numCols; j++) {
			this.rows[i][j] = parseInt(rowElements[j], 10);
		}
	}
	
	for (let j = 0; j < numCols; j++) {
		this.columns[j] = new Array(rows.length);
		for (let i = 0; i < rows.length; i++) {
			this.columns[j][i] = this.rows[i][j];
		}
	}
};

export default Matrix;