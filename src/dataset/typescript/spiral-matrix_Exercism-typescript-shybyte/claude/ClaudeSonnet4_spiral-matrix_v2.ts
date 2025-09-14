type Pos = [number, number]

const MOVEMENTS = [[1, 0], [0, 1], [-1, 0], [0, -1]] as const
const EMPTY_FIELD = -1

function ofSize(size: number) {
    const matrix: number[][] = Array(size)
    for (let i = 0; i < size; i++) {
        matrix[i] = Array(size).fill(EMPTY_FIELD)
    }
    
    const n = size * size
    let x = 0, y = 0
    let direction = 0
    
    for (let i = 1; i <= n; i++) {
        matrix[y][x] = i
        
        const [dx, dy] = MOVEMENTS[direction]
        const nextX = x + dx
        const nextY = y + dy
        
        if (nextX >= 0 && nextX < size && nextY >= 0 && nextY < size && matrix[nextY][nextX] === EMPTY_FIELD) {
            x = nextX
            y = nextY
        } else {
            direction = (direction + 1) & 3
            const [newDx, newDy] = MOVEMENTS[direction]
            x += newDx
            y += newDy
        }
    }
    return matrix
}

export default {ofSize}