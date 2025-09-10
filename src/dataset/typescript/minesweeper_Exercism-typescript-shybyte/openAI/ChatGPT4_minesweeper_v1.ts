function count3x3Window(board: string[], centerX: number, centerY: number) {
    let sum = 0;
    for (let deltaY = -1; deltaY <= 1; deltaY++) {
        const row = board[centerY + deltaY];
        if (!row) continue;
        for (let deltaX = -1; deltaX <= 1; deltaX++) {
            if (row[centerX + deltaX] === '*') {
                sum++;
            }
        }
    }
    return sum;
}

export default class Minesweeper {
    annotate(board: string[]) {
        const result: string[] = [];
        for (let centerY = 0; centerY < board.length; centerY++) {
            let newRow = '';
            for (let centerX = 0; centerX < board[centerY].length; centerX++) {
                const cell = board[centerY][centerX];
                newRow += cell === ' ' 
                    ? (count3x3Window(board, centerX, centerY) || ' ') 
                    : cell;
            }
            result.push(newRow);
        }
        return result;
    }
}