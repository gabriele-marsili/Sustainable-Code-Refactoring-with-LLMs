const list = [
  { letter: 'M', num: 1000 },
  { letter: 'D', num: 500 },
  { letter: 'C', num: 100 },
  { letter: 'L', num: 50 },
  { letter: 'X', num: 10 },
  { letter: 'V', num: 5 },
  { letter: 'I', num: 1 },
];

const combinationsToShorten = new Map([
  ['DCCCC', 'CM'],
  ['CCCC', 'CD'],
  ['LXXXX', 'XC'],
  ['XXXX', 'XL'],
  ['VIIII', 'IX'],
  ['IIII', 'IV'],
]);

function shortenMultipleLetters(string) {
  for (const [key, value] of combinationsToShorten) {
    string = string.replace(key, value);
  }
  return string;
}

export function toRoman(numToConvert) {
  let result = '';
  for (const { letter, num } of list) {
    const multiple = Math.floor(numToConvert / num);
    if (multiple > 0) {
      result += letter.repeat(multiple);
      numToConvert %= num;
    }
  }
  return shortenMultipleLetters(result);
}