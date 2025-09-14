export function isValid(isbn: string): boolean {
  let cleanString = '';
  
  // Single pass to clean and validate length
  for (let i = 0; i < isbn.length; i++) {
    const char = isbn[i];
    if ((char >= '0' && char <= '9') || char === 'X') {
      cleanString += char;
    }
  }

  if (cleanString.length !== 10) return false;

  // Validate format and calculate checksum in single pass
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const char = cleanString[i];
    if (char < '0' || char > '9') return false;
    sum += (char.charCodeAt(0) - 48) * (10 - i);
  }

  // Handle last character
  const lastChar = cleanString[9];
  if (lastChar === 'X') {
    sum += 100; // 10 * 10
  } else if (lastChar >= '0' && lastChar <= '9') {
    sum += (lastChar.charCodeAt(0) - 48);
  } else {
    return false;
  }

  return sum % 11 === 0;
}