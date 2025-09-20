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
        const matrix = this._matrix;
        const rows = matrix.length;
        const cols = ((_a = matrix[0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        wordsLoop: for (const word of words) {
            this._words[word] = undefined;
            const wordLen = word.length;
            for (let c = 0; c < rows; c++) {
                for (let r = 0; r < cols; r++) {
                    if (matrix[c][r] !== word[0])
                        continue;
                    for (const [dx, dy] of VECTORS) {
                        let valid = true;
                        let endPoint = [c, r];
                        for (let i = 1; i < wordLen; i++) {
                            const nx = c + dx * i;
                            const ny = r + dy * i;
                            if (nx < 0 || nx >= rows || ny < 0 || ny >= cols || matrix[nx][ny] !== word[i]) {
                                valid = false;
                                break;
                            }
                            endPoint = [nx, ny];
                        }
                        if (valid) {
                            this._words[word] = {
                                start: [c + 1, r + 1],
                                end: [endPoint[0] + 1, endPoint[1] + 1],
                            };
                            continue wordsLoop;
                        }
                    }
                }
            }
        }
        return this._words;
    }
}
exports.WordSearch = WordSearch;
