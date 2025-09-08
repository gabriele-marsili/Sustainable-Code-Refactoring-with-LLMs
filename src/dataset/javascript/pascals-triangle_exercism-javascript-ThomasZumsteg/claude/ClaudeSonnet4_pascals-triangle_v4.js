var Triangle = function(nRows) {
    this.rows = [];
    if (nRows <= 0) return;
    
    let row = [1];
    for (let i = 0; i < nRows; i++) {
        this.rows.push(row);
        this.lastRow = row;
        if (i < nRows - 1) {
            const nextRow = new Array(row.length + 1);
            nextRow[0] = 1;
            nextRow[nextRow.length - 1] = 1;
            for (let j = 1; j < nextRow.length - 1; j++) {
                nextRow[j] = row[j - 1] + row[j];
            }
            row = nextRow;
        }
    }
}

function next_row(current_row) {
    const length = current_row.length;
    const row = new Array(length + 1);
    row[0] = current_row[0];
    for (let j = 1; j < length; j++) {
        row[j] = current_row[j] + current_row[j - 1];
    }
    row[length] = current_row[length - 1];
    return row;
}

export default Triangle;