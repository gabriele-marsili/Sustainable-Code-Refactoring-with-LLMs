export class Words {
  count(string) {
    const words = string.toLowerCase().trim().split(/[\s]+/);

    const wordCounts = {};
    for (const word of words) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
    return wordCounts;
  }
}