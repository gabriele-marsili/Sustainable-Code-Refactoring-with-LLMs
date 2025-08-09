export const hey = (message: string) => {
  const trimmedMessage = message.trim();

  // Pre-calculate flags to avoid redundant computations and multiple function calls
  const isMsgEmpty = trimmedMessage === "";
  const isMsgQuestion = trimmedMessage.endsWith("?");
  const isMsgYell =
    trimmedMessage.toUpperCase() === trimmedMessage &&
    /[A-Z]/.test(trimmedMessage); // Ensures it's all caps AND contains at least one letter

  if (isMsgEmpty) {
    return `Fine. Be that way!`;
  } else if (isMsgQuestion && isMsgYell) {
    return `Calm down, I know what I'm doing!`;
  } else if (isMsgQuestion) {
    return "Sure.";
  } else if (isMsgYell) {
    return `Whoa, chill out!`;
  } else {
    return `Whatever.`;
  }
};

// These helper functions are no longer directly used in 'hey'
// but their signatures must be preserved as per the requirements.
// They are kept here, but their implementations are simplified
// assuming they would receive an already trimmed string if called externally.

export const isEmpty = (message: string) => {
  return message.trim() === "";
};

export const isYell = (message: string) => {
  const trimmedMessage = message.trim();
  return (
    trimmedMessage.toUpperCase() === trimmedMessage &&
    /[A-Z]/.test(trimmedMessage)
  );
};

export const isQuestion = (message: string) => {
  return message.trim().endsWith("?");
};