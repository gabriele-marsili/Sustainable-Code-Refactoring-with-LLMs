export default function(start) {
    if (!start || start.length === 0) return [];
    
    const max_col = start.reduce((max, row) => Math.max(max, row?.length || 0), 0);
    const result = new Array(max_col);
    
    for (let c = 0; c < max_col; c++) {
        let prefix = true;
        const column = new Array(start.length);
        
        for (let r = 0; r < start.length; r++) {
            const value = start[r]?.[c];
            if (prefix && value === undefined) {
                column[r] = ' ';
            } else {
                column[r] = value;
                prefix = false;
            }
        }
        
        result[c] = column.join('');
    }
    
    return result;
}