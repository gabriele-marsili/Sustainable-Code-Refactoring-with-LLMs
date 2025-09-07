const BOARD_SIZE = 8;
type Coordinates = [number, number];

export default class QueenAttack {
  white: Coordinates;
  black: Coordinates;

  constructor({ white, black }: { white: Coordinates; black: Coordinates }) {
    if (white[0] === black[0] && white[1] === black[1]) {
      throw 'Queens cannot share the same space';
    }
    this.white = white;
    this.black = black;
  }

  toString() {
    const board = Array.from({ length: BOARD_SIZE }, (_, row) =>
      Array.from({ length: BOARD_SIZE }, (_, col) =>
        row === this.white[0] && col === this.white[1]
          ? 'W'
          : row === this.black[0] && col === this.black[1]
          ? 'B'
          : '_'
      ).join(' ')
    );

    return board.join('\n') + '\n';
  }

  canAttack() {
    const [wRow, wCol] = this.white;
    const [bRow, bCol] = this.black;

    return wRow === bRow || wCol === bCol || Math.abs(wRow - bRow) === Math.abs(wCol - bCol);
  }
}