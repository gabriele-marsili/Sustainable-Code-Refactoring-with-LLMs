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
    }
    find(words) {
        words.forEach((w) => {
            this._words[w] = undefined;
            for (let c = 0; c < this._matrix.length; c++) {
                for (let r = 0; r < this._matrix[c].length; r++) {
                    if (this._matrix[c][r] === w[0]) {
                        for (let v = 0; v < VECTORS.length; v++) {
                            for (let i = 1; i < w.length; i++) {
                                let currentPoint = [c + VECTORS[v][0] * i, r + VECTORS[v][1] * i];
                                if (!this.isValid(currentPoint) ||
                                    this._matrix[currentPoint[0]][currentPoint[1]] !== w[i])
                                    break;
                                if (i === w.length - 1) {
                                    this._words[w] = {
                                        start: [c + 1, r + 1],
                                        end: [currentPoint[0] + 1, currentPoint[1] + 1],
                                    };
                                }
                            }
                            if (this._words[w])
                                return;
                        }
                    }
                }
            }
        });
        return this._words;
    }
    isValid(p) {
        return !(p[0] < 0 || p[0] >= this._matrix.length || p[1] < 0 || p[1] >= this._matrix[p[0]].length);
    }
}
exports.WordSearch = WordSearch;
