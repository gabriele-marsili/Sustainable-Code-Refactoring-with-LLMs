const HAS_YELL_POSSIBILITY = /[A-Z]/;
const YELL_EXPRESSION = /^[^a-z]+$/;
const YELL_WITH_QUESITON_EXPRESSION = /^[^(a-z?)]+\?$/;
const NO_EXPRESSION = /^\s*$/;

export const hey = message => {
  const trimmedMessage = message.trim();

  // Rule 1: Silence
  // Matches empty string or a string consisting solely of whitespace characters.
  if (NO_EXPRESSION.test(message)) {
    return "Fine. Be that way!";
  }

  // Pre-compute conditions using .test() for performance, avoiding redundant calls.
  // The original regexes for yelling were applied to the full `message` string,
  // not the trimmed version, which is preserved here.
  const hasUppercaseLetter = HAS_YELL_POSSIBILITY.test(message);
  const isYellingBasedOnRegex = YELL_EXPRESSION.test(message);
  const isYellingQuestionBasedOnRegex = YELL_WITH_QUESITON_EXPRESSION.test(message);

  // Rule 2 & 3: Yelling (with or without question)
  // This nested structure and order of checks precisely reflects the original logic.
  if (hasUppercaseLetter) {
    if (isYellingQuestionBasedOnRegex) {
      return "Calm down, I know what I'm doing!";
    }
    if (isYellingBasedOnRegex) {
      return "Whoa, chill out!";
    }
  }

  // Rule 4: Question
  // Uses the pre-computed `trimmedMessage` to avoid duplicate `trim()` calls.
  if (trimmedMessage.endsWith('?')) {
    return "Sure.";
  }

  // Rule 5: Whatever (default response)
  return "Whatever.";
};