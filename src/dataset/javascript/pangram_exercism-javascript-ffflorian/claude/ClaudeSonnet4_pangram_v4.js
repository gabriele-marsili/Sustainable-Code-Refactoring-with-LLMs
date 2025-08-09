export function isPangram(sentence) {
  const normalized = sentence.toLowerCase();
  const seen = new Set();
  
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    if (char >= 'a' && char <= 'z') {
      seen.add(char);
      if (seen.size === 26) return true;
    }
  }
  
  return false;
}