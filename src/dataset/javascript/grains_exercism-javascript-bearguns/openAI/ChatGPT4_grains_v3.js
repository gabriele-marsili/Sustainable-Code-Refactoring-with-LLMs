'use strict';
import bigInt from './big-integer.js';

class Grains {
  constructor() {
    this.chessboard = Array(64).fill(null).map((_, index) => bigInt(2).pow(index).toString());
    this.totalSum = bigInt(2).pow(64).minus(1).toString();
  }

  doubleInt(num) {
    return bigInt(num).times(2).toString();
  }

  square(index) {
    return this.chessboard[index - 1];
  }

  total() {
    return this.totalSum;
  }
}

export default Grains;