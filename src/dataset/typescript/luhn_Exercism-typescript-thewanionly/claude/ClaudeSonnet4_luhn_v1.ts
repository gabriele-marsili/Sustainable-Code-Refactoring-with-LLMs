export function valid(digitString: string): boolean {
  // Remove whitespaces and check length in one pass
  const cleanString = digitString.replace(/\s/g, '');
  
  // Early return for invalid length
  if (cleanString.length <= 1) return false;
  
  let sum = 0;
  let isEven = false;
  
  // Process digits from right to left in a single pass
  for (let i = cleanString.length - 1; i >= 0; i--) {
    const char = cleanString[i];
    
    // Check if character is a digit
    if (char < '0' || char > '9') return false;
    
    let digit = parseInt(char, 10);
    
    // Double every second digit from the right
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}