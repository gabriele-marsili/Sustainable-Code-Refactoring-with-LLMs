function generateHashtag(str) {
  const trimmed = str.trim();
  if (trimmed.length === 0) {
    return false;
  }
  
  let result = '#';
  let i = 0;
  let wordStart = -1;
  
  while (i < trimmed.length) {
    const char = trimmed[i];
    
    if (char !== ' ') {
      if (wordStart === -1) {
        wordStart = i;
        result += char.toUpperCase();
      } else {
        result += char;
      }
    } else if (wordStart !== -1) {
      wordStart = -1;
    }
    
    i++;
  }
  
  return result.length > 140 ? false : result;
}

export default generateHashtag;