export class Words {
  count(string) {
    const words = string.toLowerCase().trim().split(/[\s]+/);

    const wordCounts = {};
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    return wordCounts;
  }
}