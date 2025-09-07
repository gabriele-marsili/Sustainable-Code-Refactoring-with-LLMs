type Pos = [number, number];

const sameField = (field1: Pos, field2: Pos): boolean =>
  field1[0] === field2[0] && field1[1] === field2[1];

export default class QueenAttack {
  white: Pos;
  black: Pos;

  constructor({ white, black }: { white: Pos; black: Pos }) {
    if (sameField(white, black)) {
      throw "Queens cannot share the same space";
    }

    this.white = white;
    this.black = black;
  }

  canAttackHorizontalOrVertical = (): boolean =>
    this.white[0] === this.black[0] || this.white[1] === this.black[1];

  canAttackDiagonal = (): boolean => {
    const xDiff = this.white[0] - this.black[0];
    const yDiff = this.white[1] - this.black[1];
    return Math.abs(xDiff) === Math.abs(yDiff);
  };

  canAttack = (): boolean =>
    this.canAttackHorizontalOrVertical() || this.canAttackDiagonal();

  toString = (): string => {
    let s = "";
    const whiteX = this.white[0];
    const whiteY = this.white[1];
    const blackX = this.black[0];
    const blackY = this.black[1];

    for (let x = 0; x < 8; x++) {
      let row = "";
      for (let y = 0; y < 8; y++) {
        if (x === blackX && y === blackY) {
          row += "B";
        } else if (x === whiteX && y === whiteY) {
          row += "W";
        } else {
          row += "_";
        }
        if (y < 7) {
          row += " ";
        }
      }
      s += row + "\n";
    }
    return s;
  };
}