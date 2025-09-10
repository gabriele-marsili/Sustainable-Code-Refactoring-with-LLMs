var Matrix = function(matrix) {
    /* Two dimentional matrix class */
    const rows = matrix.split("\n").map(row => {
        return row.trim().split(/\s+/).map(e => parseInt(e, 10));
    });

    this.rows = rows;
    this.columns = rows[0].map((_, col) => rows.map(row => row[col]));
    this.saddlePoints = saddlePoints(this);
}

function saddlePoints(matrix) {
    /* Finds saddle points in a matrix */
    const rows = matrix.rows;
    const numRows = rows.length;
    const numCols = rows[0].length;

    const rowMax = rows.map(row => Math.max(...row));
    const colMin = matrix.columns.map(col => Math.min(...col));

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
};

export default Matrix;