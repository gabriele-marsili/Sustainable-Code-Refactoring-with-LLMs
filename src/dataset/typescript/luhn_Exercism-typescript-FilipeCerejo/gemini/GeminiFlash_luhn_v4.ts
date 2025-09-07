export function valid(digitString: string): boolean {
  const noSpaceDigit = digitString.replace(/\s/g, '');
  const len = noSpaceDigit.length;

  if (len < 2 || !/^\d+$/.test(noSpaceDigit)) return false;

  let sum = 0;
  for (let i = len - 1; i >= 0; i--) {
    let digit = parseInt(noSpaceDigit[i], 10);
    if (isNaN(digit)) return false;

    if ((len - 1 - i) % 2 !== 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
}