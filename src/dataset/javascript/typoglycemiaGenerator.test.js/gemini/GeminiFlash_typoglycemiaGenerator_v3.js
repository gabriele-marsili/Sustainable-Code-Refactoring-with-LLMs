function ScrambleWords(str) {
  const regexp = /[-',.]/;

  const scrambledWords = str.split(' ').map(word => {
    if (word.length <= 2) {
      return word;
    }

    let prefix = '';
    let suffix = '';
    let start = 0;
    let end = word.length - 1;

    if (regexp.test(word[0])) {
      prefix = word[0];
      start = 1;
    }

    if (regexp.test(word[word.length - 1])) {
      suffix = word[word.length - 1];
      end = word.length - 2;
    }

    if (start >= end) {
      return prefix + word.substring(start, end + 1) + suffix;
    }

    const firstChar = word[start];
    const lastChar = word[end];
    const middleChars = word.substring(start + 1, end).split('');
    const punctuationIndices = [];

    const letters = [];
    for (let i = 0; i < middleChars.length; i++) {
      if (regexp.test(middleChars[i])) {
        punctuationIndices.push({ char: middleChars[i], index: i });
      } else {
        letters.push(middleChars[i]);
      }
    }

    letters.sort();

    let innerStr = '';
    let letterIndex = 0;
    for (let i = 0; i < middleChars.length; i++) {
      const punctuation = punctuationIndices.find(p => p.index === i);
      if (punctuation) {
        innerStr += punctuation.char;
      } else {
        innerStr += letters[letterIndex++];
      }
    }

    return prefix + firstChar + innerStr + lastChar + suffix;
  });

  return scrambledWords.join(' ');
}

export default ScrambleWords;