'use strict'
import bigInt from './big-integer.js';

class Grains {
  constructor() {
    this.chessboard = Array(64);
    let previous = bigInt(1);
    this.chessboard[0] = previous.toString();
    for (let i = 1; i < 64; i++) {
      previous = previous.times(2);
      this.chessboard[i] = previous.toString();
    }
  }

  square(index) {
    return this.chessboard[index - 1];
  }

  total() {
    let total = bigInt(0);
    for (let i = 0; i < 64; i++) {
      total = total.add(bigInt(this.chessboard[i]));
    }
    return total.toString();
  }
}

export default Grains;