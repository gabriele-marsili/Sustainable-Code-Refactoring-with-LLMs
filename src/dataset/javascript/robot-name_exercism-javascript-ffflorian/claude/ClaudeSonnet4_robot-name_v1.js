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
      const letter1 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      const letter2 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      const num = Math.floor(Math.random() * 900) + 100;
      name = `${letter1}${letter2}${num}`;
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