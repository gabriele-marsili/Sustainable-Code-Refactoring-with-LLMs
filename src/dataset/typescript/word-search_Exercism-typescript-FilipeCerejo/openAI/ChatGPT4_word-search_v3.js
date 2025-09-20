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
        this._matrix = matrix;
        this._words = {};
    }
    find(words) {
        var _a;
        const rows = this._matrix.length;
        const cols = ((_a = this._matrix[0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        for (const word of words) {
            this._words[word] = undefined;
            outer: for (let c = 0; c < rows; c++) {
                for (let r = 0; r < cols; r++) {
                    if (this._matrix[c][r] === word[0]) {
                        for (const [dx, dy] of VECTORS) {
                            if (this.checkWord(word, c, r, dx, dy)) {
                                this._words[word] = {
                                    start: [c + 1, r + 1],
                                    end: [c + dx * (word.length - 1) + 1, r + dy * (word.length - 1) + 1],
                                };
                                break outer;
                            }
                        }
                    }
                }
            }
        }
        return this._words;
    }
    checkWord(word, x, y, dx, dy) {
        for (let i = 1; i < word.length; i++) {
            x += dx;
            y += dy;
            if (!this.isValid(x, y) || this._matrix[x][y] !== word[i]) {
                return false;
            }
        }
        return true;
    }
    isValid(x, y) {
        return x >= 0 && x < this._matrix.length && y >= 0 && y < this._matrix[0].length;
    }
}
exports.WordSearch = WordSearch;
