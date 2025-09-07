'use strict'
import bigInt from './big-integer.js';

class Grains {
  constructor() {
    // Pre-compute powers of 2 more efficiently
    this.chessboard = new Array(64);
    let current = bigInt(1);
    for (let i = 0; i < 64; i++) {
      this.chessboard[i] = current.toString();
      current = current.shiftLeft(1); // More efficient than multiply by 2
    }
  }

  doubleInt(num) {
    return bigInt(num).shiftLeft(1).toString();
  }

  square(index) {
    return this.chessboard[index - 1];
  }

  total() {
    // Use mathematical formula: 2^64 - 1 instead of summing all values
    return bigInt(1).shiftLeft(64).subtract(1).toString();
  }
}

export default Grains;