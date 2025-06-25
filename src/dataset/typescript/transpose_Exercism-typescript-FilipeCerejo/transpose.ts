export function transpose(initialMtx: string[]): string[] {
    let transposeMtx: string[] = Array.from(Array(maxRowLength(initialMtx)), () => '');

    for (let row = 0; row < initialMtx.length; row++) {
        transposeMtx = transposeMtx.map((c: string, idx: number) => {
            return c + (initialMtx[row][idx] ?? (areCharsAhead(row, idx, initialMtx) ? ' ' : ''));
        });
    }

    return transposeMtx;
}

//calculate if there is the need of white space
function areCharsAhead(row: number, idx: number, initialMtx: string[]): boolean {
    let charAhead = false;
    while (initialMtx[row + 1]) {
        if (initialMtx[row + 1][idx]) {
            charAhead = true;
            break;
        }
        row++;
    }
    return charAhead;
}

//build matrix considering the longest row
function maxRowLength(initialMtx: string[]): number {
    return initialMtx.reduce((acc: number, cur: string) => {
        if (cur.length > acc) acc = cur.length;
        return acc;
    }, 0);
}