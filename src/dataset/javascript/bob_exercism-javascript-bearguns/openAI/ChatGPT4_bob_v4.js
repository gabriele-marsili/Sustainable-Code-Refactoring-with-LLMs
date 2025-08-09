var Bob = function() {
  this.hey = function(phrase) {
    const trimmed = phrase.trim();
    if (!trimmed) {
      return "Fine. Be that way!";
    }
    const hasLetters = /[a-zA-Z]/.test(trimmed);
    if (hasLetters && trimmed === trimmed.toUpperCase()) {
      return "Whoa, chill out!";
    }
    if (trimmed.endsWith('?')) {
      return "Sure.";
    }
    return "Whatever.";
  };
};

export default Bob;