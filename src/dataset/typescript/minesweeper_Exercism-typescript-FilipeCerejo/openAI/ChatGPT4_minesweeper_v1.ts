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

function isValid(x: number, y: number, rows: number, cols: number): boolean {
    return x >= 0 && x < rows && y >= 0 && y < cols;
}

export function annotate(field: string[]): string[] {
    const rows = field.length;
    const cols = rows > 0 ? field[0].length : 0;
    const result = field.map(row => row.split(''));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (field[row][col] === ' ') {
                let sum = 0;
                for (const [dx, dy] of ADJACENTS) {
                    const x = row + dx;
                    const y = col + dy;
                    if (isValid(x, y, rows, cols) && field[x][y] === '*') {
                        sum++;
                    }
                }
                if (sum > 0) {
                    result[row][col] = String(sum);
                }
            }
        }
    }

    return result.map(row => row.join(''));
}