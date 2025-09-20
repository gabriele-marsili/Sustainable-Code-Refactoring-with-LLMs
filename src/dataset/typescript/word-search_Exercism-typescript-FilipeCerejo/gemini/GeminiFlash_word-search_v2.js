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
        this._cols = matrix[0].length;
    }
    find(words) {
        for (const w of words) {
            this._words[w] = undefined;
            const wordLength = w.length;
            for (let c = 0; c < this._rows; c++) {
                for (let r = 0; r < this._cols; r++) {
                    if (this._matrix[c][r] === w[0]) {
                        for (const vector of VECTORS) {
                            let found = true;
                            for (let i = 1; i < wordLength; i++) {
                                const currentPoint = [c + vector[0] * i, r + vector[1] * i];
                                if (!this.isValid(currentPoint) || this._matrix[currentPoint[0]][currentPoint[1]] !== w[i]) {
                                    found = false;
                                    break;
                                }
                            }
                            if (found) {
                                const endPoint = [c + vector[0] * (wordLength - 1), r + vector[1] * (wordLength - 1)];
                                this._words[w] = {
                                    start: [c + 1, r + 1],
                                    end: [endPoint[0] + 1, endPoint[1] + 1],
                                };
                                break; // Move to the next word once found
                            }
                        }
                        if (this._words[w])
                            break; // Move to the next word once found
                    }
                }
                if (this._words[w])
                    break; // Move to the next word once found
            }
        }
        return this._words;
    }
    isValid(p) {
        return !(p[0] < 0 || p[0] >= this._rows || p[1] < 0 || p[1] >= this._cols);
    }
}
exports.WordSearch = WordSearch;
