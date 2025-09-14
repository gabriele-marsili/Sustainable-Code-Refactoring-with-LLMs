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
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
      const letter1 = String.fromCharCode((Math.random() * 26) | 0 + 65);
      const letter2 = String.fromCharCode((Math.random() * 26) | 0 + 65);
      const num = ((Math.random() * 900) | 0) + 100;
      name = `${letter1}${letter2}${num}`;
      attempts++;
    } while (_usedNames.has(name) && attempts < maxAttempts);
    
    if (attempts >= maxAttempts) {
      for (let i = 100; i <= 999; i++) {
        for (let j = 0; j < 26; j++) {
          for (let k = 0; k < 26; k++) {
            const candidate = `${String.fromCharCode(65 + j)}${String.fromCharCode(65 + k)}${i}`;
            if (!_usedNames.has(candidate)) {
              name = candidate;
              break;
            }
          }
          if (!_usedNames.has(name)) break;
        }
        if (!_usedNames.has(name)) break;
      }
    }
    
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