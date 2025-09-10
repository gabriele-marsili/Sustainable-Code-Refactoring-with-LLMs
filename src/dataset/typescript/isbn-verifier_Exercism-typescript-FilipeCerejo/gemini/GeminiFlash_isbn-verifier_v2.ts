export function isValid(isbn: string): boolean {
  const cleanString = isbn.replace(/[- ]/g, '');

  if (cleanString.length !== 10) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const digit = parseInt(cleanString[i], 10);
    if (isNaN(digit)) {
      return false;
    }
    sum += digit * (10 - i);
  }

  const lastChar = cleanString[9];
  let lastDigit: number;

  if (lastChar === 'X') {
    lastDigit = 10;
  } else {
    lastDigit = parseInt(lastChar, 10);
    if (isNaN(lastDigit)) {
      return false;
    }
  }
  sum += lastDigit;

  return sum % 11 === 0;
}