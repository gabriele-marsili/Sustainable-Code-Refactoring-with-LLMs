export function transpose(initialMtx: string[]): string[] {
    const maxLen = initialMtx.reduce((max, row) => Math.max(max, row.length), 0);
    const transposeMtx: string[] = Array(maxLen).fill('');

    for (let row = 0; row < initialMtx.length; row++) {
        for (let col = 0; col < maxLen; col++) {
            transposeMtx[col] += initialMtx[row][col] ?? (col < maxLen - 1 ? ' ' : '');
        }
    }

    return transposeMtx;
}