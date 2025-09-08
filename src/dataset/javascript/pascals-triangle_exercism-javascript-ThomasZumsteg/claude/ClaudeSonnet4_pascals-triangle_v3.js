var Triangle = function(nRows) {
    this.rows = [];
    if (nRows <= 0) return;
    
    var row = [1];
    this.rows.push(row.slice());
    this.lastRow = row;
    
    for (var i = 1; i < nRows; i++) {
        row = next_row(row);
        this.rows.push(row.slice());
        this.lastRow = row;
    }
}

function next_row(current_row) {
    var len = current_row.length;
    var row = new Array(len + 1);
    
    row[0] = 1;
    row[len] = 1;
    
    for (var j = 1; j < len; j++) {
        row[j] = current_row[j - 1] + current_row[j];
    }
    
    return row;
}

export default Triangle;