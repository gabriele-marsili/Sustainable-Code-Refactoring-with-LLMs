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

    canAttackDiagonal = () =>
        Math.abs((this.white[0] - this.black[0]) / (this.white[1] - this.black[1])) === 1

    canAttack = () => this.canAttackHorizontalOrVertical() || this.canAttackDiagonal()

    toString = () => {
        let s = ''
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                if (sameField(this.black, [x, y])) {
                    s += 'B'
                } else if (sameField(this.white, [x, y])) {
                    s += 'W'
                } else {
                    s += '_'
                }
                if (y < 7) {
                    s += ' '
                }
            }
            s += '\n'
        }
        return s
    }
}
