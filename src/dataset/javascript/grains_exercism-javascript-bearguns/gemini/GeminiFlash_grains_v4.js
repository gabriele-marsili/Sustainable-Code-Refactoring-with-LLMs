'use strict'
import bigInt from './big-integer.js';

class Grains {
  constructor() {
    this.chessboard = new Array(64);
    let previous = bigInt(1);
    this.chessboard[0] = previous.toString();
    for (let i = 1; i < 64; i++) {
      previous = previous.shiftLeft(1);
      this.chessboard[i] = previous.toString();
    }
  }

  square(index) {
    return this.chessboard[index - 1];
  }

  total() {
    return bigInt(2).pow(64).minus(1).toString();
  }
}

export default Grains;