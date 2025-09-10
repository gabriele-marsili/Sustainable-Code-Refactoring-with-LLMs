//@ts-check

const MAX_NAME_ATTEMPTS = 1000;

let _usedNames = new Set();

function generateName() {
  const randomString = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  const num = Math.floor(Math.random() * 900) + 100;
  return `${randomString()}${randomString()}${num}`;
}

export class Robot {
  constructor() {
    this.reset();
  }

  reset() {
    let name = generateName();
    let attempts = 0;

    while (_usedNames.has(name) && attempts < MAX_NAME_ATTEMPTS) {
      name = generateName();
      attempts++;
    }

    if (_usedNames.has(name)) {
      throw new Error("Failed to generate a unique name after multiple attempts.");
    }

    _usedNames.add(name);
    this._name = name;
  }

  static releaseNames() {
    _usedNames = new Set();
  }

  get name() {
    return this._name;
  }
}