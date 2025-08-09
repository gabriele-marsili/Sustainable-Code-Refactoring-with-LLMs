export function isPangram(sentence) {
  const normalized = sentence.toLowerCase();
  let found = 0;
  
  for (let i = 0; i < normalized.length && found < 26; i++) {
    const code = normalized.charCodeAt(i);
    if (code >= 97 && code <= 122) {
      const bit = 1 << (code - 97);
      if (!(found & bit)) {
        found |= bit;
      }
    }
  }
  
  return found === 0x3ffffff;
}