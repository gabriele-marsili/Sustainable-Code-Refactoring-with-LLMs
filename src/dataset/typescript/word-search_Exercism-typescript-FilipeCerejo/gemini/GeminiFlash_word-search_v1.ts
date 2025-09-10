type Point = [number, number];
type WordsType = {
    [w: string]: { start: Point; end: Point } | undefined;
};
const VECTORS: Point[] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

export class WordSearch {
    private _matrix: string[] = [];
    private _words: WordsType = {};
    private _rows: number;
    private _cols: number[] = [];

    constructor(matrix: string[]) {
        this._matrix = matrix;
        this._rows = matrix.length;
        for (let i = 0; i < this._rows; i++) {
            this._cols[i] = matrix[i].length;
        }
    }

    public find(words: string[]): WordsType {
        const result: WordsType = {};

        for (const word of words) {
            result[word] = undefined;
            const wordLength = word.length;
            if (wordLength === 0) continue;

            const firstChar = word[0];

            for (let row = 0; row < this._rows; row++) {
                for (let col = 0; col < this._cols[row]; col++) {
                    if (this._matrix[row][col] === firstChar) {
                        for (const vector of VECTORS) {
                            let found = true;
                            for (let i = 1; i < wordLength; i++) {
                                const currentRow = row + vector[0] * i;
                                const currentCol = col + vector[1] * i;

                                if (
                                    currentRow < 0 ||
                                    currentRow >= this._rows ||
                                    currentCol < 0 ||
                                    currentCol >= this._cols[currentRow] ||
                                    this._matrix[currentRow][currentCol] !== word[i]
                                ) {
                                    found = false;
                                    break;
                                }
                            }

                            if (found) {
                                const endRow = row + vector[0] * (wordLength - 1);
                                const endCol = col + vector[1] * (wordLength - 1);
                                result[word] = {
                                    start: [row + 1, col + 1],
                                    end: [endRow + 1, endCol + 1],
                                };
                                break;
                            }
                        }
                        if (result[word]) break;
                    }
                }
                if (result[word]) break;
            }
        }

        this._words = result;
        return this._words;
    }
}