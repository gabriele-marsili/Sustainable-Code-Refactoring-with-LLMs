const romanNumerals = [
  { letter: 'M', num: 1000 },
  { letter: 'CM', num: 900 },
  { letter: 'D', num: 500 },
  { letter: 'CD', num: 400 },
  { letter: 'C', num: 100 },
  { letter: 'XC', num: 90 },
  { letter: 'L', num: 50 },
  { letter: 'XL', num: 40 },
  { letter: 'X', num: 10 },
  { letter: 'IX', num: 9 },
  { letter: 'V', num: 5 },
  { letter: 'IV', num: 4 },
  { letter: 'I', num: 1 },
];

export function toRoman(numToConvert) {
  let result = '';
  let remaining = numToConvert;
  
  for (const { letter, num } of romanNumerals) {
    if (remaining >= num) {
      const count = Math.floor(remaining / num);
      result += letter.repeat(count);
      remaining -= num * count;
    }
  }
  
  return result;
}