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

const list = [
  { letter: 'M', num: 1000 },
  { letter: 'D', num: 500 },
  { letter: 'C', num: 100 },
  { letter: 'L', num: 50 },
  { letter: 'X', num: 10 },
  { letter: 'V', num: 5 },
  { letter: 'I', num: 1 },
];

const combinationsToShorten = [
  { string: 'DCCCC', shortener: 'CM' },
  { string: 'CCCC', shortener: 'CD' },
  { string: 'LXXXX', shortener: 'XC' },
  { string: 'XXXX', shortener: 'XL' },
  { string: 'VIIII', shortener: 'IX' },
  { string: 'IIII', shortener: 'IV' },
];

function shortenMultipleLetters(string) {
  return combinationsToShorten.reduce((acc, curr) => {
    return acc.replace(curr.string, curr.shortener);
  }, string);
}

export function toRoman(numToConvert) {
  let result = '';
  let remaining = numToConvert;
  
  for (const { letter, num } of romanNumerals) {
    const count = Math.floor(remaining / num);
    if (count > 0) {
      result += letter.repeat(count);
      remaining -= num * count;
    }
  }
  
  return result;
}