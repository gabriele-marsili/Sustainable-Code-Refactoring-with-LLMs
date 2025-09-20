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
        const result = {};
        for (const word of words) {
            result[word] = undefined;
            const wordLength = word.length;
            const firstChar = word[0];
            for (let row = 0; row < this._rows; row++) {
                for (let col = 0; col < this._cols; col++) {
                    if (this._matrix[row][col] === firstChar) {
                        for (const vector of VECTORS) {
                            let match = true;
                            for (let i = 1; i < wordLength; i++) {
                                const currentRow = row + vector[0] * i;
                                const currentCol = col + vector[1] * i;
                                if (currentRow < 0 ||
                                    currentRow >= this._rows ||
                                    currentCol < 0 ||
                                    currentCol >= this._cols ||
                                    this._matrix[currentRow][currentCol] !== word[i]) {
                                    match = false;
                                    break;
                                }
                            }
                            if (match) {
                                const endRow = row + vector[0] * (wordLength - 1);
                                const endCol = col + vector[1] * (wordLength - 1);
                                result[word] = {
                                    start: [row + 1, col + 1],
                                    end: [endRow + 1, endCol + 1],
                                };
                                break;
                            }
                        }
                        if (result[word])
                            break;
                    }
                }
            }
        }
        this._words = result;
        return this._words;
    }
}
exports.WordSearch = WordSearch;
