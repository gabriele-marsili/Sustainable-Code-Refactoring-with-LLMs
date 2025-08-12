"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    /**
     * Checks if the input string consists entirely of uppercase letters, digits,
     * or a specific set of symbols and common whitespace characters.
     * This reimplementation avoids regex overhead by iterating through the string
     * and performing direct character code or set lookups, which can be more
     * energy-efficient for string validation.
     * Original regex: `^[0-9A-Z?,!%^^@#$(*\s]+$`
     */
    static isScreaming(input) {
        // The original regex `+` quantifier implies at least one character.
        if (input.length === 0) {
            return false;
        }
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            const charCode = char.charCodeAt(0);
            // Check for digits (ASCII 48-57)
            if (charCode >= 48 && charCode <= 57) {
                continue;
            }
            // Check for uppercase letters (ASCII 65-90)
            if (charCode >= 65 && charCode <= 90) {
                continue;
            }
            // Check for specific symbols and common whitespace using the precomputed Set.
            // This is efficient with Set.has() for a fixed, small set of characters.
            if (Bob.ALLOWED_SCREAMING_CHARS.has(char)) {
                continue;
            }
            // If any character is not in the allowed categories, it's not "screaming".
            return false;
        }
        return true;
    }
    /**
     * Checks if the trimmed input string ends with a question mark.
     * This method is already efficient with built-in string methods.
     * Its signature must be preserved, so `trim()` cannot be hoisted.
     */
    static isQuestion(input) {
        return input.trim().endsWith('?');
    }
    /**
     * Checks if the input string contains any letter (uppercase or lowercase).
     * The regex `/[a-zA-Z]/` is simple and highly optimized by JavaScript engines,
     * often performing as well or better than manual loops for this specific check,
     * and it is more concise.
     */
    static hasLetters(input) {
        return /[a-zA-Z]/.test(input);
    }
    /**
     * Checks if the trimmed input string is empty.
     * This method is already efficient with built-in string methods.
     * Its signature must be preserved, so `trim()` cannot be hoisted.
     */
    static isSilence(input) {
        return input.trim() === '';
    }
    /**
     * Determines Bob's response based on the input string.
     * The order of checks is critical to maintain the original behavior.
     * No changes are made to the logic flow or method signatures.
     */
    hey(input) {
        if (Bob.isSilence(input)) {
            return 'Fine. Be that way!';
        }
        else if (Bob.isQuestion(input)) {
            // isScreaming and hasLetters operate on the original input string,
            // as their logic (e.g., allowing spaces for screaming)
            // depends on the untrimmed content.
            if (Bob.isScreaming(input) && Bob.hasLetters(input)) {
                return "Calm down, I know what I'm doing!";
            }
            else {
                return "Sure.";
            }
        }
        else if (!Bob.hasLetters(input)) {
            return "Whatever.";
        }
        else if (Bob.isScreaming(input)) {
            return 'Whoa, chill out!';
        }
        else {
            return "Whatever.";
        }
    }
}
// Precompute allowed specific characters for screaming logic.
// Using a static readonly Set ensures this is initialized once,
// reducing memory allocation and improving lookup performance compared
// to repeated string comparisons or a new regex object on each call.
// This Set includes common ASCII whitespace characters as defined by \s in regex.
Bob.ALLOWED_SCREAMING_CHARS = new Set([
    '?', ',', '!', '%', '^', '@', '#', '$', '(', '*',
    ' ', '\t', '\n', '\v', '\f', '\r' // ASCII whitespace: space, tab, newline, vertical tab, form feed, carriage return
]);
exports.default = Bob;
