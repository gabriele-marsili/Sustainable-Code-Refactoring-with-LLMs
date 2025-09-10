export function transpose(initialMtx: string[]): string[] {
    const maxLen = maxRowLength(initialMtx);
    const transposeMtx: string[] = Array(maxLen).fill('');

    for (let row = 0; row < initialMtx.length; row++) {
        for (let col = 0; col < maxLen; col++) {
            transposeMtx[col] += initialMtx[row][col] ?? (col < initialMtx[row].length || hasCharsBelow(row, col, initialMtx) ? ' ' : '');
        }
    }

    return transposeMtx;
}

// Check if there are characters below the current position
function hasCharsBelow(row: number, col: number, initialMtx: string[]): boolean {
    for (let i = row + 1; i < initialMtx.length; i++) {
        if (initialMtx[i][col]) return true;
    }
    return false;
}

// Get the length of the longest row
function maxRowLength(initialMtx: string[]): number {
    return Math.max(0, ...initialMtx.map(row => row.length));
}