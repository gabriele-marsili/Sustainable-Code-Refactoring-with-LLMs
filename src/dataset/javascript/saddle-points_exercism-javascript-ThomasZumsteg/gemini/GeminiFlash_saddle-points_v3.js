var Matrix = function(matrix) {
	/* Two dimentional matrix class */
	const rows = matrix.split("\n").map(row => {
		return row.trim().split(/\s+/).map(e => parseInt(e, 10));
	});

	const numCols = rows[0].length;
	const columns = Array.from({ length: numCols }, (_, col) =>
		rows.map(row => row[col])
	);

	this.rows = rows;
	this.columns = columns;
	this.saddlePoints = saddlePoints(this);
}

function saddlePoints(matrix) {
	/* Finds saddle points in a matrix */
	const rows = matrix.rows;
	const columns = matrix.columns;
	const numRows = rows.length;
	const numCols = columns.length;

	const rowMax = rows.map(row => Math.max(...row));
	const colMin = columns.map(col => Math.min(...col));

	const saddlePoints = [];

	for (let r = 0; r < numRows; r++) {
		const row = rows[r];
		for (let c = 0; c < numCols; c++) {
			const element = row[c];
			if (element === rowMax[r] && element === colMin[c]) {
				saddlePoints.push([r, c]);
			}
		}
	}

	return saddlePoints;
};

export default Matrix;