export function isValid(isbn: string): boolean {
  let cleanString = '';
  for (let i = 0; i < isbn.length; i++) {
    const char = isbn[i];
    if ((char >= '0' && char <= '9') || char === 'X') {
      cleanString += char;
    }
  }

  if (cleanString.length !== 10) return false;

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const char = cleanString[i];
    if (i < 9 && (char < '0' || char > '9')) return false;
    if (i === 9 && char !== 'X' && (char < '0' || char > '9')) return false;
    
    const digit = char === 'X' ? 10 : char.charCodeAt(0) - 48;
    sum += digit * (10 - i);
  }

  return sum % 11 === 0;
}