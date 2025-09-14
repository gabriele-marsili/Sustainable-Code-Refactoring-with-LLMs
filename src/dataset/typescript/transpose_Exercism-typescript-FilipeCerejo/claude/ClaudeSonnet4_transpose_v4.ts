export function transpose(initialMtx: string[]): string[] {
    if (initialMtx.length === 0) return [];
    
    const maxLength = Math.max(...initialMtx.map(row => row.length));
    const transposeMtx: string[] = new Array(maxLength);
    
    for (let col = 0; col < maxLength; col++) {
        let column = '';
        for (let row = 0; row < initialMtx.length; row++) {
            const char = initialMtx[row][col];
            if (char !== undefined) {
                column += char;
            } else if (hasCharBelow(row, col, initialMtx)) {
                column += ' ';
            }
        }
        transposeMtx[col] = column;
    }
    
    return transposeMtx;
}

function hasCharBelow(row: number, col: number, initialMtx: string[]): boolean {
    for (let i = row + 1; i < initialMtx.length; i++) {
        if (initialMtx[i][col] !== undefined) {
            return true;
        }
    }
    return false;
}

function maxRowLength(initialMtx: string[]): number {
    let max = 0;
    for (const row of initialMtx) {
        if (row.length > max) {
            max = row.length;
        }
    }
    return max;
}