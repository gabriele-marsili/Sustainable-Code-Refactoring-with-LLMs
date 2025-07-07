export function convert(input) {
  const factors = [
    { num: 3, word: 'Pling' },
    { num: 5, word: 'Plang' },
    { num: 7, word: 'Plong' },
  ];

  let result = '';

  for (const factor of factors) {
    if (input % factor.num === 0) {
      result += factor.word;
    }
  }

  return result || input.toString();
}