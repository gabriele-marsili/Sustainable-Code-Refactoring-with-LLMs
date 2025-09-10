var Matrix = function(matrix) {
    this.rows = matrix.split("\n").map(row => {
        return row.trim().split(/\s+/).map(e => parseInt(e, 10));
    });

    const numCols = this.rows[0].length;
    this.columns = Array.from({ length: numCols }, (_, col) =>
        this.rows.map(row => row[col])
    );

    this.saddlePoints = saddlePoints(this);
};

function saddlePoints(matrix) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const numRows = rows.length;
    const numCols = cols.length;

    const rowMax = rows.map(row => Math.max(...row));
    const colMin = cols.map(col => Math.min(...col));

    const saddlePoints = [];

    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            const element = rows[r][c];
            if (element === rowMax[r] && element === colMin[c]) {
                saddlePoints.push([r, c]);
            }
        }
    }

    return saddlePoints;
}

export default Matrix;