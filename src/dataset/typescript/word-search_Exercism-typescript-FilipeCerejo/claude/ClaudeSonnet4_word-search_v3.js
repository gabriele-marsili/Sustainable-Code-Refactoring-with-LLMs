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
            if (result[word])
                continue;
        }
        return result;
    }
    findWord(word) {
        if (!word)
            return undefined;
        const firstChar = word[0];
        const wordLength = word.length;
        for (let row = 0; row < this._rows; row++) {
            const matrixRow = this._matrix[row];
            for (let col = 0; col < matrixRow.length; col++) {
                if (matrixRow[col] !== firstChar)
                    continue;
                for (const [dr, dc] of VECTORS) {
                    if (this.searchDirection(word, row, col, dr, dc, wordLength)) {
                        const endRow = row + dr * (wordLength - 1);
                        const endCol = col + dc * (wordLength - 1);
                        return {
                            start: [row + 1, col + 1],
                            end: [endRow + 1, endCol + 1],
                        };
                    }
                }
            }
        }
        return undefined;
    }
    searchDirection(word, startRow, startCol, dr, dc, wordLength) {
        for (let i = 1; i < wordLength; i++) {
            const newRow = startRow + dr * i;
            const newCol = startCol + dc * i;
            if (newRow < 0 || newRow >= this._rows || newCol < 0 || newCol >= this._matrix[newRow].length) {
                return false;
            }
            if (this._matrix[newRow][newCol] !== word[i]) {
                return false;
            }
        }
        return true;
    }
}
exports.WordSearch = WordSearch;
