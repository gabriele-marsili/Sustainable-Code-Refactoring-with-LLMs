function ScrambleWords(str) {
  const punctuationRegex = /[-',.]/;
  const letterRegex = /[a-z]/i;
  
  return str.split(' ').map(word => {
    if (word.length <= 2) return word;
    
    let startIdx = 0;
    let endIdx = word.length - 1;
    
    const prefix = punctuationRegex.test(word[0]) ? word[startIdx++] : '';
    const suffix = punctuationRegex.test(word[endIdx]) ? word[endIdx--] : '';
    
    if (endIdx - startIdx <= 1) return word;
    
    const firstChar = word[startIdx];
    const lastChar = word[endIdx];
    const middle = word.slice(startIdx + 1, endIdx);
    
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
    
    let letterIndex = 0;
    const sortedMiddle = positions.map(pos => 
      pos !== null ? pos : letters[letterIndex++]
    ).join('');
    
    return prefix + firstChar + sortedMiddle + lastChar + suffix;
  }).join(' ');
}

export default ScrambleWords;