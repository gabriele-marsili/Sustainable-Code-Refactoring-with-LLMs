class Words {
  count(wordString) {
    const wordCount = Object.create(null);
    wordString.trim().split(/\s+/).forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    return wordCount;
  }
}

export default Words;