export function transpose(initialMtx: string[]): string[] {
    const numRows = initialMtx.length;
    const numCols = maxRowLength(initialMtx);
    const transposeMtx: string[] = Array(numCols).fill('');

    for (let col = 0; col < numCols; col++) {
        let transposedRow = '';
        for (let row = 0; row < numRows; row++) {
            const char = initialMtx[row][col];
            if (char !== undefined) {
                transposedRow += char;
            } else if (areCharsAhead(row, col, initialMtx)) {
                transposedRow += ' ';
            }
        }
        transposeMtx[col] = transposedRow;
    }

    return transposeMtx;
}

function areCharsAhead(row: number, idx: number, initialMtx: string[]): boolean {
    for (let i = row + 1; i < initialMtx.length; i++) {
        if (initialMtx[i][idx]) {
            return true;
        }
    }
    return false;
}

function maxRowLength(initialMtx: string[]): number {
    let maxLength = 0;
    for (let i = 0; i < initialMtx.length; i++) {
        const rowLength = initialMtx[i].length;
        if (rowLength > maxLength) {
            maxLength = rowLength;
        }
    }
    return maxLength;
}