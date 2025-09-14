function titleCase(title, minorWords) {
  if (!title) return title;

  const titleWords = title.toLowerCase().split(' ');
  const minorWordsSet = minorWords ? new Set(minorWords.toLowerCase().split(' ')) : null;

  const result = titleWords.map((word, index) => {
    if (minorWordsSet && minorWordsSet.has(word) && index !== 0) {
      return word;
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  });

  result[0] = result[0].charAt(0).toUpperCase() + result[0].slice(1);

  return result.join(' ');
}

export default titleCase;