type DotType = [number, number];
type DotPairsType = [DotType, DotType];

export function count(board: string[]): number {
    let totalCount = 0;
    for (let row = 0; row < board.length; row++) {
        const line = board[row];
        const dots = getAllPlus(line, row);
        if (dots.length > 1) {
            const pairs = dotLinePairs(dots);
            for (const pair of pairs) {
                totalCount += verticalCheck(pair, row, board);
            }
        }
    }
    return totalCount;
}

function verticalCheck(pair: DotPairsType, row: number, board: string[]): number {
    let count = 0;
    const y0 = pair[0][1];
    const y1 = pair[1][1];
    let countable = true;

    for (let c = row + 1; c < board.length; c++) {
        const boardC = board[c];
        const charY0 = boardC[y0];
        const charY1 = boardC[y1];

        if (countable && charY0 === '+' && charY1 === '+') {
            count++;
        } else if ((charY0 !== '|' && charY0 !== '+') || (charY1 !== '|' && charY1 !== '+')) {
            countable = false;
        }
    }

    return count;
}


function dotLinePairs(dots: DotType[]): DotPairsType[] {
    const dotPairs: DotPairsType[] = [];
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            dotPairs.push([dots[i], dots[j]]);
        }
    }
    return dotPairs;
}

function getAllPlus(line: string, row: number): DotType[] {
    const dots: DotType[] = [];
    for (let c = 0; c < line.length; c++) {
        if (line[c] === '+') {
            dots.push([row, c]);
        }
    }
    return dots;
}