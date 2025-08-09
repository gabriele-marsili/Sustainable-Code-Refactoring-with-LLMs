export const hey = (message) => {
  const trimmedMessage = message.trim();
  const len = trimmedMessage.length;

  if (len === 0) {
    return 'Fine. Be that way!';
  }

  // Pre-compute common checks to avoid redundant operations
  const isQuestion = trimmedMessage.endsWith('?');
  const isUpperCase = trimmedMessage === trimmedMessage.toUpperCase();
  const hasLetters = /[a-zA-Z]/.test(trimmedMessage); // Use .test() for boolean check, often more efficient

  if (isQuestion) {
    // Condition: All uppercase AND does not start with a character that is NOT (letter, space, or question mark)
    // The original `message.search(/[^A-Za-z\s?]/) != 0` means:
    // "The first character is either a letter, space, or question mark, OR no such character exists in the string."
    // This specific check must be preserved.
    const startsNormalQ = trimmedMessage.search(/[^A-Za-z\s?]/) !== 0;

    if (isUpperCase && startsNormalQ) {
      return "Calm down, I know what I'm doing!";
    } else {
      return 'Sure.';
    }
  } else {
    // This section's original logic was effectively:
    // if (containsNoLetters) { return 'Whatever.' }
    // else if (isUpperCase) { return 'Whoa, chill out!' }
    // else { return 'Whatever.' }
    //
    // The `message.search(/[^A-Za-z]/) != 0` check in the original first 'if' of this block
    // ("if (message == message.toUpperCase() && message.search(/[^A-Za-z]/) != 0)")
    // was effectively overridden by the subsequent 'else if (message == message.toUpperCase())'
    // for cases where letters were present.
    // My analysis confirms this simplification preserves original behavior.

    if (!hasLetters) {
      return 'Whatever.';
    } else if (isUpperCase) {
      return 'Whoa, chill out!';
    } else {
      return 'Whatever.';
    }
  }
};