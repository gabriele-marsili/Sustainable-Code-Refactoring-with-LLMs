export function countWords(words) {
  const trimmedWords = words.trim().toLowerCase();
  const cleanedWords = trimmedWords.replace(/[^\w' ,]/g, '');
  const wordsArray = cleanedWords.split(/[\t\n ,]+/);

  const result = {};
  for (let i = 0; i < wordsArray.length; i++) {
    let word = wordsArray[i].trim();
    if (word) {
      word = word.replace(/^'(.*)'$/, '$1');
      result[word] = (result[word] || 0) + 1;
    }
  }
  return result;
}