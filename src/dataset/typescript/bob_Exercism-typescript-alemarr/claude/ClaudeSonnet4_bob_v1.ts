export const hey = (message: string) => {
  const trimmed = message.trim();
  
  if (trimmed === "") {
    return `Fine. Be that way!`;
  }
  
  const isQuestion = trimmed.endsWith("?");
  const isYell = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
  
  if (isQuestion && isYell) {
    return `Calm down, I know what I'm doing!`;
  }
  
  if (isQuestion) {
    return "Sure.";
  }
  
  if (isYell) {
    return `Whoa, chill out!`;
  }
  
  return `Whatever.`;
};

const isEmpty = (message: string) => {
  return message.trim() === "";
};

const isYell = (message: string) => {
  return (
    message.trim().toUpperCase() == message && /[A-Z]/.test(message.trim())
  );
};

const isQuestion = (message: string) => {
  return message.trim().substring(message.trim().length - 1) == "?";
};