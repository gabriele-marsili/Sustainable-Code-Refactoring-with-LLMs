export default class ISBN {
  constructor(digits) {
    this.digits = digits;
  }

  isValid() {
    if (this.digits.length !== 10) return false;
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      const char = this.digits[i];
      const value = char === 'X' && i === 9 ? 10 : char.charCodeAt(0) - 48;
      if (value < 0 || value > 10 || (char === 'X' && i !== 9)) return false;
      sum += value * (10 - i);
    }
    return sum % 11 === 0;
  }
}