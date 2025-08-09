const HAS_UPPERCASE_REGEX = /[A-Z]/;
const HAS_LOWERCASE_REGEX = /[a-z]/;
const SPECIFIC_YELLING_QUESTION_REGEX = /^[^(a-z?)]+\?$/;

export const hey = message => {
  const trimmedMessage = message.trim();

  const isEmptyOrWhitespace = trimmedMessage.length === 0;

  if (isEmptyOrWhitespace) {
    return "Fine. Be that way!";
  }

  const containsUpperCase = HAS_UPPERCASE_REGEX.test(message);
  const containsLowerCase = HAS_LOWERCASE_REGEX.test(message);
  const endsWithQuestion = trimmedMessage.endsWith('?');

  // Condition for a specific type of shouting question (e.g., "HELLO?")
  // This matches original behavior where YELL_WITH_QUESITON_EXPRESSION implies
  // no lowercase letters and a single question mark at the end, coupled with
  // the HAS_YELL_POSSIBILITY check.
  const isSpecificYellingQuestion = containsUpperCase && SPECIFIC_YELLING_QUESTION_REGEX.test(message);

  // Condition for general yelling (e.g., "WHOA!")
  // This matches original behavior where YELL_EXPRESSION implies no lowercase letters,
  // coupled with the HAS_YELL_POSSIBILITY check.
  const isGeneralYelling = containsUpperCase && !containsLowerCase;

  // Apply the original precedence of conditions
  if (isSpecificYellingQuestion) {
    return "Calm down, I know what I'm doing!";
  } else if (isGeneralYelling) {
    return "Whoa, chill out!";
  } else if (endsWithQuestion) {
    return "Sure.";
  } else {
    return "Whatever.";
  }
};