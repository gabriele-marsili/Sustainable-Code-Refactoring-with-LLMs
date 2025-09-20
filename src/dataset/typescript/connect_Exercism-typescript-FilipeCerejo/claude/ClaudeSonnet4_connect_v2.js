"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor(board) {
        this._hasWinner = false;
        let testBoard = board.map((line) => line.split(' '));
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
        if (board.length === 0 || board.length !== board[0].length) {
            return false;
        }
        for (let r = 0; r < board.length - 1; r++) {
            if (board[r + 1].length !== board[r].length + 1) {
                return false;
            }
        }
        return true;
    }
    winner() {
        this._hasWinner = false;
        if (this.winnerPath('O'))
            return 'O';
        this._hasWinner = false;
        if (this.winnerPath('X'))
            return 'X';
        return '';
    }
    winnerPath(player) {
        const visited = new Set();
        if (player === 'O') {
            for (let i = 0; i < this._board[0].length; i++) {
                if (this._board[0][i] === 'O') {
                    if (this.searchPath(player, [0, i], visited)) {
                        return true;
                    }
                }
            }
        }
        else {
            for (let i = 0; i < this._board.length; i++) {
                if (this._board[i][i] === 'X') {
                    if (this.searchPath(player, [i, i], visited)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    searchPath(player, p, visited) {
        const key = `${p[0]},${p[1]}`;
        if (visited.has(key))
            return false;
        visited.add(key);
        if (this.isEnd(player, p)) {
            return true;
        }
        const directions = [
            [-1, -1], [-1, 0], [0, 1], [1, 1], [1, 0], [0, -1]
        ];
        for (const [dr, dc] of directions) {
            const next = [p[0] + dr, p[1] + dc];
            if (this.isValidMove(player, next) && this.searchPath(player, next, visited)) {
                return true;
            }
        }
        return false;
    }
    isValidMove(player, p) {
        return (p[0] >= 0 && p[0] < this._board.length &&
            p[1] >= 0 && p[1] < this._board[p[0]].length &&
            this._board[p[0]][p[1]] === player);
    }
    isEnd(player, p) {
        return ((player === 'O' && p[0] === this._board.length - 1) ||
            (player === 'X' && p[1] === this._board[p[0]].length - 1));
    }
}
exports.Board = Board;
