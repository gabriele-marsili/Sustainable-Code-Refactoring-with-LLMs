"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    static isScreaming(input) {
        return input === input.toUpperCase() && /[A-Z]/.test(input);
    }
    static isQuestion(input) {
        const trimmed = input.trim();
        return trimmed.endsWith('?');
    }
    static isSilence(input) {
        return input.trim().length === 0;
    }
    hey(input) {
        if (Bob.isSilence(input)) {
            return 'Fine. Be that way!';
        }
        const isQuestion = Bob.isQuestion(input);
        const isScreaming = Bob.isScreaming(input);
        if (isQuestion && isScreaming) {
            return "Calm down, I know what I'm doing!";
        }
        if (isQuestion) {
            return "Sure.";
        }
        if (isScreaming) {
            return 'Whoa, chill out!';
        }
        return "Whatever.";
    }
}
exports.default = Bob;
