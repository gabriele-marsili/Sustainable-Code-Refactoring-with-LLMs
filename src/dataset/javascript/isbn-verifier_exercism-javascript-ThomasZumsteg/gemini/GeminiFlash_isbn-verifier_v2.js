export default class ISBN {
  constructor(digits) {
    this.digits = digits;
  }

  isValid() {
    let sum = 0;
    let digit = 10;
    const digits = this.digits;
    const len = digits.length;

    if (len === 0) return false;

    for (let i = 0; i < len; i++) {
      const d = digits[i];

      if (digit <= 0) {
        return false;
      }

      if (d >= '0' && d <= '9') {
        sum += digit * (d - '0');
        digit--;
      } else if (digit === 1 && d === 'X') {
        sum += digit * 10;
        digit--;
      } else {
        continue;
      }
    }

    return digit === 0 && sum % 11 === 0;
  }
}