'use strict'
import bigInt from './big-integer.js';

class Grains {
  constructor() {
    this.squares = 64;
  }

  square(index) {
    if (index < 1 || index > this.squares) {
      throw new Error('Invalid square index');
    }
    return bigInt(2).pow(index - 1).toString();
  }

  total() {
    return bigInt(2).pow(this.squares).minus(1).toString();
  }
}

export default Grains;