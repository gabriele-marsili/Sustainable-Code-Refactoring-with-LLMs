function generateHashtag (str) {
  if (str.trim().length === 0) {
    return false
  }
  
  let result = "#"
  let i = 0
  let capitalizeNext = true
  
  while (i < str.length) {
    const char = str[i]
    
    if (char === ' ') {
      capitalizeNext = true
    } else {
      if (capitalizeNext) {
        result += char.toUpperCase()
        capitalizeNext = false
      } else {
        result += char
      }
    }
    
    i++
    
    if (result.length > 140) {
      return false
    }
  }
  
  return result
}

export default generateHashtag;