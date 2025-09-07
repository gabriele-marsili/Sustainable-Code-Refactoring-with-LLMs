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

function hash(element) {
    return (element.row << 16) | element.col;
}

function has_path(board, letter) {
    const rows = board.length;
    const cols = board[0].length;
    const seen = new Set();
    const queue = [];
    let queueIndex = 0;
    
    for (let i = 0; i < cols; i++) {
        if (board[0][i] === letter) {
            queue.push({row: 0, col: i});
        }
    }
    
    const directions = [
        {dr: -1, dc: 0}, {dr: -1, dc: 1}, 
        {dr: 0, dc: 1}, {dr: 0, dc: -1},
        {dr: 1, dc: -1}, {dr: 1, dc: 0}
    ];
    
    while (queueIndex < queue.length) {
        const elem = queue[queueIndex++];
        const elemHash = hash(elem);
        
        if (seen.has(elemHash) || 
            elem.row < 0 || elem.row >= rows ||
            elem.col < 0 || elem.col >= cols ||
            board[elem.row][elem.col] !== letter) {
            continue;
        }
        
        seen.add(elemHash);
        
        if (elem.row === rows - 1) {
            return true;
        }
        
        for (let i = 0; i < directions.length; i++) {
            const dir = directions[i];
            queue.push({
                row: elem.row + dir.dr, 
                col: elem.col + dir.dc
            });
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