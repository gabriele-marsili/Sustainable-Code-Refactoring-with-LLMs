type Pos = [number, number]

function clone<T>(object: T) {
    return JSON.parse(JSON.stringify(object))
}

function getNeighbors([row, col]: Pos): Pos[] {
    return [
        [row, col - 1],
        [row, col + 1],
        [row - 1, col],
        [row + 1, col],
        [row + 1, col - 1],
        [row - 1, col + 1]
    ]
}

export default class Board {
    private readonly content: string[][]

    constructor(boardInput: string[]) {
        this.content = boardInput.map((row) => [...row.replace(/ /g, '')])
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
        const cols = this.content[0].length
        const isRightBorder = ([_row, col]: Pos) => col === cols
        return this.canConnect('X',
            this.content.map((_row, rowIndex) => [rowIndex, -1] as Pos),
            isRightBorder
        )
    }

    canConnectO() {
        const rows = this.content.length
        const isBottomBorder = ([row, _col]: Pos) => row === rows
        return this.canConnect('O',
            this.content[0].map((_cell, colIndex) => [-1, colIndex] as Pos),
            isBottomBorder
        )
    }

    canConnect(player: string, startBorderFields: Pos[], isFinalBorder: (p: Pos) => boolean) {
        const boardContent = clone(this.content)
        const fieldStack = clone((startBorderFields))

        while (fieldStack.length > 0) {
            const field = fieldStack.pop()
            const neighbors = getNeighbors(field)
            for (const neighbor of neighbors) {
                if (isFinalBorder(neighbor)) {
                    return true
                }
                const [row, col] = neighbor
                if (boardContent[row] && boardContent[row][col] === player) {
                    boardContent[row][col] = '!' // mark field as visited
                    fieldStack.push(neighbor)
                }
            }
        }

        return false
    }
}
