export function isPangram(sentence) {
  const lowerSentence = sentence.toLowerCase();
  const seen = new Set();
  
  for (let i = 0; i < lowerSentence.length; i++) {
    const char = lowerSentence[i];
    if (char >= 'a' && char <= 'z') {
      seen.add(char);
      if (seen.size === 26) return true;
    }
  }
  
  return false;
}