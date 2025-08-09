export function isPangram(sentence) {
  const lowerSentence = sentence.toLowerCase();
  let foundLetters = 0;
  const seen = new Array(26).fill(false);
  
  for (let i = 0; i < lowerSentence.length; i++) {
    const charCode = lowerSentence.charCodeAt(i) - 97;
    if (charCode >= 0 && charCode < 26 && !seen[charCode]) {
      seen[charCode] = true;
      foundLetters++;
      if (foundLetters === 26) return true;
    }
  }
  
  return false;
}