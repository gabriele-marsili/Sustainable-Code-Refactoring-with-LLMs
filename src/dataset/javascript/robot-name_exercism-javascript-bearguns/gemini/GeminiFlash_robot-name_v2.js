'use strict';

const NAME_DB = new Set();
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';

class RobotName {
  constructor() {
    this.name = this.generateUniqueName();
  }

  randomChar(characters) {
    return characters[Math.floor(Math.random() * characters.length)];
  }

  generateName() {
    let name = '';
    name += this.randomChar(LETTERS);
    name += this.randomChar(LETTERS);
    name += this.randomChar(NUMBERS);
    name += this.randomChar(NUMBERS);
    name += this.randomChar(NUMBERS);
    return name;
  }

  generateUniqueName() {
    let name;
    do {
      name = this.generateName();
    } while (NAME_DB.has(name));

    NAME_DB.add(name);
    return name;
  }


  reset() {
    this.name = this.generateUniqueName();
  }
}

export default RobotName;