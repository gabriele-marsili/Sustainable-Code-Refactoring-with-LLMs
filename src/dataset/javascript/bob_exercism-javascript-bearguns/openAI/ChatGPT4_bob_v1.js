var Bob = function() {
  this.hey = function(phrase) {
    const trimmed = phrase.trim();
    if (!trimmed) {
      return "Fine. Be that way!";
    }
    const hasLetters = /[a-zA-Z]/.test(phrase);
    if (hasLetters && phrase === phrase.toUpperCase()) {
      return "Whoa, chill out!";
    }
    if (trimmed.endsWith('?')) {
      return "Sure.";
    }
    return "Whatever.";
  }
}

export default Bob;