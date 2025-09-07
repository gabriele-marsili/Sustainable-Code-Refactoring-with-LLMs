export class Words {
  count(string) {
    if (!string) return {};
    
    const words = string.toLowerCase().trim().split(/\s+/);
    const result = {};
    
    for (const word of words) {
      if (word) {
        result[word] = (result[word] || 0) + 1;
      }
    }
    
    return result;
  }
}