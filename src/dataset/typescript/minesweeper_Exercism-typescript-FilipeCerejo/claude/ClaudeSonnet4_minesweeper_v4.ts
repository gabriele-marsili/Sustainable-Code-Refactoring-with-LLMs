const ADJACENTS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
] as const;
type Point = [number, number];

function isValid(p: Point, field: string[]): boolean {
    return !(p[0] < 0 || p[0] >= field.length || p[1] < 0 || p[1] >= field[p[0]].length);
}

function isMine(p: Point, field: string[]): boolean {
    return field[p[0]][p[1]] === '*';
}

function replaceChar(s: string, idx: number, replacement: string): string {
    return s.substring(0, idx) + replacement + s.substring(idx + 1);
}

export function annotate(field: string[]): string[] {
    const fieldLength = field.length;
    
    for (let row = 0; row < fieldLength; row++) {
        const currentRow = field[row];
        const rowLength = currentRow.length;
        
        for (let col = 0; col < rowLength; col++) {
            if (currentRow[col] === ' ') {
                let sum = 0;
                
                for (let i = 0; i < 8; i++) {
                    const adj = ADJACENTS[i];
                    const newRow = row + adj[0];
                    const newCol = col + adj[1];
                    
                    if (newRow >= 0 && newRow < fieldLength && 
                        newCol >= 0 && newCol < field[newRow].length && 
                        field[newRow][newCol] === '*') {
                        sum++;
                    }
                }
                
                if (sum > 0) {
                    field[row] = replaceChar(currentRow, col, String(sum));
                }
            }
        }
    }

    return field;
}