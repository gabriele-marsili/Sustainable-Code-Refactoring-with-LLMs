export function transpose(initialMtx: string[]): string[] {
    const maxLen = maxRowLength(initialMtx);
    const transposeMtx: string[] = Array(maxLen).fill('');

    for (let row = 0; row < initialMtx.length; row++) {
        for (let col = 0; col < maxLen; col++) {
            const char = initialMtx[row][col] ?? (col < initialMtx[row].length || areCharsAhead(row, col, initialMtx) ? ' ' : '');
            transposeMtx[col] += char;
        }
    }

    return transposeMtx;
}

function areCharsAhead(row: number, idx: number, initialMtx: string[]): boolean {
    for (let i = row + 1; i < initialMtx.length; i++) {
        if (initialMtx[i][idx]) return true;
    }
    return false;
}

function maxRowLength(initialMtx: string[]): number {
    return Math.max(0, ...initialMtx.map(row => row.length));
}