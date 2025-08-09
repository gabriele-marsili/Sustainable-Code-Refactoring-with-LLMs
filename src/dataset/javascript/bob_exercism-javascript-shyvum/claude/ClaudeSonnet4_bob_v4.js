export const hey = (message) => {
  const trimmedMessage = message.trim();
  
  if (trimmedMessage === "") return "Fine. Be that way!";
  
  const isQuestion = trimmedMessage.charCodeAt(trimmedMessage.length - 1) === 63;
  
  let hasLetter = false;
  let isYelling = true;
  
  for (let i = 0; i < trimmedMessage.length; i++) {
    const code = trimmedMessage.charCodeAt(i);
    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      hasLetter = true;
      if (code >= 97 && code <= 122) {
        isYelling = false;
        break;
      }
    }
  }
  
  const actuallyYelling = hasLetter && isYelling;
  
  if (actuallyYelling && isQuestion) return "Calm down, I know what I'm doing!";
  if (actuallyYelling) return "Whoa, chill out!";
  if (isQuestion) return "Sure.";
  return "Whatever.";
};