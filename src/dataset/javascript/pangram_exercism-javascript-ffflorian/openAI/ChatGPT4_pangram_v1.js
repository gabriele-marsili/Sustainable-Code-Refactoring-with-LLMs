export function isPangram(sentence) {
  sentence = sentence.toLowerCase();
  const seen = new Set();
  for (let i = 0; i < sentence.length; i++) {
    const code = sentence.charCodeAt(i);
    if (code >= 97 && code <= 122) {
      seen.add(code);
      if (seen.size === 26) return true;
    }
  }
  return false;
}