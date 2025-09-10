class Minesweeper {
    static countMines(field, row, col) {
        let total = 0;
        const numRows = field.length;
        const numCols = field[0].length; // Assuming all rows have the same length

        for (let i = Math.max(0, row - 1); i <= Math.min(numRows - 1, row + 1); i++) {
            for (let j = Math.max(0, col - 1); j <= Math.min(numCols - 1, col + 1); j++) {
                if (i === row && j === col) continue; // Skip the cell itself
                if (field[i][j] === '*') {
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
        const annotatedField = new Array(numRows);

        for (let r = 0; r < numRows; r++) {
            annotatedField[r] = "";
            for (let c = 0; c < numCols; c++) {
                if (field[r][c] === '*') {
                    annotatedField[r] += '*';
                } else {
                    const mines = Minesweeper.countMines(field, r, c);
                    annotatedField[r] += mines === 0 ? ' ' : mines.toString();
                }
            }
        }

        return annotatedField;
    }
}

export default Minesweeper;