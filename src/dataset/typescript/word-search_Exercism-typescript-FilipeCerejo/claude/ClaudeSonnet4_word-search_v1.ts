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
    private _cols: number;

    constructor(matrix: string[]) {
        this._matrix = matrix;
        this._rows = matrix.length;
        this._cols = matrix[0]?.length || 0;
    }

    public find(words: string[]): WordsType {
        // Reset words object
        this._words = {};
        
        // Pre-initialize all words as undefined
        for (const word of words) {
            this._words[word] = undefined;
        }

        // Create a set of remaining words to find for early termination
        const remainingWords = new Set(words);

        for (let c = 0; c < this._rows; c++) {
            for (let r = 0; r < this._cols; r++) {
                const currentChar = this._matrix[c][r];
                
                // Check only words that start with current character and haven't been found
                for (const word of remainingWords) {
                    if (word[0] === currentChar) {
                        if (this.searchWord(word, c, r)) {
                            remainingWords.delete(word);
                            if (remainingWords.size === 0) {
                                return this._words;
                            }
                        }
                    }
                }
            }
        }
        return this._words;
    }

    private searchWord(word: string, startC: number, startR: number): boolean {
        const wordLength = word.length;
        
        if (wordLength === 1) {
            this._words[word] = {
                start: [startC + 1, startR + 1],
                end: [startC + 1, startR + 1],
            };
            return true;
        }

        for (const [dc, dr] of VECTORS) {
            let found = true;
            
            // Check if the entire word fits in this direction
            const endC = startC + dc * (wordLength - 1);
            const endR = startR + dr * (wordLength - 1);
            
            if (endC < 0 || endC >= this._rows || endR < 0 || endR >= this._cols) {
                continue;
            }

            // Check each character in the word
            for (let i = 1; i < wordLength; i++) {
                const currentC = startC + dc * i;
                const currentR = startR + dr * i;
                
                if (this._matrix[currentC][currentR] !== word[i]) {
                    found = false;
                    break;
                }
            }

            if (found) {
                this._words[word] = {
                    start: [startC + 1, startR + 1],
                    end: [endC + 1, endR + 1],
                };
                return true;
            }
        }
        return false;
    }

    private isValid(p: Point) {
        return !(p[0] < 0 || p[0] >= this._rows || p[1] < 0 || p[1] >= this._cols);
    }
}