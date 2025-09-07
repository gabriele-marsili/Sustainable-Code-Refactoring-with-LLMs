export function countWords(words) {
  if (!words || typeof words !== 'string') return {};
  
  const result = {};
  let word = '';
  let inWord = false;
  let hasQuotes = false;
  
  for (let i = 0; i < words.length; i++) {
    const char = words[i];
    const lowerChar = char.toLowerCase();
    
    if (char === ' ' || char === '\t' || char === '\n' || char === ',') {
      if (inWord && word) {
        const finalWord = hasQuotes && word.length > 1 && word[0] === "'" && word[word.length - 1] === "'" 
          ? word.slice(1, -1) 
          : word;
        result[finalWord] = (result[finalWord] || 0) + 1;
      }
      word = '';
      inWord = false;
      hasQuotes = false;
    } else if ((lowerChar >= 'a' && lowerChar <= 'z') || char === "'" || (lowerChar >= '0' && lowerChar <= '9')) {
      word += lowerChar;
      inWord = true;
      if (char === "'") hasQuotes = true;
    }
  }
  
  if (inWord && word) {
    const finalWord = hasQuotes && word.length > 1 && word[0] === "'" && word[word.length - 1] === "'" 
      ? word.slice(1, -1) 
      : word;
    result[finalWord] = (result[finalWord] || 0) + 1;
  }
  
  return result;
}