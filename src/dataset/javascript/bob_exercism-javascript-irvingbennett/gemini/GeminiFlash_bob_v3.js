export const hey = (message) => {
  message = message.trim();

  if (message.length === 0) {
    return 'Fine. Be that way!';
  }

  const isQuestion = message.endsWith('?');
  const hasLetters = /[A-Za-z]/.test(message);
  const isAllCaps = message === message.toUpperCase();

  // Determine if the message qualifies as "yelling" based on its content (all caps and contains letters).
  const isYelling = isAllCaps && hasLetters;

  // These flags capture the nuanced `search(...) != 0` conditions from the original code,
  // which effectively check if the message *does not start* with specific non-alphabetic characters.
  const startsWithoutLeadingNonAlpha = !/^[^A-Za-z]/.test(message);
  const startsWithoutLeadingNonAlphaSpaceQuestion = !/^[^A-Za-z\s?]/.test(message);

  if (isQuestion) {
    // This condition matches: message is all caps AND has letters AND doesn't start with
    // a non-alpha, non-space, non-question mark character.
    if (isYelling && startsWithoutLeadingNonAlphaSpaceQuestion) {
      return "Calm down, I know what I'm doing!";
    } else {
      return 'Sure.';
    }
  } else { // Not a question
    // This condition matches: message is all caps AND has letters AND doesn't start with
    // a non-alpha character.
    if (isYelling && startsWithoutLeadingNonAlpha) {
      return 'Whoa, chill out!';
    }
    // This condition matches: message contains no letters at all (e.g., "123", "!!!").
    else if (!hasLetters) {
      return 'Whatever.';
    }
    // This condition catches messages that are all caps and have letters,
    // but failed the `startsWithoutLeadingNonAlpha` check (e.g., "!WHOA", "123HELLO").
    // It's a "yelling" response even if it started with a non-alpha character.
    else if (isYelling) {
      return 'Whoa, chill out!';
    }
    // Default response for anything else (e.g., "Hello", "hello world").
    else {
      return 'Whatever.';
    }
  }
};