export function valid(digitString: string): boolean {
  const cleanedString = digitString.replace(/\s/g, '');
  const n = cleanedString.length;

  if (n <= 1) return false;

  let sum = 0;
  for (let i = n - 1; i >= 0; i--) {
    const digit = cleanedString.charCodeAt(i) - 48;

    if (digit < 0 || digit > 9) return false;

    if ((n - 1 - i) % 2 === 1) {
      let doubledDigit = digit * 2;
      if (doubledDigit > 9) {
        doubledDigit -= 9;
      }
      sum += doubledDigit;
    } else {
      sum += digit;
    }
  }

  return sum % 10 === 0;
}