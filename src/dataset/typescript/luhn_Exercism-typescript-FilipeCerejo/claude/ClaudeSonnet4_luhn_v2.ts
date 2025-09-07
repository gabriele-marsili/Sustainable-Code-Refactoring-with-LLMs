export function valid(digitString: string): boolean {
  const noSpaceDigit = digitString.replace(/\s/g, '');
  if (noSpaceDigit.length < 2) return false;

  let sum = 0;
  const len = noSpaceDigit.length;
  
  for (let i = 0; i < len; i++) {
    const digit = +noSpaceDigit[len - 1 - i];
    if (i & 1) {
      const doubled = digit << 1;
      sum += doubled > 9 ? doubled - 9 : doubled;
    } else {
      sum += digit;
    }
  }

  return sum % 10 === 0;
}