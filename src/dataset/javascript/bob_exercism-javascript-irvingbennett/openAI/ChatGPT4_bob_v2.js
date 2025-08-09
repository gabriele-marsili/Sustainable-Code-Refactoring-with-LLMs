export const hey = (message) => {
  message = message.trim();
  if (message === '') return 'Fine. Be that way!';

  const isQuestion = message.endsWith('?');
  const hasLetters = /[A-Za-z]/.test(message);
  const isShouting = hasLetters && message === message.toUpperCase();

  if (isQuestion) {
    return isShouting ? "Calm down, I know what I'm doing!" : "Sure.";
  }

  if (isShouting) return "Whoa, chill out!";
  return "Whatever.";
};