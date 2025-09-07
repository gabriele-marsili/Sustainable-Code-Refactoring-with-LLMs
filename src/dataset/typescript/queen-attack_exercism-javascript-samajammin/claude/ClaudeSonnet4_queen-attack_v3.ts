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
    const rows: string[] = [];
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      const cells: string[] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (row === this.white[0] && col === this.white[1]) {
          cells.push('W');
        } else if (row === this.black[0] && col === this.black[1]) {
          cells.push('B');
        } else {
          cells.push('_');
        }
      }
      rows.push(cells.join(' '));
    }
    
    return rows.join('\n') + '\n';
  }

  canAttack() {
    const rowDiff = Math.abs(this.white[0] - this.black[0]);
    const colDiff = Math.abs(this.white[1] - this.black[1]);

    return rowDiff === 0 || colDiff === 0 || rowDiff === colDiff;
  }
}