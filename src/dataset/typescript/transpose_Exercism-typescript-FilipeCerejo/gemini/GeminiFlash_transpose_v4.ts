export function transpose(initialMtx: string[]): string[] {
    const numRows = initialMtx.length;
    const numCols = maxRowLength(initialMtx);
    const transposeMtx: string[] = Array(numCols).fill('');

    for (let j = 0; j < numCols; j++) {
        let transposedRow = '';
        for (let i = 0; i < numRows; i++) {
            transposedRow += initialMtx[i][j] ?? (areCharsAhead(i, j, initialMtx) ? ' ' : '');
        }
        transposeMtx[j] = transposedRow;
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
        maxLength = Math.max(maxLength, initialMtx[i].length);
    }
    return maxLength;
}