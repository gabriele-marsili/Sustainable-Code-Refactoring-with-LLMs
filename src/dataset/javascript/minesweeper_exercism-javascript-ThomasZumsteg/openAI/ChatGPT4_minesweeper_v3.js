class Minesweeper {
    static countMines(field, row, col) {
        const directions = [
            [1, 1], [1, 0], [1, -1],
            [0, 1],         [0, -1],
            [-1, 1], [-1, 0], [-1, -1]
        ];
        let total = 0;
        for (const [dr, dc] of directions) {
            const newRow = row + dr, newCol = col + dc;
            if (newRow >= 0 && newRow < field.length &&
                newCol >= 0 && newCol < field[newRow].length &&
                field[newRow][newCol] === '*') {
                total++;
            }
        }
        return total;
    }

    annotate(field) {
        const rows = field.length;
        const cols = field[0].length;
        const result = Array.from({ length: rows }, (_, r) =>
            Array.from(field[r])
        );

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