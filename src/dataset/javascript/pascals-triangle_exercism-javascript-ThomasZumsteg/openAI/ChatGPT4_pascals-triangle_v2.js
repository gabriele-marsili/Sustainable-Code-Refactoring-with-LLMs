class Triangle {
    constructor(nRows) {
        this.rows = [];
        let row = [1];
        for (let i = 0; i < nRows; i++) {
            this.rows.push(row);
            row = this._nextRow(row);
        }
    }

    _nextRow(currentRow) {
        const row = new Array(currentRow.length + 1);
        row[0] = 1;
        row[row.length - 1] = 1;
        for (let j = 1; j < currentRow.length; j++) {
            row[j] = currentRow[j - 1] + currentRow[j];
        }
        return row;
    }
}

export default Triangle;