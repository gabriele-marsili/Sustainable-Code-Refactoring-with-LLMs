function ScrambleWords(str) {
  const regexp = /[-',.]/;
  return str.split(' ').map(word => {
    if (word.length <= 2) return word;

    const chars = [...word];
    const prefix = regexp.test(chars[0]) ? chars.shift() : '';
    const suffix = regexp.test(chars[chars.length - 1]) ? chars.pop() : '';
    const first = chars[0];
    const last = chars[chars.length - 1];
    const middle = chars.slice(1, -1);

    const sortedMiddle = middle
      .filter(char => /[a-z]/.test(char))
      .sort();

    let sortedInner = '';
    let index = 0;
    for (const char of middle) {
      sortedInner += regexp.test(char) ? char : sortedMiddle[index++];
    }

    return prefix + first + sortedInner + last + suffix;
  }).join(' ');
}

export default ScrambleWords;