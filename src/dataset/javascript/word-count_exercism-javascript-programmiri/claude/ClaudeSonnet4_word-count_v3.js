export class Words {
  count(string) {
    if (!string) return {};
    
    const words = string.toLowerCase().trim().split(/\s+/);
    const wordCount = {};
    
    for (const word of words) {
      if (word) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    }
    
    return wordCount;
  }
}