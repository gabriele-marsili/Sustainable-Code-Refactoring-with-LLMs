function ScrambleWords(str) {
  const punctuationRegex = /[-',.]/;
  const letterRegex = /[a-z]/i;
  const words = str.split(' ');
  
  return words.map(word => {
    if (word.length <= 2) return word;
    
    let startIdx = 0;
    let endIdx = word.length - 1;
    let prefix = '';
    let suffix = '';
    
    if (punctuationRegex.test(word[0])) {
      prefix = word[0];
      startIdx = 1;
    }
    
    if (punctuationRegex.test(word[endIdx])) {
      suffix = word[endIdx];
      endIdx--;
    }
    
    const baseWord = word.slice(startIdx, endIdx + 1);
    if (baseWord.length <= 2) return word;
    
    const firstChar = baseWord[0];
    const lastChar = baseWord[baseWord.length - 1];
    const middle = baseWord.slice(1, -1);
    
    if (middle.length === 0) return word;
    
    const letters = [];
    const positions = [];
    
    for (let i = 0; i < middle.length; i++) {
      const char = middle[i];
      if (letterRegex.test(char)) {
        letters.push(char.toLowerCase());
      }
      positions.push(punctuationRegex.test(char) ? char : null);
    }
    
    letters.sort();
    
    let letterIdx = 0;
    const sortedMiddle = positions.map(pos => 
      pos !== null ? pos : letters[letterIdx++]
    ).join('');
    
    return prefix + firstChar + sortedMiddle + lastChar + suffix;
  }).join(' ');
}

export default ScrambleWords;