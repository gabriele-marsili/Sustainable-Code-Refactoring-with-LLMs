'use strict'

const NAME_DB = new Set();
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LETTER_COUNT = LETTERS.length;

class RobotName {
  constructor() {
    this.name = this.generateUniqueName();
  }

  randomLetter() {
    return LETTERS[Math.floor(Math.random() * LETTER_COUNT)];
  }

  randomInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
  }

  generateName() {
    return `${this.randomLetter()}${this.randomLetter()}${this.randomInt(0, 9)}${this.randomInt(0, 9)}${this.randomInt(0, 9)}`;
  }

  generateUniqueName() {
    let name = this.generateName();
    while (NAME_DB.has(name)) {
      name = this.generateName();
    }
    NAME_DB.add(name);
    return name;
  }

  reset() {
    this.name = this.generateUniqueName();
  }
}

export default RobotName;