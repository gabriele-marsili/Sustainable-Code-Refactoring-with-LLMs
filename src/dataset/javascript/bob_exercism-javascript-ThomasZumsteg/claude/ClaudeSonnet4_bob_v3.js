class Bob {
  hey(input) {
    const trimmed = input.trim();
    
    if (!trimmed) {
      return "Fine. Be that way!";
    }
    
    const hasLetters = /[A-Za-z]/.test(trimmed);
    const isAllCaps = hasLetters && trimmed === trimmed.toUpperCase();
    const isQuestion = trimmed.endsWith('?');
    
    if (isAllCaps) {
      return "Whoa, chill out!";
    }
    
    if (isQuestion) {
      return "Sure.";
    }
    
    return "Whatever.";
  }
}

export default Bob;