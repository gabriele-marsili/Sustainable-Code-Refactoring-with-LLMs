function transpose(board) {
    const rows = board.length;
    const cols = board[0].length;
    const result = new Array(cols);
    for (let i = 0; i < cols; i++) {
        result[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            result[i][j] = board[j][i];
        }
    }
    return result;
}

function has_path(board, letter) {
    const rows = board.length;
    const cols = board[0].length;
    const seen = new Set();
    const queue = [];
    
    // Initialize queue with first row matches
    for (let i = 0; i < cols; i++) {
        if (board[0][i] === letter) {
            queue.push(0, i); // Store row, col as separate values
        }
    }
    
    const directions = [-1, 0, -1, 1, 0, 1, 0, -1, 1, -1, 1, 0]; // Flattened direction pairs
    
    while (queue.length > 0) {
        const col = queue.pop();
        const row = queue.pop();
        const key = row * cols + col; // More efficient hash
        
        if (seen.has(key) || row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] !== letter) {
            continue;
        }
        
        seen.add(key);
        
        if (row === rows - 1) {
            return true;
        }
        
        // Add neighbors using flattened directions array
        for (let i = 0; i < 12; i += 2) {
            queue.push(row + directions[i], col + directions[i + 1]);
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
        if (has_path(transpose(this.board), 'X')) {
            return 'X';
        }
        return '';
    }
}

export default Board;