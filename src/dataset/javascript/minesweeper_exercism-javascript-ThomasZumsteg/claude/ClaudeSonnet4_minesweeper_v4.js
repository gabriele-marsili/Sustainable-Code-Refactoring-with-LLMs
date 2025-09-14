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
        
        const grid = field.map(row => row.split(''));
        const rows = grid.length;
        
        for (let r = 0; r < rows; r++) {
            const row = grid[r];
            const cols = row.length;
            
            for (let c = 0; c < cols; c++) {
                if (row[c] === ' ') {
                    const mines = Minesweeper.countMines(grid, r, c);
                    row[c] = mines === 0 ? ' ' : mines.toString();
                }
            }
        }
        
        return grid.map(row => row.join(''));
    }
}

export default Minesweeper;