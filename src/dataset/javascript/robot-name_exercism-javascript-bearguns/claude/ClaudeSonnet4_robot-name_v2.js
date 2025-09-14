'use strict'
const NAME_DB = new Set();
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class RobotName {
  constructor() {
    this.name = this.generateUniqueName();
  }

  randomLetter() {
    return LETTERS[Math.floor(Math.random() * 26)];
  }

  randomDigit() {
    return Math.floor(Math.random() * 10);
  }

  randomName() {
    return `${this.randomLetter()}${this.randomLetter()}${this.randomDigit()}${this.randomDigit()}${this.randomDigit()}`;
  }

  generateUniqueName() {
    let name;
    do {
      name = this.randomName();
    } while (NAME_DB.has(name));
    
    NAME_DB.add(name);
    return name;
  }

  reset() {
    this.name = this.generateUniqueName();
  }
}

export default RobotName;