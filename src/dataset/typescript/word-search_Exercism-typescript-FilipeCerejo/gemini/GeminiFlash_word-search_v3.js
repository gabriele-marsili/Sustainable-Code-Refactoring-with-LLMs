"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordSearch = void 0;
const VECTORS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];
class WordSearch {
    constructor(matrix) {
        this._matrix = [];
        this._words = {};
        this._matrix = matrix;
        this._rows = matrix.length;
        this._cols = matrix.map(row => row.length);
    }
    find(words) {
        this._words = {}; // Reset words for each find call
        for (const w of words) {
            this._words[w] = undefined;
            const wordLength = w.length;
            for (let c = 0; c < this._rows; c++) {
                const rowLength = this._cols[c];
                for (let r = 0; r < rowLength; r++) {
                    if (this._matrix[c][r] === w[0]) {
                        for (const vector of VECTORS) {
                            let found = true;
                            let endRow = c;
                            let endCol = r;
                            for (let i = 1; i < wordLength; i++) {
                                endRow += vector[0];
                                endCol += vector[1];
                                if (!this.isValid([endRow, endCol]) || this._matrix[endRow][endCol] !== w[i]) {
                                    found = false;
                                    break;
                                }
                            }
                            if (found) {
                                this._words[w] = {
                                    start: [c + 1, r + 1],
                                    end: [endRow + 1, endCol + 1],
                                };
                                break; // Word found, move to the next word
                            }
                        }
                        if (this._words[w])
                            break; // Word found in this cell, move to the next cell
                    }
                }
                if (this._words[w])
                    break; // Word found in this row, move to the next row
            }
        }
        return this._words;
    }
    isValid(p) {
        const row = p[0];
        const col = p[1];
        return !(row < 0 || row >= this._rows || col < 0 || col >= this._cols[row]);
    }
}
exports.WordSearch = WordSearch;
