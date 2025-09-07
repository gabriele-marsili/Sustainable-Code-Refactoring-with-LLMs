class Words {
  count(wordString) {
    return wordString
      .trim()
      .split(/\s+/)
      .reduce((wordCount, word) => {
        wordCount[word] = (wordCount[word] || 0) + 1;
        return wordCount;
      }, {});
  }
}

export default Words;