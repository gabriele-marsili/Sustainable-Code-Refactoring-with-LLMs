export const hey = (message: string) => {
  const trimmed = message.trim();
  const isEmptyMsg = trimmed === "";
  const isQuestionMsg = trimmed.endsWith("?");
  const isYellMsg = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);

  if (isEmptyMsg) return "Fine. Be that way!";
  if (isQuestionMsg && isYellMsg) return "Calm down, I know what I'm doing!";
  if (isQuestionMsg) return "Sure.";
  if (isYellMsg) return "Whoa, chill out!";
  return "Whatever.";
};