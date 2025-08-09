class Bob {
  hey(input: string): string {
    const trimmed = input.trim()
    if (trimmed === '') return 'Fine. Be that way!'
    
    const isQuestion = trimmed.charCodeAt(trimmed.length - 1) === 63
    
    let hasLetter = false
    let hasLowercase = false
    
    for (let i = 0; i < trimmed.length; i++) {
      const code = trimmed.charCodeAt(i)
      if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
        hasLetter = true
        if (code >= 97 && code <= 122) {
          hasLowercase = true
          break
        }
      }
    }
    
    const isShout = hasLetter && !hasLowercase
    
    if (isQuestion && isShout) return "Calm down, I know what I'm doing!"
    if (isQuestion) return 'Sure.'
    if (isShout) return 'Whoa, chill out!'
    return 'Whatever.'
  }
}

export default Bob