"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    static isScreaming(input) {
        return Bob.SCREAMING_REGEX.test(input);
    }
    static isQuestion(input) {
        return input.trimEnd().endsWith('?');
    }
    static hasLetters(input) {
        return Bob.LETTER_REGEX.test(input);
    }
    static isSilence(input) {
        return input.trim() === '';
    }
    hey(input) {
        const trimmed = input.trim();
        if (trimmed === '') {
            return 'Fine. Be that way!';
        }
        const hasLetters = Bob.LETTER_REGEX.test(input);
        const isQuestion = input.trimEnd().endsWith('?');
        if (isQuestion) {
            if (hasLetters && Bob.SCREAMING_REGEX.test(input)) {
                return "Calm down, I know what I'm doing!";
            }
            return "Sure.";
        }
        if (hasLetters && Bob.SCREAMING_REGEX.test(input)) {
            return 'Whoa, chill out!';
        }
        return "Whatever.";
    }
}
Bob.SCREAMING_REGEX = /^[^a-z]*[A-Z][^a-z]*$/;
Bob.LETTER_REGEX = /[a-zA-Z]/;
exports.default = Bob;
