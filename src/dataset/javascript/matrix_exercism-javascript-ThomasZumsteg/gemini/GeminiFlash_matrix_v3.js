var Matrix = function(matrix) {
	/* A 2d matrix class */
	const rows = matrix.split("\n");
	const numRows = rows.length;
	let parsedRows = [];

	for (let i = 0; i < numRows; i++) {
		const row = rows[i].split(" ");
		const numCols = row.length;
		let parsedRow = [];
		for (let j = 0; j < numCols; j++) {
			parsedRow.push(parseInt(row[j], 10));
		}
		parsedRows.push(parsedRow);
	}
	this.rows = parsedRows;

	const numCols = this.rows[0].length;
	let columns = [];
	for (let j = 0; j < numCols; j++) {
		let column = [];
		for (let i = 0; i < numRows; i++) {
			column.push(this.rows[i][j]);
		}
		columns.push(column);
	}
	this.columns = columns;
}

export default Matrix;