"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(messageRaw) {
        const message = messageRaw.trim();
        switch (true) {
            case message.length === 0:
                return 'Fine. Be that way!';
            case isUpperCaseAndHasAlphabeticChars(message):
                return 'Whoa, chill out!';
            case message.endsWith('?'):
                return 'Sure.';
            default:
                return 'Whatever.';
        }
    }
}
function isUpperCaseAndHasAlphabeticChars(s) {
    let hasAlphabeticChar = false;
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        // Check if the character is a letter (case-mappable) by comparing its uppercase and lowercase forms.
        // This is a Unicode-aware way to detect if a character is part of a script with case.
        if (char.toUpperCase() !== char.toLowerCase()) {
            hasAlphabeticChar = true;
            // If it is a letter, check if it is NOT in its uppercase form.
            // If it's not uppercase, then the string is not entirely uppercase.
            if (char.toUpperCase() !== char) {
                return false; // Found a letter that is not uppercase, so the condition fails.
            }
        }
    }
    // If the loop completes without finding any non-uppercase letters,
    // then all letters encountered were uppercase.
    // Finally, ensure that at least one alphabetic character was found.
    return hasAlphabeticChar;
}
exports.default = Bob;
