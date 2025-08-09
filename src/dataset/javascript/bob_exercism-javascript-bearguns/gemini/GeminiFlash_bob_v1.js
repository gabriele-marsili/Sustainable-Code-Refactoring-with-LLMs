var Bob = function() {
  this.hey = function(phrase) {
    // 1. Check for Silence: Empty phrase or a phrase containing only spaces.
    // Optimized to avoid creating a new string with .replace().
    // Iterates through the phrase, breaking early if a non-space character is found.
    let isSilence = true;
    for (let i = 0; i < phrase.length; i++) {
        if (phrase[i] !== ' ') {
            isSilence = false;
            break;
        }
    }
    if (isSilence) {
      return "Fine. Be that way!";
    }

    // 2. Check for Yelling: Phrase is all uppercase AND contains at least one letter.
    // The 'g' flag and '+' quantifier are redundant for .test() when only checking existence.
    const isYelling = phrase.toUpperCase() === phrase && /[a-zA-Z]/.test(phrase);
    if (isYelling) {
      return "Whoa, chill out!";
    }

    // 3. Check for Question: Phrase ends with '?'.
    // Using the modern and more readable .endsWith() method.
    if (phrase.endsWith('?')) {
      return "Sure.";
    }

    // 4. Default response if no other conditions are met.
    return "Whatever.";
  };
};

export default Bob;;