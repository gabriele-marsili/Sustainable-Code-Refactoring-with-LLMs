var Matrix = function (matrix) {
	this.rows = matrix.split("\n").map(row =>
		row.trim().split(/\s+/).map(Number)
	);

	this.columns = this.rows[0].map((_, colIndex) =>
		this.rows.map(row => row[colIndex])
	);

	this.saddlePoints = saddlePoints(this);
};

function saddlePoints(matrix) {
	const rowMax = matrix.rows.map(row => Math.max(...row));
	const columnMin = matrix.columns.map(column => Math.min(...column));
	const saddlePoints = [];

	for (let r = 0; r < matrix.rows.length; r++) {
		for (let c = 0; c < matrix.columns.length; c++) {
			if (matrix.rows[r][c] === rowMax[r] && matrix.rows[r][c] === columnMin[c]) {
				saddlePoints.push([r, c]);
			}
		}
	}

	return saddlePoints;
}

export default Matrix;