function ScrambleWords(str) {
  const regexp = /[-',.]/;
  const isLetter = char => char >= 'a' && char <= 'z';

  return str.split(' ').map(word => {
    if (word.length <= 2) return word;

    const chars = [...word];
    const prefix = regexp.test(chars[0]) ? chars.shift() : '';
    const suffix = regexp.test(chars[chars.length - 1]) ? chars.pop() : '';
    const firstChar = chars[0];
    const lastChar = chars[chars.length - 1];
    const middleChars = chars.slice(1, -1);

    const sortedMiddle = middleChars
      .filter(isLetter)
      .sort();

    let sortedIndex = 0;
    const innerStr = middleChars.map(char => 
      regexp.test(char) ? char : sortedMiddle[sortedIndex++]
    ).join('');

    return prefix + firstChar + innerStr + lastChar + suffix;
  }).join(' ');
}

export default ScrambleWords;