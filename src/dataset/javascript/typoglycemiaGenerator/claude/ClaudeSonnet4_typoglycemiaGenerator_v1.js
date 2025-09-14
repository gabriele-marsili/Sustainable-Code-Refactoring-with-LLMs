function ScrambleWords(str) {
  const punctuationRegex = /[-',.]/;
  const letterRegex = /[a-z]/i;
  const words = str.split(' ');
  
  const scrambledWords = words.map(word => {
    if (word.length <= 2) {
      return word;
    }
    
    let startIdx = 0;
    let endIdx = word.length - 1;
    
    // Find prefix punctuation
    const prefix = punctuationRegex.test(word[0]) ? word[0] : '';
    if (prefix) startIdx = 1;
    
    // Find suffix punctuation
    const suffix = punctuationRegex.test(word[endIdx]) ? word[endIdx] : '';
    if (suffix) endIdx--;
    
    // Extract base word without prefix/suffix punctuation
    const baseWord = word.slice(startIdx, endIdx + 1);
    
    if (baseWord.length <= 2) {
      return word;
    }
    
    const firstChar = baseWord[0];
    const lastChar = baseWord[baseWord.length - 1];
    const middle = baseWord.slice(1, -1);
    
    // Separate letters and punctuation while preserving order
    const letters = [];
    const positions = [];
    
    for (let i = 0; i < middle.length; i++) {
      const char = middle[i];
      if (letterRegex.test(char)) {
        letters.push(char.toLowerCase());
        positions.push({ index: i, isLetter: true });
      } else {
        positions.push({ index: i, isLetter: false, char });
      }
    }
    
    // Sort letters
    letters.sort();
    
    // Reconstruct middle part
    let letterIndex = 0;
    let reconstructed = '';
    
    for (const pos of positions) {
      if (pos.isLetter) {
        reconstructed += letters[letterIndex++];
      } else {
        reconstructed += pos.char;
      }
    }
    
    return prefix + firstChar + reconstructed + lastChar + suffix;
  });
  
  return scrambledWords.join(' ');
}

export default ScrambleWords;