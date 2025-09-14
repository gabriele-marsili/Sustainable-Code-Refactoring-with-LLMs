function ScrambleWords(str) {
  const regexp = /[-',.]/;
  const isLetter = char => char >= 'a' && char <= 'z';

  return str.split(' ').map(word => {
    if (word.length <= 2) return word;

    const chars = [...word];
    const prefix = regexp.test(chars[0]) ? chars.shift() : '';
    const suffix = regexp.test(chars[chars.length - 1]) ? chars.pop() : '';
    const first = chars[0];
    const last = chars[chars.length - 1];
    const middle = chars.slice(1, -1);

    const sortedMiddle = middle
      .filter(isLetter)
      .sort()
      .reduce((acc, char) => {
        acc.push(isLetter(char) ? acc.sorted.shift() : char);
        return acc;
      }, { sorted: middle.filter(isLetter).sort(), result: [] }).result.join('');

    return prefix + first + sortedMiddle + last + suffix;
  }).join(' ');
}

export default ScrambleWords;