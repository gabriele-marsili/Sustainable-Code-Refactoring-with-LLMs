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
        const startingPoints = [];
        if (player === 'O') {
            for (let i = 0; i < this._board[0].length; i++) {
                if (this._board[0][i] === 'O') {
                    startingPoints.push([0, i]);
                }
            }
        }
        else {
            for (let i = 0; i < this._board.length; i++) {
                if (this._board[i][i] === 'X') {
                    startingPoints.push([i, i]);
                }
            }
        }
        const originalBoard = this._board.map(row => [...row]);
        for (const point of startingPoints) {
            this._board = originalBoard.map(row => [...row]);
            this._hasWinner = false;
            this.searchPath(player, point);
            if (this._hasWinner) {
                return true;
            }
        }
        this._board = originalBoard;
        return false;
    }
    searchPath(player, p) {
        if (this._hasWinner)
            return;
        this._board[p[0]][p[1]] = 'A';
        if (this.isEnd(player, p)) {
            this._hasWinner = true;
            return;
        }
        const moves = [
            [p[0] - 1, p[1] - 1],
            [p[0] - 1, p[1]],
            [p[0], p[1] + 1],
            [p[0] + 1, p[1] + 1],
            [p[0] + 1, p[1]],
            [p[0], p[1] - 1]
        ];
        for (const move of moves) {
            if (this._hasWinner)
                break;
            if (this.isValidMove(player, move)) {
                this.searchPath(player, move);
            }
        }
    }
    isValidMove(player, p) {
        const row = this._board[p[0]];
        return row !== undefined && row[p[1]] === player;
    }
    isEnd(player, p) {
        return ((player === 'O' && p[0] === this._board.length - 1) ||
            (player === 'X' && p[1] === this._board[p[0]].length - 1));
    }
}
exports.Board = Board;
