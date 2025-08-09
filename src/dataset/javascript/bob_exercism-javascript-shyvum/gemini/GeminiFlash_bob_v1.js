export const hey = (message) => {
  const trimmedMessage = message.trim();

  // Handle the empty message case first, as it's a distinct rule and common.
  if (trimmedMessage.length === 0) {
    return "Fine. Be that way!";
  }

  let containsLetters = false;
  let allLettersAreUppercase = true; // Assume true, prove false if lowercase letters are found

  // Iterate over the trimmed message to determine if it contains letters
  // and if all letters are uppercase. This avoids creating intermediate strings
  // with toUpperCase() and the overhead of a regex engine.
  for (let i = 0; i < trimmedMessage.length; i++) {
    const char = trimmedMessage[i];

    // Check if the character is an uppercase letter (A-Z)
    if (char >= 'A' && char <= 'Z') {
      containsLetters = true;
    }
    // Check if the character is a lowercase letter (a-z)
    else if (char >= 'a' && char <= 'z') {
      containsLetters = true;
      allLettersAreUppercase = false; // Found a lowercase letter, so it's not yelling
      // Optimization: If we've found a lowercase letter, the 'isYelling' condition
      // will be false regardless of subsequent characters. We can break early.
      break;
    }
  }

  // Determine if Bob considers it 'yelling':
  // It must contain at least one letter AND all its letters must be uppercase.
  const isYelling = containsLetters && allLettersAreUppercase;

  // Determine if it's a question: Ends with '?'.
  // Using endsWith() is efficient as it's a built-in string method.
  const isQuestion = trimmedMessage.endsWith("?");

  // Apply Bob's response logic based on the determined conditions.
  // The order of conditions is important to match Bob's specific rules.
  if (isYelling && isQuestion) {
    return "Calm down, I know what I'm doing!";
  } else if (isYelling) {
    return "Whoa, chill out!";
  } else if (isQuestion) {
    return "Sure.";
  } else {
    // This is the default response if none of the specific conditions are met
    // (i.e., not yelling, not a question, and not an empty message).
    return "Whatever.";
  }
};