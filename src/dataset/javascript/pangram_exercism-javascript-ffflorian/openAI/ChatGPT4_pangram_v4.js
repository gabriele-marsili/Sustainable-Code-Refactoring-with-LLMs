export function isPangram(sentence) {
  const seen = new Set();
  for (let i = 0, len = sentence.length; i < len; i++) {
    const code = sentence.charCodeAt(i) | 32;
    if (code >= 97 && code <= 122) {
      seen.add(code);
      if (seen.size === 26) return true;
    }
  }
  return false;
}