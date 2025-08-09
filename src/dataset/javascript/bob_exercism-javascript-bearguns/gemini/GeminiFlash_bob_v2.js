var Bob = function() {
  this.hey = function(phrase) {
    // Optimization Strategy: Reduce string allocations and multiple passes over the string
    // by combining checks into single loops where possible, and using efficient built-ins.
    // The order of checks is preserved to maintain original functionality.

    // 1. Check for Yelling (Original condition 1)
    // `phrase.toUpperCase() === phrase` means no lowercase letters.
    // `/[a-zA-Z]+/g.test(phrase)` means contains at least one letter.
    // Combine these into a single pass to avoid creating a new string (`toUpperCase`)
    // and a separate regex execution.
    let hasLetters = false;
    let isAllUppercase = true; // Assume true until a lowercase character is found

    for (let i = 0; i < phrase.length; i++) {
      const char = phrase[i];
      if (char >= 'a' && char <= 'z') { // Check for lowercase English letters
        isAllUppercase = false; // Found a lowercase letter, so it's not all uppercase
      } else if (char >= 'A' && char <= 'Z') { // Check for uppercase English letters
        hasLetters = true; // Found an uppercase letter
      }
    }

    if (isAllUppercase && hasLetters) {
      return "Whoa, chill out!";
    }

    // 2. Check for Question (Original condition 2)
    // `phrase[phrase.length - 1] === '?'` is already efficient.
    // Using `endsWith` for improved readability while maintaining efficiency.
    if (phrase.endsWith('?')) {
      return "Sure.";
    }

    // 3. Check for Silence (Original condition 3)
    // `!phrase.replace(/ /g,"").length || phrase === ''`
    // This checks if the phrase is empty OR if it contains only space characters.
    // Optimize by iterating through the string once to check for any non-space character,
    // avoiding the creation of a new string with `replace`.
    let containsNonSpace = false;
    for (let i = 0; i < phrase.length; i++) {
      if (phrase[i] !== ' ') {
        containsNonSpace = true;
        break; // Found a non-space character, no need to continue checking
      }
    }

    if (!containsNonSpace) { // If the loop completed without finding a non-space character
      return "Fine. Be that way!";
    }

    // 4. Default response
    return "Whatever.";
  }
};

export default Bob;;