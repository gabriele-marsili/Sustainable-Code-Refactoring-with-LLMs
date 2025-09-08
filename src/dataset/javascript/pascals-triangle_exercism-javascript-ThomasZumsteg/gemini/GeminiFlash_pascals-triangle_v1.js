var Triangle = function(nRows) {
    this.rows = [];
    if (nRows > 0) {
        let row = [1];
        this.rows.push(row);
        for (let i = 1; i < nRows; i++) {
            row = this.getNextRow(row);
            this.rows.push(row);
        }
        this.lastRow = row;
    } else {
        this.lastRow = [];
    }
};

Triangle.prototype.getNextRow = function(currentRow) {
    const nextRow = new Array(currentRow.length + 1);
    nextRow[0] = 1;
    nextRow[currentRow.length] = 1;

    for (let i = 1; i < currentRow.length; i++) {
        nextRow[i] = currentRow[i - 1] + currentRow[i];
    }
    return nextRow;
};

export default Triangle;