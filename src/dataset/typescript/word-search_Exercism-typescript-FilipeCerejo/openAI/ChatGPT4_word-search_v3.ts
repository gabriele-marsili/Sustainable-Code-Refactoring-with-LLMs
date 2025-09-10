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
    private _matrix: string[];
    private _words: WordsType;

    constructor(matrix: string[]) {
        this._matrix = matrix;
        this._words = {};
    }

    public find(words: string[]): WordsType {
        const rows = this._matrix.length;
        const cols = this._matrix[0]?.length || 0;

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

    private checkWord(word: string, x: number, y: number, dx: number, dy: number): boolean {
        for (let i = 1; i < word.length; i++) {
            x += dx;
            y += dy;
            if (!this.isValid(x, y) || this._matrix[x][y] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    private isValid(x: number, y: number): boolean {
        return x >= 0 && x < this._matrix.length && y >= 0 && y < this._matrix[0].length;
    }
}