function count3x3Window(board: string[], centerX: number, centerY: number) {
    let sum = 0
    for (let deltaY = -1; deltaY <= 1; deltaY++) {
        const row = board[centerY + deltaY]
        if (row) {
            for (let deltaX = -1; deltaX <= 1; deltaX++) {
                if (row[centerX + deltaX] === '*') {
                    sum += 1
                }
            }
        }
    }
    return sum
}

export default class Minesweeper {
    // eslint-disable-next-line class-methods-use-this
    annotate(board: string[]) {
        return board.map((row, centerY) =>
            [...row].map((cell, centerX) => (
                    cell === ' ' ?
                        (count3x3Window(board, centerX, centerY) || ' ') :
                        cell
                )
            ).join('')
        )
    }
}
