'use strict';
const NAME_DB = new Set();

class RobotName {
  constructor() {
    this.name = this.generateUniqueName();
  }

  static randomLetter() {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  static randomDigit() {
    return Math.floor(Math.random() * 10);
  }

  static randomName() {
    return `${this.randomLetter()}${this.randomLetter()}${this.randomDigit()}${this.randomDigit()}${this.randomDigit()}`;
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