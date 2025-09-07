export function countWords(words) {
  const wordCounts = {};
  const cleanedWords = words
    .trim()
    .toLowerCase()
    .replace(/[^\w' ,]/g, '')
    .split(/[\t\n ,]+/);

  for (let i = 0; i < cleanedWords.length; i++) {
    let word = cleanedWords[i].trim();
    if (word) {
      word = word.replace(/^'(.*)'$/, '$1');
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  }

  return wordCounts;
}