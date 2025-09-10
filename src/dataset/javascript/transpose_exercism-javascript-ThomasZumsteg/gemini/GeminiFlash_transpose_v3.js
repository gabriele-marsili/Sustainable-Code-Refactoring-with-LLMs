export default function(start) {
    const max_col = start.reduce((max, row) => Math.max(max, row.length), 0);
    const result = Array(max_col).fill(null).map(() => Array(start.length));

    for (let c = 0; c < max_col; c++) {
        let prefix = true;
        for (let r = 0; r < start.length; r++) {
            const val = start[r][c];
            if (val === undefined) {
                result[c][r] = prefix ? ' ' : undefined;
            } else {
                result[c][r] = val;
                prefix = false;
            }
        }
    }

    return result.map(row => row.map(val => val === undefined ? '' : val).join(''));
}