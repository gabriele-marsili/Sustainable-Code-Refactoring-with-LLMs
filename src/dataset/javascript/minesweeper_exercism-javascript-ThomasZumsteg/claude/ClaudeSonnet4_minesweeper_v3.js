class Minesweeper {
    static countMines(field, row, col) {
        let total = 0;
        const maxRow = field.length - 1;
        const maxCol = field[0].length - 1;
        
        for (let dr = -1; dr <= 1; dr++) {
            const r = row + dr;
            if (r < 0 || r > maxRow) continue;
            
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const c = col + dc;
                if (c >= 0 && c <= maxCol && field[r][c] === '*') {
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
            const chars = new Array(row.length);
            
            for (let c = 0; c < row.length; c++) {
                if (row[c] === ' ') {
                    const mines = Minesweeper.countMines(field, r, c);
                    chars[c] = mines === 0 ? ' ' : mines.toString();
                } else {
                    chars[c] = row[c];
                }
            }
            result[r] = chars.join('');
        }
        return result;
    }
}

export default Minesweeper;