export function countWords(words) {
  const trimmedWords = words.trim().toLowerCase();
  const cleanedWords = trimmedWords.replace(/[^\w' ,]/g, '');
  const splitWords = cleanedWords.split(/[\t\n ,]+/);

  const wordCounts = {};
  for (let i = 0; i < splitWords.length; i++) {
    const word = splitWords[i].trim();
    if (word) {
      const cleanedWord = word.replace(/^'(.*)'$/, '$1');
      wordCounts[cleanedWord] = (wordCounts[cleanedWord] || 0) + 1;
    }
  }

  return wordCounts;
}