export class Words {
  count(string) {
    if (!string) return {};
    
    const words = string.toLowerCase().trim().split(/\s+/);
    const result = Object.create(null);
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word) {
        result[word] = (result[word] || 0) + 1;
      }
    }
    
    return result;
  }
}