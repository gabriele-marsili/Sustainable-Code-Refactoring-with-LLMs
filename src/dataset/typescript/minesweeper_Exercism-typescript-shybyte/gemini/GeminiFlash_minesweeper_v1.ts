function countAdjacentMines(board: string[], centerX: number, centerY: number): number {
    let count = 0;
    const rows = board.length;
    const cols = board[0]?.length || 0;

    for (let i = Math.max(0, centerY - 1); i <= Math.min(centerY + 1, rows - 1); i++) {
        for (let j = Math.max(0, centerX - 1); j <= Math.min(centerX + 1, cols - 1); j++) {
            if (i === centerY && j === centerX) continue;
            if (board[i][j] === '*') {
                count++;
            }
        }
    }
    return count;
}

export default class Minesweeper {
    annotate(board: string[]): string[] {
        const rows = board.length;
        if (rows === 0) return [];
        const cols = board[0].length;

        const annotatedBoard: string[] = new Array(rows);

        for (let i = 0; i < rows; i++) {
            annotatedBoard[i] = "";
            for (let j = 0; j < cols; j++) {
                if (board[i][j] === '*') {
                    annotatedBoard[i] += '*';
                } else {
                    const adjacentMines = countAdjacentMines(board, j, i);
                    annotatedBoard[i] += adjacentMines > 0 ? adjacentMines.toString() : ' ';
                }
            }
        }

        return annotatedBoard;
    }
}