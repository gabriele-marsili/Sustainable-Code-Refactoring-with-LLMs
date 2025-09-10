export const toRoman = (decimal: number): string => {
  const romanNumerals = [
    ['I', 'V', 'X'], // Units
    ['X', 'L', 'C'], // Dozens
    ['C', 'D', 'M'], // Hundreds
    ['M', '', '']    // Thousands
  ];

  let roman = '';
  let place = 0;

  while (decimal > 0) {
    const value = decimal % 10;
    const [minor, middle, major] = romanNumerals[place];

    if (value === 9) {
      roman = minor + major + roman;
    } else if (value >= 5) {
      roman = middle + minor.repeat(value - 5) + roman;
    } else if (value === 4) {
      roman = minor + middle + roman;
    } else {
      roman = minor.repeat(value) + roman;
    }

    decimal = Math.floor(decimal / 10);
    place++;
  }

  return roman;
};