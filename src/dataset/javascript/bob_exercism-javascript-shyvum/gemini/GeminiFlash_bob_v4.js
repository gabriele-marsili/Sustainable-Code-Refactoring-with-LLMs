export const hey = (message) => {
  const trimmedMessage = message.trim();

  if (trimmedMessage === "") {
    return "Fine. Be that way!";
  }

  let hasLetters = false;
  let hasLowercase = false;
  for (let i = 0; i < trimmedMessage.length; i++) {
    const char = trimmedMessage[i];
    if (char >= 'a' && char <= 'z') {
      hasLowercase = true;
      break; // Found a lowercase letter, so it cannot be yelling
    }
    if (char >= 'A' && char <= 'Z') {
      hasLetters = true; // Mark that we've seen at least one letter
    }
  }

  const isYelling = hasLetters && !hasLowercase;
  const isQuestion = trimmedMessage.endsWith("?"); // More idiomatic than slice(-1)

  if (isYelling && isQuestion) {
    return "Calm down, I know what I'm doing!";
  } else if (isYelling) {
    return "Whoa, chill out!";
  } else if (isQuestion) {
    return "Sure.";
  } else {
    return "Whatever.";
  }
};