function count3x3Window(board: string[], centerX: number, centerY: number): number {
    let sum = 0;
    const boardHeight = board.length;
    const rowWidth = board[0]?.length || 0;
    
    const startY = Math.max(0, centerY - 1);
    const endY = Math.min(boardHeight - 1, centerY + 1);
    const startX = Math.max(0, centerX - 1);
    const endX = Math.min(rowWidth - 1, centerX + 1);
    
    for (let y = startY; y <= endY; y++) {
        const row = board[y];
        for (let x = startX; x <= endX; x++) {
            if (row[x] === '*') {
                sum++;
            }
        }
    }
    return sum;
}

export default class Minesweeper {
    annotate(board: string[]): string[] {
        if (board.length === 0) return board;
        
        const result: string[] = new Array(board.length);
        
        for (let y = 0; y < board.length; y++) {
            const row = board[y];
            let newRow = '';
            
            for (let x = 0; x < row.length; x++) {
                if (row[x] === ' ') {
                    const count = count3x3Window(board, x, y);
                    newRow += count || ' ';
                } else {
                    newRow += row[x];
                }
            }
            result[y] = newRow;
        }
        
        return result;
    }
}