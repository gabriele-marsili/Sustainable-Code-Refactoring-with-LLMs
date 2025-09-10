//@ts-check

const usedNames = new Set();

function generateName() {
  let name;
  do {
    const char1 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const char2 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const num = Math.floor(Math.random() * 900) + 100;
    name = `${char1}${char2}${num}`;
  } while (usedNames.has(name));

  usedNames.add(name);
  return name;
}


export class Robot {
  constructor() {
    this.reset();
  }

  static releaseNames() {
    usedNames.clear();
  }

  get name() {
    return this._name;
  }

  reset() {
    this._name = generateName();
  }
}