class Minesweeper {
    static countMines(field, row, col) {
        let total = 0;
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const nr = row + dr, nc = col + dc;
                if (nr >= 0 && nr < field.length && nc >= 0 && nc < field[nr].length && field[nr][nc] === '*') {
                    total++;
                }
            }
        }
        return total;
    }

    annotate(field) {
        const rows = field.length, cols = field[0].length;
        const result = Array.from({ length: rows }, (_, r) => field[r].split(''));
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (result[r][c] === ' ') {
                    const mines = Minesweeper.countMines(result, r, c);
                    if (mines > 0) result[r][c] = mines;
                }
            }
        }
        return result.map(row => row.join(''));
    }
}

export default Minesweeper;