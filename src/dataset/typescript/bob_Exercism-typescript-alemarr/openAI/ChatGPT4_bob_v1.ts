export const hey = (message: string) => {
  const trimmed = message.trim();

  if (trimmed === "") {
    return "Fine. Be that way!";
  }

  const isYelling = trimmed.toUpperCase() === trimmed && /[A-Z]/.test(trimmed);
  const isAsking = trimmed.endsWith("?");

  if (isAsking && isYelling) {
    return "Calm down, I know what I'm doing!";
  }

  if (isAsking) {
    return "Sure.";
  }

  if (isYelling) {
    return "Whoa, chill out!";
  }

  return "Whatever.";
};

const isEmpty = (message: string) => {
  return message.trim() === "";
};

const isYell = (message: string) => {
  const trimmed = message.trim();
  return trimmed.toUpperCase() === trimmed && /[A-Z]/.test(trimmed);
};

const isQuestion = (message: string) => {
  const trimmed = message.trim();
  return trimmed.endsWith("?");
};