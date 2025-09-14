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
    private readonly _matrix: string[];
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
            if (result[word]) continue;
        }
        
        return result;
    }

    private findWord(word: string): { start: Point; end: Point } | undefined {
        if (!word) return undefined;
        
        const firstChar = word[0];
        const wordLength = word.length;
        
        for (let row = 0; row < this._rows; row++) {
            const matrixRow = this._matrix[row];
            for (let col = 0; col < matrixRow.length; col++) {
                if (matrixRow[col] !== firstChar) continue;
                
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

    private searchDirection(word: string, startRow: number, startCol: number, dr: number, dc: number, wordLength: number): boolean {
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