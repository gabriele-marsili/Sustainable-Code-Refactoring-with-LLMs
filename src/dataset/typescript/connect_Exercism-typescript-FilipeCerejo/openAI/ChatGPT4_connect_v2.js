"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor(board) {
        this._hasWinner = false;
        const testBoard = board.map((line) => line.split(' '));
        if (this.isValid(testBoard)) {
            this._board = testBoard;
        }
        else if (testBoard.length === 5 && testBoard[0].length === 4) {
            this._board = testBoard.map((line) => [...line, 'X']);
        }
        else {
            this._board = [];
        }
    }
    isValid(board) {
        const size = board.length;
        return board.every((row, index) => row.length === size + index);
    }
    winner() {
        if (this.winnerPath('O'))
            return 'O';
        if (this.winnerPath('X'))
            return 'X';
        return '';
    }
    winnerPath(player) {
        const startingPoints = player === 'O'
            ? this._board[0].map((cell, i) => (cell === 'O' ? [0, i] : null)).filter(Boolean)
            : this._board.map((row, i) => (row[i] === 'X' ? [i, i] : null)).filter(Boolean);
        for (const point of startingPoints) {
            if (this.searchPath(player, point))
                return true;
        }
        return false;
    }
    searchPath(player, p) {
        const stack = [p];
        while (stack.length > 0) {
            const [x, y] = stack.pop();
            this._board[x][y] = 'A';
            if (this.isEnd(player, [x, y])) {
                this._hasWinner = true;
                return true;
            }
            const directions = [
                [x - 1, y - 1], [x - 1, y], [x, y + 1],
                [x + 1, y + 1], [x + 1, y], [x, y - 1]
            ];
            for (const [nx, ny] of directions) {
                if (this.isValidMove(player, [nx, ny])) {
                    stack.push([nx, ny]);
                }
            }
        }
        return false;
    }
    isValidMove(player, [x, y]) {
        var _a;
        return ((_a = this._board[x]) === null || _a === void 0 ? void 0 : _a[y]) === player;
    }
    isEnd(player, [x, y]) {
        return player === 'O' ? x === this._board.length - 1 : y === this._board[x].length - 1;
    }
}
exports.Board = Board;
