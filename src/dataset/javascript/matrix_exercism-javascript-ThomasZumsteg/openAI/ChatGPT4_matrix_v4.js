var Matrix = function(matrix) {
	this.rows = matrix.split("\n").map(row => row.split(" ").map(Number));
	this.columns = Array.from({ length: this.rows[0].length }, (_, colNum) => 
		this.rows.map(row => row[colNum])
	);
}

export default Matrix;