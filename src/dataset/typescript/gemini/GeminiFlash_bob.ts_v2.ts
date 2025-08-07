export default class Bob {
  // Define regular expressions as static readonly properties.
  // This ensures they are compiled only once when the class is loaded,
  // reducing overhead on subsequent calls to the `hey` method.
  private static readonly HAS_UPPER_CASE_REGEX = /[A-Z]/;
  private static readonly HAS_LOWER_CASE_REGEX = /[a-z]/;

  /**
   * Processes a message and returns Bob's response.
   *
   * The order of checks is crucial as some conditions have precedence over others:
   * 1. Silence (empty or whitespace only)
   * 2. Shouting (contains uppercase letters and no lowercase letters)
   * 3. Question (ends with a question mark)
   * 4. Default response
   *
   * @param message The input message string.
   * @returns Bob's response.
   */
  hey(message: string): string {
    // Trim leading/trailing whitespace once. This result is used for the silence check.
    // Using `trim().length === 0` is often more efficient and idiomatic than regex for this specific check,
    // as built-in string methods are highly optimized.
    const trimmedMessage = message.trim();

    // 1. Check for silence: Message is empty or contains only whitespace.
    if (trimmedMessage.length === 0) {
      return 'Fine. Be that way!';
    }

    // 2. Check for shouting: Message contains at least one uppercase letter AND no lowercase letters.
    // Using regex for these checks avoids creating a new string (like with `toUpperCase()`),
    // which can be costly for long messages. The regexes are pre-compiled static properties.
    // They also short-circuit, stopping as soon as a match (or non-match) is found.
    const hasUpperCase = Bob.HAS_UPPER_CASE_REGEX.test(message);
    const hasLowerCase = Bob.HAS_LOWER_CASE_REGEX.test(message);

    // A message is considered shouting if it has at least one uppercase letter
    // and no lowercase letters. This differentiates "HELLO!" (shouting) from
    // "Hello!" (not shouting) and "123!" (not shouting).
    if (hasUpperCase && !hasLowerCase) {
      return 'Whoa, chill out!';
    }

    // 3. Check for a question: Message ends with a question mark.
    // `endsWith()` is a highly optimized built-in string method for suffix checks,
    // providing better performance than a regular expression for this simple case.
    if (message.endsWith('?')) {
      return 'Sure.';
    }

    // 4. Default response for all other cases.
    return 'Whatever.';
  }
}