//@ts-check

/** @type {Record<string, boolean>} */
let _usedNames = {};
const MAX_NAMES = 26 * 26 * 900;

export class Robot {
  constructor() {
    this.reset();
  }

  /**
   * @private
   * @returns {string}
   */
  _generateName() {
    if (Object.keys(_usedNames).length >= MAX_NAMES) {
      throw new Error("All possible names have been generated.");
    }

    let name = this._createName();
    while (_usedNames[name]) {
      name = this._createName();
    }

    _usedNames[name] = true;
    return name;
  }

  /**
   * @private
   * @returns {string}
   */
  _createName() {
    const randomString = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const num = Math.floor(Math.random() * 900) + 100;
    return `${randomString()}${randomString()}${num}`;
  }

  static releaseNames() {
    _usedNames = {};
  }

  get name() {
    return this._name;
  }

  reset() {
    this._name = this._generateName();
  }
}