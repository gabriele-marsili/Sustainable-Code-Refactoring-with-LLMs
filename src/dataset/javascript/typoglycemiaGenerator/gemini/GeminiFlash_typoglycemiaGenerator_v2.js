function ScrambleWords(str) {
  const words = str.split(' ');
  const regexp = /[-',.]/;

  const scrambledWords = words.map(word => {
    if (word.length <= 2) {
      return word;
    }

    let prefix = '';
    let suffix = '';
    let firstCharIndex = 0;
    let lastCharIndex = word.length - 1;

    if (regexp.test(word[0])) {
      prefix = word[0];
      firstCharIndex = 1;
    }

    if (regexp.test(word[word.length - 1])) {
      suffix = word[word.length - 1];
      lastCharIndex = word.length - 2;
    }

    if (lastCharIndex <= firstCharIndex) {
      return prefix + word.substring(firstCharIndex, lastCharIndex + 1) + suffix;
    }

    const firstChar = word[firstCharIndex];
    const lastChar = word[lastCharIndex];

    const middleChars = word.substring(firstCharIndex + 1, lastCharIndex).split('');
    const punctuationIndices = [];

    const sortedChars = middleChars.filter((char, index) => {
      if (regexp.test(char)) {
        punctuationIndices.push({ char, index });
        return false;
      }
      return true;
    }).sort();

    let innerStr = '';
    let sortedIndex = 0;

    for (let i = 0; i < middleChars.length; i++) {
      const punctuation = punctuationIndices.find(p => p.index === i);
      if (punctuation) {
        innerStr += punctuation.char;
      } else {
        innerStr += sortedChars[sortedIndex++];
      }
    }

    return prefix + firstChar + innerStr + lastChar + suffix;
  });

  return scrambledWords.join(' ');
}

export default ScrambleWords;