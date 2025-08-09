export const hey = (message: string) => {
  const trimmed = message.trim();
  
  if (trimmed === "") {
    return `Fine. Be that way!`;
  }
  
  const isQuestionResult = trimmed.endsWith("?");
  const hasLetters = /[A-Za-z]/.test(trimmed);
  const isYellResult = hasLetters && trimmed === trimmed.toUpperCase();
  
  if (isQuestionResult && isYellResult) {
    return `Calm down, I know what I'm doing!`;
  }
  
  if (isQuestionResult) {
    return "Sure.";
  }
  
  if (isYellResult) {
    return `Whoa, chill out!`;
  }
  
  return `Whatever.`;
};

const isEmpty = (message: string) => {
  return message.trim() === "";
};

const isYell = (message: string) => {
  const trimmed = message.trim();
  return /[A-Za-z]/.test(trimmed) && trimmed === trimmed.toUpperCase();
};

const isQuestion = (message: string) => {
  return message.trim().endsWith("?");
};