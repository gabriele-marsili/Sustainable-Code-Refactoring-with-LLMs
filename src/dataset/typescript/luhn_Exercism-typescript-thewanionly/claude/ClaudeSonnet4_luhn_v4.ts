export function valid(digitString: string): boolean {
  const cleanString = digitString.replace(/\s/g, '');
  
  if (cleanString.length <= 1) return false;
  
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = cleanString.length - 1; i >= 0; i--) {
    const char = cleanString[i];
    
    if (char < '0' || char > '9') return false;
    
    let digit = char.charCodeAt(0) - 48;
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
}