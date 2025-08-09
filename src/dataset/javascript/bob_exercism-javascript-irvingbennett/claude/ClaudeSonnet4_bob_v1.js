export const hey = (message) => {
  const trimmed = message.trim();
  
  if (trimmed.length === 0) {
    return 'Fine. Be that way!';
  }
  
  const isQuestion = trimmed[trimmed.length - 1] === '?';
  const hasLetters = /[A-Za-z]/.test(trimmed);
  const isYelling = hasLetters && trimmed === trimmed.toUpperCase();
  
  if (isQuestion && isYelling) {
    return "Calm down, I know what I'm doing!";
  }
  
  if (isQuestion) {
    return 'Sure.';
  }
  
  if (isYelling) {
    return 'Whoa, chill out!';
  }
  
  return 'Whatever.';
};