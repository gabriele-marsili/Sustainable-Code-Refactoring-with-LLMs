function count3x3Window(board: string[], centerX: number, centerY: number): number {
    let sum = 0;
    const height = board.length;
    const width = board[0]?.length || 0;

    for (let deltaY = -1; deltaY <= 1; deltaY++) {
        const y = centerY + deltaY;
        if (y >= 0 && y < height) {
            const row = board[y];
            for (let deltaX = -1; deltaX <= 1; deltaX++) {
                const x = centerX + deltaX;
                if (x >= 0 && x < width && row[x] === '*') {
                    sum++;
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

        const annotatedBoard: string[] = new Array(height);

        for (let centerY = 0; centerY < height; centerY++) {
            let annotatedRow = '';
            const row = board[centerY];
            for (let centerX = 0; centerX < width; centerX++) {
                const cell = row[centerX];
                if (cell === ' ') {
                    const count = count3x3Window(board, centerX, centerY);
                    annotatedRow += count > 0 ? count.toString() : ' ';
                } else {
                    annotatedRow += cell;
                }
            }
            annotatedBoard[centerY] = annotatedRow;
        }

        return annotatedBoard;
    }
}