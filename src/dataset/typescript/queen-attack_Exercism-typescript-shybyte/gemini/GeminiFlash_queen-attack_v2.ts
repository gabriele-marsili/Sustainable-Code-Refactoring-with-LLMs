type Pos = [number, number];

const sameField = (field1: Pos, field2: Pos): boolean => {
  return field1[0] === field2[0] && field1[1] === field2[1];
};

export default class QueenAttack {
  private readonly white: Pos;
  private readonly black: Pos;

  constructor({ white, black }: { white: Pos; black: Pos }) {
    if (sameField(white, black)) {
      throw new Error('Queens cannot share the same space');
    }

    this.white = white;
    this.black = black;
  }

  canAttack(): boolean {
    const [x1, y1] = this.white;
    const [x2, y2] = this.black;

    return (
      x1 === x2 ||
      y1 === y2 ||
      Math.abs((x1 - x2) / (y1 - y2)) === 1
    );
  }

  toString(): string {
    let boardString = '';
    for (let row = 0; row < 8; row++) {
      let rowString = '';
      for (let col = 0; col < 8; col++) {
        if (this.black[0] === row && this.black[1] === col) {
          rowString += 'B';
        } else if (this.white[0] === row && this.white[1] === col) {
          rowString += 'W';
        } else {
          rowString += '_';
        }

        if (col < 7) {
          rowString += ' ';
        }
      }
      boardString += rowString + '\n';
    }
    return boardString;
  }
}