const indexMultiplier: readonly number[] = [1, 10, 100, 1000];

const RomanNumeral: { readonly [key: number]: string } = {
  1: 'I',
  5: 'V',
  10: 'X',
  50: 'L',
  100: 'C',
  500: 'D',
  1000: 'M'
} as const;

export const toRoman = (num: number): string => {
  let result = '';
  let remaining = num;
  
  for (let i = 3; i >= 0; i--) {
    const multiplier = indexMultiplier[i];
    const digit = Math.floor(remaining / multiplier);
    
    if (digit === 0) continue;
    
    remaining %= multiplier;
    
    // Direct lookup for exact matches
    const exactValue = digit * multiplier;
    if (RomanNumeral[exactValue]) {
      result += RomanNumeral[exactValue];
      continue;
    }
    
    // Handle special cases (4 and 9)
    if (digit === 4 || digit === 9) {
      result += RomanNumeral[multiplier] + RomanNumeral[(digit + 1) * multiplier];
    }
    // Handle 1-3
    else if (digit <= 3) {
      result += RomanNumeral[multiplier].repeat(digit);
    }
    // Handle 6-8
    else {
      result += RomanNumeral[5 * multiplier] + RomanNumeral[multiplier].repeat(digit - 5);
    }
  }
  
  return result;
}