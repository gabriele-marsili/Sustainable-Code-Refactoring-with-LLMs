class Bob {
  hey(input: string): string {
    const trimmed = input.trim()
    if (trimmed === '') return 'Fine. Be that way!'
    
    const question = trimmed.charCodeAt(trimmed.length - 1) === 63 // '?' ASCII code
    
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
    
    const shout = hasLetter && !hasLowercase
    
    if (question && shout) return "Calm down, I know what I'm doing!"
    if (question) return 'Sure.'
    if (shout) return 'Whoa, chill out!'
    return 'Whatever.'
  }
}

export default Bob