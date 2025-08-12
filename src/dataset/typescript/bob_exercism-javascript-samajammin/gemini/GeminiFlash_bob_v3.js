"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(message) {
        // Check if the message is empty or contains only whitespace characters.
        // The `\S` regex matches any non-whitespace character. If no such character is found,
        // the message is considered empty or blank. This check is efficient.
        if (!/\S/.test(message)) {
            return 'Fine. Be that way!';
        }
        // Determine if the message contains any uppercase letters and any lowercase letters.
        // These checks avoid the overhead of creating a new string with `toUpperCase()`
        // and a subsequent full string comparison for the shouting condition.
        // Regular expression `test()` method is highly optimized by JavaScript engines
        // for these simple character class checks.
        const hasUppercaseLetters = /[A-Z]/.test(message);
        const hasLowercaseLetters = /[a-z]/.test(message);
        // Check if the message is "shouting".
        // A message is shouting if it contains at least one uppercase letter
        // AND does not contain any lowercase letters. This logic accurately
        // reflects the original behavior while being more performant.
        if (hasUppercaseLetters && !hasLowercaseLetters) {
            return 'Whoa, chill out!';
        }
        // Check if the message is a question.
        // A message is a question if its last character is a question mark.
        // `String.prototype.endsWith()` is typically implemented as a highly optimized
        // native method, making it more efficient and readable than a regex for this specific check.
        // It also correctly preserves the original behavior regarding trailing whitespace.
        if (message.endsWith('?')) {
            return 'Sure.';
        }
        // If none of the specific conditions are met, return the default response.
        return 'Whatever.';
    }
}
exports.default = Bob;
