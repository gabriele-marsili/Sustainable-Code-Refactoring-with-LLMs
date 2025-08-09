export const isPangram = (text = "") => {
  const seen = new Set();
  for (let i = 0, len = text.length; i < len; i++) {
    const code = text.charCodeAt(i) | 32;
    if (code >= 97 && code <= 122) {
      seen.add(code);
      if (seen.size === 26) return true;
    }
  }
  return false;
};