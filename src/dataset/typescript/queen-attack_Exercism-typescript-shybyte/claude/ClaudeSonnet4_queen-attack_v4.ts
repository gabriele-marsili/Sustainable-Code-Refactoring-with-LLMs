type Pos = [number, number]

const sameField = (field1: Pos, field2: Pos): boolean =>
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

    canAttackHorizontalOrVertical(): boolean {
        return this.white[0] === this.black[0] || this.white[1] === this.black[1]
    }

    canAttackDiagonal(): boolean {
        const dx = this.white[0] - this.black[0]
        const dy = this.white[1] - this.black[1]
        return Math.abs(dx) === Math.abs(dy) && dx !== 0
    }

    canAttack(): boolean {
        return this.canAttackHorizontalOrVertical() || this.canAttackDiagonal()
    }

    toString(): string {
        const result: string[] = []
        const [whiteX, whiteY] = this.white
        const [blackX, blackY] = this.black
        
        for (let x = 0; x < 8; x++) {
            const row: string[] = []
            for (let y = 0; y < 8; y++) {
                if (x === blackX && y === blackY) {
                    row.push('B')
                } else if (x === whiteX && y === whiteY) {
                    row.push('W')
                } else {
                    row.push('_')
                }
            }
            result.push(row.join(' '))
        }
        return result.join('\n') + '\n'
    }
}