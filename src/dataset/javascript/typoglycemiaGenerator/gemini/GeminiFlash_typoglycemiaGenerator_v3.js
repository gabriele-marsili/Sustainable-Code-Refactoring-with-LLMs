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
      return prefix + word.substring(start, end + 2) + suffix;
    }

    const firstChar = word[start];
    const lastChar = word[end];

    const middleChars = word.substring(start + 1, end).split('').filter(char => /[a-z]/.test(char)).sort();
    const punctuation = word.substring(start + 1, end).split('').filter(char => regexp.test(char));

    let innerStr = '';
    let middleIndex = 0;
    let punctIndex = 0;

    for (let i = start + 1; i < end; i++) {
      if (regexp.test(word[i])) {
        innerStr += punctuation[punctIndex++];
      } else {
        innerStr += middleChars[middleIndex++];
      }
    }

    return prefix + firstChar + innerStr + lastChar + suffix;
  });

  return scrambledWords.join(' ');
}

export default ScrambleWords;