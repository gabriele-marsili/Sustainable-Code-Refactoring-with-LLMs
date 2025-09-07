type Pos = [number, number];

const sameField = (field1: Pos, field2: Pos) =>
    field1[0] === field2[0] && field1[1] === field2[1];

export default class QueenAttack {
    white: Pos;
    black: Pos;

    constructor({ white, black }: { white: Pos; black: Pos }) {
        if (white[0] === black[0] && white[1] === black[1]) {
            throw 'Queens cannot share the same space';
        }

        this.white = white;
        this.black = black;
    }

    canAttackHorizontalOrVertical = () =>
        this.white[0] === this.black[0] || this.white[1] === this.black[1];

    canAttackDiagonal = () => {
        const dx = Math.abs(this.white[0] - this.black[0]);
        const dy = Math.abs(this.white[1] - this.black[1]);
        return dx === dy;
    };

    canAttack = () => this.canAttackHorizontalOrVertical() || this.canAttackDiagonal();

    toString = () => {
        const board = Array.from({ length: 8 }, (_, x) =>
            Array.from({ length: 8 }, (_, y) =>
                sameField(this.black, [x, y])
                    ? 'B'
                    : sameField(this.white, [x, y])
                    ? 'W'
                    : '_'
            ).join(' ')
        ).join('\n');
        return board + '\n';
    };
}