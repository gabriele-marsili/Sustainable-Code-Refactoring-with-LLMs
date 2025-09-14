/**
 *
 * @param {string} input
 * @returns string
 */
export function translate(input) {
  const vowelPattern = /^[aeoui]|^xr|^yt/;
  const consonantPattern = /^(ch|rh|thr?|sch|[^aeoui]*qu|[^aeoui]+)/;
  
  let result = '';
  let wordStart = 0;
  
  for (let i = 0; i <= input.length; i++) {
    if (i === input.length || input[i] === ' ') {
      if (i > wordStart) {
        const word = input.slice(wordStart, i);
        
        if (result) result += ' ';
        
        if (vowelPattern.test(word)) {
          result += word + 'ay';
        } else {
          const match = consonantPattern.exec(word);
          if (match) {
            const consonants = match[1];
            const remainder = word.slice(consonants.length);
            result += remainder + consonants + 'ay';
          } else {
            result += word.slice(1) + word[0] + 'ay';
          }
        }
      }
      wordStart = i + 1;
    }
  }
  
  return result;
}