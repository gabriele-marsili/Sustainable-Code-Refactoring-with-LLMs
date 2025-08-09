export default class Bob {
  /**
   * Determines Bob's response to a given message.
   *
   * @param message The message string.
   * @returns Bob's response as a string.
   */
  public hey(message: string): string {
    // Check order is crucial as per Bob's interaction rules:
    // 1. Silence/whitespace-only takes precedence.
    // 2. Shouting takes precedence over questions.
    // 3. Questions take precedence over general statements.

    // Case 1: Message is empty or contains only whitespace.
    // `!/\S/.test(message)` efficiently checks for the absence of any non-whitespace characters.
    if (!/\S/.test(message)) {
      return 'Fine. Be that way!';
    }

    // Case 2: Message is a shout.
    // The `isShouting` helper is optimized to avoid creating new string objects
    // like `toUpperCase()`, reducing memory allocation and CPU cycles for long messages.
    if (this.isShouting(message)) {
      return 'Whoa, chill out!';
    }

    // Case 3: Message is a question.
    // `endsWith('?')` is generally more efficient and readable than a regular expression
    // for a simple suffix check.
    if (message.endsWith('?')) {
      return 'Sure.';
    }

    // Case 4: Default response for all other messages.
    return 'Whatever.';
  }

  /**
   * Helper method to determine if a message is a shout.
   * A message is considered a shout if it contains at least one uppercase letter
   * and no lowercase letters. This check is case-sensitive for ASCII letters.
   *
   * @param message The message string to check.
   * @returns True if the message is a shout, false otherwise.
   */
  private isShouting(message: string): boolean {
    let hasUppercaseLetter = false;
    let hasLowercaseLetter = false;

    // Iterate through the message characters to determine if it's a shout.
    // This approach avoids the creation of an intermediate string via `toUpperCase()`,
    // improving memory efficiency and potentially execution speed.
    for (let i = 0; i < message.length; i++) {
      const char = message[i];

      // Check for ASCII uppercase letters
      if (char >= 'A' && char <= 'Z') {
        hasUppercaseLetter = true;
      }
      // Check for ASCII lowercase letters
      else if (char >= 'a' && char <= 'z') {
        hasLowercaseLetter = true;
      }
    }

    // It's a shout if it contains at least one uppercase letter and no lowercase letters.
    return hasUppercaseLetter && !hasLowercaseLetter;
  }
}