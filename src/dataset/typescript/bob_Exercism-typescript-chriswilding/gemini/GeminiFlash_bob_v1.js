"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(input) {
        const trimmed = input.trim();
        // Condition 1: Empty string
        if (trimmed === '') {
            return 'Fine. Be that way!';
        }
        // Condition 2: Is it a question?
        const question = trimmed.endsWith('?');
        // Condition 3: Is it a shout?
        // A shout means it contains at least one uppercase letter and no lowercase letters.
        // This optimization avoids creating intermediate string copies via toLowerCase() and toUpperCase(),
        // relying instead on highly optimized regular expression engine checks.
        const hasLowercase = /[a-z]/.test(trimmed);
        const hasUppercase = /[A-Z]/.test(trimmed);
        const shout = hasUppercase && !hasLowercase;
        // Prioritized conditions based on original logic
        if (question && shout) {
            return "Calm down, I know what I'm doing!";
        }
        if (question) {
            return 'Sure.';
        }
        if (shout) {
            return 'Whoa, chill out!';
        }
        // Default response
        return 'Whatever.';
    }
}
exports.default = Bob;
