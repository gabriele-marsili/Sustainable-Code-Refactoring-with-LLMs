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
        var _a;
        this._matrix = matrix;
        this._rows = matrix.length;
        this._cols = ((_a = matrix[0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
    }
    find(words) {
        const result = {};
        const wordSet = new Set(words);
        for (const word of wordSet) {
            result[word] = this.findWord(word);
        }
        return result;
    }
    findWord(word) {
        if (!word || this._rows === 0 || this._cols === 0)
            return undefined;
        const firstChar = word[0];
        const wordLength = word.length;
        for (let row = 0; row < this._rows; row++) {
            const matrixRow = this._matrix[row];
            for (let col = 0; col < this._cols; col++) {
                if (matrixRow[col] === firstChar) {
                    for (const vector of VECTORS) {
                        if (this.searchInDirection(word, row, col, vector, wordLength)) {
                            const endRow = row + vector[0] * (wordLength - 1);
                            const endCol = col + vector[1] * (wordLength - 1);
                            return {
                                start: [row + 1, col + 1],
                                end: [endRow + 1, endCol + 1],
                            };
                        }
                    }
                }
            }
        }
        return undefined;
    }
    searchInDirection(word, startRow, startCol, vector, wordLength) {
        const [deltaRow, deltaCol] = vector;
        const endRow = startRow + deltaRow * (wordLength - 1);
        const endCol = startCol + deltaCol * (wordLength - 1);
        if (endRow < 0 || endRow >= this._rows || endCol < 0 || endCol >= this._cols) {
            return false;
        }
        for (let i = 1; i < wordLength; i++) {
            const currentRow = startRow + deltaRow * i;
            const currentCol = startCol + deltaCol * i;
            if (this._matrix[currentRow][currentCol] !== word[i]) {
                return false;
            }
        }
        return true;
    }
}
exports.WordSearch = WordSearch;
