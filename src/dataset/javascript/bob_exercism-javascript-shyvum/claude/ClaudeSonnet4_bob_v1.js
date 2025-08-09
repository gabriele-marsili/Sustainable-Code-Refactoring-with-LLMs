export const hey = (message) => {
  const trimmedMessage = message.trim();
  
  if (trimmedMessage === "") return "Fine. Be that way!";
  
  const isQuestion = trimmedMessage.charCodeAt(trimmedMessage.length - 1) === 63; // '?' char code
  
  let isYelling = false;
  let hasLetter = false;
  
  for (let i = 0; i < trimmedMessage.length; i++) {
    const char = trimmedMessage.charCodeAt(i);
    if ((char >= 65 && char <= 90) || (char >= 97 && char <= 122)) { // A-Z or a-z
      hasLetter = true;
      if (char >= 97 && char <= 122) { // lowercase letter found
        isYelling = false;
        break;
      }
    }
  }
  
  if (hasLetter && !isYelling) {
    isYelling = true; // All letters are uppercase
  }
  
  if (isYelling && isQuestion) return "Calm down, I know what I'm doing!";
  if (isYelling) return "Whoa, chill out!";
  if (isQuestion) return "Sure.";
  return "Whatever.";
};