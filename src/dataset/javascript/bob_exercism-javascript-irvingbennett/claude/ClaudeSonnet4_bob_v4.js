export const hey = (message) => {
  const trimmed = message.trim();
  
  if (trimmed.length === 0) {
    return 'Fine. Be that way!';
  }
  
  const isQuestion = trimmed[trimmed.length - 1] === '?';
  const isUpperCase = trimmed === trimmed.toUpperCase();
  const hasLetters = /[A-Za-z]/.test(trimmed);
  
  if (isQuestion) {
    return isUpperCase && hasLetters ? "Calm down, I know what I'm doing!" : 'Sure.';
  }
  
  if (isUpperCase && hasLetters) {
    return 'Whoa, chill out!';
  }
  
  return 'Whatever.';
};