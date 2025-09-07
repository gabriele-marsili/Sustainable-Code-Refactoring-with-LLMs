export function countWords(words) {
  if (!words || typeof words !== 'string') return {};
  
  const result = {};
  let word = '';
  let inWord = false;
  
  for (let i = 0; i < words.length; i++) {
    const char = words[i];
    const lowerChar = char.toLowerCase();
    
    if (/[\w']/.test(lowerChar)) {
      if (!inWord) inWord = true;
      word += lowerChar;
    } else if (inWord) {
      if (word) {
        const cleanWord = word.replace(/^'(.*)'$/, '$1');
        result[cleanWord] = (result[cleanWord] || 0) + 1;
      }
      word = '';
      inWord = false;
    }
  }
  
  if (inWord && word) {
    const cleanWord = word.replace(/^'(.*)'$/, '$1');
    result[cleanWord] = (result[cleanWord] || 0) + 1;
  }
  
  return result;
}