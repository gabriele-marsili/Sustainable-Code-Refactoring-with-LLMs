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
    private _rows: number;
    private _cols: number;

    constructor(matrix: string[]) {
        this._matrix = matrix;
        this._rows = matrix.length;
        this._cols = matrix[0]?.length || 0;
    }

    public find(words: string[]): WordsType {
        const result: WordsType = {};
        const uniqueWords = [...new Set(words)];
        
        for (const word of uniqueWords) {
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
            for (let col = 0; col < this._cols; col++) {
                if (matrixRow[col] !== firstChar) continue;
                
                for (const [dr, dc] of VECTORS) {
                    if (this.checkDirection(word, row, col, dr, dc, wordLength)) {
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

    private checkDirection(word: string, startRow: number, startCol: number, dr: number, dc: number, wordLength: number): boolean {
        const endRow = startRow + dr * (wordLength - 1);
        const endCol = startCol + dc * (wordLength - 1);
        
        if (endRow < 0 || endRow >= this._rows || endCol < 0 || endCol >= this._cols) {
            return false;
        }
        
        for (let i = 1; i < wordLength; i++) {
            const currentRow = startRow + dr * i;
            const currentCol = startCol + dc * i;
            
            if (this._matrix[currentRow][currentCol] !== word[i]) {
                return false;
            }
        }
        
        return true;
    }
}