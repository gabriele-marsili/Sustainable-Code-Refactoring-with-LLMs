export const isPangram = sentence => {
  const seen = new Set();
  for (let i = 0; i < sentence.length; i++) {
    const code = sentence.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      seen.add(code + 32);
    } else if (code >= 97 && code <= 122) {
      seen.add(code);
    }
    if (seen.size === 26) return true;
  }
  return false;
};