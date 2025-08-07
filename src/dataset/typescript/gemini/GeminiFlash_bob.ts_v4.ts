export default class Bob {
  hey(message: string): string {
    // Condition 1: Silence
    // Checks if the message contains only whitespace or is empty.
    // The `!/\S/.test(message)` regex is efficient for this check.
    if (!/\S/.test(message)) {
      return 'Fine. Be that way!';
    }

    // Condition 2: Shouting
    // A message is considered shouting if it contains at least one uppercase letter
    // AND contains no lowercase letters.
    // This approach avoids the potentially expensive `message.toUpperCase()` call,
    // which creates a new string and consumes additional memory.
    // Instead, it uses two optimized regex checks.
    const containsUppercaseLetter = /[A-Z]/.test(message);
    const containsLowercaseLetter = /[a-z]/.test(message);

    if (containsUppercaseLetter && !containsLowercaseLetter) {
      return 'Whoa, chill out!';
    }

    // Condition 3: Question
    // Checks if the message ends with a question mark.
    // This regex works on the original string, respecting trailing whitespace
    // as per the implicit behavior of the original implementation.
    if (/\?$/.test(message)) {
      return 'Sure.';
    }

    // Default case
    return 'Whatever.';
  }
}