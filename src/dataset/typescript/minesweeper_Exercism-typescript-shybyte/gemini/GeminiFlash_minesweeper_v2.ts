function count3x3Window(board: string[], centerX: number, centerY: number) {
    let sum = 0;
    const height = board.length;
    const width = board[0].length;

    for (let deltaY = -1; deltaY <= 1; deltaY++) {
        const newY = centerY + deltaY;
        if (newY >= 0 && newY < height) {
            for (let deltaX = -1; deltaX <= 1; deltaX++) {
                const newX = centerX + deltaX;
                if (newX >= 0 && newX < width && board[newY][newX] === '*') {
                    sum += 1;
                }
            }
        }
    }
    return sum;
}

export default class Minesweeper {
    annotate(board: string[]) {
        const height = board.length;
        if (height === 0) return [];
        const width = board[0].length;

        const annotatedBoard = board.map((row, centerY) => {
            let annotatedRow = "";
            for (let centerX = 0; centerX < width; centerX++) {
                const cell = row[centerX];
                if (cell === ' ') {
                    const count = count3x3Window(board, centerX, centerY);
                    annotatedRow += count > 0 ? count.toString() : ' ';
                } else {
                    annotatedRow += cell;
                }
            }
            return annotatedRow;
        });

        return annotatedBoard;
    }
}