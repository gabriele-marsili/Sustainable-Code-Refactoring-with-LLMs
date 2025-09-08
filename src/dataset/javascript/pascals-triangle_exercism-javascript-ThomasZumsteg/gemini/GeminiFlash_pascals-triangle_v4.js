var Triangle = function(nRows) {
    this.rows = [];
    if (nRows > 0) {
        let row = [1];
        this.rows.push(row);
        for (let i = 1; i < nRows; i++) {
            row = next_row(row);
            this.rows.push(row);
        }
        this.lastRow = row;
    } else {
        this.lastRow = [];
    }
};

function next_row(current_row) {
    const row = new Array(current_row.length + 1);
    row[0] = 1;
    row[current_row.length] = 1;

    for (let i = 1; i < current_row.length; i++) {
        row[i] = current_row[i - 1] + current_row[i];
    }
    return row;
}

export default Triangle;