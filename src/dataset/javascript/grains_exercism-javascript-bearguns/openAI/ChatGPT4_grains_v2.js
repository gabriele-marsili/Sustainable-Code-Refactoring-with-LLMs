'use strict'
import bigInt from './big-integer.js';

class Grains {
  constructor() {
    this.precomputedSquares = Array.from({ length: 64 }, (_, index) => bigInt(2).pow(index));
    this.totalSum = this.precomputedSquares.reduce((sum, value) => sum.add(value), bigInt(0));
  }

  square(index) {
    return this.precomputedSquares[index - 1].toString();
  }

  total() {
    return this.totalSum.toString();
  }
}

export default Grains;