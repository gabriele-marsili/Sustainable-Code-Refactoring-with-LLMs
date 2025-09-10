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
  let result = string;
  for (const [long, short] of combinationsToShorten) {
    result = result.replace(long, short);
  }
  return result;
}

export function toRoman(numToConvert) {
  let num = numToConvert;
  let result = '';

  for (const { letter, num: value } of list) {
    if (num >= value) {
      const multiple = Math.floor(num / value);
      result += letter.repeat(multiple);
      num -= value * multiple;
    }
  }

  return shortenMultipleLetters(result);
}