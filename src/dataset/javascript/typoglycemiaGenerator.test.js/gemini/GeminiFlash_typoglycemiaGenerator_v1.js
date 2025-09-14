function ScrambleWords(str) {
  const words = str.split(' ');
  const regexp = /[-',.]/;

  const scrambledWords = words.map(word => {
    const len = word.length;
    if (len <= 2) {
      return word;
    }

    let prefix = '';
    let suffix = '';
    let firstCharIndex = 0;
    let lastCharIndex = len - 1;

    if (regexp.test(word[0])) {
      prefix = word[0];
      firstCharIndex = 1;
    }

    if (regexp.test(word[len - 1])) {
      suffix = word[len - 1];
      lastCharIndex = len - 2;
    }

    if (lastCharIndex <= firstCharIndex) {
      return prefix + word.substring(firstCharIndex, lastCharIndex + 1) + suffix;
    }

    const firstChar = word[firstCharIndex];
    const lastChar = word[lastCharIndex];

    const middleChars = word.substring(firstCharIndex + 1, lastCharIndex).split('');
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

    let scrambledMiddle = '';
    let letterIndex = 0;
    for (let i = 0; i < middleChars.length; i++) {
      const punctuation = punctuationIndices.find(p => p.index === i);
      if (punctuation) {
        scrambledMiddle += punctuation.char;
      } else {
        scrambledMiddle += letters[letterIndex++];
      }
    }

    return prefix + firstChar + scrambledMiddle + lastChar + suffix;
  });

  return scrambledWords.join(' ');
}

export default ScrambleWords;