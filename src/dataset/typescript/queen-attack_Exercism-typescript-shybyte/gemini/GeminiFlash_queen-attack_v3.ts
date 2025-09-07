type Pos = [number, number];

const sameField = (field1: Pos, field2: Pos): boolean => {
  const [x1, y1] = field1;
  const [x2, y2] = field2;
  return x1 === x2 && y1 === y2;
};

export default class QueenAttack {
  private readonly white: Pos;
  private readonly black: Pos;

  constructor({ white, black }: { white: Pos; black: Pos }) {
    if (sameField(white, black)) {
      throw "Queens cannot share the same space";
    }

    this.white = white;
    this.black = black;
  }

  canAttackHorizontalOrVertical(): boolean {
    const [whiteX, whiteY] = this.white;
    const [blackX, blackY] = this.black;
    return whiteX === blackX || whiteY === blackY;
  }

  canAttackDiagonal(): boolean {
    const [whiteX, whiteY] = this.white;
    const [blackX, blackY] = this.black;

    const deltaX = whiteX - blackX;
    const deltaY = whiteY - blackY;

    if (deltaY === 0) return false;

    return Math.abs(deltaX / deltaY) === 1;
  }

  canAttack(): boolean {
    return this.canAttackHorizontalOrVertical() || this.canAttackDiagonal();
  }

  toString(): string {
    let s = "";
    const [whiteX, whiteY] = this.white;
    const [blackX, blackY] = this.black;

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (x === blackX && y === blackY) {
          s += "B";
        } else if (x === whiteX && y === whiteY) {
          s += "W";
        } else {
          s += "_";
        }
        if (y < 7) {
          s += " ";
        }
      }
      s += "\n";
    }
    return s;
  }
}