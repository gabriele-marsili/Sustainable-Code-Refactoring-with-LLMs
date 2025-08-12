"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    hey(input) {
        const trimmed = input.trim();
        if (trimmed === '') {
            return 'Fine. Be that way!';
        }
        const hasLetters = /[a-zA-Z]/.test(trimmed);
        const isQuestion = trimmed.endsWith('?');
        const isScreaming = hasLetters && trimmed === trimmed.toUpperCase();
        if (isQuestion) {
            return isScreaming ? "Calm down, I know what I'm doing!" : "Sure.";
        }
        if (isScreaming) {
            return 'Whoa, chill out!';
        }
        return "Whatever.";
    }
}
exports.default = Bob;
