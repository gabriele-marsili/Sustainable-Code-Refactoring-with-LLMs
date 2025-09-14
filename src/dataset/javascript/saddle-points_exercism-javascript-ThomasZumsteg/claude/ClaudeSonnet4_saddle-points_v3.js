var Matrix = function(matrix) {
    const rows = matrix.split("\n");
    const numRows = rows.length;
    const numCols = rows[0].replace(/^\s+|\s+$/g, '').split(' ').length;
    
    this.rows = new Array(numRows);
    this.columns = new Array(numCols);
    
    for (let i = 0; i < numCols; i++) {
        this.columns[i] = new Array(numRows);
    }
    
    for (let r = 0; r < numRows; r++) {
        const rowElements = rows[r].replace(/^\s+|\s+$/g, '').split(' ');
        this.rows[r] = new Array(rowElements.length);
        
        for (let c = 0; c < rowElements.length; c++) {
            const value = parseInt(rowElements[c]);
            this.rows[r][c] = value;
            this.columns[c][r] = value;
        }
    }
    
    this.saddlePoints = saddlePoints(this);
}

function saddlePoints(matrix) {
    const numRows = matrix.rows.length;
    const numCols = matrix.columns.length;
    const rowMax = new Array(numRows);
    const colMin = new Array(numCols);
    const result = [];
    
    for (let r = 0; r < numRows; r++) {
        let max = matrix.rows[r][0];
        for (let c = 1; c < matrix.rows[r].length; c++) {
            if (matrix.rows[r][c] > max) {
                max = matrix.rows[r][c];
            }
        }
        rowMax[r] = max;
    }
    
    for (let c = 0; c < numCols; c++) {
        let min = matrix.columns[c][0];
        for (let r = 1; r < matrix.columns[c].length; r++) {
            if (matrix.columns[c][r] < min) {
                min = matrix.columns[c][r];
            }
        }
        colMin[c] = min;
    }
    
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < matrix.rows[r].length; c++) {
            if (matrix.rows[r][c] === rowMax[r] && matrix.rows[r][c] === colMin[c]) {
                result.push([r, c]);
            }
        }
    }
    
    return result;
}

export default Matrix;