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

function isValid(row: number, col: number, numRows: number, numCols: number): boolean {
    return !(row < 0 || row >= numRows || col < 0 || col >= numCols);
}

function isMine(row: number, col: number, field: string[]): boolean {
    return field[row][col] === '*';
}

export function annotate(field: string[]): string[] {
    const numRows = field.length;
    if (numRows === 0) return [];
    const numCols = field[0].length;

    const result: string[] = field.map(row => row.split('').join('')); // Create a mutable copy

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (result[row][col] === ' ') {
                let sum = 0;
                for (const adj of ADJACENTS) {
                    const newRow = row + adj[0];
                    const newCol = col + adj[1];

                    if (isValid(newRow, newCol, numRows, numCols) && isMine(newRow, newCol, field)) {
                        sum++;
                    }
                }
                if (sum > 0) {
                    result[row] = result[row].substring(0, col) + String(sum) + result[row].substring(col + 1);
                }
            }
        }
    }

    return result;
}