function transpose(board) {
    const numRows = board.length;
    const numCols = board[0].length;
    const transposedBoard = Array(numCols).fill(null).map(() => Array(numRows));

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            transposedBoard[j][i] = board[i][j];
        }
    }
    return transposedBoard;
}

function hash(row, col) {
    return row + ':' + col;
}

function has_path(board, letter) {
    const numRows = board.length;
    if (numRows === 0) return false;
    const numCols = board[0].length;
    if (numCols === 0) return false;

    const seen = new Set();
    const queue = [];

    for (let i = 0; i < numCols; i++) {
        if (board[0][i] === letter) {
            queue.push({ row: 0, col: i });
        }
    }

    while (queue.length > 0) {
        const elem = queue.shift();
        const row = elem.row;
        const col = elem.col;
        const hashed = hash(row, col);

        if (seen.has(hashed) || row < 0 || row >= numRows || col < 0 || col >= numCols || board[row][col] !== letter) {
            continue;
        }

        seen.add(hashed);

        if (row + 1 >= numRows) {
            return true;
        }

        const directions = [
            { dr: -1, dc: 0 }, { dr: -1, dc: 1 },
            { dr: 0, dc: 1 }, { dr: 0, dc: -1 },
            { dr: 1, dc: -1 }, { dr: 1, dc: 0 }
        ];

        for (const diff of directions) {
            const newRow = row + diff.dr;
            const newCol = col + diff.dc;
            queue.push({ row: newRow, col: newCol });
        }
    }

    return false;
}

class Board {
    constructor(board) {
        this.board = board.map(row => row.trim().split(' '));
    }

    winner() {
        if (has_path(this.board, 'O')) {
            return 'O';
        }
        const transposedBoard = transpose(this.board);
        if (has_path(transposedBoard, 'X')) {
            return 'X';
        }
        return '';
    }
}

export default Board;