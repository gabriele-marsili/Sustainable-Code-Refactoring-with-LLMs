var Triangle = function(nRows) {
	/* Builds Pascals Triangle */
	this.rows = [];
	if (nRows <= 0) return;
	
	var row = [1];
	this.rows.push(row);
	this.lastRow = row;
	
	for(var i = 1; i < nRows; i++) {
		var newRow = new Array(i + 1);
		newRow[0] = 1;
		newRow[i] = 1;
		
		for(var j = 1; j < i; j++) {
			newRow[j] = row[j - 1] + row[j];
		}
		
		this.rows.push(newRow);
		this.lastRow = newRow;
		row = newRow;
	}
}

function next_row(current_row) {
	/* Builds the next row of Pascals Triangle */
	var len = current_row.length;
	var row = new Array(len + 1);
	row[0] = 1;
	row[len] = 1;
	
	for(var j = 1; j < len; j++) {
		row[j] = current_row[j - 1] + current_row[j];
	}
	
	return row;
}

export default Triangle;