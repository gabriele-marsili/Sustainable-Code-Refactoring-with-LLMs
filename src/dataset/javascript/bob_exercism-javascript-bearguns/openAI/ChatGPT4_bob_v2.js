var Bob = function() {
  this.hey = function(phrase) {
    phrase = phrase.trim();
    if (!phrase) {
      return "Fine. Be that way!";
    }
    const hasLetters = /[a-zA-Z]/.test(phrase);
    if (hasLetters && phrase === phrase.toUpperCase()) {
      return "Whoa, chill out!";
    }
    if (phrase.endsWith('?')) {
      return "Sure.";
    }
    return "Whatever.";
  }
}

export default Bob;