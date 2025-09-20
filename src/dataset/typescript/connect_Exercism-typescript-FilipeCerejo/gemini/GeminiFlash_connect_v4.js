"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor(board) {
        this._winner = '';
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
        const rows = board.length;
        if (rows === 0)
            return true;
        const cols = board[0].length;
        if (rows !== cols) {
            return false;
        }
        for (let r = 0; r < rows - 1; r++) {
            if (board[r + 1].length !== cols + r + 1) {
                return false;
            }
        }
        return true;
    }
    winner() {
        if (this._winner) {
            return this._winner;
        }
        if (this.winnerPath('O')) {
            this._winner = 'O';
            return 'O';
        }
        if (this.winnerPath('X')) {
            this._winner = 'X';
            return 'X';
        }
        return '';
    }
    winnerPath(player) {
        let startingPoints = [];
        if (player === 'O') {
            for (let i = 0; i < this._board[0].length; i++) {
                if (this._board[0][i] === 'O') {
                    startingPoints.push([0, i]);
                }
            }
        }
        else {
            for (let i = 0; i < this._board.length; i++) {
                if (this._board[i][0] === 'X') {
                    startingPoints.push([i, 0]);
                }
            }
        }
        for (const point of startingPoints) {
            if (this.searchPath(player, point)) {
                return true;
            }
        }
        return false;
    }
    searchPath(player, p) {
        const [row, col] = p;
        if (this.isEnd(player, p)) {
            return true;
        }
        this._board[row][col] = 'A';
        const directions = [
            [row - 1, col - 1],
            [row - 1, col],
            [row, col + 1],
            [row + 1, col + 1],
            [row + 1, col],
            [row, col - 1],
        ];
        for (const [newRow, newCol] of directions) {
            if (this.isValidMove(player, [newRow, newCol])) {
                if (this.searchPath(player, [newRow, newCol])) {
                    return true;
                }
            }
        }
        return false;
    }
    isValidMove(player, p) {
        const [row, col] = p;
        return (this._board[row] !== undefined &&
            this._board[row][col] !== undefined &&
            this._board[row][col] === player);
    }
    isEnd(player, p) {
        const [row, col] = p;
        return ((player === 'O' && row === this._board.length - 1) ||
            (player === 'X' && col === this._board[row].length - 1));
    }
}
exports.Board = Board;
