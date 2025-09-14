/**
 *
 * @param {string} input
 * @returns string
 */
export function translate(input) {
  const vowelPattern = /^([aeoui]|xr|yt)/;
  const consonantPattern = /^(ch|rh|thr?|sch|[^aeoui]?qu)(.*)/;
  
  let result = '';
  let wordStart = 0;
  
  for (let i = 0; i <= input.length; i++) {
    if (i === input.length || input[i] === ' ') {
      if (i > wordStart) {
        if (result) result += ' ';
        
        const word = input.slice(wordStart, i);
        
        if (vowelPattern.test(word)) {
          result += word + 'ay';
        } else {
          const match = consonantPattern.exec(word);
          if (match) {
            result += match[2] + match[1] + 'ay';
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