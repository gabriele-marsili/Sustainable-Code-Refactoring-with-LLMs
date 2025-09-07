type DotType = [number, number];
type DotPairsType = [DotType, DotType];

export function count(board: string[]): number {
    let count = 0;
    const boardLength = board.length;
    
    for (let row = 0; row < boardLength; row++) {
        const line = board[row];
        const dots = getAllPlus(line, row);
        
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                count += verticalCheck([dots[i], dots[j]], row, board, boardLength);
            }
        }
    }
    return count;
}

function verticalCheck(pair: DotPairsType, row: number, board: string[], boardLength: number): number {
    let count = 0;
    let countable = true;
    const y0 = pair[0][1];
    const y1 = pair[1][1];

    for (let c = row + 1; c < boardLength && countable; c++) {
        const char0 = board[c][y0];
        const char1 = board[c][y1];
        
        if (char0 === '+' && char1 === '+') {
            count++;
        } else if ((char0 !== '|' && char0 !== '+') || (char1 !== '|' && char1 !== '+')) {
            countable = false;
        }
    }

    return count;
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