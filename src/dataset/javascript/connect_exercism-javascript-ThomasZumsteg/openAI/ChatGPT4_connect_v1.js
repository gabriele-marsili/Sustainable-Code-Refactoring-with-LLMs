function transpose(board) {
    const rows = board.length, cols = board[0].length;
    const transposed = Array.from({ length: cols }, () => Array(rows));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
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
        { dr: -1, dc: 0 }, { dr: -1, dc: 1 },
        { dr: 0, dc: 1 }, { dr: 0, dc: -1 },
        { dr: 1, dc: -1 }, { dr: 1, dc: 0 }
    ];
    const queue = [];
    for (let i = 0; i < board[0].length; i++) {
        if (board[0][i] === letter) queue.push({ row: 0, col: i });
    }
    while (queue.length) {
        const { row, col } = queue.pop();
        const key = hash(row, col);
        if (seen.has(key)) continue;
        seen.add(key);
        if (board[row]?.[col] !== letter) continue;
        if (row === board.length - 1) return true;
        for (const { dr, dc } of directions) {
            const newRow = row + dr, newCol = col + dc;
            if (!seen.has(hash(newRow, newCol))) {
                queue.push({ row: newRow, col: newCol });
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