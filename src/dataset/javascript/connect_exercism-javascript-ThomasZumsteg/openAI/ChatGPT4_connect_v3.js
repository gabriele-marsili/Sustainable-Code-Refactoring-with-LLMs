function transpose(board) {
    const transposed = Array.from({ length: board[0].length }, () => []);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            transposed[j][i] = board[i][j];
        }
    }
    return transposed;
}

function hash(row, col) {
    return `${row}:${col}`;
}

function has_path(board, letter) {
    const seen = new Set();
    const directions = [
        [-1, 0], [-1, 1],
        [0, 1], [0, -1],
        [1, -1], [1, 0]
    ];
    const queue = [];
    for (let i = 0; i < board[0].length; i++) {
        if (board[0][i] === letter) {
            queue.push([0, i]);
        }
    }
    while (queue.length > 0) {
        const [row, col] = queue.pop();
        const key = hash(row, col);
        if (seen.has(key)) continue;
        seen.add(key);
        if (row === board.length - 1) return true;
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (
                newRow >= 0 && newRow < board.length &&
                newCol >= 0 && newCol < board[0].length &&
                board[newRow][newCol] === letter &&
                !seen.has(hash(newRow, newCol))
            ) {
                queue.push([newRow, newCol]);
            }
        }
    }
    return false;
}

class Board {
    constructor(board) {
        this.board = board.map(row => row.trim().split(' '));
    }

    winner() {
        if (has_path(this.board, 'O')) return 'O';
        if (has_path(transpose(this.board), 'X')) return 'X';
        return '';
    }
}

export default Board;