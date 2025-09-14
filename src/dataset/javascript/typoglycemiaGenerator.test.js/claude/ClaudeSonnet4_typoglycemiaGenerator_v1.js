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
    let innerStr = '';
    
    for (let i = 0; i < middle.length; i++) {
      const char = middle[i];
      if (punctuationRegex.test(char)) {
        innerStr += char;
      } else {
        letters.push(char.toLowerCase());
        innerStr += '\0'; // placeholder for letters
      }
    }
    
    // Sort letters
    letters.sort();
    
    // Replace placeholders with sorted letters
    let letterIndex = 0;
    innerStr = innerStr.replace(/\0/g, () => letters[letterIndex++]);
    
    return prefix + firstChar + innerStr + lastChar + suffix;
  });
  
  return scrambledWords.join(' ');
}

export default ScrambleWords;