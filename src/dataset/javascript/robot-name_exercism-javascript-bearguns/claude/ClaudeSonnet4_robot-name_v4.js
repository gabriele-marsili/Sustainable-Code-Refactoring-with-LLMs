'use strict'
const NAME_DB = new Set();
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class RobotName {
  constructor() {
    this.name = this.randomName();
  }

  randomLetter() {
    return LETTERS[Math.floor(Math.random() * 26)];
  }

  randomInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
  }

  randomName() {
    return `${this.randomLetter()}${this.randomLetter()}${this.randomInt(0,9)}${this.randomInt(0,9)}${this.randomInt(0,9)}`;
  }

  reset() {
    let newname = this.returnUnique();
    this.name = newname;
  }

  returnUnique() {
    let name = this.randomName();
    
    while (NAME_DB.has(name)) {
      name = this.randomName();
    }
    
    NAME_DB.add(name);
    return name;
  }
}

export default RobotName;