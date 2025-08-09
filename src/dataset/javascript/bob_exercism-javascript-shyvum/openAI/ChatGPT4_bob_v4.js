export const hey = (message) => {
  const msg = message.trim();
  if (!msg) return "Fine. Be that way!";

  const lastChar = msg[msg.length - 1];
  const hasLetters = /[a-zA-Z]/.test(msg);
  const isYelling = hasLetters && msg === msg.toUpperCase();
  const isQuestion = lastChar === "?";

  if (isYelling && isQuestion) return "Calm down, I know what I'm doing!";
  if (isYelling) return "Whoa, chill out!";
  if (isQuestion) return "Sure.";
  return "Whatever.";
};