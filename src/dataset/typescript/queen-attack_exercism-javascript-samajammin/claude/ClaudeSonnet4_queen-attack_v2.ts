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
    const board: string[][] = [];
    
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row: string[] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (i === this.white[0] && j === this.white[1]) {
          row.push('W');
        } else if (i === this.black[0] && j === this.black[1]) {
          row.push('B');
        } else {
          row.push('_');
        }
      }
      board.push(row);
    }

    return board.map(row => row.join(' ')).join('\n') + '\n';
  }

  canAttack() {
    const rowDiff = Math.abs(this.white[0] - this.black[0]);
    const colDiff = Math.abs(this.white[1] - this.black[1]);

    return rowDiff === 0 || colDiff === 0 || rowDiff === colDiff;
  }
}