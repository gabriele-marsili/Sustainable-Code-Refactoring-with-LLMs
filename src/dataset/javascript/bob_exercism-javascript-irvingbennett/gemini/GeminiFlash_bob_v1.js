export const hey = (message) => {
  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    return 'Fine. Be that way!';
  }

  let hasLetters = false;
  // `allLettersAreUppercase` checks if, among the letters present, all are uppercase.
  // This is used for the "yelling" criteria.
  let allLettersAreUppercase = true;

  // `allCharsAreUppercase` checks if the entire string (including non-letters)
  // would be identical to its uppercase version. This mimics `message === message.toUpperCase()`.
  let allCharsAreUppercase = true;

  // These flags capture the essence of `message.search(/regex/) != 0` conditions,
  // focusing on whether the very first character matches the forbidden patterns.
  let firstCharIsNonAlpha = false; // True if `trimmedMessage[0]` is not an A-Z or a-z
  let firstCharIsNonAlphaSpaceOrQ = false; // True if `trimmedMessage[0]` is not A-Z, a-z, space, or '?'

  // Analyze the first character separately for the `search` conditions, as they only care about `index === 0`.
  const firstChar = trimmedMessage[0];
  // No need to check for `if (firstChar)` as `trimmedMessage.length === 0` is handled above.
  
  if (!((firstChar >= 'A' && firstChar <= 'Z') || (firstChar >= 'a' && firstChar <= 'z'))) {
      firstCharIsNonAlpha = true;
  }

  if (!((firstChar >= 'A' && firstChar <= 'Z') || (firstChar >= 'a' && firstChar <= 'z') || firstChar === ' ' || firstChar === '?')) {
      firstCharIsNonAlphaSpaceOrQ = true;
  }
  

  // Iterate through the string once to gather all necessary properties
  for (let i = 0; i < trimmedMessage.length; i++) {
    const char = trimmedMessage[i];

    // Determine `hasLetters` and `allLettersAreUppercase`
    if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) { // Is an ASCII letter
      hasLetters = true;
      if (char >= 'a' && char <= 'z') { // Is a lowercase ASCII letter
        allLettersAreUppercase = false;
      }
    }

    // Determine `allCharsAreUppercase` (mimics `trimmedMessage === trimmedMessage.toUpperCase()`)
    // This correctly handles cases where char.toUpperCase() might return multiple characters (e.g., 'ß').
    if (char !== char.toUpperCase()) {
      allCharsAreUppercase = false;
    }
  }

  const isQuestion = trimmedMessage.endsWith('?');

  // Apply the original code's decision logic using the pre-calculated flags.
  // The original logic implicitly required `hasLetters` for "yelling" responses,
  // as "123" was 'Whatever.' despite `toUpperCase()` being equal.

  if (isQuestion) {
    // Corresponds to: `if (message == message.toUpperCase() && message.search(/[^A-Za-z\s?]/) != 0)`
    // And also ensure it contains letters to be considered "yelling".
    if (allCharsAreUppercase && !firstCharIsNonAlphaSpaceOrQ && hasLetters) {
      return "Calm down, I know what I'm doing!";
    } else {
      return 'Sure.';
    }
  } else {
    // Corresponds to the first `if` in the non-question branch:
    // `if (message == message.toUpperCase() && message.search(/[^A-Za-z]/) != 0)`
    if (allCharsAreUppercase && !firstCharIsNonAlpha && hasLetters) {
      return 'Whoa, chill out!';
    }
    // Corresponds to the second `else if`:
    // `else if (message.search(/[A-Za-z]/) == -1)`
    else if (!hasLetters) {
      return 'Whatever.';
    }
    // Corresponds to the third `else if`:
    // `else if (message == message.toUpperCase())`
    // This condition is only reached if the above two conditions are false.
    // So, `hasLetters` must be true here.
    else if (allCharsAreUppercase) {
      return 'Whoa, chill out!';
    }
    // Corresponds to the final `else`:
    else {
      return 'Whatever.';
    }
  }
};