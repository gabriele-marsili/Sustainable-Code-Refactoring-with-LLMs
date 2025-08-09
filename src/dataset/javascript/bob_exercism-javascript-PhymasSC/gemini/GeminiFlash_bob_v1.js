const HAS_UPPER_CASE_REGEX = /[A-Z]/;
const HAS_LOWER_CASE_REGEX = /[a-z]/;

export const hey = message => {
  const trimmedMessage = message.trim();

  // Rule 1: Silence
  // An empty message or a message consisting only of whitespace.
  if (trimmedMessage.length === 0) {
    return "Fine. Be that way!";
  }

  const isQuestion = trimmedMessage.endsWith('?');

  // Determine if the message qualifies as "yelling".
  // A message is yelling if it contains at least one uppercase letter
  // AND contains no lowercase letters. This accurately reflects the original
  // HAS_YELL_POSSIBILITY combined with YELL_EXPRESSION.
  const containsUpperCase = HAS_UPPER_CASE_REGEX.test(message);
  const containsLowerCase = HAS_LOWER_CASE_REGEX.test(message);
  const isYelling = containsUpperCase && !containsLowerCase;

  // Rule 2 & 3: Yelling (with or without question)
  // These take precedence over a simple question.
  if (isYelling) {
    // Check if it's a yelling question.
    // A yelling question is yelling AND ends with a question mark AND contains no other question marks.
    // The original `YELL_WITH_QUESITON_EXPRESSION` implies only one '?' which must be the last character.
    const hasOtherQuestionMarks = trimmedMessage.slice(0, -1).includes('?');

    if (isQuestion && !hasOtherOtherQuestionMarks) {
      return "Calm down, I know what I'm doing!"; // Yelling a question
    } else {
      return "Whoa, chill out!"; // Just yelling
    }
  }

  // Rule 4: Simple Question
  // Checked if not silence and not yelling.
  if (isQuestion) {
    return "Sure.";
  }

  // Rule 5: Default response
  return "Whatever.";
};