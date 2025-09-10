//@ts-check

const usedNames = new Set();

function generateName() {
  let name;
  do {
    const randomString = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const num = Math.floor(Math.random() * 900) + 100;
    name = `${randomString()}${randomString()}${num}`;
  } while (usedNames.has(name));
  usedNames.add(name);
  return name;
}

export class Robot {
  constructor() {
    this.reset();
  }

  reset() {
    this._name = generateName();
  }

  static releaseNames() {
    usedNames.clear();
  }

  get name() {
    return this._name;
  }
}