const HAS_LETTERS_REGEX = /[a-zA-Z]/;
const CONTAINS_NON_SPACE_REGEX = /[^ ]/;

function Bob() {
  // Constructor remains empty as the method is placed on the prototype
}

Bob.prototype.hey = function(phrase) {
  // 1. Check for shouting: All uppercase and contains at least one letter.
  // This must be checked first as per the original logic's precedence.
  const isAllUpperCase = phrase.toUpperCase() === phrase;
  const hasLetters = HAS_LETTERS_REGEX.test(phrase);

  if (isAllUpperCase && hasLetters) {
    return "Whoa, chill out!";
  }

  // 2. Check for questions: Ends with a question mark.
  // Using endsWith for readability and efficiency.
  if (phrase.endsWith('?')) {
    return "Sure.";
  }

  // 3. Check for empty or purely whitespace phrases (only spaces are considered whitespace here).
  // This efficiently checks if there are no characters other than spaces.
  if (!CONTAINS_NON_SPACE_REGEX.test(phrase)) {
    return "Fine. Be that way!";
  }

  // 4. Default response if none of the above conditions are met.
  return "Whatever.";
};

export default Bob;