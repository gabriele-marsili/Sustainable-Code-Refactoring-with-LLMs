'use strict'
import bigInt from './big-integer.js';

class Grains {
  constructor() {
    // Pre-compute only the first value, calculate others on demand
    this._cache = new Map();
    this._cache.set(0, bigInt(1));
  }

  _getSquareValue(index) {
    if (this._cache.has(index)) {
      return this._cache.get(index);
    }
    
    const value = this._getSquareValue(index - 1).times(2);
    this._cache.set(index, value);
    return value;
  }

  doubleInt(num) {
    return bigInt(num).times(2).toString();
  }

  square(index) {
    return this._getSquareValue(index - 1).toString();
  }

  total() {
    // Use mathematical formula: 2^64 - 1
    return bigInt(2).pow(64).subtract(1).toString();
  }
}

export default Grains;