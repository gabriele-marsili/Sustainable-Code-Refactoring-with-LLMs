'use strict';

const NAME_DB = new Set();

class RobotName {
  constructor() {
    this.name = this.generateUniqueName();
  }

  static randomLetter() {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26)); // 'A' is 65 in ASCII
  }

  static randomInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
  }

  static randomName() {
    return `${this.randomLetter()}${this.randomLetter()}${this.randomInt(0, 9)}${this.randomInt(0, 9)}${this.randomInt(0, 9)}`;
  }

  generateUniqueName() {
    let name;
    do {
      name = RobotName.randomName();
    } while (NAME_DB.has(name));
    NAME_DB.add(name);
    return name;
  }

  reset() {
    this.name = this.generateUniqueName();
  }
}

export default RobotName;