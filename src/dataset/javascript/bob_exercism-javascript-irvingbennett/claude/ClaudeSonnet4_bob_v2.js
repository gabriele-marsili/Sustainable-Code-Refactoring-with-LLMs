export const hey = (message) => {
  message = message.trim();
  
  if (message.length === 0) {
    return 'Fine. Be that way!';
  }
  
  const isQuestion = message[message.length - 1] === '?';
  const hasLetters = /[A-Za-z]/.test(message);
  const isYelling = hasLetters && message === message.toUpperCase();
  
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