function count3x3Window(board: string[], centerX: number, centerY: number): number {
    let sum = 0;
    for (let deltaY = -1; deltaY <= 1; deltaY++) {
        const row = board[centerY + deltaY];
        if (!row) continue;
        for (let deltaX = -1; deltaX <= 1; deltaX++) {
            if (row[centerX + deltaX] === '*') sum++;
        }
    }
    return sum;
}

export default class Minesweeper {
    annotate(board: string[]): string[] {
        const height = board.length;
        const width = board[0]?.length || 0;

        return board.map((row, centerY) => {
            const resultRow = new Array(width);
            for (let centerX = 0; centerX < width; centerX++) {
                const cell = row[centerX];
                resultRow[centerX] = cell === ' ' 
                    ? (count3x3Window(board, centerX, centerY) || ' ') 
                    : cell;
            }
            return resultRow.join('');
        });
    }
}