class Bob {
  hey(input) {
    if (/^\s*$/.test(input)) return "Fine. Be that way!";
    
    const hasLetters = /[A-Z]/i.test(input);
    const isUpperCase = hasLetters && input === input.toUpperCase();
    const isQuestion = input.trimEnd().endsWith('?');
    
    if (isUpperCase) return "Whoa, chill out!";
    if (isQuestion) return "Sure.";
    return "Whatever.";
  }
}

export default Bob;