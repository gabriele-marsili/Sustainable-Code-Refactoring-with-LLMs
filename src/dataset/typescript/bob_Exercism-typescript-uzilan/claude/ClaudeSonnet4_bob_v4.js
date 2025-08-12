"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(input) {
        const trimmed = input.trim();
        if (trimmed === '') {
            return 'Fine. Be that way!';
        }
        const hasLetters = Bob.LETTERS_REGEX.test(input);
        const isQuestion = trimmed.endsWith('?');
        const isScreaming = hasLetters && Bob.SCREAMING_REGEX.test(input);
        if (isQuestion) {
            return isScreaming ? "Calm down, I know what I'm doing!" : "Sure.";
        }
        if (isScreaming) {
            return 'Whoa, chill out!';
        }
        return "Whatever.";
    }
}
Bob.SCREAMING_REGEX = /^[0-9A-Z?,!%^^@#$(*\s]+$/;
Bob.LETTERS_REGEX = /[a-zA-Z]/;
exports.default = Bob;
