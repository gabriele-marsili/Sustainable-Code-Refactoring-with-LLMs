export default function(start) {
    if (!start.length) return [];
    
    const max_col = start.reduce((max, row) => Math.max(max, row.length), 0);
    const result = new Array(max_col);
    
    for (let c = 0; c < max_col; c++) {
        const column = new Array(start.length);
        let prefix = true;
        
        for (let r = 0; r < start.length; r++) {
            const cell = start[r][c];
            if (prefix && cell === undefined) {
                column[r] = ' ';
            } else {
                column[r] = cell;
                prefix = false;
            }
        }
        result[c] = column.join('');
    }
    
    return result;
}