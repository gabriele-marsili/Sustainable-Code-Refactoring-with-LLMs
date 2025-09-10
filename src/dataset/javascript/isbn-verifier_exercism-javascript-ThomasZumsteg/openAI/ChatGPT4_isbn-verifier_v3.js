export default class ISBN {
  constructor(digits) {
    this.digits = digits;
  }

  isValid() {
    if (this.digits.length !== 10) return false;

    let sum = 0;
    for (let i = 0; i < 10; i++) {
      const char = this.digits[i];
      const value = char === 'X' && i === 9 ? 10 : char >= '0' && char <= '9' ? char - '0' : -1;
      if (value === -1) return false;
      sum += value * (10 - i);
    }
    return sum % 11 === 0;
  }
}