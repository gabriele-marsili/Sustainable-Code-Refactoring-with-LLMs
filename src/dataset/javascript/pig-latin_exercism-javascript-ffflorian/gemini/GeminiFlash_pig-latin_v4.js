/**
 *
 * @param {string} input
 * @returns string
 */
export function translate(input) {
  const words = input.split(' ');
  const translatedWords = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let translatedWord = '';

    if (/^([aeiou]|xr|yt)/.test(word)) {
      translatedWord = word + 'ay';
    } else {
      const match = /^(ch|rh|thr?|sch|[^aeiou]?qu)(.*)/.exec(word);
      if (match) {
        translatedWord = match[2] + match[1] + 'ay';
      } else {
        translatedWord = word.substring(1) + word.substring(0, 1) + 'ay';
      }
    }
    translatedWords.push(translatedWord);
  }

  return translatedWords.join(' ');
}