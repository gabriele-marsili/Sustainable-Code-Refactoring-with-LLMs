var Matrix = function(matrix) {
	/* Two dimensional matrix class */
	this.rows = matrix.split("\n").map(row => 
		row.trim().split(/\s+/).map(Number)
	);

	this.columns = this.rows[0].map((_, colIndex) => 
		this.rows.map(row => row[colIndex])
	);

	this.saddlePoints = saddlePoints(this);
};

function saddlePoints(matrix) {
	/* Finds saddle points in a matrix */
	const rowMax = matrix.rows.map(row => Math.max(...row));
	const columnMin = matrix.columns.map(column => Math.min(...column));
	const saddlePoints = [];

	matrix.rows.forEach((row, r) => {
		row.forEach((element, c) => {
			if (element === rowMax[r] && element === columnMin[c]) {
				saddlePoints.push([r, c]);
			}
		});
	});

	return saddlePoints;
}

export default Matrix;