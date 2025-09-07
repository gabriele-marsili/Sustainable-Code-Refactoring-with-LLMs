type Pos = [number, number]

const sameField = (field1: Pos, field2: Pos) =>
    field1[0] === field2[0] && field1[1] === field2[1]

export default class QueenAttack {
    white: Pos
    black: Pos

    constructor({white, black}: { white: Pos, black: Pos }) {
        if (sameField(white, black)) {
            throw 'Queens cannot share the same space'
        }

        this.white = white
        this.black = black
    }

    canAttackHorizontalOrVertical = () =>
        this.white[0] === this.black[0] || this.white[1] === this.black[1]

    canAttackDiagonal = () => {
        const dx = this.white[0] - this.black[0]
        const dy = this.white[1] - this.black[1]
        return Math.abs(dx) === Math.abs(dy) && dx !== 0
    }

    canAttack = () => this.canAttackHorizontalOrVertical() || this.canAttackDiagonal()

    toString = () => {
        const lines: string[] = []
        const [wx, wy] = this.white
        const [bx, by] = this.black
        
        for (let x = 0; x < 8; x++) {
            const row: string[] = []
            for (let y = 0; y < 8; y++) {
                if (x === bx && y === by) {
                    row.push('B')
                } else if (x === wx && y === wy) {
                    row.push('W')
                } else {
                    row.push('_')
                }
            }
            lines.push(row.join(' '))
        }
        return lines.join('\n') + '\n'
    }
}