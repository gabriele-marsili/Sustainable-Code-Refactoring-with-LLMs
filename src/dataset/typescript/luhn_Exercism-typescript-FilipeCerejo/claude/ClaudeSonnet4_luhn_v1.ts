export function valid(digitString: string): boolean {
  let length = 0;
  let sum = 0;
  let change = false;
  
  for (let i = digitString.length - 1; i >= 0; i--) {
    const char = digitString[i];
    if (char === ' ') continue;
    
    const digit = char.charCodeAt(0) - 48;
    if (digit < 0 || digit > 9) return false;
    
    if (change) {
      const doubled = digit << 1;
      sum += doubled > 9 ? doubled - 9 : doubled;
    } else {
      sum += digit;
    }
    
    change = !change;
    length++;
  }
  
  return length >= 2 && sum % 10 === 0;
}