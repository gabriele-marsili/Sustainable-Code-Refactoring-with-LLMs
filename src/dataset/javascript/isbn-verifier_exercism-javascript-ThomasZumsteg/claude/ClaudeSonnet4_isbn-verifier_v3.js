export default class ISBN {
  constructor(digits) {
    this.digits = digits;
  }

  isValid() {
    const len = this.digits.length;
    if (len !== 10) return false;
    
    let sum = 0;
    let digit = 10;
    
    for (let i = 0; i < len; i++) {
      const char = this.digits[i];
      
      if (char >= '0' && char <= '9') {
        sum += digit * (char - '0');
        digit--;
      } else if (digit === 1 && char === 'X') {
        sum += 10;
        digit--;
      } else {
        return false;
      }
    }
    
    return digit === 0 && sum % 11 === 0;
  }
}