type Point = [number, number];
type WordsType = {
    [w: string]: { start: Point; end: Point } | undefined;
};

const VECTORS: readonly Point[] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
] as const;

export class WordSearch {
    private readonly _matrix: readonly string[];
    private readonly _rows: number;
    private readonly _cols: number;

    constructor(matrix: string[]) {
        this._matrix = matrix;
        this._rows = matrix.length;
        this._cols = matrix[0]?.length || 0;
    }

    public find(words: string[]): WordsType {
        const result: WordsType = {};
        const wordSet = new Set(words);
        
        for (const word of wordSet) {
            result[word] = this.findWord(word);
        }
        
        return result;
    }

    private findWord(word: string): { start: Point; end: Point } | undefined {
        if (!word || this._rows === 0 || this._cols === 0) return undefined;
        
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

    private searchInDirection(word: string, startRow: number, startCol: number, vector: Point, wordLength: number): boolean {
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