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
      return word;
    }

    const firstChar = word[firstCharIndex];
    const lastChar = word[lastCharIndex];

    const middleChars = word.substring(firstCharIndex + 1, lastCharIndex).split('');
    const punctuation = [];
    const letters = [];

    for (let i = 0; i < middleChars.length; i++) {
      if (regexp.test(middleChars[i])) {
        punctuation.push({ char: middleChars[i], index: i });
      } else {
        letters.push(middleChars[i]);
      }
    }

    letters.sort();

    let scrambledMiddle = '';
    let letterIndex = 0;

    for (let i = 0; i < middleChars.length; i++) {
      const punct = punctuation.find(p => p.index === i);
      if (punct) {
        scrambledMiddle += punct.char;
      } else {
        scrambledMiddle += letters[letterIndex];
        letterIndex++;
      }
    }

    return prefix + firstChar + scrambledMiddle + lastChar + suffix;
  });

  return scrambledWords.join(' ');
}

export default ScrambleWords;