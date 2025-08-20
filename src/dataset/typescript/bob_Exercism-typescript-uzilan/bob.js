"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    static isScreaming(input) {
        return Bob.screamingRegex.test(input);
    }
    static isQuestion(input) {
        // `trim()` is necessary here to handle questions with leading/trailing whitespace
        // (e.g., "  How are you?  ").
        return input.trim().endsWith('?');
    }
    static hasLetters(input) {
        return Bob.hasLettersRegex.test(input);
    }
    static isSilence(input) {
        // `trim()` is necessary here to handle inputs consisting only of whitespace.
        return input.trim() === '';
    }
    hey(input) {
        // Optimize by performing string operations and checks only once.
        // Store the results in boolean flags to minimize redundant computations,
        // function calls, and temporary string allocations (`trim()`).
        const trimmedInput = input.trim();
        const isSilence = trimmedInput === '';
        const isQuestion = trimmedInput.endsWith('?');
        // Note: isScreaming and hasLetters are applied to the original input
        // because their regex patterns, as provided, operate on the full string
        // including its original spacing, unlike `isSilence` and `isQuestion`.
        // This preserves the original functionality precisely.
        const hasLetters = Bob.hasLetters(input);
        const isScreaming = Bob.isScreaming(input);
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
// Pre-compile regexes for improved performance and reduced resource usage.
// This avoids repeated regex compilation every time these methods are called.
Bob.screamingRegex = /^[0-9A-Z?,!%^^@#$(*\s]+$/;
Bob.hasLettersRegex = /[a-zA-Z]/;
exports.default = Bob;
