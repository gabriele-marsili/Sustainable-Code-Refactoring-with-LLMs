var Bob = function() {
  this.hey = function(phrase) {
    const trimmed = phrase.trim();
    
    if (!trimmed) {
      return "Fine. Be that way!";
    }
    
    const isYelling = trimmed === trimmed.toUpperCase() && /[a-zA-Z]/.test(trimmed);
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