export const hey = (message) => {
  message = message.trim();

  if (message.length === 0) {
    return 'Fine. Be that way!';
  }

  const isQuestion = message.endsWith('?');
  const hasLetters = /[a-zA-Z]/.test(message);
  const containsNoLowercase = (message === message.toUpperCase());

  // A message is considered 'shouting' if it contains at least one letter
  // and all its characters (including non-letters) are uppercase or their uppercase equivalents.
  const isShouting = hasLetters && containsNoLowercase;

  if (isQuestion) {
    if (isShouting) {
      return "Calm down, I know what I'm doing!";
    } else {
      return 'Sure.';
    }
  } else { // Not a question
    if (isShouting) {
      return 'Whoa, chill out!';
    } else {
      return 'Whatever.';
    }
  }
};