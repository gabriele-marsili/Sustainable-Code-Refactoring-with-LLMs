function titleCase(title, minorWords) {
  if (!title) return title;

  const minorWordsSet = minorWords
    ? new Set(minorWords.toLowerCase().split(' '))
    : new Set();

  return title
    .toLowerCase()
    .split(' ')
    .map((word, index) =>
      index === 0 || !minorWordsSet.has(word)
        ? word[0].toUpperCase() + word.slice(1)
        : word
    )
    .join(' ');
}

export default titleCase;