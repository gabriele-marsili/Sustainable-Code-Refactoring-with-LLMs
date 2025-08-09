var Bob = function() {
  this.hey = function(phrase) {
    const trimmed = phrase.trim();
    
    if (!trimmed) {
      return "Fine. Be that way!";
    }
    
    const isQuestion = trimmed[trimmed.length - 1] === '?';
    const hasLetters = /[a-zA-Z]/.test(trimmed);
    const isYelling = hasLetters && trimmed === trimmed.toUpperCase();
    
    if (isYelling) {
      return "Whoa, chill out!";
    }
    
    if (isQuestion) {
      return "Sure.";
    }
    
    return "Whatever.";
  }
}

export default Bob;