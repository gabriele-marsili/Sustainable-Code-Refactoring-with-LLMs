function titleCase(title, minorWords) {
  if (!title) return title;
  
  const minorSet = minorWords ? new Set(minorWords.toLowerCase().split(' ')) : null;
  
  return title.toLowerCase().split(' ').map((word, index) => {
    if (index === 0 || !minorSet || !minorSet.has(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  }).join(' ');
}

export default titleCase;