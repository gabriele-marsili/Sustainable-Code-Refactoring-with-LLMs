function titleCase(title, minorWords) {
  if (!title) return title;

  const titleWords = title.toLowerCase().split(' ');
  const minorWordsSet = minorWords ? new Set(minorWords.toLowerCase().split(' ')) : new Set();

  const result = titleWords.map((word, index) => {
    if (index === 0 || !minorWordsSet.has(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });

  return result.join(' ');
}

export default titleCase;