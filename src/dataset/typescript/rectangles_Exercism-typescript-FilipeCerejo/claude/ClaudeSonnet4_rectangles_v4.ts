type DotType = [number, number];
type DotPairsType = [DotType, DotType];

export function count(board: string[]): number {
    let count = 0;
    const boardLength = board.length;
    
    for (let row = 0; row < boardLength; row++) {
        const line = board[row];
        const lineLength = line.length;
        
        for (let col = 0; col < lineLength; col++) {
            if (line[col] === '+') {
                for (let nextCol = col + 1; nextCol < lineLength; nextCol++) {
                    if (line[nextCol] === '+') {
                        count += verticalCheck([row, col], [row, nextCol], row, board);
                    }
                }
            }
        }
    }
    return count;
}

function verticalCheck(dot1: DotType, dot2: DotType, row: number, board: string[]): number {
    let count = 0;
    let countable = true;
    const y0 = dot1[1];
    const y1 = dot2[1];
    const boardLength = board.length;

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

function dotLinePairs(dots: DotType[]): DotPairsType[] {
    const dotPairs: DotPairsType[] = [];
    const dotsLength = dots.length;
    
    for (let i = 0; i < dotsLength; i++) {
        for (let j = i + 1; j < dotsLength; j++) {
            dotPairs.push([dots[i], dots[j]]);
        }
    }
    return dotPairs;
}

function getAllPlus(line: string, row: number): DotType[] {
    const dots: DotType[] = [];
    const lineLength = line.length;
    
    for (let c = 0; c < lineLength; c++) {
        if (line[c] === '+') {
            dots.push([row, c]);
        }
    }
    return dots;
}