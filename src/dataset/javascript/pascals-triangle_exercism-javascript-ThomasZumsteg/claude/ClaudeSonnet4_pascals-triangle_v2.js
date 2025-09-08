var Triangle = function(nRows) {
    this.rows = [];
    if (nRows <= 0) return;
    
    this.rows.push([1]);
    this.lastRow = [1];
    
    for(var i = 1; i < nRows; i++) {
        var prevRow = this.rows[i-1];
        var newRow = new Array(i + 1);
        newRow[0] = 1;
        newRow[i] = 1;
        
        for(var j = 1; j < i; j++) {
            newRow[j] = prevRow[j-1] + prevRow[j];
        }
        
        this.rows.push(newRow);
        this.lastRow = newRow;
    }
}

export default Triangle;