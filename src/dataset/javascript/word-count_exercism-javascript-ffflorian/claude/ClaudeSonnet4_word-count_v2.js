export function countWords(words) {
  const result = {};
  let word = '';
  let inWord = false;
  
  for (let i = 0; i < words.length; i++) {
    const char = words[i];
    const lowerChar = char.toLowerCase();
    
    if ((lowerChar >= 'a' && lowerChar <= 'z') || lowerChar === "'") {
      word += lowerChar;
      inWord = true;
    } else if (inWord) {
      if (word) {
        // Remove surrounding quotes
        const cleanWord = word.startsWith("'") && word.endsWith("'") && word.length > 2 
          ? word.slice(1, -1) 
          : word;
        
        if (cleanWord) {
          result[cleanWord] = (result[cleanWord] || 0) + 1;
        }
      }
      word = '';
      inWord = false;
    }
  }
  
  // Handle last word
  if (inWord && word) {
    const cleanWord = word.startsWith("'") && word.endsWith("'") && word.length > 2 
      ? word.slice(1, -1) 
      : word;
    
    if (cleanWord) {
      result[cleanWord] = (result[cleanWord] || 0) + 1;
    }
  }
  
  return result;
}