export class Words {
  count(string) {
    const words = string.toLowerCase().trim().split(/\s+/)
    const result = {}
    
    for (const word of words) {
      result[word] = (result[word] || 0) + 1
    }
    
    return result
  }
}