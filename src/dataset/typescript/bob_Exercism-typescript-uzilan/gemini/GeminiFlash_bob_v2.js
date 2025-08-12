"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    // Optimized: These private static methods now accept 'trimmedInput' where appropriate,
    // to avoid redundant `trim()` calls in the 'hey' method.
    // The `input` parameter is used for methods whose logic (e.g., regex matching `\s` or `^$`)
    // requires examining the original string, including leading/trailing whitespace.
    static isScreaming(input) {
        // This regex ensures the entire string (including whitespace) consists only of
        // digits, uppercase letters, or specific symbols/whitespace.
        // It's crucial for this to operate on the original 'input' as per its current definition,
        // as '\s' within the regex matches whitespace, and '^$' anchors to the string boundaries.
        return /^[0-9A-Z?,!%^^@#$(*\s]+$/.test(input);
    }
    static isQuestion(trimmedInput) {
        // This method's logic only cares about the end character after trimming.
        // By accepting 'trimmedInput', we avoid a redundant trim operation.
        return trimmedInput.endsWith('?');
    }
    static hasLetters(input) {
        // This regex simply checks for the presence of any letter.
        // It operates correctly on the original 'input' or a trimmed version,
        // so passing the original 'input' is consistent with its existing usage
        // and doesn't require an extra trim.
        return /[a-zA-Z]/.test(input);
    }
    static isSilence(trimmedInput) {
        // This method's logic checks if the string is empty after trimming.
        // By accepting 'trimmedInput', we avoid a redundant trim operation.
        return trimmedInput === '';
    }
    hey(input) {
        // Optimization: Perform `trim()` only once at the beginning.
        // This reduces string allocation and CPU cycles for repeated trimming.
        const trimmedInput = input.trim();
        // Optimization: Calculate all necessary conditions upfront and cache their results.
        // This avoids redundant method calls (especially regex executions) in the conditional branches.
        const isSilence = Bob.isSilence(trimmedInput);
        const isQuestion = Bob.isQuestion(trimmedInput);
        const isScreaming = Bob.isScreaming(input); // Uses original input as per its regex definition
        const hasLetters = Bob.hasLetters(input); // Uses original input as per its regex definition
        if (isSilence) {
            return 'Fine. Be that way!';
        }
        else if (isQuestion) {
            if (isScreaming && hasLetters) {
                return "Calm down, I know what I'm doing!";
            }
            else {
                return "Sure.";
            }
        }
        else if (!hasLetters) {
            return "Whatever.";
        }
        else if (isScreaming) {
            return 'Whoa, chill out!';
        }
        else {
            return "Whatever.";
        }
    }
}
exports.default = Bob;
