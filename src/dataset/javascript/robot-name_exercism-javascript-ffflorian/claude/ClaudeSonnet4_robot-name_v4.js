//@ts-check

/** @type {Set<string>} */
let _usedNames = new Set();

export class Robot {
  constructor() {
    this.reset();
  }

  /**
   * @private
   * @returns {string}
   */
  _generateName() {
    let name;
    do {
      const char1 = String.fromCharCode((Math.random() * 26 | 0) + 65);
      const char2 = String.fromCharCode((Math.random() * 26 | 0) + 65);
      const num = (Math.random() * 900 | 0) + 100;
      name = char1 + char2 + num;
    } while (_usedNames.has(name));
    
    _usedNames.add(name);
    return name;
  }

  static releaseNames() {
    _usedNames.clear();
  }

  get name() {
    return this._name;
  }

  reset() {
    this._name = this._generateName();
  }
}