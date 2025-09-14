export default class ISBN {
  constructor(digits) {
    this.digits = digits;
  }

  isValid() {
    const length = this.digits.length;
    let sum = 0;
    let digit = 10;
    
    for (let i = 0; i < length; i++) {
      if (digit <= 0) return false;
      
      const char = this.digits[i];
      const charCode = char.charCodeAt(0);
      
      if (charCode >= 48 && charCode <= 57) {
        sum += digit * (charCode - 48);
        digit--;
      } else if (digit === 1 && char === 'X') {
        sum += 10;
        digit--;
      }
    }
    
    return digit === 0 && sum % 11 === 0;
  }
}