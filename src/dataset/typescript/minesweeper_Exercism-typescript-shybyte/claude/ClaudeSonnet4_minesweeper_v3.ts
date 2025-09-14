function count3x3Window(board: string[], centerX: number, centerY: number): number {
    let sum = 0;
    const startY = Math.max(0, centerY - 1);
    const endY = Math.min(board.length - 1, centerY + 1);
    const startX = Math.max(0, centerX - 1);
    
    for (let y = startY; y <= endY; y++) {
        const row = board[y];
        const endX = Math.min(row.length - 1, centerX + 1);
        
        for (let x = startX; x <= endX; x++) {
            if (row[x] === '*') {
                sum++;
            }
        }
    }
    return sum;
}

export default class Minesweeper {
    // eslint-disable-next-line class-methods-use-this
    annotate(board: string[]) {
        const result: string[] = [];
        
        for (let centerY = 0; centerY < board.length; centerY++) {
            const row = board[centerY];
            let newRow = '';
            
            for (let centerX = 0; centerX < row.length; centerX++) {
                const cell = row[centerX];
                if (cell === ' ') {
                    const count = count3x3Window(board, centerX, centerY);
                    newRow += count || ' ';
                } else {
                    newRow += cell;
                }
            }
            result.push(newRow);
        }
        
        return result;
    }
}