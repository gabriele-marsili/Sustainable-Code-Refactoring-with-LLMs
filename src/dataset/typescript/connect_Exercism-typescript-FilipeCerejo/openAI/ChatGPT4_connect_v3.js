"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor(board) {
        this._hasWinner = false;
        const testBoard = board.map((line) => line.split(' '));
        this._board = this.isValid(testBoard)
            ? testBoard
            : testBoard.length === 5 && testBoard[0].length === 4
                ? testBoard.map((line) => [...line, 'X'])
                : [];
    }
    isValid(board) {
        const size = board.length;
        return board.every((row, i) => row.length === size + i);
    }
    winner() {
        return this.winnerPath('O') ? 'O' : this.winnerPath('X') ? 'X' : '';
    }
    winnerPath(player) {
        const startingPoints = player === 'O'
            ? this._board[0].map((cell, i) => (cell === 'O' ? [0, i] : null)).filter(Boolean)
            : this._board.map((row, i) => (row[i] === 'X' ? [i, i] : null)).filter(Boolean);
        return startingPoints.some((point) => this.searchPath(player, point));
    }
    searchPath(player, p) {
        const stack = [p];
        while (stack.length) {
            const [x, y] = stack.pop();
            this._board[x][y] = 'A';
            if (this.isEnd(player, [x, y])) {
                this._hasWinner = true;
                return true;
            }
            const neighbors = [
                [x - 1, y - 1], [x - 1, y], [x, y + 1],
                [x + 1, y + 1], [x + 1, y], [x, y - 1]
            ];
            for (const [nx, ny] of neighbors) {
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
