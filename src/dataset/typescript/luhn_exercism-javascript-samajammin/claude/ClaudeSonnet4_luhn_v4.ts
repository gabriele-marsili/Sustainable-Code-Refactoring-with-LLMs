export default class Luhn {
  public static valid(input: string): boolean {
    let length = 0;
    let sum = 0;
    let isEven = false;
    
    for (let i = input.length - 1; i >= 0; i--) {
      const char = input[i];
      
      if (char === ' ') continue;
      
      const digit = char.charCodeAt(0) - 48;
      if (digit < 0 || digit > 9) return false;
      
      length++;
      
      if (isEven) {
        const doubled = digit * 2;
        sum += doubled > 9 ? doubled - 9 : doubled;
      } else {
        sum += digit;
      }
      
      isEven = !isEven;
    }
    
    return length > 1 && sum % 10 === 0;
  }
}