'use strict'
import bigInt from './big-integer.js';

class Grains {
  constructor() {
    this.chessboard = new Array(64);
    let current = bigInt(1);
    this.chessboard[0] = current.toString();
    
    for (let i = 1; i < 64; i++) {
      current = current.shiftLeft(1);
      this.chessboard[i] = current.toString();
    }
  }

  doubleInt(num) {
    return bigInt(num).shiftLeft(1).toString();
  }

  square(index) {
    return this.chessboard[index - 1];
  }

  total() {
    return bigInt(2).pow(64).subtract(1).toString();
  }
}

export default Grains;