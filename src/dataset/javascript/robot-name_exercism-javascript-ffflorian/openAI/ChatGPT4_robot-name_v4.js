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
      const randomString = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const num = 100 + Math.floor(Math.random() * 900);
      name = `${randomString()}${randomString()}${num}`;
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