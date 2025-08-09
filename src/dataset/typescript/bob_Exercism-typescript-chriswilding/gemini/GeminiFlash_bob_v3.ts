class Bob {
  hey(input: string): string {
    const trimmed = input.trim();

    if (trimmed === '') {
      return 'Fine. Be that way!';
    }

    const question = trimmed.endsWith('?');

    let hasUppercase = false;
    let hasLowercase = false;
    let hasLetter = false;

    // Iterate through the string once to determine shout conditions
    // This avoids creating temporary string copies (toLowerCase/toUpperCase)
    // and can short-circuit if a mixed case is detected.
    for (let i = 0; i < trimmed.length; i++) {
      const charCode = trimmed.charCodeAt(i);

      if (charCode >= 65 && charCode <= 90) { // ASCII A-Z
        hasUppercase = true;
        hasLetter = true;
      } else if (charCode >= 97 && charCode <= 122) { // ASCII a-z
        hasLowercase = true;
        hasLetter = true;
      }

      // If we've found both uppercase and lowercase letters,
      // it cannot be a shout, so we can stop iterating for this check.
      if (hasUppercase && hasLowercase) {
        break;
      }
    }

    // A string is considered a shout if it contains at least one letter,
    // has at least one uppercase letter, and has no lowercase letters.
    // This correctly handles cases like "123" or "!!!" not being shouts.
    const shout = hasLetter && hasUppercase && !hasLowercase;

    if (question && shout) {
      return "Calm down, I know what I'm doing!";
    }
    if (question) {
      return 'Sure.';
    }
    if (shout) {
      return 'Whoa, chill out!';
    }
    return 'Whatever.';
  }
}

export default Bob;