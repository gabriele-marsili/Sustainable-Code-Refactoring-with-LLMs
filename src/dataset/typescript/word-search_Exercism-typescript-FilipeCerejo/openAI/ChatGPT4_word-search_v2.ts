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
        const matrix = this._matrix;
        const rows = matrix.length;
        const cols = matrix[0]?.length || 0;

        wordsLoop: for (const word of words) {
            this._words[word] = undefined;
            const wordLen = word.length;

            for (let c = 0; c < rows; c++) {
                for (let r = 0; r < cols; r++) {
                    if (matrix[c][r] !== word[0]) continue;

                    for (const [dx, dy] of VECTORS) {
                        let valid = true;
                        let endPoint: Point = [c, r];

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