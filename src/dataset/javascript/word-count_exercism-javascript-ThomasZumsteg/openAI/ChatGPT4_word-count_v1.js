class Words {
  count(wordString) {
    const wordCount = {};
    wordString.trim().split(/\s+/).forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    return wordCount;
  }
}

export default Words;