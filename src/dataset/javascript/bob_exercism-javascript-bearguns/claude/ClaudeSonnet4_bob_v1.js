var Bob = function() {
  this.hey = function(phrase) {
    const trimmed = phrase.trim();
    
    if (!trimmed) {
      return "Fine. Be that way!";
    }
    
    const hasLetters = /[a-zA-Z]/.test(trimmed);
    const isYelling = hasLetters && trimmed === trimmed.toUpperCase();
    const isQuestion = trimmed.endsWith('?');
    
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