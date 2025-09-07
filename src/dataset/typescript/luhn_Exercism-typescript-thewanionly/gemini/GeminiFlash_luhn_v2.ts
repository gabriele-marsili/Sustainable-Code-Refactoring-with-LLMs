export function valid(digitString: string): boolean {
  const cleanedDigitString = digitString.replace(/\s/g, '');
  const n = cleanedDigitString.length;

  if (n <= 1) {
    return false;
  }

  if (!/^\d+$/.test(cleanedDigitString)) {
    return false;
  }

  let sum = 0;
  for (let i = n - 1; i >= 0; i--) {
    let digit = parseInt(cleanedDigitString[i], 10);

    if ((n - 1 - i) % 2 !== 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
}