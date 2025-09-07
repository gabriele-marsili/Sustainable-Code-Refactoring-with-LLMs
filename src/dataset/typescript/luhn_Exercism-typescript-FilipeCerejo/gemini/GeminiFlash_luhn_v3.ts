export function valid(digitString: string): boolean {
  const noSpaceDigit = digitString.replace(/\s/g, '');
  const len = noSpaceDigit.length;

  if (len < 2) {
    return false;
  }

  let sum = 0;
  for (let i = len - 1; i >= 0; i--) {
    const digit = parseInt(noSpaceDigit[i], 10);

    if (isNaN(digit)) {
      return false;
    }

    if ((len - 1 - i) % 2 !== 0) {
      const doubledDigit = digit * 2;
      sum += doubledDigit > 9 ? doubledDigit - 9 : doubledDigit;
    } else {
      sum += digit;
    }
  }

  return sum % 10 === 0;
}