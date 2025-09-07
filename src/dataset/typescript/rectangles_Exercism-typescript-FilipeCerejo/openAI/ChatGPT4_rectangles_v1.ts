type DotType = [number, number];
type DotPairsType = [DotType, DotType];

export function count(board: string[]): number {
    let totalCount = 0;
    for (let row = 0; row < board.length; row++) {
        const line = board[row];
        const dots = getAllPlus(line, row);
        const dotCount = dots.length;

        for (let i = 0; i < dotCount - 1; i++) {
            for (let j = i + 1; j < dotCount; j++) {
                totalCount += verticalCheck([dots[i], dots[j]], row, board);
            }
        }
    }
    return totalCount;
}

function verticalCheck(pair: DotPairsType, row: number, board: string[]): number {
    let count = 0;
    const [y0, y1] = [pair[0][1], pair[1][1]];

    for (let c = row + 1; c < board.length; c++) {
        const char0 = board[c][y0];
        const char1 = board[c][y1];

        if ((char0 === '+' || char0 === '|') && (char1 === '+' || char1 === '|')) {
            if (char0 === '+' && char1 === '+') count++;
        } else {
            break;
        }
    }

    return count;
}

function getAllPlus(line: string, row: number): DotType[] {
    const dots: DotType[] = [];
    for (let c = 0, len = line.length; c < len; c++) {
        if (line[c] === '+') {
            dots.push([row, c]);
        }
    }
    return dots;
}