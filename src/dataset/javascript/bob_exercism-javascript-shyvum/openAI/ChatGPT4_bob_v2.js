export const hey = (message) => {
  const trimmed = message.trim();
  if (trimmed === "") return "Fine. Be that way!";

  const lastChar = trimmed[trimmed.length - 1];
  const hasLetters = /[a-zA-Z]/.test(trimmed);
  const isYelling = hasLetters && trimmed === trimmed.toUpperCase();
  const isQuestion = lastChar === "?";

  if (isYelling && isQuestion) return "Calm down, I know what I'm doing!";
  if (isYelling) return "Whoa, chill out!";
  if (isQuestion) return "Sure.";
  return "Whatever.";
};