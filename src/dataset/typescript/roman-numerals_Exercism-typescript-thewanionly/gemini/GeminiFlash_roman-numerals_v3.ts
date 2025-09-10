const RomanNumeralValues: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

export const toRoman = (num: number): string => {
  let result = '';
  let remaining = num;

  for (const [value, numeral] of RomanNumeralValues) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
};