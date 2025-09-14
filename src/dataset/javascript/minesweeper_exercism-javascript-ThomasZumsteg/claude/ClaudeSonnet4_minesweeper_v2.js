class Minesweeper {
    static countMines(field, row, col) {
        let total = 0;
        const maxRow = field.length - 1;
        const maxCol = field[0].length - 1;
        
        for (let r = Math.max(0, row - 1); r <= Math.min(maxRow, row + 1); r++) {
            for (let c = Math.max(0, col - 1); c <= Math.min(maxCol, col + 1); c++) {
                if ((r !== row || c !== col) && field[r][c] === '*') {
                    total++;
                }
            }
        }
        return total;
    }

    annotate(field) {
        if (field.length === 0) return field;
        
        const result = new Array(field.length);
        
        for (let r = 0; r < field.length; r++) {
            const row = field[r];
            const newRow = new Array(row.length);
            
            for (let c = 0; c < row.length; c++) {
                if (row[c] === ' ') {
                    const mines = Minesweeper.countMines(field, r, c);
                    newRow[c] = mines === 0 ? ' ' : mines.toString();
                } else {
                    newRow[c] = row[c];
                }
            }
            result[r] = newRow.join('');
        }
        return result;
    }
}

export default Minesweeper;