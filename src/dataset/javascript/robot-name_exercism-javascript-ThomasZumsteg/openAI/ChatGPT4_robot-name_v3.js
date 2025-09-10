class Robot {
  constructor() {
    this.name = generateUniqueName();
  }

  reset() {
    namesInUse.delete(this.name);
    this.name = generateUniqueName();
  }
}

const namesInUse = new Set();
const CHAR_CODES = {
  A: 'A'.charCodeAt(0),
  Z: 'Z'.charCodeAt(0),
  ZERO: '0'.charCodeAt(0),
  NINE: '9'.charCodeAt(0),
};

function generateRandomCharCode(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateName() {
  const letters = String.fromCharCode(
    generateRandomCharCode(CHAR_CODES.A, CHAR_CODES.Z),
    generateRandomCharCode(CHAR_CODES.A, CHAR_CODES.Z)
  );
  const digits = String.fromCharCode(
    generateRandomCharCode(CHAR_CODES.ZERO, CHAR_CODES.NINE),
    generateRandomCharCode(CHAR_CODES.ZERO, CHAR_CODES.NINE),
    generateRandomCharCode(CHAR_CODES.ZERO, CHAR_CODES.NINE)
  );
  return letters + digits;
}

function generateUniqueName() {
  let name;
  do {
    name = generateName();
  } while (namesInUse.has(name));
  namesInUse.add(name);
  return name;
}

export default Robot;