export function transpose(initialMtx: string[]): string[] {
    const maxLen = Math.max(...initialMtx.map(row => row.length));
    const transposeMtx: string[] = Array(maxLen).fill('');

    for (let row = 0; row < initialMtx.length; row++) {
        for (let col = 0; col < maxLen; col++) {
            transposeMtx[col] += initialMtx[row][col] ?? (col < initialMtx[row].length ? ' ' : '');
        }
    }

    return transposeMtx;
}