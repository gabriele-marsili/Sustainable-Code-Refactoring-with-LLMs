function titleCase(title, minorWords) {
  if (!title) return title;

  const lowerTitle = title.toLowerCase();
  const words = lowerTitle.split(' ');

  const minorWordsSet = minorWords ? new Set(minorWords.toLowerCase().split(' ')) : null;

  const result = words.map((word, index) => {
    if (index === 0 || !minorWordsSet || !minorWordsSet.has(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });

  return result.join(' ');
}

export default titleCase;