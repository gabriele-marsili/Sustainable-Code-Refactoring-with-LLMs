function generateHashtag(str) {
  const trimmed = str.trim();
  if (trimmed.length === 0) {
    return false;
  }
  
  let result = '#';
  let wordStart = 0;
  let inWord = false;
  
  for (let i = 0; i <= trimmed.length; i++) {
    const char = trimmed[i];
    const isSpace = char === ' ' || char === undefined;
    
    if (!inWord && !isSpace) {
      wordStart = i;
      inWord = true;
    } else if (inWord && isSpace) {
      const word = trimmed.slice(wordStart, i);
      result += word[0].toUpperCase() + word.slice(1);
      inWord = false;
      
      if (result.length > 140) {
        return false;
      }
    }
  }
  
  return result.length > 1 ? result : false;
}

export default generateHashtag;