export function transpose(initialMtx: string[]): string[] {
    const numRows = initialMtx.length;
    const maxLen = maxRowLength(initialMtx);
    const transposeMtx: string[] = Array(maxLen).fill('');

    for (let j = 0; j < maxLen; j++) {
        let transposedRow = '';
        for (let i = 0; i < numRows; i++) {
            const char = initialMtx[i][j];
            if (char) {
                transposedRow += char;
            } else if (areCharsAhead(i, j, initialMtx)) {
                transposedRow += ' ';
            } else {
                transposedRow += '';
            }
        }
        transposeMtx[j] = transposedRow;
    }

    return transposeMtx;
}

function areCharsAhead(row: number, idx: number, initialMtx: string[]): boolean {
    for (let i = row + 1; i < initialMtx.length; i++) {
        if (initialMtx[i] && initialMtx[i][idx]) {
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