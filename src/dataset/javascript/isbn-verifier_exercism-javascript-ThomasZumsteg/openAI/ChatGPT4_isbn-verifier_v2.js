export default class ISBN {
  constructor(digits) {
    this.digits = digits;
  }

  isValid() {
    if (this.digits.length !== 10) return false;

    let sum = 0;
    for (let i = 0; i < 10; i++) {
      const char = this.digits[i];
      if (i === 9 && char === 'X') {
        sum += 10;
      } else if (char >= '0' && char <= '9') {
        sum += (10 - i) * (char - '0');
      } else {
        return false;
      }
    }
    return sum % 11 === 0;
  }
}