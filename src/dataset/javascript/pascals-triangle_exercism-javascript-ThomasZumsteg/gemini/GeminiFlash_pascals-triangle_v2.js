var Triangle = function(nRows) {
    this.rows = [];
    if (nRows > 0) {
        let row = [1];
        this.rows.push(row);
        for (let i = 1; i < nRows; i++) {
            const nextRow = new Array(i + 1);
            nextRow[0] = 1;
            nextRow[i] = 1;
            for (let j = 1; j < i; j++) {
                nextRow[j] = this.rows[i - 1][j - 1] + this.rows[i - 1][j];
            }
            this.rows.push(nextRow);
            this.lastRow = nextRow;
        }
    }
};

export default Triangle;