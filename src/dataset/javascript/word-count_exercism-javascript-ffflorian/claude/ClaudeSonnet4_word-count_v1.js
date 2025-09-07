export function countWords(words) {
  const result = {};
  let word = '';
  let inWord = false;
  let hasQuotes = false;
  
  for (let i = 0; i < words.length; i++) {
    const char = words[i];
    const lowerChar = char.toLowerCase();
    
    if (lowerChar >= 'a' && lowerChar <= 'z' || lowerChar >= '0' && lowerChar <= '9' || lowerChar === "'" || lowerChar === '_') {
      if (!inWord) {
        inWord = true;
        hasQuotes = lowerChar === "'";
      }
      word += lowerChar;
    } else if (char === ' ' || char === '\t' || char === '\n' || char === ',') {
      if (inWord) {
        if (word.length > 0) {
          let finalWord = word;
          if (hasQuotes && word.length > 2 && word[0] === "'" && word[word.length - 1] === "'") {
            finalWord = word.slice(1, -1);
          }
          if (finalWord.length > 0) {
            result[finalWord] = (result[finalWord] || 0) + 1;
          }
        }
        word = '';
        inWord = false;
        hasQuotes = false;
      }
    } else if (inWord) {
      if (word.length > 0) {
        let finalWord = word;
        if (hasQuotes && word.length > 2 && word[0] === "'" && word[word.length - 1] === "'") {
          finalWord = word.slice(1, -1);
        }
        if (finalWord.length > 0) {
          result[finalWord] = (result[finalWord] || 0) + 1;
        }
      }
      word = '';
      inWord = false;
      hasQuotes = false;
    }
  }
  
  if (inWord && word.length > 0) {
    let finalWord = word;
    if (hasQuotes && word.length > 2 && word[0] === "'" && word[word.length - 1] === "'") {
      finalWord = word.slice(1, -1);
    }
    if (finalWord.length > 0) {
      result[finalWord] = (result[finalWord] || 0) + 1;
    }
  }
  
  return result;
}