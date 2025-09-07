class Queens {
  constructor(args) {
    this.white = (args?.white) || [0, 3];
    this.black = (args?.black) || [7, 3];
    if (this.white[0] === this.black[0] && this.white[1] === this.black[1]) {
      throw "Queens cannot share the same space";
    }
  }

  toString() {
    let result = '';
    const whiteRow = this.white[0];
    const whiteCol = this.white[1];
    const blackRow = this.black[0];
    const blackCol = this.black[1];
    
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i === whiteRow && j === whiteCol) {
          result += 'W';
        } else if (i === blackRow && j === blackCol) {
          result += 'B';
        } else {
          result += '_';
        }
        if (j < 7) result += ' ';
      }
      result += '\n';
    }
    return result;
  }

  canAttack() {
    const rowDiff = Math.abs(this.black[0] - this.white[0]);
    const colDiff = Math.abs(this.black[1] - this.white[1]);
    return rowDiff === 0 || colDiff === 0 || rowDiff === colDiff;
  }
}

export default Queens;