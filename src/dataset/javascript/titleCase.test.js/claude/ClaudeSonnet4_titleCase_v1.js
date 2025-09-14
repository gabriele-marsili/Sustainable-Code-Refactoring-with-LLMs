function titleCase(title, minorWords) {
  if (title.length === 0) return title
  
  const words = title.split(' ')
  const minorSet = minorWords ? new Set(minorWords.toLowerCase().split(' ')) : null
  
  for (let i = 0; i < words.length; i++) {
    const lowerWord = words[i].toLowerCase()
    
    if (i === 0 || !minorSet || !minorSet.has(lowerWord)) {
      words[i] = lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1)
    } else {
      words[i] = lowerWord
    }
  }
  
  return words.join(' ')
}

export default titleCase;