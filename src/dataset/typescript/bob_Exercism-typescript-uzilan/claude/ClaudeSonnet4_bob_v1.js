"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    static isScreaming(input) {
        return Bob.SCREAMING_REGEX.test(input);
    }
    static isQuestion(input) {
        return input.charCodeAt(input.length - 1) === 63; // '?' ASCII code
    }
    static hasLetters(input) {
        return Bob.HAS_LETTERS_REGEX.test(input);
    }
    static isSilence(input) {
        return input.trim() === '';
    }
    hey(input) {
        const trimmed = input.trim();
        if (trimmed === '') {
            return 'Fine. Be that way!';
        }
        const hasLetters = Bob.hasLetters(input);
        const isQuestion = input.charCodeAt(input.length - 1) === 63;
        if (isQuestion) {
            if (hasLetters && Bob.isScreaming(input)) {
                return "Calm down, I know what I'm doing!";
            }
            return "Sure.";
        }
        if (!hasLetters) {
            return "Whatever.";
        }
        if (Bob.isScreaming(input)) {
            return 'Whoa, chill out!';
        }
        return "Whatever.";
    }
}
Bob.SCREAMING_REGEX = /^[^a-z]*$/;
Bob.HAS_LETTERS_REGEX = /[a-zA-Z]/;
exports.default = Bob;
