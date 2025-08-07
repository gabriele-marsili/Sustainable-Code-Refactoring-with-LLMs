export default class Bob {
  hey(message: string): string {
    const trimmedMessage = message.trim();

    // Case 1: Empty or whitespace-only message
    // Replacing !/\S/.test(message) with trimmedMessage.length === 0 is more
    // direct and avoids regex overhead for a common check.
    if (trimmedMessage.length === 0) {
      return 'Fine. Be that way!';
    }

    // Case 2: Shouting (has uppercase letters and is all uppercase, ignoring non-letters)
    // Replacing /[A-Z]/.test(message) && message === message.toUpperCase()
    // with a single loop avoids creating a new string with toUpperCase()
    // and multiple regex evaluations, which can be expensive.
    let hasUpperCaseLetters = false;
    let hasLowerCaseLetters = false;

    // We iterate over the original message, not the trimmed one,
    // as surrounding whitespace should not affect shouting detection.
    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      // Check for ASCII uppercase letters
      if (char >= 'A' && char <= 'Z') {
        hasUpperCaseLetters = true;
      }
      // Check for ASCII lowercase letters
      else if (char >= 'a' && char <= 'z') {
        hasLowerCaseLetters = true;
      }

      // Early exit: if we've found both upper and lower case letters,
      // it's definitely not shouting, so we can stop processing early.
      if (hasUpperCaseLetters && hasLowerCaseLetters) {
        break;
      }
    }

    if (hasUpperCaseLetters && !hasLowerCaseLetters) {
      return 'Whoa, chill out!';
    }

    // Case 3: Question (ends with a question mark)
    // Replacing /\?$/.test(message) with message.endsWith('?') is a
    // direct string method, which is typically more efficient and readable
    // than a regex for a simple suffix check.
    // This must be on the original message, not the trimmed one,
    // to match the original regex's behavior (which doesn't ignore trailing spaces).
    if (message.endsWith('?')) {
      return 'Sure.';
    }

    // Case 4: Default response
    return 'Whatever.';
  }
}