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
        const matrix = this._matrix;
        const vectors = VECTORS;
        const isValid = (p) => p[0] >= 0 && p[0] < matrix.length && p[1] >= 0 && p[1] < matrix[p[0]].length;
        for (const word of words) {
            this._words[word] = undefined;
            const wordLength = word.length;
            for (let c = 0; c < matrix.length; c++) {
                for (let r = 0; r < matrix[c].length; r++) {
                    if (matrix[c][r] !== word[0])
                        continue;
                    for (const [dx, dy] of vectors) {
                        let i = 1;
                        let currentPoint = [c, r];
                        while (i < wordLength) {
                            currentPoint = [currentPoint[0] + dx, currentPoint[1] + dy];
                            if (!isValid(currentPoint) || matrix[currentPoint[0]][currentPoint[1]] !== word[i])
                                break;
                            i++;
                        }
                        if (i === wordLength) {
                            this._words[word] = {
                                start: [c + 1, r + 1],
                                end: [currentPoint[0] + 1, currentPoint[1] + 1],
                            };
                            break;
                        }
                    }
                    if (this._words[word])
                        break;
                }
                if (this._words[word])
                    break;
            }
        }
        return this._words;
    }
}
exports.WordSearch = WordSearch;
