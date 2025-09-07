'use strict'
import bigInt from './big-integer.js';

class Grains {
  constructor() {
    // Pre-compute only when needed, not in constructor
    this._chessboard = null;
  }

  _getChessboard() {
    if (!this._chessboard) {
      this._chessboard = new Array(64);
      let current = bigInt(1);
      this._chessboard[0] = current.toString();
      
      for (let i = 1; i < 64; i++) {
        current = current.shiftLeft(1); // More efficient than multiply by 2
        this._chessboard[i] = current.toString();
      }
    }
    return this._chessboard;
  }

  square(index) {
    // Calculate on demand without pre-computing entire array
    return bigInt(1).shiftLeft(index - 1).toString();
  }

  total() {
    // Use mathematical formula: 2^64 - 1
    return bigInt(1).shiftLeft(64).subtract(1).toString();
  }
}

export default Grains;