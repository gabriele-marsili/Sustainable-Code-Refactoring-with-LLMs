class Robot {
  constructor() {
    this.name = getName();
  }

  reset() {
    if (this.name) {
      namesInUse.delete(this.name);
    }
    this.name = getName();
  }
}

const namesInUse = new Set();
const LETTER_A = 65;
const LETTER_Z = 90;
const DIGIT_0 = 48;
const DIGIT_9 = 57;

function getName() {
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const letter = () => rand(LETTER_A, LETTER_Z);
  const digit = () => rand(DIGIT_0, DIGIT_9);
  
  let name;
  do {
    name = String.fromCharCode(letter(), letter(), digit(), digit(), digit());
  } while (namesInUse.has(name));

  namesInUse.add(name);
  return name;
}

export default Robot;