type DotType = [number, number];
type DotPairsType = [DotType, DotType];

export function count(board: string[]): number {
    let count = 0;
    board.forEach((line: string, row: number) => {
        let dots = getAllPlus(line, row);
        let pairs = dotLinePairs(dots);
        pairs.forEach((pair: DotPairsType) => {
            count += verticalCheck(pair, row, board);
        });
    });
    return count;
}

function verticalCheck(pair: DotPairsType, row: number, board: string[]): number {
    let count = 0;
  let countable = true;
    let y0 = pair[0][1];
    let y1 = pair[1][1];

    for (let c = row + 1; c < board.length; c++) {
        if (countable && board[c][y0] === '+' && board[c][y1] === '+') {
            count++;
         } else if ((board[c][y0] !== '|' && board[c][y0] !== '+') || (board[c][y1] !== '|' && board[c][y1] !== '+')) {
            countable = false;
        }
    }

    return count;
}

function dotLinePairs(dots: DotType[]): DotPairsType[] {
    let dotPairs: DotPairsType[] = [];
    dots.forEach((dot: DotType, idx: number, arr: DotType[]) => {
        arr.slice(idx + 1).forEach((nextDot: DotType) => {
            dotPairs.push([dot, nextDot]);
        });
    });
    return dotPairs;
}

function getAllPlus(line: string, row: number): DotType[] {
    let dots: DotType[] = [];
    for (let c = 0; c < line.length; c++) {
        if (line[c] === '+') {
            dots.push([row, c]);
        }
    }
    return dots;
}