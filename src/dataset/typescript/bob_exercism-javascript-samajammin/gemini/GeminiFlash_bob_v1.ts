export default class Bob {
  hey(message: string): string {
    // 1. Check for empty or whitespace-only message
    // The `\S` regex matches any non-whitespace character. If no such character is found,
    // the message is empty or consists only of whitespace. This regex is typically
    // highly optimized by JavaScript engines.
    if (!/\S/.test(message)) {
      return 'Fine. Be that way!';
    }

    // 2. Prepare for the "yelling" check by analyzing the message in a single pass.
    // This avoids creating an intermediate string with `toUpperCase()` and avoids
    // a separate regex scan for `/[A-Z]/`.
    let hasLetter = false;
    let containsLowercase = false;

    // Iterate through the message characters to determine if it contains letters
    // and if any of those letters are lowercase.
    for (const char of message) {
      // Check if the character is a lowercase letter
      if (char >= 'a' && char <= 'z') {
        containsLowercase = true;
        hasLetter = true;
      }
      // Check if the character is an uppercase letter
      else if (char >= 'A' && char <= 'Z') {
        hasLetter = true;
      }
      // No 'else' needed for non-letter characters (numbers, symbols, spaces)
      // as they don't affect the `hasLetter` or `containsLowercase` flags directly.
    }

    // Determine if the message qualifies as "yelling":
    // It must contain at least one letter AND not contain any lowercase letters.
    const isYelling = hasLetter && !containsLowercase;

    // 3. Apply the "yelling" rule (takes precedence over question if both apply)
    if (isYelling) {
      return 'Whoa, chill out!';
    }

    // 4. Check for a question (ends with '?')
    // `endsWith()` is a more specific and generally more efficient method for
    // checking suffixes compared to a general-purpose regular expression.
    if (message.endsWith('?')) {
      return 'Sure.';
    }

    // 5. Default response for all other cases
    return 'Whatever.';
  }
}