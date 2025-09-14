function ScrambleWords(str) {
  const regexp = /[-',.]/;

  return str.split(' ').map(word => {
    if (word.length <= 2) return word;

    const chars = [...word];
    const prefix = regexp.test(chars[0]) ? chars.shift() : '';
    const suffix = regexp.test(chars[chars.length - 1]) ? chars.pop() : '';
    const firstChar = chars[0];
    const lastChar = chars[chars.length - 1];

    if (chars.length <= 2) return prefix + chars.join('') + suffix;

    const innerChars = chars.slice(1, -1);
    const sortedInner = [...innerChars]
      .filter(char => /[a-z]/.test(char))
      .sort();

    let sortedIndex = 0;
    const scrambledInner = innerChars.map(char =>
      regexp.test(char) ? char : sortedInner[sortedIndex++]
    );

    return prefix + firstChar + scrambledInner.join('') + lastChar + suffix;
  }).join(' ');
}

export default ScrambleWords;