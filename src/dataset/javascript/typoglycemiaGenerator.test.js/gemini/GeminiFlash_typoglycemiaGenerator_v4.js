function ScrambleWords(str) {
  const punctuationRegex = /[-',.]/;
  const words = str.split(' ');

  const scrambledWords = words.map(word => {
    if (word.length <= 2) {
      return word;
    }

    let firstChar = 0;
    let lastChar = word.length - 1;
    let prefix = '';
    let suffix = '';

    if (punctuationRegex.test(word[firstChar])) {
      prefix = word[firstChar];
      firstChar++;
    }

    if (punctuationRegex.test(word[lastChar])) {
      suffix = word[lastChar];
      lastChar--;
    }

    if (firstChar >= lastChar) {
      return prefix + word.substring(firstChar, lastChar + 1) + suffix;
    }

    const innerChars = word.substring(firstChar + 1, lastChar).split('');
    const sortedChars = innerChars.filter(char => /[a-z]/.test(char)).sort();
    let sortedIndex = 0;
    let innerStr = '';

    for (let i = 0; i < innerChars.length; i++) {
      const char = innerChars[i];
      if (punctuationRegex.test(char)) {
        innerStr += char;
      } else {
        innerStr += sortedChars[sortedIndex++];
      }
    }

    return prefix + word[firstChar] + innerStr + word[lastChar] + suffix;
  });

  return scrambledWords.join(' ');
}

export default ScrambleWords;