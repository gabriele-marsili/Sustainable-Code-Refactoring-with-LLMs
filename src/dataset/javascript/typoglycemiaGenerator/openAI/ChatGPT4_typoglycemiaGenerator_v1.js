function ScrambleWords(str) {
  const regexp = /[-',.]/;
  return str.split(' ').map(word => {
    if (word.length <= 2) return word;

    const chars = [...word];
    const prefix = regexp.test(chars[0]) ? chars.shift() : '';
    const suffix = regexp.test(chars[chars.length - 1]) ? chars.pop() : '';
    const first = chars[0];
    const last = chars[chars.length - 1];

    if (chars.length <= 2) return prefix + chars.join('') + suffix;

    const middle = chars.slice(1, -1);
    const sortedMiddle = [...middle].filter(c => /[a-z]/.test(c)).sort();
    let sortedIndex = 0;

    const scrambledMiddle = middle.map(c => /[a-z]/.test(c) ? sortedMiddle[sortedIndex++] : c).join('');

    return prefix + first + scrambledMiddle + last + suffix;
  }).join(' ');
}

export default ScrambleWords;