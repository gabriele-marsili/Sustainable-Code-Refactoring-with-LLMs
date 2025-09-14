function titleCase(title, minorWords) {
  if (!title) return title;
  
  const minorWordsSet = minorWords 
    ? new Set(minorWords.toLowerCase().split(' '))
    : null;
  
  return title
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0 || !minorWordsSet?.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(' ');
}

export default titleCase;