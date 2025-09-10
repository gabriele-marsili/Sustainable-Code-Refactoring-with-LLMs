const romanMap: { [key: number]: string } = {
  1: 'I',
  4: 'IV',
  5: 'V',
  9: 'IX',
  10: 'X',
  40: 'XL',
  50: 'L',
  90: 'XC',
  100: 'C',
  400: 'CD',
  500: 'D',
  900: 'CM',
  1000: 'M',
};

const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

export const toRoman = (decimal: number): string => {
  if (decimal <= 0 || decimal > 3999) {
    return '';
  }

  let roman = '';
  let num = decimal;

  for (const value of values) {
    while (num >= value) {
      roman += romanMap[value];
      num -= value;
    }
  }

  return roman;
};