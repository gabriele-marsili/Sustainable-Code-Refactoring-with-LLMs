type Pos = [number, number]

const NEIGHBORS_OFFSETS: ReadonlyArray<Pos> = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [1, -1],
    [-1, 1]
] as const

function getNeighbors([row, col]: Pos): Pos[] {
    return NEIGHBORS_OFFSETS.map(([dr, dc]) => [row + dr, col + dc])
}

export default class Board {
    private readonly content: string[][]
    private readonly rows: number
    private readonly cols: number

    constructor(boardInput: string[]) {
        this.content = boardInput.map((row) => [...row.replace(/ /g, '')])
        this.rows = this.content.length
        this.cols = this.content[0].length
    }

    winner() {
        if (this.canConnectX()) {
            return 'X'
        } else if (this.canConnectO()) {
            return 'O'
        } else {
            return ''
        }
    }

    canConnectX() {
        const startBorderFields: Pos[] = []
        for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
            startBorderFields.push([rowIndex, -1])
        }
        const isRightBorder = ([_row, col]: Pos) => col === this.cols
        return this.canConnect('X', startBorderFields, isRightBorder)
    }

    canConnectO() {
        const startBorderFields: Pos[] = []
        for (let colIndex = 0; colIndex < this.cols; colIndex++) {
            startBorderFields.push([-1, colIndex])
        }
        const isBottomBorder = ([row, _col]: Pos) => row === this.rows
        return this.canConnect('O', startBorderFields, isBottomBorder)
    }

    canConnect(player: string, startBorderFields: Pos[], isFinalBorder: (p: Pos) => boolean) {
        const visited = new Set<string>()
        const fieldStack = [...startBorderFields]

        while (fieldStack.length > 0) {
            const field = fieldStack.pop()!
            const neighbors = getNeighbors(field)
            
            for (const neighbor of neighbors) {
                if (isFinalBorder(neighbor)) {
                    return true
                }
                
                const [row, col] = neighbor
                if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
                    if (this.content[row][col] === player) {
                        const key = `${row},${col}`
                        if (!visited.has(key)) {
                            visited.add(key)
                            fieldStack.push(neighbor)
                        }
                    }
                }
            }
        }

        return false
    }
}