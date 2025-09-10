export default function(start) {
    const max_col = Math.max(...start.map(row => row.length));
    return Array.from({ length: max_col }, (_, c) => 
        start.map(row => row[c] ?? ' ').join('')
    );
}