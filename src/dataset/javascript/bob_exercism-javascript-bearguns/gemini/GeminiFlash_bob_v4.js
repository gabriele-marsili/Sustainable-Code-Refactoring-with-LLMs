const ALL_LOWERCASE_REGEX = /[a-z]/;
const ANY_LETTER_REGEX = /[a-zA-Z]/;
const ONLY_SPACES_OR_EMPTY_REGEX = /[^ ]/;

class Bob {
  constructor() {
  }

  hey(phrase) {
    if (!ALL_LOWERCASE_REGEX.test(phrase) && ANY_LETTER_REGEX.test(phrase)) {
      return "Whoa, chill out!";
    }

    if (phrase.length > 0 && phrase[phrase.length - 1] === '?') {
      return "Sure.";
    }

    if (!ONLY_SPACES_OR_EMPTY_REGEX.test(phrase)) {
      return "Fine. Be that way!";
    }

    return "Whatever.";
  }
}

export default Bob;