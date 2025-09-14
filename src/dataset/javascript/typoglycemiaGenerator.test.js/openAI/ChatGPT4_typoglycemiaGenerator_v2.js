function ScrambleWords(str) {
  const regexp = /[-',.]/;
  const isLetter = char => /[a-z]/.test(char);

  return str.split(' ').map(word => {
    if (word.length <= 2) return word;

    const chars = [...word];
    const prefix = regexp.test(chars[0]) ? chars.shift() : '';
    const suffix = regexp.test(chars[chars.length - 1]) ? chars.pop() : '';
    const first = chars[0];
    const last = chars[chars.length - 1];

    if (chars.length <= 2) return prefix + chars.join('') + suffix;

    const innerChars = chars.slice(1, -1);
    const sortedInner = innerChars.filter(isLetter).sort();
    let sortedIndex = 0;

    const scrambledInner = innerChars.map(char => 
      isLetter(char) ? sortedInner[sortedIndex++] : char
    ).join('');

    return prefix + first + scrambledInner + last + suffix;
  }).join(' ');
}

export default ScrambleWords;