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
  for (const [longForm, shortForm] of combinationsToShorten) {
    result = result.replace(longForm, shortForm);
  }
  return result;
}

export function toRoman(numToConvert) {
  let rest = numToConvert;
  let result = '';

  for (const { letter, num } of list) {
    if (rest <= 0) break;

    const multiple = Math.floor(rest / num);

    if (multiple > 0) {
      rest -= num * multiple;
      result += letter.repeat(multiple);
    }
  }

  return shortenMultipleLetters(result);
}