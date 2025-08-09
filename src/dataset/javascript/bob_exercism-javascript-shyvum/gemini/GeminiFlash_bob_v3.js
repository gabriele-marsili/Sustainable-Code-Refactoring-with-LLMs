export const hey = (message) => {
  const trimmedMessage = message.trim();

  if (trimmedMessage === "") {
    return "Fine. Be that way!";
  }

  const isYelling = (() => {
    let hasLetter = false;
    for (let i = 0; i < trimmedMessage.length; i++) {
      const char = trimmedMessage[i];
      if (char >= 'a' && char <= 'z') {
        return false;
      }
      if (char >= 'A' && char <= 'Z') {
        hasLetter = true;
      }
    }
    return hasLetter;
  })();

  const isQuestion = trimmedMessage.endsWith("?");

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