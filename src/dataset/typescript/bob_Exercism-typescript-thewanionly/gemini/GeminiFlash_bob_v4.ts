const BobResponse = [
  'Whatever.',
  'Sure.',
  'Whoa, chill out!',
  `Calm down, I know what I'm doing!`,
  'Fine. Be that way!'
] as const

enum MessageType {
  other = 0,
  question = 1,
  yell = 2,
  yell_quesion = 3,
  nothing = 4
}

type Response<T> = T[keyof T]

// Helper function to check if a single character is whitespace.
// This leverages String.prototype.trim() which is highly optimized
// and accurately matches the behavior of the `\s` regex flag for a single character.
const isCharWhitespace = (char: string): boolean => char.trim().length === 0;

export function hey(message: string): Response<typeof BobResponse> {
  let hasNonWhitespaceChar = false;
  let hasAlphabeticChar = false;
  let allAlphabeticCharsAreUppercase = true; // Assumed true until a lowercase alphabetic char is found
  let lastNonWhitespaceChar = ''; // Stores the last non-whitespace character for question detection

  // Iterate over the message string once to gather all necessary information
  // This avoids creating new strings for whitespace removal, case conversion, or slicing.
  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    const charCode = char.charCodeAt(0);

    // Skip whitespace characters as defined by `\s` regex
    if (isCharWhitespace(char)) {
      continue;
    }

    // A non-whitespace character has been found
    hasNonWhitespaceChar = true;
    lastNonWhitespaceChar = char; // Update the last encountered non-whitespace character

    // Check if the character is an English alphabet letter (A-Z or a-z)
    // and update the yelling status flags accordingly.
    // ASCII char codes: A=65, Z=90, a=97, z=122
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
      hasAlphabeticChar = true; // At least one alphabetic character exists

      // If the character is a lowercase letter, the message cannot be "all uppercase"
      if (charCode >= 97 && charCode <= 122) {
        allAlphabeticCharsAreUppercase = false;
      }
    }
  }

  // Determine the final response type based on the collected flags
  const isEmptyOrWhitespace = !hasNonWhitespaceChar;
  const isQuestion = hasNonWhitespaceChar && lastNonWhitespaceChar === '?';
  // A message is considered yelling if it contains at least one alphabetic character
  // AND all its alphabetic characters are uppercase.
  const isYelling = hasAlphabeticChar && allAlphabeticCharsAreUppercase;

  let responseIndex: MessageType;

  // Apply the conditions in order of precedence as observed in the original logic:
  // Nothing > Yell-Question > Yell > Question > Other
  if (isEmptyOrWhitespace) {
    responseIndex = MessageType.nothing; // Corresponds to BobResponse[4]: 'Fine. Be that way!'
  } else if (isYelling && isQuestion) {
    responseIndex = MessageType.yell_quesion; // Corresponds to BobResponse[3]: `Calm down, I know what I'm doing!`
  } else if (isYelling) {
    responseIndex = MessageType.yell; // Corresponds to BobResponse[2]: 'Whoa, chill out!'
  } else if (isQuestion) {
    responseIndex = MessageType.question; // Corresponds to BobResponse[1]: 'Sure.'
  } else {
    responseIndex = MessageType.other; // Corresponds to BobResponse[0]: 'Whatever.'
  }

  return BobResponse[responseIndex];
}