const factors = [
  { factor: 3, word: 'Pling' },
  { factor: 5, word: 'Plang' },
  { factor: 7, word: 'Plong' },
];

export const convert = (input) => {
  let result = '';

  for (const { factor, word } of factors) {
    if (input % factor === 0) {
      result += word;
    }
  }

  return result.length === 0 ? input.toString() : result;
};