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
    for (let row = 0; row < field.length; row++) {
        for (let col = 0; col < field[row].length; col++) {
            if (field[row][col] === ' ') {
                let sum = 0;
                ADJACENTS.forEach((adj) => {
                    let point = [row + adj[0], col + adj[1]] as Point;
                    if (isValid(point, field) && isMine(point, field)) {
                        sum++;
                    }
                });
                if (sum) {
                    field[row] = replaceChar(field[row], col, String(sum));
                }
            }
        }
    }

    return field;
}