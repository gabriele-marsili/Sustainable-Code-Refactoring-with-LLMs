class Minesweeper {
    static countMines(field, row, col) {
        let total = 0;
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const newRow = row + dr;
                const newCol = col + dc;

                if (newRow >= 0 && newRow < field.length && newCol >= 0 && newCol < field[newRow].length && field[newRow][newCol] === '*') {
                    total++;
                }
            }
        }
        return total;
    }

    annotate(field) {
        const numRows = field.length;
        if (numRows === 0) return [];
        const numCols = field[0].length;

        const annotatedField = field.map(row => row.split(''));

        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                if (annotatedField[r][c] === ' ') {
                    const mines = Minesweeper.countMines(annotatedField, r, c);
                    annotatedField[r][c] = mines === 0 ? ' ' : String(mines);
                }
            }
        }

        return annotatedField.map(row => row.join(''));
    }
}

export default Minesweeper;