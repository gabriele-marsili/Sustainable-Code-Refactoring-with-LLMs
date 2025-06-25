type Pos = [number, number]

const MOVEMENTS = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const EMPTY_FIELD = -1

function nextPos(pos: Pos, direction: number): Pos {
    const movement = MOVEMENTS[direction]
    return [pos[0] + movement[0], pos[1] + movement[1]]
}

function ofSize(size: number) {
    const matrix: number[][] = Array(size).fill(undefined).map(() => Array(size).fill(EMPTY_FIELD))
    const n = size * size
    let pos: Pos = [0, 0]
    let direction = 0
    for (let i = 1; i <= n; i++) {
        matrix[pos[1]][pos[0]] = i
        const pos2 = nextPos(pos, direction)
        if (matrix[pos2[1]] && matrix[pos2[1]][pos2[0]] === EMPTY_FIELD) {
            pos = pos2
        } else {
            direction = (direction + 1) % MOVEMENTS.length
            pos = nextPos(pos, direction)
        }
    }
    return matrix
}

export default {ofSize}
