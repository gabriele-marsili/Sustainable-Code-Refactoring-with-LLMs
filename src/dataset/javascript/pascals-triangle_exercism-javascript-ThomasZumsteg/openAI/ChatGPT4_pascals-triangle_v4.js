var Triangle = function (nRows) {
	this.rows = [];
	let row = [1];
	for (let i = 0; i < nRows; i++) {
		this.rows.push(row);
		this.lastRow = row;
		row = row.reduce((nextRow, val, idx) => {
			nextRow.push((nextRow[idx - 1] || 0) + val);
			return nextRow;
		}, [1]);
	}
};

export default Triangle;