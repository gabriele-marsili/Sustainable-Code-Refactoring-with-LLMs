var Matrix = function(matrix) {
	const lines = matrix.split("\n");
	const numRows = lines.length;
	const numCols = lines[0].split(" ").length;
	
	this.rows = new Array(numRows);
	for (let i = 0; i < numRows; i++) {
		const elements = lines[i].split(" ");
		this.rows[i] = new Array(numCols);
		for (let j = 0; j < numCols; j++) {
			this.rows[i][j] = parseInt(elements[j], 10);
		}
	}

	this.columns = new Array(numCols);
	for (let j = 0; j < numCols; j++) {
		this.columns[j] = new Array(numRows);
		for (let i = 0; i < numRows; i++) {
			this.columns[j][i] = this.rows[i][j];
		}
	}
};

export default Matrix;