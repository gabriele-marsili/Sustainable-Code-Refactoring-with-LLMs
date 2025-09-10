'use strict'
const NAME_DB = new Set();
class RobotName {
  constructor() {
    this.name = this.generateUniqueName();
  }

  randomLetter() {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  randomInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
  }

  randomName() {
    return `${this.randomLetter()}${this.randomLetter()}${this.randomInt(0, 9)}${this.randomInt(0, 9)}${this.randomInt(0, 9)}`;
  }

  reset() {
    this.name = this.generateUniqueName();
  }

  generateUniqueName() {
    let name;
    do {
      name = this.randomName();
    } while (NAME_DB.has(name));
    NAME_DB.add(name);
    return name;
  }
}

export default RobotName;