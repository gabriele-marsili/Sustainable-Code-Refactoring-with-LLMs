//
// This is only a SKELETON file for the 'Bob' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const hey = (message) => {
  const trimmedMessage = message.trim();

  // If the message is empty after trimming, return early.
  if (trimmedMessage === "") {
    return "Fine. Be that way!";
  }

  let hasLetter = false;
  let isAllUppercase = true; // Assume true until proven otherwise
  const isQuestion = trimmedMessage[trimmedMessage.length - 1] === "?";

  // Iterate through the trimmed message once to determine if it contains letters
  // and if all letters are uppercase. This avoids regex overhead and
  // the creation of a new string from `toUpperCase()`, reducing memory and CPU usage.
  for (let i = 0; i < trimmedMessage.length; i++) {
    const charCode = trimmedMessage.charCodeAt(i);

    // Check if character is a lowercase letter (ASCII 'a' through 'z')
    if (charCode >= 97 && charCode <= 122) {
      hasLetter = true;
      isAllUppercase = false; // Found a lowercase letter, so it's not all uppercase.
      // Since isYelling requires both `hasLetter` and `isAllUppercase`,
      // if `isAllUppercase` becomes false, `isYelling` will be false.
      // We can break early as we've already set `hasLetter` to true.
      break;
    }
    // Check if character is an uppercase letter (ASCII 'A' through 'Z')
    else if (charCode >= 65 && charCode <= 90) {
      hasLetter = true;
    }
  }

  // Determine if the message is yelling based on the single pass results.
  const isYelling = hasLetter && isAllUppercase;

  // Apply the conversation rules.
  if (isYelling && isQuestion) {
    return "Calm down, I know what I'm doing!";
  } else if (isYelling) {
    return "Whoa, chill out!";
  } else if (isQuestion) {
    return "Sure.";
  } else {
    // If it's not yelling and not a question, it's a regular statement.
    return "Whatever.";
  }
};