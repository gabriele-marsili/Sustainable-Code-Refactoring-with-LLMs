export default class ISBN {
  constructor(digits) {
    this.digits = digits;
  }

  isValid() {
    const digits = this.digits;
    let sum = 0;
    let digit = 10;
    let i = 0;
    const len = digits.length;

    while (i < len) {
      const char = digits[i];
      if (digit <= 0) {
        return false;
      }

      if (char >= '0' && char <= '9') {
        sum += digit * (char - '0');
        digit--;
      } else if (digit === 1 && char === 'X') {
        sum += digit * 10;
        digit--;
      } else {
        // Invalid character, skip to next
        i++;
        continue;
      }
      i++;
    }

    return digit === 0 && sum % 11 === 0;
  }
}