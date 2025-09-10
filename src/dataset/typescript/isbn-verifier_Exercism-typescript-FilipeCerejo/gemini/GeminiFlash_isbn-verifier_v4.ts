export function isValid(isbn: string): boolean {
  let cleanString = isbn.replace(/[-]/g, '');

  if (cleanString.length !== 10) return false;

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const char = cleanString[i];
    let digit = parseInt(char, 10);

    if (isNaN(digit)) {
      if (char === 'X' && i === 9) {
        digit = 10;
      } else {
        return false;
      }
    }
    sum += digit * (10 - i);
  }

  return sum % 11 === 0;
}