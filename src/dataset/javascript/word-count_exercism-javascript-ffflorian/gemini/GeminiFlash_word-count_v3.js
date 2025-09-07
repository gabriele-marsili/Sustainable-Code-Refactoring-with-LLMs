export function countWords(words) {
  const trimmedWords = words.trim().toLowerCase();
  const cleanedWords = trimmedWords.replace(/[^\w' ,]/g, '');
  const splitWords = cleanedWords.split(/[\t\n ,]+/);

  const wordCounts = {};
  for (let i = 0; i < splitWords.length; i++) {
    let word = splitWords[i].trim();
    if (word) {
      word = word.replace(/^'(.*)'$/, '$1');
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  }

  return wordCounts;
}