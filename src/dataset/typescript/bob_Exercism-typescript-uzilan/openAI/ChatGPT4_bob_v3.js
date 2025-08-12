"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bob {
    static isScreaming(input) {
        let hasLetter = false;
        for (let i = 0; i < input.length; i++) {
            const c = input[i];
            if (c >= 'a' && c <= 'z')
                return false;
            if (c >= 'A' && c <= 'Z')
                hasLetter = true;
        }
        return hasLetter;
    }
    static isQuestion(input) {
        let i = input.length - 1;
        while (i >= 0 && input[i] === ' ')
            i--;
        return input[i] === '?';
    }
    static hasLetters(input) {
        for (let i = 0; i < input.length; i++) {
            const c = input[i];
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))
                return true;
        }
        return false;
    }
    static isSilence(input) {
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== ' ' && input[i] !== '\t' && input[i] !== '\n' && input[i] !== '\r') {
                return false;
            }
        }
        return true;
    }
    hey(input) {
        if (Bob.isSilence(input)) {
            return 'Fine. Be that way!';
        }
        const isQuestion = Bob.isQuestion(input);
        const isScreaming = Bob.isScreaming(input);
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
