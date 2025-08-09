export const hey = (message) => {
  const trimmedMessage = message.trim();
  
  if (trimmedMessage === "") return "Fine. Be that way!";
  
  const isQuestion = trimmedMessage.endsWith("?");
  const hasLetters = /[a-zA-Z]/.test(trimmedMessage);
  const isYelling = hasLetters && trimmedMessage === trimmedMessage.toUpperCase();
  
  if (isYelling && isQuestion) return "Calm down, I know what I'm doing!";
  if (isYelling) return "Whoa, chill out!";
  if (isQuestion) return "Sure.";
  return "Whatever.";
};