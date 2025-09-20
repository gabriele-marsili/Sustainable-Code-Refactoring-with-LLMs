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
        var _a;
        const rowLength = (_a = board[0]) === null || _a === void 0 ? void 0 : _a.length;
        if (!rowLength)
            return true; // Handle empty board case
        if (board.length !== rowLength) {
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
        if (this.winnerPath('O'))
            return 'O';
        if (this.winnerPath('X'))
            return 'X';
        return '';
    }
    winnerPath(player) {
        let startingPoints = [];
        const board = this._board;
        if (player === 'O') {
            const firstRow = board[0];
            if (!firstRow)
                return false; // Handle empty board case
            for (let i = 0; i < firstRow.length; i++) {
                if (firstRow[i] === 'O') {
                    startingPoints.push([0, i]);
                }
            }
        }
        else {
            for (let i = 0; i < board.length; i++) {
                if (board[i][i] === 'X') {
                    startingPoints.push([i, i]);
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
        const board = this._board;
        if (this._hasWinner)
            return true;
        if (!board[p[0]] || !board[p[0]][p[1]] || board[p[0]][p[1]] !== player)
            return false;
        if (this.isEnd(player, p)) {
            this._hasWinner = true;
            return true;
        }
        board[p[0]][p[1]] = 'A'; // Mark visited
        const directions = [
            [p[0] - 1, p[1] - 1], // topleft
            [p[0] - 1, p[1]], // topRight
            [p[0], p[1] + 1], // right
            [p[0] + 1, p[1] + 1], // downRight
            [p[0] + 1, p[1]], // downLeft
            [p[0], p[1] - 1] // left
        ];
        for (const dir of directions) {
            if (this.isValidMove(player, dir) && this.searchPath(player, dir)) {
                return true;
            }
        }
        return false;
    }
    isValidMove(player, p) {
        const board = this._board;
        return (board[p[0]] !== undefined &&
            board[p[0]][p[1]] !== undefined &&
            board[p[0]][p[1]] === player);
    }
    isEnd(player, p) {
        const board = this._board;
        return ((player === 'O' && p[0] === board.length - 1) ||
            (player === 'X' && board[p[0]] && p[1] === board[p[0]].length - 1));
    }
}
exports.Board = Board;
