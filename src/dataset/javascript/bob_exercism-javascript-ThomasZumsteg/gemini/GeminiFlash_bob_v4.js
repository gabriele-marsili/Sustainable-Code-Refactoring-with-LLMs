const QUESTION_REGEX = /\?\s*$/;
const NOTHING_REGEX = /^\s*$/;
const HAS_UPPERCASE_LETTER_REGEX = /[A-Z]/;

var Bob = function() {};

Bob.prototype.hey = function(input) {
  const isShouting = input.toUpperCase() === input && HAS_UPPERCASE_LETTER_REGEX.test(input);
  if (isShouting) {
    return "Whoa, chill out!";
  }

  if (QUESTION_REGEX.test(input)) {
    return "Sure.";
  }

  if (NOTHING_REGEX.test(input)) {
    return "Fine. Be that way!";
  }

  return "Whatever.";
};

export default Bob;