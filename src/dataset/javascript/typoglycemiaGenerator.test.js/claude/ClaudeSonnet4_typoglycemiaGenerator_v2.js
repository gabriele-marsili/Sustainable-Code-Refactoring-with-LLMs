function ScrambleWords(str) {
  const punctuationRegex = /[-',.]/;
  const letterRegex = /[a-z]/i;
  const words = str.split(' ');
  
  return words.map(word => {
    if (word.length <= 2) return word;
    
    let startIdx = 0;
    let endIdx = word.length - 1;
    
    // Find prefix punctuation
    const prefix = punctuationRegex.test(word[0]) ? word[0] : '';
    if (prefix) startIdx = 1;
    
    // Find suffix punctuation
    const suffix = punctuationRegex.test(word[endIdx]) ? word[endIdx] : '';
    if (suffix) endIdx--;
    
    if (endIdx - startIdx <= 1) return word;
    
    const firstChar = word[startIdx];
    const lastChar = word[endIdx];
    const middle = word.slice(startIdx + 1, endIdx);
    
    // Extract and sort letters
    const letters = [];
    for (let i = 0; i < middle.length; i++) {
      const char = middle[i];
      if (letterRegex.test(char)) {
        letters.push(char.toLowerCase());
      }
    }
    letters.sort();
    
    // Rebuild middle section
    let letterIdx = 0;
    let innerStr = '';
    for (let i = 0; i < middle.length; i++) {
      const char = middle[i];
      if (punctuationRegex.test(char)) {
        innerStr += char;
      } else {
        innerStr += letters[letterIdx++];
      }
    }
    
    return prefix + firstChar + innerStr + lastChar + suffix;
  }).join(' ');
}

export default ScrambleWords;