const MOVEMENTS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
] as const;

function getMovementCheck(movementIndex: number, index: number, size: number): boolean {
    switch (movementIndex) {
        case 0:
        case 1:
            return index < size;
        case 2:
        case 3:
            return index >= 0;
        default:
            return false;
    }
}

function nextMovement(movementIdx: number): number {
    let nextMovement = movementIdx + 1;
    if (nextMovement === MOVEMENTS.length) {
        nextMovement = 0;
    }
    return nextMovement;
}

export function ofSize(size: number): number[][] {
    let matrix = Array.from(Array(size), () => new Array(size).fill(0));

    let movementIdx = 0,
        x = 0,
        y = 0;

    for (let m = 1; m <= size ** 2; m++) {
        matrix[x][y] = m;

        let nextX = x + MOVEMENTS[movementIdx][0];
        let nextY = y + MOVEMENTS[movementIdx][1];

        if (getMovementCheck(movementIdx, MOVEMENTS[movementIdx][0] ? nextX : nextY, size) && !matrix[nextX][nextY]) {
            x = nextX;
            y = nextY;
        } else {
            movementIdx = nextMovement(movementIdx);
            x += MOVEMENTS[movementIdx][0];
            y += MOVEMENTS[movementIdx][1];
        }
    }

    return matrix;
}