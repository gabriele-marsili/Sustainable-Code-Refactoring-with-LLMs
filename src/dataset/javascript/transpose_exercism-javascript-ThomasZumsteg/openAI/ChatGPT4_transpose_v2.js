export default function(start) {
    const max_col = Math.max(...start.map(row => row.length));
    const result = Array.from({ length: max_col }, (_, c) => 
        start.map(row => row[c] === undefined ? ' ' : row[c]).join('')
    );
    return result;
}